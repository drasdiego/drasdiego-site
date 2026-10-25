import type { Lang } from '@/types';
import { MAX_HISTORY_ITEM_CHARS, MAX_QUESTION_CHARS, answer, interruptedNote } from '@/lib/assistant-kb';
import { DIEGO_CONTEXT } from '@/lib/public-context';
import { careerTimeBlock } from '@/lib/career-time';
import { isAllowedOrigin, readBodyLimited, takeToken } from '@/lib/api-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const DEFAULT_MODELS = ['gemini-3.6-flash', 'gemini-3.1-flash-lite'];

function chatModels(): string[] {
  const parsed = (process.env.GEMINI_CHAT_MODELS ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter((name) => /^[a-z0-9][a-z0-9._-]*$/i.test(name));
  const unique = [...new Set(parsed)].slice(0, 3);
  return unique.length > 0 ? unique : DEFAULT_MODELS;
}

const CLAUDE_DEFAULT_MODEL = 'claude-haiku-5-5';

function claudeModel(): string {
  const name = (process.env.CLAUDE_CHAT_MODEL ?? '').trim();
  return /^[a-z0-9][a-z0-9._-]*$/i.test(name) ? name : CLAUDE_DEFAULT_MODEL;
}

type Provider = 'claude' | 'gemini';

interface Candidate {
  provider: Provider;
  model: string;
}

const NORMAL_FINISH = new Set(['STOP', 'end_turn', 'stop_sequence']);

const MAX_HISTORY = 8;
const MAX_BODY_CHARS = 64_000;
const MAX_BODY_BYTES = 192_000;
const MAX_OUTPUT_TOKENS = 1500;
const FIRST_TOKEN_TIMEOUT_MS = 8_000;
const TOTAL_TIMEOUT_MS = 28_000;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

interface HistoryItem {
  role: 'user' | 'bot';
  text: string;
}

/* The system prompt now also carries the knowledge base and the most relevant
   local answer for the current question, so the conversation turns themselves
   stay as the natural user/model dialogue (which gives the model memory). */
function systemPrompt(lang: Lang, local: string, now: Date): string {
  const base =
    lang === 'en'
      ? [
          'You are the official digital representation of Diego Arruda, acting as his personal portfolio assistant.',
          'Speak as a warm, professional and concise representative of Diego (not a generic chatbot).',
          'Use EXCLUSIVELY the facts in the provided knowledge base. Always prioritize portfolio information.',
          'Never invent facts, dates, employers, technologies or numbers that are not in the knowledge base.',
          'Use the conversation history to understand follow-up questions and pronouns.',
          'Answer in English. Be complete and natural; use 1 to 3 short paragraphs when the question deserves it, but stay concise for simple questions. Never pad with filler.',
          'STYLE RULES (mandatory): never use em-dashes or en-dashes. Use a period, comma or colon instead. Never use the "it\'s not about X, it\'s about Y" formula or any variation; when contrasting, explain the actual reasoning. Avoid AI-filler words like "genuinely", "honestly", "truly". Avoid AI jargon like "dive deep", "unlock", "unleash potential", "take to the next level", "at the end of the day".',
          "If the question is outside Diego's professional scope, gently redirect to his LinkedIn (linkedin.com/in/drasdiego).",
        ]
      : [
          'Você é a representação digital oficial de Diego Arruda, atuando como o assistente pessoal do portfólio dele.',
          'Fale como um representante caloroso, profissional e objetivo do Diego (não como um chatbot genérico).',
          'Use EXCLUSIVAMENTE os fatos da base de conhecimento fornecida. Priorize sempre as informações do portfólio.',
          'Nunca invente fatos, datas, empresas, tecnologias ou números que não estejam na base de conhecimento.',
          'Use o histórico da conversa para entender perguntas de acompanhamento e pronomes.',
          'Responda em português. Seja completo e natural; use de 1 a 3 parágrafos curtos quando a pergunta merecer, mas seja objetivo em perguntas simples. Nunca encha de enrolação.',
          'REGRAS DE ESTILO (obrigatórias): nunca use travessão ou meia-risca, use ponto, vírgula ou dois-pontos no lugar. Nunca use a fórmula "não é sobre X, é sobre Y" nem qualquer variação; quando precisar contrastar, desenvolva a explicação com raciocínio tangível. Evite palavras filler de IA como "genuinamente", "honestamente", "verdadeiramente". Evite jargões de IA como "mergulhar", "desbloquear", "destravar potencial", "elevar ao próximo nível", "no fim do dia".',
          'Se a pergunta fugir do escopo profissional do Diego, redirecione gentilmente ao LinkedIn (linkedin.com/in/drasdiego).',
        ];

  return [
    base.join(' '),
    '',
    careerTimeBlock(now, lang),
    '',
    'BASE DE CONHECIMENTO (Diego Arruda):',
    DIEGO_CONTEXT,
    '',
    'RESPOSTA LOCAL MAIS RELEVANTE PARA A PERGUNTA ATUAL (priorize e enriqueça):',
    local,
  ].join('\n');
}

function textResponse(text: string, reason?: string): Response {
  if (reason && reason !== 'no_question') console.info('Portfolio chat local answer', { reason });
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
  const headers: Record<string, string> = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Assistant-Mode': 'fallback',
  };
  return new Response(stream, { headers });
}

function errorResponse(status: number, error: string): Response {
  return Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });
}

interface ParsedChunk {
  text: string;
  finish: string | null;
}

function parseClaudeChunk(payload: string): ParsedChunk {
  let json: { type?: string; delta?: { type?: string; text?: string; stop_reason?: string | null } };
  try {
    json = JSON.parse(payload);
  } catch {
    return { text: '', finish: null };
  }
  if (json?.type === 'error') throw new Error('upstream_event_error');
  if (json?.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
    return { text: json.delta.text ?? '', finish: null };
  }
  if (json?.type === 'message_delta') return { text: '', finish: json.delta?.stop_reason ?? null };
  return { text: '', finish: null };
}

function parseGeminiChunk(payload: string): ParsedChunk {
  let json: {
    error?: unknown;
    candidates?: { finishReason?: string; content?: { parts?: { text?: string }[] } }[];
  };
  try {
    json = JSON.parse(payload);
  } catch {
    return { text: '', finish: null };
  }
  if (json?.error) throw new Error('upstream_event_error');
  const candidate = json?.candidates?.[0];
  const parts = candidate?.content?.parts ?? [];
  return { text: parts.map((p) => p.text ?? '').join(''), finish: candidate?.finishReason ?? null };
}

type OpenResult =
  | { ok: true; model: string; first: string; nextText: () => Promise<string | null>; finish: () => string | null }
  | { ok: false; reason: string; final?: boolean };

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return errorResponse(403, 'origin_not_allowed');
  }
  if (!(req.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return errorResponse(415, 'unsupported_media_type');
  }

  let question = '';
  let lang: Lang = 'pt';
  let history: HistoryItem[] = [];
  try {
    const raw = await readBodyLimited(req, MAX_BODY_BYTES);
    if (raw === null || raw.length > MAX_BODY_CHARS) {
      return errorResponse(413, 'payload_too_large');
    }
    const body = JSON.parse(raw);
    question = (typeof body?.question === 'string' ? body.question : '').slice(0, MAX_QUESTION_CHARS).trim();
    lang = body?.lang === 'en' ? 'en' : 'pt';
    if (Array.isArray(body?.history)) {
      history = body.history
        .filter((h: unknown): h is HistoryItem => {
          const item = h as HistoryItem;
          return !!item && (item.role === 'user' || item.role === 'bot') && typeof item.text === 'string';
        })
        .slice(-MAX_HISTORY);
      while (history.length > 0 && history[0].role === 'bot') history.shift();
    }
  } catch {
    /* ignore malformed body */
  }

  const local = answer(question, lang);
  const geminiKey = process.env.GEMINI_API_KEY;
  const claudeKey = process.env.ANTHROPIC_API_KEY;
  const noKey = !geminiKey && !claudeKey;

  if (noKey || !question) {
    return textResponse(local, noKey ? 'no_key' : 'no_question');
  }

  if (!takeToken('chat', req, RATE_LIMIT, RATE_WINDOW_MS)) {
    return textResponse(local, 'rate_limited');
  }

  const system = systemPrompt(lang, local, new Date());

  const geminiBody = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: [
      ...history.map((h) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text.slice(0, MAX_HISTORY_ITEM_CHARS) }],
      })),
      { role: 'user', parts: [{ text: question }] },
    ],
    generationConfig: { temperature: 0.55, topP: 0.9, maxOutputTokens: MAX_OUTPUT_TOKENS },
  });

  const claudeBody = JSON.stringify({
    model: claudeModel(),
    max_tokens: MAX_OUTPUT_TOKENS,
    stream: true,
    thinking: { type: 'disabled' },
    output_config: { effort: 'low' },
    system,
    messages: [
      ...history.map((h) => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.text.slice(0, MAX_HISTORY_ITEM_CHARS),
      })),
      { role: 'user', content: question },
    ],
  });

  let current = new AbortController();
  let timedOut = false;
  const totalTimer = setTimeout(() => {
    timedOut = true;
    current.abort();
  }, TOTAL_TIMEOUT_MS);
  const onClientAbort = () => current.abort();
  req.signal.addEventListener('abort', onClientAbort, { once: true });
  const cleanup = () => {
    clearTimeout(totalTimer);
    req.signal.removeEventListener('abort', onClientAbort);
  };

  const open = async ({ provider, model }: Candidate): Promise<OpenResult> => {
    const attempt = new AbortController();
    current = attempt;
    if (req.signal.aborted) attempt.abort();
    let attemptTimedOut = false;
    const firstTokenTimer = setTimeout(() => {
      attemptTimedOut = true;
      attempt.abort();
    }, FIRST_TOKEN_TIMEOUT_MS);

    try {
      const res =
        provider === 'claude'
          ? await fetch('https://api.anthropic.com/v1/messages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': claudeKey ?? '',
                'anthropic-version': '2023-06-01',
              },
              body: claudeBody,
              cache: 'no-store',
              signal: attempt.signal,
            })
          : await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey ?? '' },
              body: geminiBody,
              cache: 'no-store',
              signal: attempt.signal,
            });

      if (!res.ok || !res.body) {
        clearTimeout(firstTokenTimer);
        console.warn('Portfolio chat model failed', { reason: 'upstream_status', status: res.status, provider, model });
        res.body?.cancel().catch(() => undefined);
        return { ok: false, reason: 'upstream_status', final: provider === 'gemini' && [400, 401, 403].includes(res.status) };
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finish: string | null = null;

      const nextText = async (): Promise<string | null> => {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) return null;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          let text = '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === '[DONE]') continue;
            const chunk = provider === 'claude' ? parseClaudeChunk(payload) : parseGeminiChunk(payload);
            text += chunk.text;
            if (chunk.finish) finish = chunk.finish;
          }
          if (text) return text;
        }
      };

      let first: string | null = null;
      try {
        first = await nextText();
      } catch {
        first = null;
      }
      clearTimeout(firstTokenTimer);

      if (first === null) {
        attempt.abort();
        const reason = attemptTimedOut || timedOut ? 'upstream_timeout' : 'upstream_empty';
        if (!req.signal.aborted) console.warn('Portfolio chat model failed', { reason, provider, model });
        return { ok: false, reason };
      }

      return { ok: true, model, first, nextText, finish: () => finish };
    } catch {
      clearTimeout(firstTokenTimer);
      const reason = attemptTimedOut || timedOut ? 'upstream_timeout' : 'upstream_error';
      if (!req.signal.aborted) console.warn('Portfolio chat model failed', { reason, provider, model });
      return { ok: false, reason };
    }
  };

  let opened: Extract<OpenResult, { ok: true }> | null = null;
  let lastReason = 'upstream_error';
  const candidates: Candidate[] = [
    ...(claudeKey ? [{ provider: 'claude' as const, model: claudeModel() }] : []),
    ...(geminiKey ? chatModels().map((model) => ({ provider: 'gemini' as const, model })) : []),
  ];
  for (const candidate of candidates) {
    if (req.signal.aborted || timedOut) break;
    const result = await open(candidate);
    if (result.ok) {
      opened = result;
      break;
    }
    lastReason = result.reason;
    if (result.final) break;
  }

  if (!opened) {
    cleanup();
    return textResponse(local, timedOut ? 'upstream_timeout' : lastReason);
  }

  const { first, nextText, finish, model: usedModel } = opened;
  const encoder = new TextEncoder();
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(first));
        for (;;) {
          const text = await nextText();
          if (text === null) break;
          controller.enqueue(encoder.encode(text));
        }
        const finishReason = finish();
        if (finishReason && !NORMAL_FINISH.has(finishReason) && !cancelled) {
          console.warn('Portfolio chat interrupted', { reason: 'finish_reason', finish: finishReason, model: usedModel });
          controller.enqueue(encoder.encode(interruptedNote(lang)));
        }
      } catch {
        if (!req.signal.aborted && !cancelled) {
          console.warn('Portfolio chat interrupted', { reason: timedOut ? 'upstream_timeout' : 'upstream_error', model: usedModel });
          try {
            controller.enqueue(encoder.encode(interruptedNote(lang)));
          } catch {
            cleanup();
          }
        }
      } finally {
        cleanup();
        try {
          controller.close();
        } catch {
          cleanup();
        }
      }
    },
    cancel() {
      cancelled = true;
      current.abort();
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Assistant-Mode': 'hybrid',
    },
  });
}

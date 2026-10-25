import type { Lang } from '@/types';

/* ============================================================
   ASSISTANT KNOWLEDGE BASE
   Keyword-matched canned answers about Diego's career. Runs fully
   client-side (no API key). To wire a real LLM (e.g. Gemini), replace
   `answer()` with a fetch to your /api route, the UI stays the same.
   ============================================================ */

export interface KBEntry { k: string[]; a: string }

const KB: Record<Lang, KBEntry[]> = {
  pt: [
    { k: ["station"], a: "Na RD Station, Diego foi Analista de Suporte Financeiro de fevereiro a dezembro de 2024. Analisou dados financeiros e operacionais, padrões, inconsistências e recorrências; desenvolveu e acompanhou dashboards e indicadores. Participou de squads com finanças, operações e tecnologia para melhorar fluxos e rastreabilidade." },
    { k: ["isaac"], a: "No isaac, Diego foi Analista de Operações em contrato temporário de julho de 2023 a fevereiro de 2024. Coletou e organizou dados, produziu relatórios e acompanhou SLAs e KPIs. Identificou gargalos e recorrências e deu suporte analítico às rotinas financeiras e operacionais." },
    { k: ['onde', 'trabalha', 'atual', 'nubank', 'hoje', 'emprego'], a: "Atualmente o Diego é Analista de Ouvidoria (Ombudsman Analyst) no Nubank, desde dezembro de 2024. Acompanha manifestações públicas e canais regulatórios, investiga causas raiz com outras áreas e produz análises e relatórios com indicadores e feedbacks de clientes. O foco é resolução, rastreabilidade, conformidade e melhoria de processos." },
    { k: ['dados', 'data', 'analytics', 'sql', 'postgresql', 'analise'], a: "A experiência com dados inclui SQL, Excel e Google Sheets na MadeiraMadeira, com dashboards e acompanhamento de backlog, SLA, FCR, resolutividade e TMA. Na RD Station, desenvolveu e acompanhou dashboards e indicadores financeiros e operacionais; no isaac, consolidou dados, relatórios, SLAs e KPIs. Python, PostgreSQL, Power BI, Metabase e Looker também fazem parte de sua formação e ferramentas de estudo, sem atribuir seu uso a todos esses cargos." },
    { k: ['ia', 'inteligencia', 'artificial', 'gemini', 'machine', 'llm', 'bot'], a: 'Em IA, o Diego trabalha com IA generativa e construiu o assistente com voz deste site, um app em Next.js com a API do Gemini. É, inclusive, o que está respondendo você agora. O foco dele é IA aplicada a problemas reais de negócio e automação.' },
    { k: ['tecnologia', 'stack', 'ferramenta', 'linguagem', 'domina', 'skill', 'habilidade'], a: "Stack principal: Next.js, React, TypeScript e integração ao Gemini no assistente deste site. Na experiência operacional, SQL, Excel e Google Sheets estão ligados à MadeiraMadeira. Python, PostgreSQL, Power BI, Metabase e Looker integram sua formação e repertório técnico; isso não implica domínio avançado ou uso em todos os cargos. As plataformas operacionais incluem Salesforce, Zendesk e Five9." },
    { k: ['projeto', 'portfolio', 'construiu', 'projetos'], a: "O assistente com voz deste site é um projeto pessoal de Engenharia de Software com IA, construído com Next.js e a API do Gemini. O currículo também registra a interface pessoal Suporte Interativo CSS, em HTML e CSS. Dashboards e relatórios fazem parte da experiência profissional, sem demonstrações públicas ou resultados quantitativos confirmados nesta base." },
    { k: ['experiencia', 'carreira', 'trajetoria', 'anos', 'tempo'], a: 'São mais de 18 anos de carreira, começando aos 16, passando por saúde, logística, marketplace, SaaS e fintech. A trajetória passou de operações e qualidade para liderança e análise de dados. Hoje, seu foco de desenvolvimento é Engenharia de Software, com dados e IA como capacidades complementares.' },
    { k: ['formacao', 'faculdade', 'estudo', 'curso', 'mba', 'engenharia', 'academico'], a: "Formação: Tecnólogo em Processos Gerenciais pela Estácio (concluído em 2025), Bacharelado em Engenharia de Software pela Uninter em andamento e MBA em Data Science, Inteligência Artificial e Analytics na USP/ESALQ, em andamento desde outubro de 2026. A data de início da graduação em Engenharia de Software não está informada. Também possui formações complementares em dados e tecnologia." },
    { k: ['certificacao', 'certificado', 'scrum'], a: 'Certificações: Ouvidoria pela ABBC (2025/2029) e Scrum Foundation (SFPC) pela CertiProf (2024/2027), além de Liderança Lean pela Fundação Bradesco.' },
    { k: ['lideranca', 'gestao', 'equipe', 'time', 'madeiramadeira', 'madeira', 'iguanafix'], a: "O Diego liderou equipe remota como Supervisor de Operações na MadeiraMadeira, de junho de 2020 a outubro de 2022. Acompanhou performance, feedbacks, monitorias de qualidade e PDIs, além de dashboards e indicadores como backlog, SLA, FCR, resolutividade e TMA. Participou de Madeira Decora e Iguanafix, apoiando melhorias nos fluxos operacionais." },
    { k: ['contato', 'falar', 'linkedin', 'github', 'whatsapp', 'contratar', 'oportunidade'], a: 'Para conversas, oportunidades ou parcerias: LinkedIn /in/drasdiego, WhatsApp (47) 99171-0813, GitHub @drasdiego. Seu foco é Engenharia de Software, com interesse também em oportunidades que envolvam dados e IA.' },
  ],
  en: [
    { k: ["station"], a: "At RD Station, Diego was a Financial Support Analyst from February to December 2024. He analyzed financial and operational data, patterns, inconsistencies and recurring issues, and developed and tracked dashboards and metrics. He worked with finance, operations and technology squads to improve workflows and traceability." },
    { k: ["isaac"], a: "At isaac, Diego was a temporary Operations Analyst from July 2023 to February 2024. He collected and organized data, produced reports and tracked SLAs and KPIs. He identified bottlenecks and recurring issues and provided analytical support for financial and operational routines." },
    { k: ['where', 'work', 'current', 'nubank', 'today', 'job'], a: "Diego is currently an Ombudsman Analyst at Nubank, since December 2024. He handles complaints on public platforms and regulatory channels, investigates root causes with other teams, and produces analyses and reports using metrics and customer feedback. His work focuses on resolution, traceability, compliance and process improvement." },
    { k: ['data', 'analytics', 'sql', 'postgresql', 'analysis'], a: "Diego's data experience includes SQL, Excel and Google Sheets at MadeiraMadeira, with dashboards and monitoring of backlog, SLA, FCR, resolution rates and AHT. At RD Station, he developed and tracked financial and operational dashboards and metrics; at isaac, he consolidated data, reports, SLAs and KPIs. Python, PostgreSQL, Power BI, Metabase and Looker are also part of his studies and technical toolkit, without implying their use in every role." },
    { k: ['ai', 'artificial', 'intelligence', 'gemini', 'machine', 'llm', 'bot'], a: "In AI, Diego works with generative AI and built the voice assistant on this site, a Next.js app using the Gemini API, which is actually what's answering you now. His focus is AI applied to real business problems and automation." },
    { k: ['tech', 'stack', 'tool', 'language', 'skill'], a: "Core stack: Next.js, React, TypeScript and Gemini integration in the assistant on this site. SQL, Excel and Google Sheets are specifically associated with his operational experience at MadeiraMadeira. Python, PostgreSQL, Power BI, Metabase and Looker are part of his studies and technical toolkit, without implying advanced proficiency or use in every role. Operational platforms include Salesforce, Zendesk and Five9." },
    { k: ['project', 'portfolio', 'built'], a: "The voice assistant on this site is a personal software engineering project using AI, built with Next.js and the Gemini API. His CV also lists Interactive CSS Support, a personal HTML and CSS interface. Dashboards and reports belong to his professional experience; this knowledge base does not include public demos or verified quantitative results for them." },
    { k: ['experience', 'career', 'journey', 'years'], a: '18+ years of career, starting at 16, across healthcare, logistics, marketplace, SaaS and fintech. His path moved from operations and quality into leadership and data analysis. His current development focus is software engineering, supported by data and AI.' },
    { k: ['education', 'college', 'study', 'course', 'mba', 'engineering', 'academic'], a: "Education: Management Processes degree at Estácio (completed 2025), Software Engineering bachelor’s degree at Uninter in progress, and an MBA in Data Science, Artificial Intelligence & Analytics at USP/ESALQ, in progress since October 2026. The start date of his Software Engineering degree is not specified. He also has complementary courses in data and technology." },
    { k: ['certification', 'certificate', 'scrum', 'credential'], a: 'Certifications: Ombudsman by ABBC (2025/2029) and Scrum Foundation (SFPC) by CertiProf (2024/2027), plus Lean Leadership by Fundação Bradesco.' },
    { k: ['leadership', 'manage', 'team', 'madeiramadeira', 'madeira', 'iguanafix'], a: "Diego led a remote team as an Operations Supervisor at MadeiraMadeira, from June 2020 to October 2022. His responsibilities included performance monitoring, feedback, quality reviews and individual development plans, as well as dashboards and metrics such as backlog, SLA, FCR, resolution rates and AHT. He contributed to Madeira Decora and Iguanafix, supporting operational workflow improvements." },
    { k: ['contact', 'reach', 'linkedin', 'github', 'whatsapp', 'hire', 'opportunity'], a: 'For conversations, opportunities or partnerships: LinkedIn /in/drasdiego, WhatsApp +55 47 99171-0813, GitHub @drasdiego. His focus is software engineering, with an interest in opportunities that also involve data and AI.' },
  ],
};

/** Local keyword-matched answer, always available, no network needed. */
export function answer(q: string, lang: Lang): string {
  const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = normalize(q).match(/[a-z0-9]+/g) ?? [];
  const kb = KB[lang] || KB.pt;
  let best: KBEntry | null = null;
  let bestScore = 0;
  for (const entry of kb) {
    let score = 0;
    for (const kw of entry.k) {
      const keyword = normalize(kw);
      if (words.some((word) => keyword.length <= 3 ? word === keyword : word.startsWith(keyword))) {
        score += keyword.length;
      }
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  if (best && bestScore > 0) return best.a;
  return lang === 'en'
    ? "I'm focused on Diego's professional journey, try asking about his data experience, current role, technologies, projects or education. For anything else, reach him on LinkedIn: /in/drasdiego."
    : 'Fui feito para falar sobre a trajetória profissional do Diego, pergunte sobre experiência com dados, cargo atual, tecnologias, projetos ou formação. Para outros assuntos, fale com ele no LinkedIn: /in/drasdiego.';
}

const INTERRUPTED_NOTES = [
  '\n\n(A resposta foi interrompida. Pergunte de novo para receber o restante.)',
  '\n\n(The answer was interrupted. Ask again to get the rest.)',
];

export function interruptedNote(lang: Lang): string {
  return lang === 'en' ? INTERRUPTED_NOTES[1] : INTERRUPTED_NOTES[0];
}

export function stripInterruptedNote(text: string): string {
  for (const note of INTERRUPTED_NOTES) {
    if (text.endsWith(note)) return text.slice(0, -note.length);
  }
  return text;
}

export const MAX_QUESTION_CHARS = 800;
export const MAX_HISTORY_ITEM_CHARS = 3000;

export interface ChatTurn {
  role: 'user' | 'bot';
  text: string;
}

/** Streamed hybrid answer: asks the /api/chat route (local KB + Gemini) and
    reports the text as it arrives via `onToken`. Sends recent history so the
    assistant understands follow-up questions. Falls back to the local answer
    if the network fails. Resolves with the complete text. */
export async function streamAssistant(
  question: string,
  lang: Lang,
  history: ChatTurn[],
  onToken: (soFar: string) => void,
  signal?: AbortSignal,
  onMode?: (mode: string | null) => void,
): Promise<string> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, { once: true });
  const timeout = setTimeout(abort, 30_000);
  let full = '';
  const finish = (): string => {
    const text = full.trim();
    if (text) return text;
    if (!signal?.aborted) onMode?.('fallback');
    return answer(question, lang);
  };
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lang, history }),
      signal: controller.signal,
    });
    if (!res.ok || !res.body) {
      onMode?.('fallback');
      return answer(question, lang);
    }
    onMode?.(res.headers.get('X-Assistant-Mode'));

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      full += decoder.decode(value, { stream: true });
      onToken(full);
    }
    full += decoder.decode();
    return finish();
  } catch {
    return finish();
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}

/* ============================================================
   STREAMING TEXT-TO-SPEECH (Web Audio API)
   The /api/tts route streams raw PCM (24 kHz, 16-bit, mono) as the Gemini
   model generates it. We decode those bytes into small AudioBuffers and
   schedule them back to back on a single AudioContext timeline. The result:
   audio starts as soon as the first bytes arrive (fast), with one continuous
   voice and no gaps (a single synthesis, played gaplessly).
   ============================================================ */

const PCM_SAMPLE_RATE = 24000;

let sharedCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedCtx) sharedCtx = new Ctor();
  return sharedCtx;
}

/** Create/resume the AudioContext from a user gesture so later programmatic
    playback (e.g. the spoken answer in voice mode) is allowed by the browser. */
export function primeAudio(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
}

export interface SpeechController {
  stop: () => void;
}

export interface SpeechHandlers {
  onPlaying?: () => void;
  onEnded?: () => void;
  onError?: () => void;
}

/** Stream and play the spoken answer. Returns a controller to stop playback.
    Falls back via `onError` when audio is unavailable (no key, no Web Audio). */
export function streamSpeech(text: string, lang: Lang, handlers: SpeechHandlers): SpeechController {
  let aborted = false;
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  const sources: AudioBufferSourceNode[] = [];

  const stop = () => {
    aborted = true;
    try {
      reader?.cancel().catch(() => {});
    } catch {
      /* ignore */
    }
    for (const s of sources) {
      try {
        s.onended = null;
        s.stop();
      } catch {
        /* already stopped */
      }
    }
  };

  (async () => {
    const ctx = getAudioContext();
    if (!ctx) {
      handlers.onError?.();
      return;
    }
    try {
      if (ctx.state === 'suspended') await ctx.resume();
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      });
      if (!res.ok || !res.body) {
        handlers.onError?.();
        return;
      }

      reader = res.body.getReader();
      let nextTime = ctx.currentTime + 0.1;
      let leftover = new Uint8Array(0);
      let started = false;
      let lastSource: AudioBufferSourceNode | null = null;

      for (;;) {
        const { done, value } = await reader.read();
        if (done || aborted) break;
        if (!value || value.length === 0) continue;

        // Carry over any odd trailing byte (samples are 2 bytes each).
        let bytes: Uint8Array;
        if (leftover.length) {
          bytes = new Uint8Array(leftover.length + value.length);
          bytes.set(leftover, 0);
          bytes.set(value, leftover.length);
        } else {
          bytes = value;
        }
        const usable = bytes.length - (bytes.length % 2);
        leftover = usable < bytes.length ? bytes.slice(usable) : new Uint8Array(0);
        if (usable <= 0) continue;

        const sampleCount = usable / 2;
        const view = new DataView(bytes.buffer, bytes.byteOffset, usable);
        const audioBuffer = ctx.createBuffer(1, sampleCount, PCM_SAMPLE_RATE);
        const channel = audioBuffer.getChannelData(0);
        for (let i = 0; i < sampleCount; i++) {
          channel[i] = view.getInt16(i * 2, true) / 32768;
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        const startAt = Math.max(nextTime, ctx.currentTime + 0.02);
        source.start(startAt);
        nextTime = startAt + audioBuffer.duration;
        sources.push(source);
        lastSource = source;

        if (!started) {
          started = true;
          handlers.onPlaying?.();
        }
      }

      if (aborted) return;
      if (!started) {
        handlers.onError?.();
        return;
      }
      if (lastSource) {
        lastSource.onended = () => {
          if (!aborted) handlers.onEnded?.();
        };
      } else {
        handlers.onEnded?.();
      }
    } catch {
      if (!aborted) handlers.onError?.();
    }
  })();

  return { stop };
}

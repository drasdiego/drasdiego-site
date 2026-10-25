import { NextResponse } from 'next/server';
import type { Lang } from '@/types';
import { isAllowedOrigin, readBodyLimited, takeToken } from '@/lib/api-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODEL = 'gemini-2.5-flash-preview-tts';

/* Prebuilt Gemini voice. Smooth, masculine and natural, works for PT and EN.
   The TTS model infers the spoken language from the text itself.
   Easy alternatives to swap here: 'Charon' (deeper), 'Achird' (friendly),
   'Orus' (firmer), 'Enceladus' (softer). */
const VOICE = 'Algieba';

const MAX_CHARS = 2000;
const MAX_BODY_BYTES = 64_000;
const FIRST_AUDIO_TIMEOUT_MS = 15_000;
const TOTAL_TIMEOUT_MS = 45_000;
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/* Style direction prepended to the text. This is the Gemini TTS mechanism
   to control tone: the leading instruction guides delivery and is not spoken,
   only the text after the colon is read aloud. Keeps the voice humanized. */
function styleDirection(lang: Lang): string {
  return lang === 'en'
    ? 'Read the following in a natural, warm and conversational tone, like a real person speaking, never robotic: '
    : 'Leia o texto a seguir em tom natural, caloroso e conversacional, como uma pessoa real falando, nunca robótico: ';
}

function clip(text: string): string {
  if (text.length <= MAX_CHARS) return text;
  const cut = text.slice(0, MAX_CHARS);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '), cut.lastIndexOf('\n'));
  return end > MAX_CHARS * 0.5 ? cut.slice(0, end + 1) : cut;
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: 'origin_not_allowed' }, { status: 403 });
  }

  let text = '';
  let lang: Lang = 'pt';
  try {
    const raw = await readBodyLimited(req, MAX_BODY_BYTES);
    if (raw === null) {
      return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
    }
    const body = JSON.parse(raw);
    text = clip(String(body?.text ?? '').trim());
    lang = body?.lang === 'en' ? 'en' : 'pt';
  } catch {
    /* ignore malformed body */
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !text) {
    return new NextResponse(null, { status: 204 });
  }

  if (!takeToken('tts', req, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const upstream = new AbortController();
  let timedOut = false;
  const abortWithTimeout = () => {
    timedOut = true;
    upstream.abort();
  };
  const totalTimer = setTimeout(abortWithTimeout, TOTAL_TIMEOUT_MS);
  let firstAudioTimer: ReturnType<typeof setTimeout> | null = setTimeout(abortWithTimeout, FIRST_AUDIO_TIMEOUT_MS);
  const onClientAbort = () => upstream.abort();
  req.signal.addEventListener('abort', onClientAbort, { once: true });
  if (req.signal.aborted) upstream.abort();
  const cleanup = () => {
    clearTimeout(totalTimer);
    if (firstAudioTimer) clearTimeout(firstAudioTimer);
    req.signal.removeEventListener('abort', onClientAbort);
  };

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: styleDirection(lang) + text }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } },
          },
        },
      }),
      cache: 'no-store',
      signal: upstream.signal,
    });

    if (!res.ok || !res.body) {
      console.warn('Portfolio tts failed', { reason: 'upstream_status', status: res.status, model: MODEL });
      res.body?.cancel().catch(() => undefined);
      cleanup();
      return NextResponse.json({ error: 'tts_failed' }, { status: 502 });
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let sentAudio = false;

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const payload = trimmed.slice(5).trim();
              if (!payload || payload === '[DONE]') continue;
              try {
                const json = JSON.parse(payload);
                const parts: { inlineData?: { data?: string } }[] =
                  json?.candidates?.[0]?.content?.parts ?? [];
                for (const part of parts) {
                  const b64 = part?.inlineData?.data;
                  if (b64) {
                    if (!sentAudio) {
                      sentAudio = true;
                      if (firstAudioTimer) {
                        clearTimeout(firstAudioTimer);
                        firstAudioTimer = null;
                      }
                    }
                    controller.enqueue(new Uint8Array(Buffer.from(b64, 'base64')));
                  }
                }
              } catch {
                /* ignore partial / non-JSON lines */
              }
            }
          }
        } catch {
          if (!sentAudio) {
            console.warn('Portfolio tts failed', { reason: timedOut ? 'upstream_timeout' : 'upstream_error', model: MODEL });
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
        upstream.abort();
        cleanup();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'audio/pcm',
        'Cache-Control': 'no-store',
        'X-Sample-Rate': '24000',
      },
    });
  } catch {
    console.warn('Portfolio tts failed', { reason: timedOut ? 'upstream_timeout' : 'upstream_error', model: MODEL });
    cleanup();
    return NextResponse.json({ error: 'tts_error' }, { status: 502 });
  }
}

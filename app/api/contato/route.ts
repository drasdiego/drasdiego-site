import { isAllowedOrigin, readBodyLimited, takeToken } from '@/lib/api-guard';
import { normalizeContact, validateContact } from '@/lib/contato';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const DAILY_LIMIT = 10;
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;
const WEBHOOK_TIMEOUT_MS = 10_000;

const HEADERS = { 'Cache-Control': 'no-store' };

function reply(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status, headers: HEADERS });
}

function webhookConfig(): { url: string; secret: string } | null {
  const url = (process.env.CONTACT_WEBHOOK_URL ?? '').trim();
  const secret = (process.env.CONTACT_WEBHOOK_SECRET ?? '').trim();
  if (!url || !secret) return null;
  try {
    const parsed = new URL(url);
    const local = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && local)) return null;
  } catch {
    return null;
  }
  return { url, secret };
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) return reply(403, { error: 'origin_not_allowed' });
  if (!(req.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) {
    return reply(415, { error: 'unsupported_media_type' });
  }
  if (!takeToken('contato', req, RATE_LIMIT, RATE_WINDOW_MS) || !takeToken('contato-dia', req, DAILY_LIMIT, DAILY_WINDOW_MS)) {
    return reply(429, { error: 'rate_limited' });
  }

  const raw = await readBodyLimited(req, MAX_BODY_BYTES).catch(() => null);
  if (raw === null) return reply(413, { error: 'payload_too_large' });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reply(400, { error: 'invalid_json' });
    body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { error: 'invalid_json' });
  }

  if (typeof body.website === 'string' && body.website.trim() !== '') return reply(200, { ok: true });

  const input = normalizeContact(body);
  const fields = validateContact(input);
  if (Object.keys(fields).length > 0) return reply(400, { error: 'invalid_fields', fields });

  const config = webhookConfig();
  if (!config) return reply(503, { error: 'not_configured' });

  const idioma = body.idioma === 'en' ? 'en' : 'pt';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  let delivered = false;
  let reason = 'upstream_error';
  try {
    const res = await fetch(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: config.secret, ...input, idioma, origem: 'site' }),
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal,
    });
    if (res.ok) {
      const data: unknown = await res.json().catch(() => null);
      delivered = !!data && typeof data === 'object' && (data as { ok?: unknown }).ok === true;
      if (!delivered) reason = 'upstream_not_ok';
    } else {
      reason = 'upstream_status';
      await res.body?.cancel().catch(() => undefined);
    }
  } catch {
    reason = controller.signal.aborted ? 'upstream_timeout' : 'upstream_error';
  } finally {
    clearTimeout(timer);
  }

  if (!delivered) {
    console.warn('Contact form forward failed', { reason });
    return reply(502, { error: 'upstream_failed' });
  }
  return reply(200, { ok: true });
}

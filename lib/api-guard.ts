const ALLOWED_HOSTS = new Set([
  'www.drasdiego.com.br',
  'drasdiego.com.br',
  'www.drasdiego.com',
  'drasdiego.com',
]);

const buckets = new Map<string, number[]>();
const MAX_BUCKETS = 2000;

function deploymentHosts(): string[] {
  return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL].filter(
    (host): host is string => !!host,
  );
}

export function isAllowedOrigin(req: Request): boolean {
  const raw = req.headers.get('origin') ?? req.headers.get('referer');
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol === 'https:' && ALLOWED_HOSTS.has(url.hostname)) return true;
  if (url.protocol === 'https:' && deploymentHosts().includes(url.host)) return true;
  if (process.env.NODE_ENV !== 'production' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
    return true;
  }
  return false;
}

export function normalizeIp(ip: string): string {
  const value = ip.trim().replace(/^\[|\]$/g, '').replace(/%.*$/, '');
  if (!value.includes(':')) return value;
  const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return mapped[1];
  const [head, tail = ''] = value.split('::');
  const headParts = head ? head.split(':') : [];
  const tailParts = tail ? tail.split(':') : [];
  const missing = value.includes('::') ? Math.max(8 - headParts.length - tailParts.length, 0) : 0;
  const full = [...headParts, ...Array<string>(missing).fill('0'), ...tailParts];
  return full
    .slice(0, 4)
    .map((part) => part.toLowerCase().replace(/^0+(?=.)/, ''))
    .join(':');
}

export function clientKey(req: Request): string {
  const real = req.headers.get('x-real-ip');
  if (real) return normalizeIp(real);
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return normalizeIp(forwarded.split(',')[0]);
  return 'unknown';
}

export function takeToken(scope: string, req: Request, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const key = `${scope}:${clientKey(req)}`;
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  buckets.delete(key);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  while (buckets.size > MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (oldest === undefined) break;
    buckets.delete(oldest);
  }
  return true;
}

export async function readBodyLimited(req: Request, maxBytes: number): Promise<string | null> {
  if (!req.body) return '';
  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

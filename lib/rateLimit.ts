/**
 * Best-effort in-memory sliding-window rate limiter (per server instance).
 * Serverless instances don't share memory, so pair this with Vercel Firewall
 * rate limiting in production (see README).
 */
const WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 10, now = Date.now()): { ok: boolean; retryAfterSec: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfterSec: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, ts] of hits) if (ts.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { ok: true, retryAfterSec: 0 };
}

/** Client IP from Vercel's proxy headers. */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

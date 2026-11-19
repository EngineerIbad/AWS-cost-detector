/**
 * Best-effort in-memory sliding-window rate limiter (per server instance).
 * Serverless instances don't share memory, so pair this with a Vercel Firewall
 * rate-limit rule in production (see README). No IPs are logged or persisted.
 */
export interface RateRule {
  limit: number;
  windowMs: number;
}

/** 10 analyses per minute and 60 per hour, per IP. */
export const ANALYZE_LIMITS: RateRule[] = [
  { limit: 10, windowMs: 60_000 },
  { limit: 60, windowMs: 60 * 60_000 },
];

const MAX_WINDOW_MS = Math.max(...ANALYZE_LIMITS.map((r) => r.windowMs));
const hits = new Map<string, number[]>();

/**
 * Records a hit for `key` only if every rule allows it. On refusal, returns the
 * longest wait until all rules would allow another request.
 */
export function rateLimit(
  key: string,
  rules: RateRule[] = ANALYZE_LIMITS,
  now = Date.now(),
): { ok: boolean; retryAfterSec: number; windowMs: number } {
  const keep = Math.max(MAX_WINDOW_MS, ...rules.map((r) => r.windowMs));
  const recent = (hits.get(key) ?? []).filter((t) => now - t < keep);

  let retryMs = 0;
  let windowMs = 0;
  for (const r of rules) {
    const inWindow = recent.filter((t) => now - t < r.windowMs);
    if (inWindow.length >= r.limit) {
      // Oldest hit that must expire before we're under the limit again.
      const wait = r.windowMs - (now - inWindow[inWindow.length - r.limit]);
      if (wait > retryMs) {
        retryMs = wait;
        windowMs = r.windowMs;
      }
    }
  }
  if (retryMs > 0) {
    hits.set(key, recent);
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil(retryMs / 1000)), windowMs };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, ts] of hits) if (ts.every((t) => now - t >= keep)) hits.delete(k);
  }
  return { ok: true, retryAfterSec: 0, windowMs: 0 };
}

/** Test helper. */
export function resetRateLimits(): void {
  hits.clear();
}

/** Client IP from Vercel's proxy headers. */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

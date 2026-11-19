/**
 * Pure URL hygiene checks. Results never include the suspicious value itself,
 * only where it was found, so tokens are not echoed back to the browser.
 */

export interface UrlHit {
  /** e.g. "path segment 3" or "?userId" */
  where: string;
  /** The literal found, for undefined/null/NaN checks only. */
  literal?: string;
}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

function parts(url: string): { segments: string[]; query: [string, string][] } | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const segments = u.pathname
    .split("/")
    .filter(Boolean)
    .map(safeDecode);
  const query: [string, string][] = u.search
    .replace(/^\?/, "")
    .split("&")
    .filter(Boolean)
    .map((p) => {
      const eq = p.indexOf("=");
      return [safeDecode(eq > -1 ? p.slice(0, eq) : p), eq > -1 ? safeDecode(p.slice(eq + 1)) : ""];
    });
  return { segments, query };
}

const MISSING_RE = /^(undefined|null|nan)$/i;

/** Path segments or query values that are literally "undefined", "null" or "NaN". */
export function findMissingValueLiterals(url: string): UrlHit[] {
  const p = parts(url);
  if (!p) return [];
  const hits: UrlHit[] = [];
  p.segments.forEach((s, i) => {
    if (MISSING_RE.test(s)) hits.push({ where: `path segment ${i + 1}`, literal: s });
  });
  for (const [k, v] of p.query) {
    if (MISSING_RE.test(v)) hits.push({ where: `?${k}`, literal: v });
    else if (MISSING_RE.test(k)) hits.push({ where: `query key "${k}"`, literal: k });
  }
  return hits;
}

const TOKEN_PARAM_NAMES = new Set([
  "token",
  "access_token",
  "accesstoken",
  "auth_token",
  "id_token",
  "refresh_token",
  "key",
  "api_key",
  "apikey",
  "api-key",
  "client_secret",
  "secret",
  "password",
]);

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HEX_RE = /^[0-9a-f]+$/i;
const JWT_RE = /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/;

function entropyPerChar(s: string): number {
  const freq = new Map<string, number>();
  for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);
  let h = 0;
  for (const n of freq.values()) {
    const p = n / s.length;
    h -= p * Math.log2(p);
  }
  return h;
}

/**
 * Long random-looking strings: JWTs, or 32+ chars of token alphabet mixing
 * letters and digits with high entropy. UUIDs and plain hex (hashes, IDs) are
 * treated as identifiers, not secrets, to avoid noisy false positives.
 */
export function looksLikeSecret(s: string): boolean {
  if (JWT_RE.test(s)) return true;
  if (s.length < 32 || s.length > 4096) return false;
  if (!/^[A-Za-z0-9_\-.~+/=]+$/.test(s)) return false;
  if (UUID_RE.test(s) || HEX_RE.test(s)) return false;
  if (!/[A-Za-z]/.test(s) || !/\d/.test(s)) return false;
  return entropyPerChar(s) >= 3.5;
}

/** Credentials in the URL: token-like param names, or long random-looking values. */
export function findTokensInUrl(url: string): UrlHit[] {
  const p = parts(url);
  if (!p) return [];
  const hits: UrlHit[] = [];
  for (const [k, v] of p.query) {
    if (!v) continue;
    if (TOKEN_PARAM_NAMES.has(k.toLowerCase()) || looksLikeSecret(v)) hits.push({ where: `?${k}` });
  }
  p.segments.forEach((s, i) => {
    if (looksLikeSecret(s)) hits.push({ where: `path segment ${i + 1}` });
  });
  return hits;
}

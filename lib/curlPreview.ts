/**
 * The confirmation line shown under the curl box before anything is sent:
 * "GET https://api.example.com/v1/items · 2 headers (Authorization: •••• hidden)".
 * Runs in the browser only. Sensitive header values and secret-looking query
 * values are always masked; this text is never sent anywhere.
 */
import { CurlParseError, parseCurl } from "./curl";
import { isSensitiveHeaderName } from "./redact";
import { looksLikeSecret } from "./urlChecks";

export const SUPPORTED_METHODS = ["GET", "POST", "PUT", "PATCH"];
const MASK = "••••";

export type CurlPreview =
  | { ok: true; method: string; url: string; headerCount: number; hidden: string[]; bodyBytes: number; methodSupported: boolean }
  | { ok: false; error: string };

/** URL with secret-looking query values masked: "?page=2&token=••••". */
export function maskUrl(url: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return url.slice(0, 120);
  }
  const params = [...u.searchParams.entries()].map(([k, v]) => {
    const secret = isSensitiveHeaderName(k) || looksLikeSecret(v);
    return `${k}=${secret ? MASK : v.length > 40 ? `${v.slice(0, 40)}…` : v}`;
  });
  const base = `${u.protocol}//${u.host}${u.pathname}`;
  const s = params.length ? `${base}?${params.join("&")}` : base;
  return s.length > 140 ? `${s.slice(0, 139)}…` : s;
}

export function previewCurl(text: string): CurlPreview | null {
  if (!text.trim()) return null;
  try {
    const p = parseCurl(text);
    const names = Object.keys(p.headers);
    return {
      ok: true,
      method: p.method,
      url: maskUrl(p.url),
      headerCount: names.length,
      hidden: names.filter(isSensitiveHeaderName),
      bodyBytes: p.body ? new TextEncoder().encode(p.body).length : 0,
      methodSupported: SUPPORTED_METHODS.includes(p.method),
    };
  } catch (e) {
    return { ok: false, error: e instanceof CurlParseError ? e.message : "We couldn't read that curl command." };
  }
}

/** "2 headers (Authorization: •••• hidden)" */
export function describeHeaders(count: number, hidden: string[]): string {
  if (count === 0) return "no headers";
  const base = `${count} header${count === 1 ? "" : "s"}`;
  return hidden.length ? `${base} (${hidden.map((h) => `${h}: ${MASK}`).join(", ")} hidden)` : base;
}

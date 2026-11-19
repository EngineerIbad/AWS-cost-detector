/**
 * Header redaction. Anything that might end up in a log line, an error, an
 * analytics event or a cross-origin redirect goes through here first.
 *
 * Sensitive = Authorization, Proxy-Authorization, Cookie, Set-Cookie, X-Api-Key,
 * or any header whose name contains "token", "secret", "key", "auth",
 * "session", "password", "credential" or "signature".
 */
const SENSITIVE_EXACT = new Set(["authorization", "proxy-authorization", "cookie", "set-cookie", "x-api-key"]);
const SENSITIVE_PART = /token|secret|key|auth|session|passw|credential|signature/i;

export const REDACTED = "[redacted]";

export function isSensitiveHeaderName(name: string): boolean {
  const n = name.trim().toLowerCase();
  return SENSITIVE_EXACT.has(n) || SENSITIVE_PART.test(n);
}

/** Copy of `headers` with every sensitive value replaced by "[redacted]". */
export function redactHeaders(headers: Record<string, string> | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers ?? {})) out[k] = isSensitiveHeaderName(k) ? REDACTED : v;
  return out;
}

/** Copy of `headers` with sensitive headers removed (used on cross-origin redirects). */
export function stripSensitiveHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) if (!isSensitiveHeaderName(k)) out[k] = v;
  return out;
}

/**
 * The only way the server logs an error: error class and Node error code,
 * never the message (which can contain hostnames, URLs or header values).
 */
export function logSafeError(context: string, e: unknown): void {
  const name = e instanceof Error ? e.name : typeof e;
  const code = (e as { code?: unknown })?.code;
  console.error(`[${context}] ${name}${typeof code === "string" ? ` (${code.slice(0, 40)})` : ""}`);
}

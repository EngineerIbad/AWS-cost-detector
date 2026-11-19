/**
 * SSRF-hardened, single-shot HTTP client.
 *
 * - http/https only, ports 80/443/8080/8443 only
 * - every resolved address is vetted; if ANY is private/reserved we refuse
 * - the socket connects to the vetted IP via a custom `lookup` (no DNS rebinding)
 *   while Host header and TLS SNI keep the original hostname
 * - no retries, 10 s deadline, 5 MB response cap, 100 KB request body cap
 * - `safeFetchFollow` follows up to 3 redirects; every hop goes back through
 *   `safeFetch`, so scheme, port, DNS and IP checks run again for each one
 *
 * Nothing in this module logs. Errors never echo headers, tokens or bodies.
 */
import dns from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import net from "node:net";
import type { LookupFunction } from "node:net";
import { isBlockedAddress } from "./ip";
import { stripSensitiveHeaders } from "./redact";
import type { ErrorField } from "./types";

export const ALLOWED_PORTS = new Set([80, 443, 8080, 8443]);
export const ALLOWED_METHODS = new Set(["GET", "POST", "PUT", "PATCH"]);
export const TIMEOUT_MS = 10_000;
export const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;
export const MAX_REQUEST_BODY_BYTES = 100 * 1024;
export const MAX_REDIRECTS = 3;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export class SafeFetchError extends Error {
  constructor(
    public code: string,
    message: string,
    public field: ErrorField = "url",
    public httpStatus = 400,
  ) {
    super(message);
    this.name = "SafeFetchError";
  }
}

const SAFE_RESPONSE_HEADERS = [
  "content-type",
  "content-encoding",
  "content-length",
  "vary",
  "cache-control",
  "etag",
  "last-modified",
  "age",
  "date",
  "server",
  "via",
  "x-cache",
  "cf-cache-status",
  "transfer-encoding",
  "access-control-allow-origin",
];

/** Request headers the user may not control. */
const STRIPPED_REQUEST_HEADERS = new Set([
  "host",
  "content-length",
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "te",
  "trailer",
  "expect",
  "accept-encoding",
  "proxy-authorization",
  "proxy-connection",
  "forwarded",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-real-ip",
]);

export interface VettedTarget {
  url: URL;
  hostname: string; // without IPv6 brackets
  port: number;
  address: string;
  family: 4 | 6;
}

function withDeadline<T>(p: Promise<T>, deadline: number, onTimeout: () => SafeFetchError): Promise<T> {
  const remaining = deadline - Date.now();
  if (remaining <= 0) return Promise.reject(onTimeout());
  let t: NodeJS.Timeout;
  return Promise.race([
    p.finally(() => clearTimeout(t)),
    new Promise<T>((_, reject) => {
      t = setTimeout(() => reject(onTimeout()), remaining);
    }),
  ]);
}

const timeoutError = () =>
  new SafeFetchError(
    "timeout",
    "The API didn't respond within 10 seconds. Check it's publicly reachable, or try a lighter endpoint.",
    "url",
    504,
  );

const privateError = () =>
  new SafeFetchError(
    "private_address",
    "This looks like a private address. The tool can only reach public APIs.",
    "url",
    400,
  );

/** Validate scheme/port/host and resolve DNS, rejecting any non-public address. */
export async function vetTarget(rawUrl: string, deadline = Date.now() + TIMEOUT_MS): Promise<VettedTarget> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new SafeFetchError("invalid_url", "That doesn't look like a valid URL. Try something like https://api.example.com/items.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new SafeFetchError("bad_scheme", "Only http:// and https:// URLs are supported.");
  }
  if (url.username || url.password) {
    throw new SafeFetchError("credentials_in_url", "Remove the username/password from the URL and use a Bearer token or curl -u instead.");
  }
  const port = url.port ? Number(url.port) : url.protocol === "https:" ? 443 : 80;
  if (!ALLOWED_PORTS.has(port)) {
    throw new SafeFetchError("bad_port", `Port ${port} isn't allowed. The tool only connects to ports 80, 443, 8080 and 8443.`);
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  if (!hostname) throw new SafeFetchError("invalid_url", "The URL is missing a hostname.");
  const lower = hostname.toLowerCase().replace(/\.$/, "");
  if (lower === "localhost" || lower.endsWith(".localhost") || lower.endsWith(".local") || lower.endsWith(".internal")) {
    throw privateError();
  }

  let addresses: { address: string; family: number }[];
  if (net.isIP(hostname)) {
    addresses = [{ address: hostname, family: net.isIP(hostname) }];
  } else {
    try {
      addresses = await withDeadline(dns.lookup(hostname, { all: true, verbatim: true }), deadline, timeoutError);
    } catch (e) {
      if (e instanceof SafeFetchError) throw e;
      throw new SafeFetchError("dns_failed", `We couldn't find "${hostname.slice(0, 100)}". Check the domain is spelled right and is public.`);
    }
  }
  if (addresses.length === 0) {
    throw new SafeFetchError("dns_failed", `We couldn't find "${hostname.slice(0, 100)}". Check the domain is spelled right and is public.`);
  }
  if (addresses.some((a) => isBlockedAddress(a.address))) throw privateError();

  const first = addresses[0];
  return { url, hostname, port, address: first.address, family: first.family === 6 ? 6 : 4 };
}

export interface SafeRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  acceptEncoding: string;
  /** Absolute deadline (ms epoch). Defaults to now + TIMEOUT_MS. Shared across redirect hops. */
  deadline?: number;
}

export interface SafeResponse {
  status: number;
  headers: Record<string, string>; // allow-listed only
  contentType: string | null;
  contentEncoding: string | null;
  vary: string | null;
  location: string | null;
  /** Link header, used server-side only to detect rel="next". Not returned to clients. */
  link: string | null;
  wire: Buffer;
}

export function sanitizeRequestHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  let count = 0;
  for (const [k, v] of Object.entries(headers ?? {})) {
    if (typeof k !== "string" || typeof v !== "string") continue;
    const name = k.trim();
    if (!/^[A-Za-z0-9!#$%&'*+.^_`|~-]+$/.test(name)) {
      throw new SafeFetchError("bad_header", `"${name.slice(0, 40)}" isn't a valid header name.`, "general");
    }
    if (/[\r\n\0]/.test(v)) throw new SafeFetchError("bad_header", `The ${name.slice(0, 40)} header contains a line break.`, "general");
    const lname = name.toLowerCase();
    if (STRIPPED_REQUEST_HEADERS.has(lname) || lname.startsWith("proxy-")) continue;
    if (++count > 50) throw new SafeFetchError("bad_header", "That's too many headers (max 50).", "general");
    out[name] = v;
  }
  return out;
}

/** Perform exactly one outbound request. No retries, no redirects. */
export async function safeFetch(req: SafeRequest): Promise<SafeResponse> {
  const deadline = req.deadline ?? Date.now() + TIMEOUT_MS;
  const method = req.method.toUpperCase();
  if (!ALLOWED_METHODS.has(method)) {
    throw new SafeFetchError("bad_method", `${method} isn't supported. Use GET, POST, PUT or PATCH.`, "method");
  }
  const bodyBuf = req.body !== undefined && method !== "GET" ? Buffer.from(req.body, "utf8") : undefined;
  if (bodyBuf && bodyBuf.length > MAX_REQUEST_BODY_BYTES) {
    throw new SafeFetchError("body_too_large", "The request body is over 100 KB. Send a smaller sample body.", "body");
  }

  const target = await vetTarget(req.url, deadline);
  const headers: Record<string, string> = sanitizeRequestHeaders(req.headers);
  if (!Object.keys(headers).some((k) => k.toLowerCase() === "user-agent")) headers["User-Agent"] = "API-Egress-Cost-Calculator/1.0";
  if (!Object.keys(headers).some((k) => k.toLowerCase() === "accept")) headers["Accept"] = "*/*";
  headers["Accept-Encoding"] = req.acceptEncoding;
  headers["Connection"] = "close";
  if (bodyBuf) headers["Content-Length"] = String(bodyBuf.length);

  // Pin the connection to the vetted address. Called by net.connect with the
  // original hostname; we ignore it and return the IP we already checked.
  const pinnedLookup = ((_host: string, options: { all?: boolean }, cb: (...args: unknown[]) => void) => {
    if (options && options.all) cb(null, [{ address: target.address, family: target.family }]);
    else cb(null, target.address, target.family);
  }) as unknown as LookupFunction;

  const isHttps = target.url.protocol === "https:";
  const transport = isHttps ? https : http;
  const isIpLiteral = net.isIP(target.hostname) !== 0;

  return new Promise<SafeResponse>((resolve, reject) => {
    let settled = false;
    const fail = (e: SafeFetchError) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      request.destroy();
      reject(e);
    };

    const request = transport.request(
      {
        protocol: target.url.protocol,
        host: target.hostname, // Host header keeps the original name
        port: target.port,
        path: target.url.pathname + target.url.search,
        method,
        headers,
        lookup: pinnedLookup,
        agent: false, // fresh socket, no pooling across users
        ...(isHttps && !isIpLiteral ? { servername: target.hostname } : {}),
        ...(isHttps ? { rejectUnauthorized: true } : {}),
      },
      (res) => {
        // Defense in depth: verify the socket really went where we vetted.
        const remote = res.socket?.remoteAddress;
        if (remote && isBlockedAddress(remote)) {
          fail(privateError());
          return;
        }
        const declared = Number(res.headers["content-length"]);
        if (Number.isFinite(declared) && declared > MAX_RESPONSE_BYTES) {
          fail(new SafeFetchError("response_too_large", "The response is over 5 MB. Try a smaller page (e.g. ?limit=50).", "url", 413));
          return;
        }
        const chunks: Buffer[] = [];
        let total = 0;
        res.on("data", (c: Buffer) => {
          total += c.length;
          if (total > MAX_RESPONSE_BYTES) {
            fail(new SafeFetchError("response_too_large", "The response is over 5 MB. Try a smaller page (e.g. ?limit=50).", "url", 413));
            return;
          }
          chunks.push(c);
        });
        res.on("end", () => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          const safeHeaders: Record<string, string> = {};
          for (const h of SAFE_RESPONSE_HEADERS) {
            const v = res.headers[h];
            if (v !== undefined) safeHeaders[h] = (Array.isArray(v) ? v.join(", ") : v).slice(0, 300);
          }
          const one = (h: string) => {
            const v = res.headers[h];
            return v === undefined ? null : Array.isArray(v) ? v.join(", ") : v;
          };
          resolve({
            status: res.statusCode ?? 0,
            headers: safeHeaders,
            contentType: one("content-type"),
            contentEncoding: one("content-encoding"),
            vary: one("vary"),
            location: one("location"),
            link: one("link"),
            wire: Buffer.concat(chunks),
          });
        });
        res.on("error", () => fail(new SafeFetchError("network", "The connection dropped while reading the response.", "url", 502)));
        res.on("aborted", () => fail(new SafeFetchError("network", "The connection dropped while reading the response.", "url", 502)));
      },
    );

    const timer = setTimeout(() => fail(timeoutError()), Math.max(0, deadline - Date.now()));

    request.on("error", (err: NodeJS.ErrnoException) => {
      const code = err?.code ?? "";
      let msg = "We couldn't connect to the API. Check the URL and that it's publicly reachable.";
      if (code === "ECONNREFUSED") msg = "The server refused the connection. Check the port and that the API is running.";
      else if (code === "ECONNRESET") msg = "The server closed the connection unexpectedly.";
      else if (code.startsWith("ERR_TLS") || code.includes("CERT") || code === "DEPTH_ZERO_SELF_SIGNED_CERT") msg = "The API's TLS certificate isn't valid, so we didn't connect.";
      else if (code === "ERR_INVALID_CHAR" || code === "ERR_INVALID_HTTP_TOKEN") msg = "One of the headers contains characters that aren't allowed.";
      fail(new SafeFetchError("network", msg, "url", 502));
    });

    if (bodyBuf) request.write(bodyBuf);
    request.end();
  });
}

export interface FollowedResponse extends SafeResponse {
  /** URL of the response that was returned (after any redirects). Server-side only. */
  finalUrl: string;
  redirects: number;
}

/**
 * Like `safeFetch`, but follows up to `maxRedirects` redirects (http/https only).
 * Each hop is a fresh `safeFetch`, so the target is re-validated and DNS is
 * re-resolved and re-checked against blocked ranges before connecting.
 * Sensitive headers (Authorization, Cookie, API keys, ...) are dropped as soon
 * as a redirect leaves the original origin. One deadline covers all hops.
 * If the chain is longer than the limit, the last 3xx response is returned.
 */
export async function safeFetchFollow(
  req: SafeRequest,
  maxRedirects = MAX_REDIRECTS,
  /** Injected in tests only. Production always uses `safeFetch`. */
  fetchOnce: (r: SafeRequest) => Promise<SafeResponse> = safeFetch,
): Promise<FollowedResponse> {
  const deadline = req.deadline ?? Date.now() + TIMEOUT_MS;
  let originalOrigin = "";
  try {
    originalOrigin = new URL(req.url).origin;
  } catch {
    /* invalid URL: the first safeFetch rejects it with a friendly error */
  }
  let cur: SafeRequest = { ...req, deadline };
  for (let hop = 0; ; hop++) {
    let res: SafeResponse;
    try {
      res = await fetchOnce(cur);
    } catch (e) {
      if (hop > 0 && e instanceof SafeFetchError && e.code !== "timeout" && e.code !== "network") {
        throw new SafeFetchError(e.code, `The API redirected somewhere we can't fetch. ${e.message}`, e.field, e.httpStatus);
      }
      throw e;
    }
    if (!REDIRECT_STATUSES.has(res.status) || !res.location || hop >= maxRedirects) {
      return { ...res, finalUrl: cur.url, redirects: hop };
    }
    let next: URL;
    try {
      next = new URL(res.location, cur.url);
    } catch {
      return { ...res, finalUrl: cur.url, redirects: hop };
    }
    if (next.protocol !== "http:" && next.protocol !== "https:") {
      throw new SafeFetchError("bad_scheme", "The API redirected to a non-HTTP URL, so we stopped.");
    }
    let { method, body, headers } = cur;
    // Same rules as browsers and curl -L: 303 always becomes GET; 301/302 turn POST into GET.
    if (res.status === 303 || ((res.status === 301 || res.status === 302) && method !== "GET")) {
      method = "GET";
      body = undefined;
      headers = Object.fromEntries(Object.entries(headers).filter(([k]) => k.toLowerCase() !== "content-type"));
    }
    if (next.origin !== originalOrigin) headers = stripSensitiveHeaders(headers);
    cur = { ...cur, url: next.toString(), method, body, headers };
  }
}

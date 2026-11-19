import { analyzeBody, acceptEncodingHeader, decodeBody, DecodeError, encodeAs } from "../../../lib/analyze";
import { CurlParseError, normalizeUrl, parseCurl, type ParsedRequest } from "../../../lib/curl";
import { clientIp, rateLimit } from "../../../lib/rateLimit";
import { logSafeError } from "../../../lib/redact";
import { MAX_REQUEST_BODY_BYTES, safeFetchFollow, SafeFetchError, TIMEOUT_MS } from "../../../lib/safeFetch";
import { isValidParamName } from "../../../lib/pagination";
import { samplePages } from "../../../lib/sampler";
import type { ApiError, ErrorField, PaginationResult } from "../../../lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Up to 5 sequential pages: page 1 (≤10 s) + later pages, with no new page
// started after 12 s, so the worst case stays well inside this limit.
export const maxDuration = 30;

/** Pasted samples can be larger than outbound request bodies. */
const MAX_PAYLOAD_SAMPLE_BYTES = 4 * 1024 * 1024;
const MAX_API_BODY_BYTES = MAX_PAYLOAD_SAMPLE_BYTES + 64 * 1024;

function err(status: number, code: string, message: string, field: ErrorField = "general", extra?: HeadersInit) {
  const body: ApiError = { error: { code, message, field } };
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extra } });
}

type PaginationInput = { param?: unknown } | null | undefined;
type Body =
  | { mode: "curl"; curl: string; pagination?: PaginationInput }
  | { mode: "request"; method: string; url: string; headers?: Record<string, string>; body?: string; pagination?: PaginationInput }
  | { mode: "payload"; json: string; servedAs?: "identity" | "gzip" | "br" };

/*
 * Privacy rules for this handler (see README "Privacy"):
 * - The request (curl, URL, headers, body) and the response body are held in
 *   memory for this one invocation only. Nothing is written to disk, a
 *   database, a cache or analytics.
 * - Never log request or response data. The only log call is logSafeError,
 *   which prints the error class and code, never messages, URLs or headers.
 * - The browser gets sizes, allow-listed response headers and a 500-character
 *   preview, never the full body.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientIp(request.headers));
  if (!limit.ok) {
    const what = limit.windowMs >= 3_600_000 ? "60 analyses per hour" : "10 analyses per minute";
    const wait = limit.retryAfterSec >= 120 ? `${Math.ceil(limit.retryAfterSec / 60)} minutes` : `${limit.retryAfterSec}s`;
    return err(429, "rate_limited", `You've hit the limit of ${what}. Try again in ${wait}, or use Demo mode.`, "general", {
      "Retry-After": String(limit.retryAfterSec),
    });
  }

  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_API_BODY_BYTES) {
    return err(413, "too_large", "That input is too large. Keep samples under 4 MB.");
  }

  let input: Body;
  try {
    const text = await request.text();
    if (text.length > MAX_API_BODY_BYTES) return err(413, "too_large", "That input is too large. Keep samples under 4 MB.");
    input = JSON.parse(text);
  } catch {
    return err(400, "bad_json", "The request couldn't be read. Refresh the page and try again.");
  }
  if (!input || typeof input !== "object" || typeof (input as { mode?: unknown }).mode !== "string") {
    return err(400, "bad_request", "Unknown request type.");
  }

  try {
    if (input.mode === "payload") {
      if (typeof input.json !== "string" || input.json.trim() === "") {
        return err(400, "empty", "Paste a sample response to analyze.", "json");
      }
      const raw = Buffer.from(input.json, "utf8");
      if (raw.length > MAX_PAYLOAD_SAMPLE_BYTES) return err(413, "too_large", "That sample is over 4 MB. Paste a smaller one.", "json");
      const servedAs = input.servedAs === "gzip" || input.servedAs === "br" ? input.servedAs : "identity";
      const wire = encodeAs(raw, servedAs);
      const trimmed = input.json.trim();
      const ct = trimmed.startsWith("{") || trimmed.startsWith("[") ? "application/json" : "text/plain";
      const result = analyzeBody({
        source: "payload",
        raw,
        wireBytes: wire.length,
        status: null,
        contentType: ct,
        contentEncoding: servedAs === "identity" ? null : servedAs,
        vary: null,
        assumedEncoding: true,
      });
      return Response.json(result, { headers: { "Cache-Control": "no-store" } });
    }

    let req: ParsedRequest;
    if (input.mode === "curl") {
      if (typeof input.curl !== "string") return err(400, "bad_request", "Paste a curl command.", "curl");
      if (input.curl.length > 200_000) return err(413, "too_large", "That curl command is too long.", "curl");
      try {
        req = parseCurl(input.curl);
      } catch (e) {
        if (e instanceof CurlParseError) return err(400, "curl_parse", e.message, "curl");
        throw e;
      }
    } else if (input.mode === "request") {
      if (typeof input.url !== "string" || !input.url.trim()) return err(400, "no_url", "Enter the API URL you want to measure.", "url");
      req = {
        method: typeof input.method === "string" ? input.method.toUpperCase() : "GET",
        url: normalizeUrl(input.url),
        headers: input.headers && typeof input.headers === "object" ? input.headers : {},
        body: typeof input.body === "string" && input.body !== "" ? input.body : undefined,
      };
    } else {
      return err(400, "bad_request", "Unknown request type.");
    }

    if (req.body !== undefined && Buffer.byteLength(req.body, "utf8") > MAX_REQUEST_BODY_BYTES) {
      return err(413, "body_too_large", "The request body is over 100 KB. Send a smaller sample body.", input.mode === "curl" ? "curl" : "body");
    }

    // Validate pagination options before making any outbound request.
    let paginationParam: string | null = null;
    if (input.pagination && typeof input.pagination === "object") {
      const param = typeof input.pagination.param === "string" ? input.pagination.param.trim() : "";
      if (!isValidParamName(param)) {
        return err(400, "bad_param", "Enter the name of the query parameter that changes per page, e.g. page, offset or cursor.", "param");
      }
      paginationParam = param;
    }

    // Follows up to 3 redirects; every hop is re-validated (scheme, port, DNS, IP ranges).
    const res = await safeFetchFollow({ ...req, acceptEncoding: acceptEncodingHeader() });

    // Only set when the final response is still a redirect (chain too long, or no Location).
    let redirectTo: string | null = null;
    if (res.status >= 300 && res.status < 400) {
      if (res.location) {
        try {
          redirectTo = new URL(res.location, res.finalUrl).toString().slice(0, 300);
        } catch {
          redirectTo = res.location.slice(0, 300);
        }
      } else {
        redirectTo = "another location";
      }
    }

    const raw = decodeBody(res.wire, res.contentEncoding);

    let pagination: PaginationResult | null = null;
    if (paginationParam) {
      // Same method, headers and body as page 1; only the URL's pagination
      // param changes. Every page goes through safeFetch's full checks.
      pagination = await samplePages({
        firstUrl: req.url,
        param: paginationParam,
        firstPage: { status: res.status, raw, wireBytes: res.wire.length, contentType: res.contentType, link: res.link },
        fetchPage: async (url) => {
          try {
            const r = await safeFetchFollow({ ...req, url, acceptEncoding: acceptEncodingHeader(), deadline: Date.now() + TIMEOUT_MS });
            return { status: r.status, raw: decodeBody(r.wire, r.contentEncoding), wireBytes: r.wire.length, contentType: r.contentType };
          } catch (e) {
            if (e instanceof SafeFetchError || e instanceof DecodeError) return { error: e.message };
            return { error: "an unexpected error occurred" };
          }
        },
      });
    }

    const result = analyzeBody({
      source: "live",
      raw,
      wireBytes: res.wire.length,
      status: res.status,
      contentType: res.contentType,
      contentEncoding: res.contentEncoding,
      vary: res.vary,
      responseHeaders: res.headers,
      redirectTo,
      requestUrl: req.url,
      pagination,
    });
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const field: ErrorField = input.mode === "curl" ? "curl" : input.mode === "payload" ? "json" : "url";
    if (e instanceof SafeFetchError) {
      const f = input.mode === "curl" || e.field === "url" || e.field === "general" ? field : e.field;
      return err(e.httpStatus, e.code, e.message, f);
    }
    if (e instanceof DecodeError) return err(502, "decode_failed", e.message, field);
    logSafeError("analyze", e);
    return err(500, "internal", "Something went wrong on our side. Please try again.", field);
  }
}

import type { Finding } from "./types";
import { findMissingValueLiterals, findTokensInUrl } from "./urlChecks";

export interface FindingInput {
  status: number | null;
  contentType: string | null;
  contentEncoding: string | null;
  vary: string | null;
  wireBytes: number;
  rawBytes: number;
  isJson: boolean;
  minifiedBytes: number | null;
  alreadyCompressedMedia: boolean;
  gzipBytes: number | null;
  brotliBytes: number | null;
  zstdBytes: number | null;
  redirectTo: string | null;
  /** True when the user pasted a sample, so "today" is an assumption. */
  assumedEncoding?: boolean;
  /** The URL that was requested (live analyses only). Used for URL hygiene checks. */
  requestUrl?: string | null;
  /** Set when pagination sampling ran. */
  pagination?: { hasMoreIndicator: boolean } | null;
}

const SMALL_BYTES = 1000;

/** Content types that are already compressed; recompressing gains nothing. */
export function isAlreadyCompressedType(contentType: string | null): boolean {
  if (!contentType) return false;
  const ct = contentType.toLowerCase().split(";")[0].trim();
  if (ct === "image/svg+xml") return false; // SVG is text
  if (ct.startsWith("image/") || ct.startsWith("video/") || ct.startsWith("audio/")) return true;
  return [
    "application/zip",
    "application/gzip",
    "application/x-gzip",
    "application/x-zip-compressed",
    "application/x-7z-compressed",
    "application/x-rar-compressed",
    "application/x-bzip2",
    "application/x-xz",
    "application/zstd",
    "font/woff",
    "font/woff2",
  ].includes(ct);
}

function times(a: number, b: number): string {
  if (!(b > 0)) return "";
  const r = a / b;
  return r >= 10 ? r.toFixed(0) : r.toFixed(1);
}

/** Normalize a Content-Encoding value: "gzip", "br", "zstd", "deflate" or null for identity. */
export function normalizeEncoding(ce: string | null): string | null {
  if (!ce) return null;
  const parts = ce
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && s !== "identity");
  if (parts.length === 0) return null;
  const last = parts[parts.length - 1];
  return last === "x-gzip" ? "gzip" : last;
}

export function buildFindings(f: FindingInput): Finding[] {
  const out: Finding[] = [];
  const enc = normalizeEncoding(f.contentEncoding);

  if (f.redirectTo) {
    out.push({
      id: "redirect",
      severity: "high",
      title: `This endpoint redirects to ${f.redirectTo}`,
      detail: "We don't follow redirects for safety. Paste the final URL to measure the real response.",
    });
  }

  if (f.status !== null && (f.status < 200 || f.status >= 300) && !f.redirectTo) {
    out.push({
      id: "non-2xx",
      severity: "info",
      title: `The API answered with status ${f.status}`,
      detail:
        f.rawBytes > 0
          ? "We analyzed the error body it returned. Check the URL, method and auth if you expected real data."
          : "There was no body to analyze. Check the URL, method and auth.",
    });
  }

  if (f.requestUrl) {
    const missing = findMissingValueLiterals(f.requestUrl);
    if (missing.length > 0) {
      const lit = missing[0].literal ?? "undefined";
      out.push({
        id: "url-missing-value",
        severity: "medium",
        title: `Your client is sending '${lit}' in the URL`,
        detail: `This is likely a missing value (e.g. token or ID) at request time. Found in ${missing.map((m) => m.where).join(", ")}.`,
      });
    }
    const tokens = findTokensInUrl(f.requestUrl);
    if (tokens.length > 0) {
      out.push({
        id: "url-token",
        severity: "high",
        title: `A token appears to be in the URL (${tokens.map((t) => t.where).join(", ")})`,
        detail: "Tokens in URLs end up in server, proxy and analytics logs. Send them in the Authorization header instead.",
      });
    }
  }

  const ok2xx = f.status === null || (f.status >= 200 && f.status < 300);
  if (f.pagination && !f.pagination.hasMoreIndicator && f.isJson && ok2xx && f.rawBytes > 0) {
    out.push({
      id: "no-has-more",
      severity: "medium",
      title: "No \"has more\" or next-page indicator",
      detail: "Add hasMore or a next cursor so clients don't request empty pages.",
    });
  }

  if (f.rawBytes === 0) return out;

  if (f.alreadyCompressedMedia) {
    out.push({
      id: "media",
      severity: "medium",
      title: "This is media that's already compressed",
      detail:
        "Gzip, Brotli and Zstd won't shrink images, video, audio or archives. Serve them from a CDN (e.g. CloudFront) to cut egress cost and latency.",
    });
    return out;
  }

  if (f.rawBytes < SMALL_BYTES) {
    out.push({
      id: "small",
      severity: "info",
      title: "This response is too small to matter",
      detail: "Under 1 KB, compression saves little and headers often outweigh the body. Focus on your larger endpoints.",
    });
  }

  const candidates = [
    { name: "Brotli", bytes: f.brotliBytes },
    { name: "Zstd", bytes: f.zstdBytes },
    { name: "Gzip", bytes: f.gzipBytes },
  ].filter((c): c is { name: string; bytes: number } => c.bytes !== null && c.bytes > 0);
  const best = candidates.reduce<{ name: string; bytes: number } | null>(
    (acc, c) => (!acc || c.bytes < acc.bytes ? c : acc),
    null,
  );

  if (!enc && f.rawBytes >= SMALL_BYTES && best && best.bytes < f.rawBytes * 0.9) {
    out.push({
      id: "no-compression",
      severity: "high",
      title: f.assumedEncoding ? "Turn on compression (assuming it's off today)" : "Compression is off",
      detail: `This response would shrink ${times(f.rawBytes, best.bytes)}x with ${best.name}${
        f.isJson ? " (JSON typically shrinks ~4–6x)" : ""
      }. Enable it at your server, API gateway or CDN.`,
    });
  }

  if (enc === "gzip" && f.rawBytes >= SMALL_BYTES && f.gzipBytes) {
    const better = [
      { name: "Brotli", bytes: f.brotliBytes },
      { name: "Zstd", bytes: f.zstdBytes },
    ].filter((c): c is { name: string; bytes: number } => c.bytes !== null && c.bytes > 0 && c.bytes <= f.gzipBytes! * 0.9);
    if (better.length > 0) {
      const b = better.reduce((a, c) => (c.bytes < a.bytes ? c : a));
      const pct = Math.round((1 - b.bytes / f.gzipBytes) * 100);
      out.push({
        id: "gzip-only",
        severity: "medium",
        title: `You serve Gzip only; ${b.name} is ${pct}% smaller`,
        detail: `Negotiate per client using Accept-Encoding: send ${better.map((x) => x.name).join(" or ")} to clients that support it and fall back to Gzip.`,
      });
    }
  }

  if (f.isJson && f.minifiedBytes !== null && f.rawBytes >= SMALL_BYTES && f.minifiedBytes < f.rawBytes * 0.9) {
    const pct = Math.round((1 - f.minifiedBytes / f.rawBytes) * 100);
    out.push({
      id: "pretty-json",
      severity: "medium",
      title: `Your JSON is pretty-printed (${pct}% whitespace)`,
      detail: "Minify JSON in production. Compression hides most of it, but minifying still trims bytes and CPU.",
    });
  }

  if (enc && !f.assumedEncoding) {
    const varyHasAE = (f.vary ?? "")
      .toLowerCase()
      .split(",")
      .map((s) => s.trim())
      .some((s) => s === "accept-encoding" || s === "*");
    if (!varyHasAE) {
      out.push({
        id: "missing-vary",
        severity: "medium",
        title: "Missing Vary: Accept-Encoding",
        detail: `The response is ${enc}-compressed but doesn't send Vary: Accept-Encoding, so a shared cache could serve compressed bytes to a client that can't read them.`,
      });
    }
  }

  return out;
}

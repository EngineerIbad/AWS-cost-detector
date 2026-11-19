import zlib from "node:zlib";
import { performance } from "node:perf_hooks";
import { buildFindings, isAlreadyCompressedType, normalizeEncoding } from "./findings";
import type { AnalysisResult, CompressionResult, PageSample, PaginationResult } from "./types";

/** Cap on decompressed size to protect against decompression bombs. */
export const MAX_DECODED_BYTES = 25 * 1024 * 1024;
const PREVIEW_CHARS = 500;

type ZstdZlib = typeof zlib & {
  zstdCompressSync?: (buf: Buffer, opts?: { params?: Record<number, number> }) => Buffer;
  zstdDecompressSync?: (buf: Buffer, opts?: { maxOutputLength?: number }) => Buffer;
  constants: typeof zlib.constants & { ZSTD_c_compressionLevel?: number };
};
const z = zlib as ZstdZlib;

export function zstdCompressAvailable(): boolean {
  return typeof z.zstdCompressSync === "function";
}
export function zstdDecompressAvailable(): boolean {
  return typeof z.zstdDecompressSync === "function";
}

export function acceptEncodingHeader(): string {
  return zstdDecompressAvailable() ? "br, gzip, zstd" : "br, gzip";
}

export class DecodeError extends Error {}

/** Decode a body according to its Content-Encoding (applied in reverse order). */
export function decodeBody(wire: Buffer, contentEncoding: string | null): Buffer {
  if (!contentEncoding || wire.length === 0) return wire;
  const encodings = contentEncoding
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && s !== "identity")
    .reverse();
  const opts = { maxOutputLength: MAX_DECODED_BYTES };
  let buf = wire;
  try {
    for (const enc of encodings) {
      if (enc === "gzip" || enc === "x-gzip") buf = zlib.gunzipSync(buf, opts);
      else if (enc === "br") buf = zlib.brotliDecompressSync(buf, opts);
      else if (enc === "deflate") {
        try {
          buf = zlib.inflateSync(buf, opts);
        } catch {
          buf = zlib.inflateRawSync(buf, opts);
        }
      } else if (enc === "zstd") {
        if (!z.zstdDecompressSync) throw new DecodeError("The server sent Zstd, which this runtime can't decode.");
        buf = z.zstdDecompressSync(buf, opts);
      } else {
        throw new DecodeError(`The server used an encoding we don't recognize (${enc.slice(0, 20)}).`);
      }
    }
  } catch (e) {
    if (e instanceof DecodeError) throw e;
    if (e instanceof RangeError || /maxOutputLength|buffer/i.test(String((e as Error)?.message))) {
      throw new DecodeError("The decompressed response is larger than 25 MB, so we stopped.");
    }
    throw new DecodeError("We couldn't decompress the response. The server's Content-Encoding may not match the body.");
  }
  return buf;
}

function timed(fn: () => Buffer): CompressionResult {
  const t0 = performance.now();
  const out = fn();
  const ms = performance.now() - t0;
  return { available: true, bytes: out.length, ms: Math.round(ms * 100) / 100 };
}

export function compressAll(raw: Buffer): { gzip: CompressionResult; brotli: CompressionResult; zstd: CompressionResult } {
  if (raw.length === 0) {
    const empty = { available: true, bytes: 0, ms: 0 };
    return { gzip: empty, brotli: empty, zstd: zstdCompressAvailable() ? empty : { available: false, bytes: null, ms: null } };
  }
  const gzip = timed(() => zlib.gzipSync(raw, { level: 6 }));
  const brotli = timed(() =>
    zlib.brotliCompressSync(raw, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
      },
    }),
  );
  let zstd: CompressionResult = { available: false, bytes: null, ms: null };
  if (z.zstdCompressSync) {
    const level = z.constants.ZSTD_c_compressionLevel;
    zstd = timed(() => z.zstdCompressSync!(raw, level !== undefined ? { params: { [level]: 3 } } : undefined));
  }
  return { gzip, brotli, zstd };
}

/** Compress `raw` with the given encoding, to simulate "what you send today" for samples. */
export function encodeAs(raw: Buffer, enc: "identity" | "gzip" | "br" | "zstd"): Buffer {
  if (enc === "gzip") return zlib.gzipSync(raw, { level: 6 });
  if (enc === "br") return zlib.brotliCompressSync(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } });
  if (enc === "zstd" && z.zstdCompressSync) return z.zstdCompressSync(raw);
  return raw;
}

function looksBinary(buf: Buffer): boolean {
  const n = Math.min(buf.length, 1024);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}

export interface AnalyzeInput {
  source: AnalysisResult["source"];
  raw: Buffer;
  wireBytes: number;
  status: number | null;
  contentType: string | null;
  contentEncoding: string | null;
  vary: string | null;
  responseHeaders?: Record<string, string>;
  redirectTo?: string | null;
  assumedEncoding?: boolean;
  /** Requested URL, for URL hygiene findings. Never returned to the client. */
  requestUrl?: string | null;
  pagination?: PaginationResult | null;
}

export interface ParsedBody {
  text: string | null;
  json: unknown;
  isJson: boolean;
  minifiedBytes: number | null;
}

/** Decode text and try JSON. Binary/media bodies are left alone. */
export function parseBody(raw: Buffer, contentType: string | null): ParsedBody {
  const out: ParsedBody = { text: null, json: undefined, isJson: false, minifiedBytes: null };
  if (isAlreadyCompressedType(contentType) || looksBinary(raw) || raw.length === 0) return out;
  out.text = raw.toString("utf8");
  const trimmed = out.text.trimStart();
  const ctSaysJson = !!contentType && /[/+]json\b/i.test(contentType);
  if (ctSaysJson || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      out.json = JSON.parse(out.text);
      out.isJson = true;
      out.minifiedBytes = Buffer.byteLength(JSON.stringify(out.json), "utf8");
    } catch {
      out.isJson = false;
    }
  }
  return out;
}

/** Sizes for one sampled page. */
export function measurePage(page: number, status: number, raw: Buffer, wireBytes: number, parsed: ParsedBody, items: number | null): PageSample {
  const { gzip, brotli, zstd } = compressAll(raw);
  return {
    page,
    status,
    items,
    wireBytes,
    rawBytes: raw.length,
    minifiedBytes: parsed.minifiedBytes,
    gzipBytes: gzip.bytes ?? 0,
    brotliBytes: brotli.bytes ?? 0,
    zstdBytes: zstd.available ? zstd.bytes : null,
  };
}

export function analyzeBody(input: AnalyzeInput): AnalysisResult {
  const { raw } = input;
  const ct = input.contentType;
  const media = isAlreadyCompressedType(ct);

  const { text, isJson, minifiedBytes } = parseBody(raw, ct);

  const { gzip, brotli, zstd } = compressAll(raw);

  let preview = "";
  let previewTruncated = false;
  if (raw.length === 0) preview = "";
  else if (text === null) preview = `[binary content, ${raw.length.toLocaleString("en-US")} bytes]`;
  else {
    const chars = Array.from(text.slice(0, PREVIEW_CHARS + 10)).slice(0, PREVIEW_CHARS).join("");
    preview = chars;
    previewTruncated = text.length > chars.length;
  }

  const findings = buildFindings({
    status: input.status,
    contentType: ct,
    contentEncoding: input.contentEncoding,
    vary: input.vary,
    wireBytes: input.wireBytes,
    rawBytes: raw.length,
    isJson,
    minifiedBytes,
    alreadyCompressedMedia: media,
    gzipBytes: gzip.bytes,
    brotliBytes: brotli.bytes,
    zstdBytes: zstd.bytes,
    redirectTo: input.redirectTo ?? null,
    assumedEncoding: input.assumedEncoding,
    requestUrl: input.requestUrl ?? null,
    pagination: input.pagination ? { hasMoreIndicator: input.pagination.hasMoreIndicator } : null,
  });

  return {
    source: input.source,
    status: input.status,
    contentType: ct,
    contentEncoding: normalizeEncoding(input.contentEncoding),
    vary: input.vary,
    wireBytes: input.wireBytes,
    rawBytes: raw.length,
    isJson,
    minifiedBytes,
    alreadyCompressedMedia: media,
    gzip,
    brotli,
    zstd,
    findings,
    preview,
    previewTruncated,
    responseHeaders: input.responseHeaders ?? {},
    redirectTo: input.redirectTo ?? null,
    pagination: input.pagination ?? null,
  };
}

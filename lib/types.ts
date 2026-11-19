export type Severity = "high" | "medium" | "info";

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
}

export interface CompressionResult {
  available: boolean;
  bytes: number | null;
  ms: number | null;
}

export interface AnalysisResult {
  /** "shared" = rebuilt from a share link: sizes only, no body, headers or findings. */
  source: "live" | "demo" | "payload" | "shared";
  status: number | null;
  contentType: string | null;
  contentEncoding: string | null;
  vary: string | null;
  /** Bytes actually on the wire (body only, excluding headers). */
  wireBytes: number;
  rawBytes: number;
  isJson: boolean;
  minifiedBytes: number | null;
  alreadyCompressedMedia: boolean;
  gzip: CompressionResult;
  brotli: CompressionResult;
  zstd: CompressionResult;
  findings: Finding[];
  /** First 500 characters of the decoded body. Never the full body. */
  preview: string;
  previewTruncated: boolean;
  /** Allow-listed, non-sensitive response headers. */
  responseHeaders: Record<string, string>;
  /** Set when the response was a redirect. */
  redirectTo: string | null;
  /** Present when pagination sampling was requested. Sizes only, never page URLs. */
  pagination?: PaginationResult | null;
  /** Shared results only: how many pages the sharer sampled. */
  sampledPages?: number;
}

export interface PageSample {
  page: number;
  status: number;
  items: number | null;
  wireBytes: number;
  rawBytes: number;
  minifiedBytes: number | null;
  gzipBytes: number;
  brotliBytes: number;
  zstdBytes: number | null;
}

export interface PageAverages {
  wireBytes: number;
  rawBytes: number;
  /** Null unless every sampled page was JSON. */
  minifiedBytes: number | null;
  gzipBytes: number;
  brotliBytes: number;
  zstdBytes: number | null;
}

export interface PaginationResult {
  param: string;
  kind: "offset" | "page" | "cursor";
  pages: PageSample[];
  average: PageAverages;
  /** Why sampling stopped before MAX_SAMPLED_PAGES, if it did. */
  stopReason: string | null;
  hasMoreIndicator: boolean;
  /** Largest deviation of a page's raw size from the mean (0.3 = 30%). */
  maxDeviation: number;
}

export type ErrorField = "curl" | "url" | "method" | "token" | "body" | "json" | "param" | "general";

export interface ApiError {
  error: {
    code: string;
    message: string;
    field: ErrorField;
  };
}

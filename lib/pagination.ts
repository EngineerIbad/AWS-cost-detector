/**
 * Pure helpers for sampling paginated endpoints. No Node or DOM dependencies,
 * so the same code runs in the browser (detection) and on the server (fetching),
 * and is easy to unit-test.
 */

export const PAGINATION_PARAMS = ["skip", "offset", "page", "pageNumber", "p", "cursor"] as const;
export const LIMIT_PARAMS = ["limit", "take", "size", "per_page", "perPage", "pageSize", "page_size"];
export const MAX_SAMPLED_PAGES = 5;
export const PAGE_DELAY_MS = 300;
export const DEFAULT_PAGES_PER_SESSION = 5;
export const MAX_PAGES_PER_SESSION = 50;

export type PaginationKind = "offset" | "page" | "cursor";

/** Allowed characters for a user-supplied param name. */
export function isValidParamName(name: string): boolean {
  return /^[A-Za-z0-9_.\-[\]]{1,64}$/.test(name);
}

/** How a param advances: skip/offset by item count, page by +1, cursor from the response. */
export function classifyParam(name: string): PaginationKind {
  const n = name.toLowerCase();
  if (n === "skip" || n === "offset" || n.includes("offset") || n === "start" || n === "from") return "offset";
  if (n === "page" || n === "pagenumber" || n === "p" || n === "page_number" || n === "pageindex" || n === "page_index") return "page";
  if (n.includes("cursor") || n.includes("token") || n === "after" || n === "before" || n === "starting_after") return "cursor";
  if (n.includes("page")) return "page";
  return "cursor";
}

/* ------------------------------------------------------------------ */
/* Query-string handling that preserves every other byte of the URL    */
/* ------------------------------------------------------------------ */

function splitUrl(url: string): { base: string; query: string; hash: string } {
  const hashIdx = url.indexOf("#");
  const hash = hashIdx > -1 ? url.slice(hashIdx) : "";
  const noHash = hashIdx > -1 ? url.slice(0, hashIdx) : url;
  const qIdx = noHash.indexOf("?");
  return {
    base: qIdx > -1 ? noHash.slice(0, qIdx) : noHash,
    query: qIdx > -1 ? noHash.slice(qIdx + 1) : "",
    hash,
  };
}

function decodePart(s: string): string {
  try {
    return decodeURIComponent(s.replace(/\+/g, " "));
  } catch {
    return s;
  }
}

/** Value of a query param (first occurrence), or null. Name match is case-insensitive. */
export function getQueryParam(url: string, name: string): string | null {
  const { query } = splitUrl(url);
  if (!query) return null;
  const want = name.toLowerCase();
  for (const part of query.split("&")) {
    const eq = part.indexOf("=");
    const key = decodePart(eq > -1 ? part.slice(0, eq) : part);
    if (key.toLowerCase() === want) return eq > -1 ? decodePart(part.slice(eq + 1)) : "";
  }
  return null;
}

/**
 * Return `url` with ONLY `name` set to `value`. Every other query pair keeps its
 * exact original encoding and order. If the param is absent it is appended.
 */
export function setQueryParam(url: string, name: string, value: string): string {
  const { base, query, hash } = splitUrl(url);
  const want = name.toLowerCase();
  const encoded = encodeURIComponent(value);
  const parts = query ? query.split("&") : [];
  let replaced = false;
  const out = parts.map((part) => {
    if (replaced) return part;
    const eq = part.indexOf("=");
    const rawKey = eq > -1 ? part.slice(0, eq) : part;
    if (decodePart(rawKey).toLowerCase() === want) {
      replaced = true;
      return `${rawKey}=${encoded}`;
    }
    return part;
  });
  if (!replaced) out.push(`${encodeURIComponent(name)}=${encoded}`);
  return `${base}?${out.join("&")}${hash}`;
}

/** First known pagination param present in the URL, in the order of PAGINATION_PARAMS. */
export function detectPaginationParam(url: string | null | undefined): string | null {
  if (!url) return null;
  const { query } = splitUrl(url);
  if (!query) return null;
  const keys = query.split("&").map((p) => decodePart(p.split("=")[0]));
  for (const candidate of PAGINATION_PARAMS) {
    const hit = keys.find((k) => k.toLowerCase() === candidate.toLowerCase());
    if (hit) return hit;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Reading the response                                                */
/* ------------------------------------------------------------------ */

const ITEM_KEYS = ["data", "items", "posts", "results", "records", "rows", "entries", "list", "products", "users", "nodes", "edges", "hits", "content", "values"];

type Json = unknown;
const isObj = (v: Json): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);

/** The list of items on a page: the top-level array, or the first array field (data/items/posts/results…). */
export function findItemArray(json: Json): Json[] | null {
  if (Array.isArray(json)) return json;
  if (!isObj(json)) return null;
  for (const k of ITEM_KEYS) if (Array.isArray(json[k])) return json[k] as Json[];
  // One level down for envelopes like { data: { items: [...] } }
  for (const k of ITEM_KEYS) {
    const inner = json[k];
    if (isObj(inner)) for (const k2 of ITEM_KEYS) if (Array.isArray(inner[k2])) return inner[k2] as Json[];
  }
  for (const v of Object.values(json)) if (Array.isArray(v)) return v;
  return null;
}

export function itemCount(json: Json): number | null {
  const arr = findItemArray(json);
  return arr ? arr.length : null;
}

function getPath(json: Json, path: string): Json {
  let cur: Json = json;
  for (const seg of path.split(".")) {
    if (!isObj(cur)) return undefined;
    cur = cur[seg];
  }
  return cur;
}

const CURSOR_PATHS = [
  "nextCursor",
  "next_cursor",
  "cursor",
  "next",
  "pagination.next",
  "pagination.nextCursor",
  "pagination.next_cursor",
  "meta.next",
  "meta.nextCursor",
  "meta.next_cursor",
];

/** Raw next-cursor value from a response, or null. */
export function findNextCursor(json: Json): string | null {
  for (const p of CURSOR_PATHS) {
    const v = getPath(json, p);
    if (typeof v === "string" && v.trim() !== "") return v;
    if (typeof v === "number" && Number.isFinite(v)) return String(v);
  }
  return null;
}

const HAS_MORE_KEYS = [
  "hasMore",
  "has_more",
  "hasNext",
  "has_next",
  "hasNextPage",
  "has_next_page",
  "next",
  "nextCursor",
  "next_cursor",
  "nextPage",
  "next_page",
  "nextPageToken",
  "next_page_token",
  "cursor",
  "total",
  "totalCount",
  "total_count",
  "totalPages",
  "total_pages",
  "totalResults",
];
const HAS_MORE_CONTAINERS = ["", "meta", "pagination", "paging", "links", "page_info", "pageInfo", "_links"];

/** True if the response tells clients whether another page exists. */
export function hasMoreIndicator(json: Json, linkHeader?: string | null): boolean {
  if (linkHeader && /rel="?next"?/i.test(linkHeader)) return true;
  if (!isObj(json)) return false;
  for (const c of HAS_MORE_CONTAINERS) {
    const scope = c ? json[c] : json;
    if (!isObj(scope)) continue;
    const keys = Object.keys(scope);
    for (const k of HAS_MORE_KEYS) if (keys.includes(k)) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* Next-page URL                                                       */
/* ------------------------------------------------------------------ */

export type NextResult = { ok: true; url: string } | { ok: false; reason: string };

export interface NextInput {
  /** URL of the page just fetched. */
  url: string;
  param: string;
  kind: PaginationKind;
  /** Parsed body of the page just fetched (null if not JSON). */
  json: Json;
  /** Item count of page 1, used as the offset step when no limit param exists. */
  firstPageItemCount: number | null;
}

function parseIntStrict(s: string | null): number | null {
  if (s === null || !/^-?\d+$/.test(s.trim())) return null;
  const n = Number(s.trim());
  return Number.isSafeInteger(n) ? n : null;
}

function limitFromUrl(url: string): number | null {
  for (const name of LIMIT_PARAMS) {
    const n = parseIntStrict(getQueryParam(url, name));
    if (n !== null && n > 0) return n;
  }
  return null;
}

/**
 * Resolve a cursor value that might be a full "next" URL. Only accepted if it
 * points at the same origin and path; then we take just the param's value from it.
 */
function cursorFromNext(raw: string, currentUrl: string, param: string): string | null {
  const looksLikeUrl = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) || raw.startsWith("/") || raw.startsWith("?");
  if (!looksLikeUrl) return raw;
  try {
    const cur = new URL(currentUrl);
    const next = new URL(raw, cur);
    if (next.origin !== cur.origin || next.pathname !== cur.pathname) return null;
    return getQueryParam(next.toString(), param);
  } catch {
    return null;
  }
}

/** Build the next page's URL by changing ONLY the pagination param. */
export function buildNextUrl(input: NextInput): NextResult {
  const { url, param, kind, json } = input;
  const current = getQueryParam(url, param);

  if (kind === "page") {
    const n = current === null ? 1 : parseIntStrict(current);
    if (n === null) return { ok: false, reason: `the ${param} value isn't a whole number` };
    return { ok: true, url: setQueryParam(url, param, String(n + 1)) };
  }

  if (kind === "offset") {
    const n = current === null ? 0 : parseIntStrict(current);
    if (n === null) return { ok: false, reason: `the ${param} value isn't a whole number` };
    const step = limitFromUrl(url) ?? input.firstPageItemCount;
    if (!step || step <= 0) return { ok: false, reason: "we couldn't tell the page size (no limit param and no item list in page 1)" };
    return { ok: true, url: setQueryParam(url, param, String(n + step)) };
  }

  const raw = findNextCursor(json);
  if (raw === null) return { ok: false, reason: "the response has no next cursor" };
  const cursor = cursorFromNext(raw, url, param);
  if (cursor === null || cursor === "") return { ok: false, reason: "the next link points somewhere else, so we didn't follow it" };
  if (cursor === current) return { ok: false, reason: "the next cursor is the same as the current one" };
  return { ok: true, url: setQueryParam(url, param, cursor) };
}

/** Defense in depth: next URLs must keep scheme, host, port and path. */
export function sameEndpoint(a: string, b: string): boolean {
  try {
    const x = new URL(a);
    const y = new URL(b);
    return x.protocol === y.protocol && x.host === y.host && x.pathname === y.pathname;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Early stop                                                          */
/* ------------------------------------------------------------------ */

export interface StopCheck {
  pageNumber: number;
  status: number;
  /** Decoded body bytes of this page. */
  body: Uint8Array;
  /** Decoded body bytes of the previous page. */
  previousBody: Uint8Array | null;
  json: Json;
}

function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/** Reason to discard this page and stop sampling, or null to keep it. */
export function stopReason(c: StopCheck): string | null {
  if (c.status < 200 || c.status >= 300) return `page ${c.pageNumber} returned HTTP ${c.status}`;
  const items = findItemArray(c.json);
  if (items && items.length === 0) return `page ${c.pageNumber} returned an empty list`;
  if (c.body.length === 0) return `page ${c.pageNumber} had an empty body`;
  if (c.previousBody && bytesEqual(c.body, c.previousBody)) return `page ${c.pageNumber} was identical to page ${c.pageNumber - 1}`;
  return null;
}

/* ------------------------------------------------------------------ */
/* Session math                                                        */
/* ------------------------------------------------------------------ */

export function pageRequests(sessions: number, pagesPerSession: number): number {
  return Math.max(0, sessions) * Math.max(0, pagesPerSession);
}

/** Monthly egress = sessions × pages per session × average page size. */
export function sessionEgressBytes(sessions: number, pagesPerSession: number, avgPageBytes: number): number {
  return pageRequests(sessions, pagesPerSession) * Math.max(0, avgPageBytes);
}

export function mean(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

/** Largest relative deviation from the mean (0.3 = 30%). */
export function maxDeviation(values: number[]): number {
  const m = mean(values);
  if (!(m > 0)) return 0;
  return Math.max(...values.map((v) => Math.abs(v - m) / m));
}

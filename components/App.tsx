"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { errorBucket, track, trafficBucket } from "../lib/analytics";
import { looksLikeCurl, normalizeUrl, parseCurl, CurlParseError } from "../lib/curl";
import { describeHeaders, previewCurl, SUPPORTED_METHODS } from "../lib/curlPreview";
import { DEMOS, type DemoId } from "../lib/demo";
import { announceEstimate, buildEstimate, DEFAULT_CLIENT_MIX, type ClientMix } from "../lib/estimate";
import { compactCount, formatNumber, parseCount } from "../lib/format";
import {
  DEFAULT_PAGES_PER_SESSION,
  detectPaginationParam,
  isValidParamName,
  MAX_PAGES_PER_SESSION,
  MAX_SAMPLED_PAGES,
  PAGINATION_PARAMS,
  pageRequests,
} from "../lib/pagination";
import { decodeRates, DEFAULT_PRICING, encodeRates, isCustom, isPricingModelId, type ModelRates, type PricingModelId, type PricingOptions } from "../lib/pricing";
import { sharePath, shareStateFromResult } from "../lib/share";
import type { AnalysisResult, ApiError, ErrorField } from "../lib/types";
import PricingPanel from "./PricingPanel";
import Results from "./Results";
import SiteFooter from "./SiteFooter";
import ToastHost, { showToast } from "./Toast";

type Tab = "curl" | "form" | "demo";
const TABS: { id: Tab; label: string }[] = [
  { id: "curl", label: "Paste curl" },
  { id: "form", label: "Form" },
  { id: "demo", label: "Demo" },
];
const METHODS = ["GET", "POST", "PUT", "PATCH"] as const;
const PRESETS = [1e5, 1e6, 1e7];
const SESSION_PRESETS = [1e4, 1e5, 1e6];
const DEFAULT_REQUESTS = 1_000_000;
const DEFAULT_SESSIONS = 100_000;
const MAX_REQUESTS = 1e13;
const MAX_BODY_BYTES = 100 * 1024;

const LS = {
  tab: "aecc:tab",
  requests: "aecc:requests",
  model: "aecc:model",
  freeTier: "aecc:freeTier",
  rates: "aecc:customRates",
  paginated: "aecc:paginated",
  pps: "aecc:pagesPerSession",
  sessions: "aecc:sessions",
  mix: "aecc:clientMix",
};

function lsGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: ignore */
  }
}

type CustomRatesMap = Partial<Record<PricingModelId, ModelRates>>;
type Errors = Partial<Record<ErrorField | "requests" | "sessions" | "pps", string>>;

/** What produced the result on screen, and the exact inputs at that moment. */
interface ResultMeta {
  kind: "demo" | "paste" | "curl" | "form";
  signature: string;
}
export type ResultStatus = "empty" | "loading" | "success" | "error" | "stale";

/** Pre-computed demo analyses. `socialPaged` is the social feed as 5 cursor pages. */
export type DemoResults = Record<DemoId, AnalysisResult> & { socialPaged: AnalysisResult };

interface Props {
  demoResults: DemoResults;
}

/** Specific, plain-language titles for server error codes. */
const ERROR_TITLES: Record<string, string> = {
  curl_parse: "Invalid curl",
  bad_method: "Unsupported method",
  private_address: "Blocked address",
  credentials_in_url: "Credentials in URL",
  bad_scheme: "Unsupported URL",
  bad_port: "Port not allowed",
  timeout: "Timed out",
  response_too_large: "Response too large",
  body_too_large: "Request body too large",
  dns_failed: "Host not found",
  network: "Couldn't connect",
  decode_failed: "Couldn't decode the response",
};
function errorText(code: string | undefined, message: string): string {
  const title = code ? ERROR_TITLES[code] : undefined;
  return title ? `${title}: ${message}` : message;
}

/** Shared handler for the thousands-separated count inputs (requests, sessions). */
function handleCountInput(v: string, setText: (s: string) => void, setValue: (n: number) => void, setError: (msg: string | null) => void) {
  if (/^[\d,\s]*$/.test(v)) {
    const n = parseCount(v);
    setText(n === null ? "" : formatNumber(n));
    if (n === null) {
      setValue(0);
      return;
    }
    if (n > MAX_REQUESTS) return setError("That's more than 10 trillion. Enter a smaller number.");
    setValue(n);
    setError(null);
    return;
  }
  setText(v);
  const n = parseCount(v);
  if (n === null || n > MAX_REQUESTS) setError("Enter a whole number like 25,000,000 (or 25M).");
  else {
    setValue(n);
    setError(null);
  }
}

const demoLabel = (id: DemoId, paged = false) =>
  id === "social" && paged ? "Example: Social media feed (5 pages × 10 posts)" : `Example: ${DEMOS.find((d) => d.id === id)!.label}`;

export default function App({ demoResults }: Props) {
  const [tab, setTab] = useState<Tab>("demo");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ curl: null, form: null, demo: null });

  // Inputs
  const [curlText, setCurlText] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]>("GET");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [body, setBody] = useState("");
  const [demoId, setDemoId] = useState<DemoId | "paste">("social");
  const [pasteJson, setPasteJson] = useState("");
  const [servedAs, setServedAs] = useState<"identity" | "gzip" | "br">("identity");
  const curlRef = useRef<HTMLTextAreaElement>(null);
  const requestsRef = useRef<HTMLInputElement>(null);
  const sessionsRef = useRef<HTMLInputElement>(null);

  // Result + measurement state
  const [result, setResult] = useState<AnalysisResult | null>(demoResults.social);
  const [resultLabel, setResultLabel] = useState(demoLabel("social"));
  const [resultMeta, setResultMeta] = useState<ResultMeta>({ kind: "demo", signature: "demo|social" });
  const [resultKey, setResultKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [lastError, setLastError] = useState<string | null>(null);
  const [measureNote, setMeasureNote] = useState<{ tone: "warn" | "info"; text: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [announce, setAnnounce] = useState("");
  const abortRef = useRef<{ ctrl: AbortController; cancelled: boolean } | null>(null);

  // Traffic
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const [requestsText, setRequestsText] = useState(formatNumber(DEFAULT_REQUESTS));
  const [paginated, setPaginated] = useState(false);
  const [paramName, setParamName] = useState("");
  const [pps, setPps] = useState(DEFAULT_PAGES_PER_SESSION);
  const [ppsText, setPpsText] = useState(String(DEFAULT_PAGES_PER_SESSION));
  const [sessions, setSessions] = useState(DEFAULT_SESSIONS);
  const [sessionsText, setSessionsText] = useState(formatNumber(DEFAULT_SESSIONS));
  const lastDetected = useRef<string | null>(null);

  // Pricing
  const [pricingBase, setPricingBase] = useState<Pick<PricingOptions, "model" | "freeTier">>(DEFAULT_PRICING);
  /** Visitor-entered rates, kept per model so switching models doesn't lose them. */
  const [customRates, setCustomRates] = useState<CustomRatesMap>({});
  const pricing: PricingOptions = useMemo(() => ({ ...pricingBase, custom: customRates[pricingBase.model] ?? null }), [pricingBase, customRates]);
  const [mix, setMix] = useState<ClientMix>(DEFAULT_CLIENT_MIX);
  const [hydrated, setHydrated] = useState(false);

  /* ---------- restore state: legacy URL params > localStorage > defaults ---------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedTab = lsGet(LS.tab);
    if (storedTab === "curl" || storedTab === "form" || storedTab === "demo") setTab(storedTab);

    const r = params.get("r") ?? lsGet(LS.requests);
    const n = r ? parseCount(r) : null;
    if (n !== null && n >= 0 && n <= MAX_REQUESTS) {
      setRequests(n);
      setRequestsText(formatNumber(n));
    }
    const pg = params.get("pg") ?? lsGet(LS.paginated);
    if (pg === "1" || pg === "0") setPaginated(pg === "1");
    const ppsRaw = params.get("pps") ?? lsGet(LS.pps);
    const ppsN = ppsRaw ? Number(ppsRaw) : NaN;
    if (Number.isInteger(ppsN) && ppsN >= 1 && ppsN <= MAX_PAGES_PER_SESSION) {
      setPps(ppsN);
      setPpsText(String(ppsN));
    }
    const sRaw = params.get("s") ?? lsGet(LS.sessions);
    const sN = sRaw ? parseCount(sRaw) : null;
    if (sN !== null && sN >= 0 && sN <= MAX_REQUESTS) {
      setSessions(sN);
      setSessionsText(formatNumber(sN));
    }

    const m = lsGet(LS.model);
    const ft = lsGet(LS.freeTier);
    setPricingBase({
      model: isPricingModelId(m) ? m : DEFAULT_PRICING.model,
      freeTier: ft === "0" ? false : ft === "1" ? true : DEFAULT_PRICING.freeTier,
    });
    try {
      const saved = JSON.parse(lsGet(LS.rates) ?? "{}") as Record<string, unknown>;
      const restored: CustomRatesMap = {};
      for (const [id, enc] of Object.entries(saved)) {
        const rr = isPricingModelId(id) && typeof enc === "string" ? decodeRates(enc) : null;
        if (rr && isPricingModelId(id)) restored[id] = rr;
      }
      setCustomRates(restored);
      const mx = JSON.parse(lsGet(LS.mix) ?? "null") as ClientMix | null;
      if (mx && [mx.web, mx.ios, mx.android].every((v) => typeof v === "number" && v >= 0 && v <= 100)) setMix(mx);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) lsSet(LS.tab, tab);
  }, [tab, hydrated]);
  useEffect(() => {
    if (hydrated) lsSet(LS.requests, String(requests));
  }, [requests, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    lsSet(LS.paginated, paginated ? "1" : "0");
    lsSet(LS.pps, String(pps));
    lsSet(LS.sessions, String(sessions));
  }, [paginated, pps, sessions, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    lsSet(LS.model, pricingBase.model);
    lsSet(LS.freeTier, pricingBase.freeTier ? "1" : "0");
  }, [pricingBase, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    const out: Record<string, string> = {};
    for (const [id, r] of Object.entries(customRates)) if (r) out[id] = encodeRates(r);
    lsSet(LS.rates, Object.keys(out).length ? JSON.stringify(out) : null);
  }, [customRates, hydrated]);
  useEffect(() => {
    if (hydrated) lsSet(LS.mix, JSON.stringify(mix));
  }, [mix, hydrated]);

  /* ------------------------ pagination detection ------------------------ */
  const curlPreview = useMemo(() => (tab === "curl" ? previewCurl(curlText) : null), [tab, curlText]);
  const activeUrl = useMemo(() => {
    if (tab === "form") return normalizeUrl(url) || null;
    if (tab === "curl" && curlText.trim()) {
      try {
        return parseCurl(curlText).url;
      } catch {
        return null;
      }
    }
    return null;
  }, [tab, url, curlText]);
  const detectedParam = useMemo(() => detectPaginationParam(activeUrl), [activeUrl]);

  // Switch the toggle on when a pagination param newly appears in the URL.
  // If the user then turns it off, it stays off until the detected param changes.
  useEffect(() => {
    if (detectedParam && detectedParam !== lastDetected.current) {
      setPaginated(true);
      setParamName(detectedParam);
      clearError("param");
    }
    lastDetected.current = detectedParam;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedParam]);

  /* ---------------------- result state (stale detection) ---------------------- */
  /** A fingerprint of the inputs that a measurement depends on. Traffic and pricing are not part of it. */
  const signature = useMemo(() => {
    const pg = paginated ? paramName.trim() : "";
    if (tab === "curl") return `curl|${curlText.trim()}|${pg}`;
    if (tab === "form") return `form|${method}|${normalizeUrl(url)}|${token.trim()}|${method !== "GET" ? body : ""}|${pg}`;
    return demoId === "paste" ? `paste|${pasteJson}|${servedAs}` : `demo|${demoId}`;
  }, [tab, curlText, method, url, token, body, demoId, pasteJson, servedAs, paginated, paramName]);

  const stale = !!result && resultMeta.signature !== signature;
  const status: ResultStatus = loading ? "loading" : lastError ? "error" : !result ? "empty" : stale ? "stale" : "success";

  // An old error stops being "the" state once the inputs change.
  useEffect(() => setLastError(null), [signature]);

  /* ---------------------------- tabs ---------------------------- */
  const onTabKey = (e: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === tab);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    const id = TABS[next].id;
    setTab(id);
    tabRefs.current[id]?.focus();
  };

  const clearError = (f: keyof Errors) => setErrors((e) => (e[f] ? { ...e, [f]: undefined } : e));

  /* ---------------------------- measure ---------------------------- */
  const showResult = useCallback((r: AnalysisResult, label: string, meta: ResultMeta) => {
    setResult(r);
    setResultLabel(label);
    setResultMeta(meta);
    setResultKey((k) => k + 1);
  }, []);

  const pageReqs = pageRequests(sessions, pps);
  /** What the cost table multiplies by: requests, or sessions × pages per session. */
  const effectiveRequests = paginated ? pageReqs : requests;

  // The social demo has a paginated twin; show whichever matches the toggle.
  const isSocialDemo = result === demoResults.social || result === demoResults.socialPaged;
  const displayed = isSocialDemo ? (paginated ? demoResults.socialPaged : demoResults.social) : result;
  const displayedLabel = isSocialDemo ? demoLabel("social", paginated) : resultLabel;

  // Announce each new result once: "Estimated savings: $46.83 per month."
  useEffect(() => {
    if (resultKey === 0 || !displayed) return;
    setAnnounce(announceEstimate(buildEstimate(displayed, effectiveRequests, pricing, paginated, mix)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultKey]);

  function cancelMeasure() {
    if (!abortRef.current) return;
    abortRef.current.cancelled = true;
    abortRef.current.ctrl.abort();
  }

  async function callApi(payload: Record<string, unknown>, label: string, field: ErrorField, meta: ResultMeta) {
    cancelMeasure();
    const ctrl = new AbortController();
    const run = { ctrl, cancelled: false };
    abortRef.current = run;
    let timedOut = false;
    const live = meta.kind === "curl" || meta.kind === "form";
    const pagedRun = live && !!payload.pagination;
    const t = setTimeout(() => {
      timedOut = true;
      ctrl.abort();
    }, pagedRun ? 45_000 : 25_000);

    setLoading(true);
    setErrors({});
    setLastError(null);
    setMeasureNote(null);
    setProgress(pagedRun ? `Fetching page 1 of up to ${MAX_SAMPLED_PAGES}…` : live ? "Fetching your API…" : "Measuring your sample…");
    setAnnounce("Measuring…");

    const fail = (code: string | undefined, message: string, f: ErrorField) => {
      const text = errorText(code, message);
      setErrors({ [f]: text });
      setLastError(text);
      setAnnounce(`Error: ${text}`);
      if (live) track("curl_measured", { mode: meta.kind as "curl" | "form", outcome: "error", error: errorBucket(code), paginated: pagedRun });
    };

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pagedRun ? { ...payload, progress: true } : payload),
        signal: ctrl.signal,
      });
      let data: AnalysisResult | null = null;
      let apiErr: ApiError["error"] | null = null;

      if ((res.headers.get("content-type") ?? "").includes("ndjson") && res.body) {
        // Paginated runs stream progress lines, then the result.
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let i: number;
          while ((i = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, i).trim();
            buf = buf.slice(i + 1);
            if (!line) continue;
            const msg = JSON.parse(line) as { type: string; page?: number; of?: number; result?: AnalysisResult; error?: ApiError["error"] };
            if (msg.type === "progress") setProgress(`Fetching page ${msg.page} of up to ${msg.of}…`);
            else if (msg.type === "result") data = msg.result ?? null;
            else if (msg.type === "error") apiErr = msg.error ?? null;
          }
        }
      } else {
        const j = (await res.json().catch(() => null)) as AnalysisResult | ApiError | null;
        if (!res.ok || !j || "error" in j) apiErr = j && "error" in j ? j.error : null;
        else data = j;
      }

      if (!data) {
        if (apiErr?.code === "cancelled") return;
        fail(apiErr?.code, apiErr?.message ?? "Something went wrong. Please try again.", apiErr?.field ?? field);
        return;
      }

      showResult(data, label, meta);
      if (live) {
        const ct = (data.contentType ?? "").split(";")[0].trim().toLowerCase();
        const rejected = data.status === 401 || data.status === 403;
        if (rejected) setMeasureNote({ tone: "warn", text: `The API rejected the request (HTTP ${data.status}). Check your token or use a staging endpoint.` });
        else if (!data.isJson && data.rawBytes > 0)
          setMeasureNote({ tone: "info", text: ct === "text/html" ? "This returned HTML. Measuring it anyway." : `This returned ${ct || "a non-JSON body"}, not JSON. Measuring it anyway.` });
        track("curl_measured", {
          mode: meta.kind as "curl" | "form",
          outcome: rejected ? "error" : "success",
          error: rejected ? "http_401_403" : "none",
          paginated: pagedRun,
        });
      } else {
        track("demo_used", { demo: "paste" });
      }
    } catch {
      if (run.cancelled) {
        setAnnounce("Measurement cancelled.");
        if (live) track("curl_measured", { mode: meta.kind as "curl" | "form", outcome: "cancelled", error: "none", paginated: pagedRun });
        return;
      }
      fail(
        timedOut ? "timeout" : "network",
        timedOut
          ? "The measurement took too long. The API may be slow or unreachable. Try again or use a lighter endpoint."
          : "We couldn't reach our server. Check your connection and try again.",
        field,
      );
    } finally {
      clearTimeout(t);
      if (abortRef.current === run) {
        abortRef.current = null;
        setLoading(false);
        setProgress("");
      }
    }
  }

  function describe(m: string, u: string): string {
    try {
      const x = new URL(u);
      const path = x.pathname.length > 40 ? x.pathname.slice(0, 40) + "…" : x.pathname;
      return `${m} ${x.host}${path}`;
    } catch {
      return `${m} request`;
    }
  }

  /** Pagination options for the API, or an error message for the param field. */
  function paginationPayload(): { pagination?: { param: string }; error?: string } {
    if (!paginated) return {};
    const p = paramName.trim();
    if (!p) return { error: "Enter the query parameter that changes per page, e.g. page, offset or cursor." };
    if (!isValidParamName(p)) return { error: "Use letters, numbers, _ - . [ ] only (max 64 characters)." };
    return { pagination: { param: p } };
  }

  function submitCurl() {
    const text = curlText.trim();
    if (!text) {
      setErrors({ curl: "Paste a curl command first, e.g. curl https://api.example.com/items" });
      return;
    }
    try {
      const parsed = parseCurl(text);
      if (!SUPPORTED_METHODS.includes(parsed.method)) {
        setErrors({ curl: errorText("bad_method", `${parsed.method} isn't supported. Use GET, POST, PUT or PATCH.`) });
        return;
      }
      const pg = paginationPayload();
      if (pg.error) {
        setErrors({ param: pg.error });
        setAnnounce(`Error: ${pg.error}`);
        return;
      }
      void callApi({ mode: "curl", curl: text, ...pg }, describe(parsed.method, parsed.url), "curl", { kind: "curl", signature });
    } catch (e) {
      const msg = errorText("curl_parse", e instanceof CurlParseError ? e.message : "We couldn't read that curl command.");
      setErrors({ curl: msg });
      setAnnounce(`Error: ${msg}`);
      track("curl_measured", { mode: "curl", outcome: "error", error: "curl_parse", paginated });
    }
  }

  function submitForm() {
    const errs: Errors = {};
    const u = normalizeUrl(url);
    if (!u) errs.url = "Enter the API URL you want to measure, e.g. api.example.com/items";
    else {
      try {
        const parsed = new URL(u);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") errs.url = "Only http:// and https:// URLs are supported.";
      } catch {
        errs.url = "That doesn't look like a valid URL. Try something like https://api.example.com/items";
      }
    }
    const hasBody = method !== "GET" && body.trim() !== "";
    if (hasBody) {
      try {
        JSON.parse(body);
      } catch (e) {
        errs.body = `This isn't valid JSON (${(e as Error).message.replace(/^JSON\.parse: /, "")}). Check for missing quotes or trailing commas.`;
      }
      if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) errs.body = "The body is over 100 KB. Send a smaller sample.";
    }
    if (/[\r\n]/.test(token)) errs.token = "The token can't contain line breaks.";
    const pg = paginationPayload();
    if (pg.error) errs.param = pg.error;
    if (Object.keys(errs).length) {
      setErrors(errs);
      setAnnounce(`Error: ${Object.values(errs)[0]}`);
      return;
    }
    const headers: Record<string, string> = { Accept: "application/json, */*;q=0.8" };
    const tok = token.trim().replace(/^Bearer\s+/i, "");
    if (tok) headers["Authorization"] = `Bearer ${tok}`;
    if (hasBody) headers["Content-Type"] = "application/json";
    void callApi({ mode: "request", method, url: u, headers, body: hasBody ? body : undefined, ...pg }, describe(method, u), "url", { kind: "form", signature });
  }

  function showDemo(id: DemoId) {
    setErrors({});
    setMeasureNote(null);
    showResult(demoResults[id], demoLabel(id), { kind: "demo", signature: `demo|${id}` });
    track("demo_used", { demo: id });
  }

  function submitDemo() {
    if (demoId === "paste") {
      if (!pasteJson.trim()) {
        setErrors({ json: "Paste a sample response first (JSON or text)." });
        return;
      }
      void callApi({ mode: "payload", json: pasteJson, servedAs }, "Your pasted sample", "json", { kind: "paste", signature });
      return;
    }
    showDemo(demoId);
  }

  function measure() {
    if (loading) return;
    if (tab === "curl") submitCurl();
    else if (tab === "form") submitForm();
    else submitDemo();
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    measure();
  };

  function switchToCurl(text: string) {
    setCurlText(text.trim());
    setTab("curl");
    setErrors({});
    setAnnounce("That looks like a curl command, so we switched to the Paste curl tab.");
    requestAnimationFrame(() => curlRef.current?.focus());
  }

  /* ---------------------------- traffic ---------------------------- */
  const setCountError = (key: "requests" | "sessions") => (msg: string | null) =>
    setErrors((e) => (msg ? { ...e, [key]: msg } : e[key] ? { ...e, [key]: undefined } : e));
  const onRequestsChange = (v: string) => handleCountInput(v, setRequestsText, setRequests, setCountError("requests"));
  const onSessionsChange = (v: string) => handleCountInput(v, setSessionsText, setSessions, setCountError("sessions"));

  function onPpsChange(v: string) {
    setPpsText(v);
    const n = Number(v);
    if (v.trim() !== "" && Number.isInteger(n) && n >= 1 && n <= MAX_PAGES_PER_SESSION) {
      setPps(n);
      clearError("pps");
    } else {
      setErrors((e) => ({ ...e, pps: `Enter a whole number from 1 to ${MAX_PAGES_PER_SESSION}.` }));
    }
  }
  const trackTraffic = (input: "preset" | "custom", unit: "requests" | "sessions", n: number) =>
    track("traffic_changed", { input, unit, bucket: trafficBucket(n) });

  function onPricingChange(p: { model: PricingModelId; freeTier: boolean }) {
    setPricingBase(p);
    track("pricing_mode_changed", { model: p.model, free_tier: p.freeTier, custom_rates: isCustom({ ...p, custom: customRates[p.model] ?? null }) });
  }

  /**
   * Share link to /s: sizes, traffic and pricing only (see lib/share.ts).
   * Never the curl command, URL, headers, cookies, tokens or body.
   */
  async function share() {
    if (!displayed || displayed.rawBytes === 0) return;
    track("share_clicked", { source: "calculator" });
    const state = shareStateFromResult(displayed, {
      requests: effectiveRequests,
      paging: paginated ? { sessions, pagesPerSession: pps } : null,
      pricing,
    });
    const link = `${window.location.origin}${sharePath(state)}`;
    try {
      await navigator.clipboard.writeText(link);
      showToast("Link copied. It shares sizes, traffic and pricing only, never your URL, headers or response.");
    } catch {
      window.prompt("Copy this link. It shares sizes, traffic and pricing only:", link);
    }
  }

  const currentDemo = DEMOS.find((d) => d.id === demoId);
  const canMeasure = tab === "curl" ? !!curlText.trim() : tab === "form" ? !!url.trim() : demoId !== "paste" || !!pasteJson.trim();
  const measureLabel = tab === "demo" && demoId !== "paste" ? "Show example result" : "Measure response";

  return (
    <div className="page">
      <a href="#inputs" className="skip-link">
        Skip to calculator
      </a>
      <header className="hero">
        <p className="eyebrow">API Egress Cost Calculator</p>
        <h1>How much does your API response really cost?</h1>
        <p className="subtitle">Paste an endpoint, see your AWS data transfer bill, and what compression would save.</p>
        <p className="hero-hint">Try the demo, or paste a curl command. Takes a few seconds.</p>
      </header>

      <main className="layout">
        <section className="inputs" id="inputs" aria-label="Inputs">
          <div className="card">
            <h2 className="step">
              <span className="step-num" aria-hidden="true">1</span> Measure your API response
            </h2>
            <div role="tablist" aria-label="Input mode" className="tabs" onKeyDown={onTabKey}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  className="tab"
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} noValidate>
              {tab === "curl" && (
                <div role="tabpanel" id="panel-curl" aria-labelledby="tab-curl" className="panel">
                  <div className="label-row">
                    <label htmlFor="curl">curl command</label>
                    <CurlTips />
                  </div>
                  <textarea
                    id="curl"
                    ref={curlRef}
                    className="mono"
                    rows={6}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    enterKeyHint="go"
                    placeholder={`curl https://api.example.com/v1/items \\\n  -H 'Authorization: Bearer test_token'`}
                    value={curlText}
                    onChange={(e) => {
                      setCurlText(e.target.value);
                      clearError("curl");
                    }}
                    aria-invalid={!!errors.curl}
                    aria-describedby={`curl-preview curl-note${errors.curl ? " curl-error" : ""}`}
                  />
                  <CurlConfirm preview={curlPreview} />
                  <FieldError id="curl-error" msg={errors.curl} />
                  <PrivacyNote id="curl-note" />
                </div>
              )}

              {tab === "form" && (
                <div role="tabpanel" id="panel-form" aria-labelledby="tab-form" className="panel">
                  <div className="field-row">
                    <div className="field method-field">
                      <label htmlFor="method">Method</label>
                      <select id="method" value={method} onChange={(e) => setMethod(e.target.value as (typeof METHODS)[number])}>
                        {METHODS.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field grow">
                      <label htmlFor="url">URL</label>
                      <input
                        id="url"
                        type="text"
                        inputMode="url"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        placeholder="api.example.com/v1/items"
                        value={url}
                        onPaste={(e) => {
                          const text = e.clipboardData.getData("text");
                          if (looksLikeCurl(text)) {
                            e.preventDefault();
                            switchToCurl(text);
                          }
                        }}
                        onChange={(e) => {
                          if (looksLikeCurl(e.target.value)) return switchToCurl(e.target.value);
                          setUrl(e.target.value);
                          clearError("url");
                        }}
                        aria-invalid={!!errors.url}
                        aria-describedby={errors.url ? "url-error" : "url-hint"}
                      />
                    </div>
                  </div>
                  <FieldError id="url-error" msg={errors.url} />
                  {!errors.url && (
                    <p className="hint" id="url-hint">
                      No https:// needed. Pasting a curl command here switches to the curl tab.
                    </p>
                  )}

                  <div className="field">
                    <label htmlFor="token">
                      Bearer token <span className="optional">(optional)</span>
                    </label>
                    <div className="input-with-button">
                      <input
                        id="token"
                        type={showToken ? "text" : "password"}
                        autoComplete="off"
                        spellCheck={false}
                        value={token}
                        onChange={(e) => {
                          setToken(e.target.value);
                          clearError("token");
                        }}
                        aria-invalid={!!errors.token}
                        aria-describedby={errors.token ? "token-error" : undefined}
                      />
                      <button type="button" className="btn-ghost small" aria-pressed={showToken} onClick={() => setShowToken((s) => !s)}>
                        {showToken ? "Hide" : "Show"}
                        <span className="sr-only"> token</span>
                      </button>
                    </div>
                    <FieldError id="token-error" msg={errors.token} />
                  </div>

                  {method !== "GET" && (
                    <div className="field">
                      <label htmlFor="body">
                        JSON body <span className="optional">(optional, max 100 KB)</span>
                      </label>
                      <textarea
                        id="body"
                        className="mono"
                        rows={5}
                        spellCheck={false}
                        placeholder='{"query": "shoes", "limit": 50}'
                        value={body}
                        onChange={(e) => {
                          setBody(e.target.value);
                          clearError("body");
                        }}
                        aria-invalid={!!errors.body}
                        aria-describedby={errors.body ? "body-error" : undefined}
                      />
                      <FieldError id="body-error" msg={errors.body} />
                    </div>
                  )}
                  <PrivacyNote id="form-note" />
                </div>
              )}

              {tab === "demo" && (
                <div role="tabpanel" id="panel-demo" aria-labelledby="tab-demo" className="panel">
                  <div className="field">
                    <label htmlFor="demo">Sample payload</label>
                    <select
                      id="demo"
                      value={demoId}
                      onChange={(e) => {
                        const v = e.target.value as DemoId | "paste";
                        setDemoId(v);
                        setErrors({});
                        if (v !== "paste") showDemo(v);
                      }}
                    >
                      {DEMOS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                      <option value="paste">Paste your own sample response…</option>
                    </select>
                    {currentDemo && <p className="hint">{currentDemo.blurb} No network call: generated data.</p>}
                  </div>
                  {demoId === "paste" && (
                    <>
                      <div className="field">
                        <label htmlFor="paste">Sample response</label>
                        <textarea
                          id="paste"
                          className="mono"
                          rows={6}
                          spellCheck={false}
                          placeholder='{"items": [ ... ]}'
                          value={pasteJson}
                          onChange={(e) => {
                            setPasteJson(e.target.value);
                            clearError("json");
                          }}
                          aria-invalid={!!errors.json}
                          aria-describedby={errors.json ? "paste-error" : "paste-hint"}
                        />
                        <FieldError id="paste-error" msg={errors.json} />
                        {!errors.json && (
                          <p className="hint" id="paste-hint">
                            Measured on our server, never stored. No outbound request is made.
                          </p>
                        )}
                      </div>
                      <div className="field">
                        <label htmlFor="served">How is it served today?</label>
                        <select id="served" value={servedAs} onChange={(e) => setServedAs(e.target.value as typeof servedAs)}>
                          <option value="identity">Uncompressed</option>
                          <option value="gzip">Gzip</option>
                          <option value="br">Brotli</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="pagination-box">
                <label className="switch">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={paginated}
                    onChange={(e) => {
                      setPaginated(e.target.checked);
                      if (e.target.checked && !paramName && detectedParam) setParamName(detectedParam);
                      clearError("param");
                    }}
                    aria-describedby={detectedParam ? "pagination-detected" : undefined}
                  />
                  <span className="switch-track" aria-hidden="true">
                    <span className="switch-thumb" />
                  </span>
                  <span className="switch-label">Is this endpoint paginated?</span>
                </label>
                {detectedParam && tab !== "demo" && (
                  <p className="hint detected" id="pagination-detected">
                    Detected pagination param: <code>{detectedParam}</code>
                  </p>
                )}

                {paginated &&
                  (tab === "demo" ? (
                    <p className="hint">
                      {demoId === "social"
                        ? "The Social media feed demo has 5 locally generated cursor pages (10 posts each). No network call."
                        : demoId === "paste"
                          ? "A pasted sample counts as one average page."
                          : "Only the Social media feed demo is paginated. This one counts as a single page."}
                    </p>
                  ) : (
                    <div className="field pagination-fields">
                      <label htmlFor="page-param">Pagination param</label>
                      <input
                        id="page-param"
                        type="text"
                        list="page-param-options"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        placeholder="e.g. page, offset or cursor"
                        value={paramName}
                        onChange={(e) => {
                          setParamName(e.target.value);
                          clearError("param");
                        }}
                        aria-invalid={!!errors.param}
                        aria-describedby={errors.param ? "param-error" : "param-hint"}
                      />
                      <datalist id="page-param-options">
                        {PAGINATION_PARAMS.map((p) => (
                          <option key={p} value={p} />
                        ))}
                      </datalist>
                      <FieldError id="param-error" msg={errors.param} />
                      {!errors.param && (
                        <p className="hint" id="param-hint">
                          We fetch up to {MAX_SAMPLED_PAGES} real pages, one at a time, changing only this param.
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              <FieldError id="general-error" msg={errors.general} />
              <div className="measure-actions">
                <button type="submit" className="btn-primary" disabled={loading} aria-busy={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> {progress || "Measuring…"}
                    </>
                  ) : (
                    measureLabel
                  )}
                </button>
                {loading && (
                  <button type="button" className="btn-ghost" onClick={cancelMeasure}>
                    Cancel
                  </button>
                )}
              </div>
              {measureNote && !loading && (
                <p className={`measure-note measure-note-${measureNote.tone}`} role="status">
                  {measureNote.text}
                </p>
              )}
            </form>
          </div>

          <div className="card">
            <h2 className="step">
              <span className="step-num" aria-hidden="true">2</span> Your traffic
            </h2>
            <p className="step-intro">Adjust the estimate — it updates instantly, no need to measure again.</p>
            <div className="traffic-body">
            {paginated ? (
              <>
                <div className="field">
                  <label htmlFor="sessions">Sessions per month</label>
                  <input
                    id="sessions"
                    ref={sessionsRef}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={sessionsText}
                    onChange={(e) => onSessionsChange(e.target.value)}
                    onBlur={() => {
                      if (!errors.sessions) setSessionsText(formatNumber(sessions));
                      trackTraffic("custom", "sessions", sessions);
                    }}
                    aria-invalid={!!errors.sessions}
                    aria-describedby={errors.sessions ? "sessions-error" : "traffic-derived"}
                  />
                  <FieldError id="sessions-error" msg={errors.sessions} />
                  <div className="chips" role="group" aria-label="Preset sessions per month">
                    {SESSION_PRESETS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className="chip"
                        aria-pressed={sessions === p}
                        onClick={() => {
                          setSessions(p);
                          setSessionsText(formatNumber(p));
                          clearError("sessions");
                          trackTraffic("preset", "sessions", p);
                        }}
                      >
                        {compactCount(p)}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="chip"
                      aria-pressed={!SESSION_PRESETS.includes(sessions)}
                      onClick={() => {
                        sessionsRef.current?.focus();
                        sessionsRef.current?.select();
                      }}
                    >
                      Custom
                    </button>
                  </div>
                </div>
                <div className="field pps-field">
                  <label htmlFor="pps">Pages per session</label>
                  <input
                    id="pps"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={MAX_PAGES_PER_SESSION}
                    step={1}
                    value={ppsText}
                    onChange={(e) => onPpsChange(e.target.value)}
                    onBlur={() => {
                      if (!errors.pps) setPpsText(String(pps));
                    }}
                    aria-invalid={!!errors.pps}
                    aria-describedby={errors.pps ? "pps-error" : "traffic-derived"}
                  />
                  <FieldError id="pps-error" msg={errors.pps} />
                </div>
                <div className="traffic-total" id="traffic-derived" aria-live="polite">
                  <span className="traffic-total-label">Total</span>
                  <span className="traffic-total-value">{formatNumber(pageReqs)} requests/month</span>
                  <span className="traffic-total-sub">
                    {formatNumber(sessions)} sessions × {pps} page{pps === 1 ? "" : "s"} per session
                  </span>
                </div>
                <p className="hint">Monthly egress = average page size × requests per month. Headers and TLS overhead are not counted.</p>
              </>
            ) : (
              <div className="field">
                <label htmlFor="requests">Requests per month</label>
                <input
                  id="requests"
                  ref={requestsRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={requestsText}
                  onChange={(e) => onRequestsChange(e.target.value)}
                  onBlur={() => {
                    if (!errors.requests) setRequestsText(formatNumber(requests));
                    trackTraffic("custom", "requests", requests);
                  }}
                  aria-invalid={!!errors.requests}
                  aria-describedby={errors.requests ? "requests-error" : "requests-hint"}
                />
                <FieldError id="requests-error" msg={errors.requests} />
                <div className="chips" role="group" aria-label="Preset requests per month">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="chip"
                      aria-pressed={requests === p}
                      onClick={() => {
                        setRequests(p);
                        setRequestsText(formatNumber(p));
                        clearError("requests");
                        trackTraffic("preset", "requests", p);
                      }}
                    >
                      {compactCount(p)}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!PRESETS.includes(requests)}
                    onClick={() => {
                      requestsRef.current?.focus();
                      requestsRef.current?.select();
                    }}
                  >
                    Custom
                  </button>
                </div>
                <p className="hint" id="requests-hint">
                  Monthly egress = response size × requests per month. Assumes every request returns this response; headers and TLS overhead are not counted.
                </p>
              </div>
            )}
            </div>
          </div>

          <PricingPanel
            step={3}
            intro="Adjust the estimate — it updates instantly."
            pricing={pricing}
            onChange={onPricingChange}
            onRatesChange={(r) => {
              setCustomRates((m) => ({ ...m, [pricingBase.model]: r ?? undefined }));
              track("pricing_mode_changed", { model: pricingBase.model, free_tier: pricingBase.freeTier, custom_rates: !!r });
            }}
            editorKey={hydrated ? "ready" : "init"}
            onShare={share}
            shareDisabled={!displayed || displayed.rawBytes === 0}
          />
        </section>

        <section className="results" aria-label="Results" aria-busy={loading}>
          <StatusBanner
            status={status}
            progress={progress}
            lastError={lastError}
            resultKind={resultMeta.kind}
            resultLabel={displayedLabel}
            tab={tab}
            canMeasure={canMeasure}
            onMeasure={measure}
            onCancel={cancelMeasure}
          />
          <Results
            key={resultKey}
            result={displayed}
            label={displayedLabel}
            requests={effectiveRequests}
            paging={paginated ? { sessions, pagesPerSession: pps } : null}
            pricing={pricing}
            mix={mix}
            onMixChange={setMix}
            customRates={customRates}
            onUseModel={(m) => onPricingChange({ model: m, freeTier: pricingBase.freeTier })}
            animate={resultKey > 0}
            dimmed={status === "stale" || status === "loading" || status === "error"}
          />
        </section>
      </main>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      <SiteFooter />
      <ToastHost />
    </div>
  );
}

/** Tells the user, in words, whether the results match what's in the inputs. */
function StatusBanner({
  status,
  progress,
  lastError,
  resultKind,
  resultLabel,
  tab,
  canMeasure,
  onMeasure,
  onCancel,
}: {
  status: ResultStatus;
  progress: string;
  lastError: string | null;
  resultKind: ResultMeta["kind"];
  resultLabel: string;
  tab: Tab;
  canMeasure: boolean;
  onMeasure: () => void;
  onCancel: () => void;
}) {
  if (status === "loading") {
    return (
      <div className="status-banner status-loading" role="status">
        <span className="spinner spinner-dark" aria-hidden="true" />
        <span>{progress || "Measuring…"}</span>
        <button type="button" className="btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="status-banner status-error" role="alert">
        <span>
          <strong>Measurement failed.</strong> {lastError} The results below are from before.
        </span>
      </div>
    );
  }
  if (status === "stale") {
    const showingExample = resultKind === "demo" && tab !== "demo";
    const text = showingExample
      ? `Showing ${resultLabel.replace(/^Example: /, "example: ")}. ${
          canMeasure ? "Measure your response to see yours." : tab === "curl" ? "Paste a curl command and measure it to see yours." : "Enter your API URL and measure it to see yours."
        }`
      : "Inputs changed — measure again to update these results.";
    return (
      <div className="status-banner status-stale" role="status">
        <span>{text}</span>
        {canMeasure && (
          <button type="button" className="btn-ghost" onClick={onMeasure}>
            {showingExample ? "Measure response" : "Measure again"}
          </button>
        )}
      </div>
    );
  }
  return null;
}

/** "GET https://api.example.com/v1/items · 2 headers (Authorization: •••• hidden)" */
function CurlConfirm({ preview }: { preview: ReturnType<typeof previewCurl> }) {
  if (!preview) return <p className="curl-preview" id="curl-preview" hidden />;
  if (!preview.ok) {
    return (
      <p className="curl-preview curl-preview-warn" id="curl-preview">
        Invalid curl: {preview.error}
      </p>
    );
  }
  return (
    <p className={`curl-preview${preview.methodSupported ? "" : " curl-preview-warn"}`} id="curl-preview">
      <span className="curl-preview-label">Will send:</span>{" "}
      <code>
        {preview.method} {preview.url}
      </code>{" "}
      · {describeHeaders(preview.headerCount, preview.hidden)}
      {preview.bodyBytes > 0 ? ` · ${formatNumber(preview.bodyBytes)} byte body` : ""}
      {!preview.methodSupported && ` · ${preview.method} isn't supported. Use GET, POST, PUT or PATCH.`}
    </p>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p className="field-error" id={id}>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 4.5v4.2M8 10.8v.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {msg}
    </p>
  );
}

function PrivacyNote({ id }: { id: string }) {
  return (
    <p className="privacy" id={id}>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
        <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>
        Your request runs once on our server to measure the response. The body is never stored, and only its sizes and a 500-character preview come back to your browser. Sensitive headers (Authorization,
        Cookie, API keys) are never logged. Tip: use a staging endpoint or Demo mode.
      </span>
    </p>
  );
}

function CurlTips() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <span className="tip" ref={ref}>
      <button type="button" className="tip-btn" aria-expanded={open} aria-controls="curl-tips" onClick={() => setOpen((o) => !o)}>
        ?<span className="sr-only">curl tips</span>
      </button>
      {open && (
        <span className="tip-pop" id="curl-tips" role="note">
          <strong>Tips</strong>
          <span>In Chrome DevTools → Network, right-click a request → Copy → Copy as cURL (bash).</span>
          <span>Supported: -X, -H, -d / --data-raw / --data-binary / --json, -u. Multi-line commands with \ are fine.</span>
          <span>Ignored: --compressed, -L, -k, -s, -i, -v. We set Accept-Encoding ourselves.</span>
          <span>Up to 3 redirects are followed, and each one is re-checked. Credentials are dropped if a redirect leaves the original site.</span>
        </span>
      )}
    </span>
  );
}

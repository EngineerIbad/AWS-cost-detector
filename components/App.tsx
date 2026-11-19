"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { looksLikeCurl, normalizeUrl, parseCurl, CurlParseError } from "../lib/curl";
import { DEMOS, type DemoId } from "../lib/demo";
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
import {
  decodeTiers,
  encodeTiers,
  getDefaultPricing,
  isDefaultPricing,
  pricingToDraft,
  validatePricing,
  type Pricing,
  type PricingDraft,
} from "../lib/pricing";
import type { AnalysisResult, ApiError, ErrorField } from "../lib/types";
import PricingPanel from "./PricingPanel";
import Results from "./Results";

type Tab = "curl" | "form" | "demo";
const TABS: { id: Tab; label: string }[] = [
  { id: "curl", label: "Paste curl" },
  { id: "form", label: "Form" },
  { id: "demo", label: "Demo" },
];
const METHODS = ["GET", "POST", "PUT", "PATCH"] as const;
const PRESETS = [1e6, 1e7, 1e8, 1e9];
const SESSION_PRESETS = [1e5, 1e6, 1e7, 1e8];
const DEFAULT_REQUESTS = 10_000_000;
const DEFAULT_SESSIONS = 5_000_000;
const MAX_REQUESTS = 1e13;
const MAX_BODY_BYTES = 100 * 1024;

const LS = {
  tab: "aecc:tab",
  requests: "aecc:requests",
  pricing: "aecc:pricing",
  paginated: "aecc:paginated",
  pps: "aecc:pagesPerSession",
  sessions: "aecc:sessions",
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

type Errors = Partial<Record<ErrorField | "requests" | "sessions" | "pps", string>>;

/** Pre-computed demo analyses. `socialPaged` is the social feed as 5 cursor pages. */
export type DemoResults = Record<DemoId, AnalysisResult> & { socialPaged: AnalysisResult };

interface Props {
  demoResults: DemoResults;
}

/** Shared handler for the thousands-separated count inputs (requests, sessions). */
function handleCountInput(
  v: string,
  setText: (s: string) => void,
  setValue: (n: number) => void,
  setError: (msg: string | null) => void,
) {
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

  // Results
  const [result, setResult] = useState<AnalysisResult | null>(demoResults.social);
  const [resultLabel, setResultLabel] = useState(`Demo · ${DEMOS[0].label}`);
  const [resultKey, setResultKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [announce, setAnnounce] = useState("");

  // Traffic + pricing
  const [requests, setRequests] = useState(DEFAULT_REQUESTS);
  const [requestsText, setRequestsText] = useState(formatNumber(DEFAULT_REQUESTS));

  // Pagination
  const [paginated, setPaginated] = useState(false);
  const [paramName, setParamName] = useState("");
  const [pps, setPps] = useState(DEFAULT_PAGES_PER_SESSION);
  const [ppsText, setPpsText] = useState(String(DEFAULT_PAGES_PER_SESSION));
  const [sessions, setSessions] = useState(DEFAULT_SESSIONS);
  const [sessionsText, setSessionsText] = useState(formatNumber(DEFAULT_SESSIONS));
  const lastDetected = useRef<string | null>(null);
  const [draft, setDraft] = useState<PricingDraft>(() => pricingToDraft(getDefaultPricing()));
  const lastValid = useRef<Pricing>(getDefaultPricing());
  const [hydrated, setHydrated] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const validation = useMemo(() => validatePricing(draft), [draft]);
  if (validation.ok && validation.pricing) lastValid.current = validation.pricing;
  const pricing = validation.ok && validation.pricing ? validation.pricing : lastValid.current;
  const usingDefaults = validation.ok && !!validation.pricing && isDefaultPricing(validation.pricing);

  /* ---------- restore state: share URL > localStorage > defaults ---------- */
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

    let restored: Pricing | null = null;
    const p = params.get("p");
    if (p) {
      const tiers = decodeTiers(p);
      const c = (params.get("c") ?? "USD").slice(0, 8).trim() || "USD";
      if (tiers) restored = { currency: c, tiers };
    } else {
      const stored = lsGet(LS.pricing);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Pricing;
          const v = validatePricing(pricingToDraft(parsed));
          if (v.ok && v.pricing) restored = v.pricing;
        } catch {
          /* ignore corrupt storage */
        }
      }
    }
    if (restored) setDraft(pricingToDraft(restored));
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
    if (!hydrated || !validation.ok || !validation.pricing) return;
    lsSet(LS.pricing, isDefaultPricing(validation.pricing) ? null : JSON.stringify(validation.pricing));
  }, [validation, hydrated]);

  /* ------------------------ pagination detection ------------------------ */
  const activeUrl = useMemo(() => {
    if (tab === "form") {
      const u = normalizeUrl(url);
      return u || null;
    }
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

  /* ---------------------------- analyze ---------------------------- */
  const showResult = useCallback((r: AnalysisResult, label: string) => {
    setResult(r);
    setResultLabel(label);
    setResultKey((k) => k + 1);
    const n = r.findings.length;
    setAnnounce(`Analysis complete for ${label}. ${n} recommendation${n === 1 ? "" : "s"}.`);
  }, []);

  async function callApi(payload: unknown, label: string, field: ErrorField) {
    setLoading(true);
    setErrors({});
    setAnnounce("Analyzing…");
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), paginated ? 40_000 : 25_000);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = (await res.json().catch(() => null)) as AnalysisResult | ApiError | null;
      if (!res.ok || !data || "error" in data) {
        const e = data && "error" in data ? data.error : null;
        const msg = e?.message ?? "Something went wrong. Please try again.";
        setErrors({ [e?.field ?? field]: msg });
        setAnnounce(`Error: ${msg}`);
        return;
      }
      showResult(data, label);
    } catch {
      const msg = ctrl.signal.aborted
        ? "The analysis took too long. The API may be slow or unreachable. Try again or use a lighter endpoint."
        : "We couldn't reach our server. Check your connection and try again.";
      setErrors({ [field]: msg });
      setAnnounce(`Error: ${msg}`);
    } finally {
      clearTimeout(t);
      setLoading(false);
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
      const pg = paginationPayload();
      if (pg.error) {
        setErrors({ param: pg.error });
        setAnnounce(`Error: ${pg.error}`);
        return;
      }
      void callApi({ mode: "curl", curl: text, ...pg }, describe(parsed.method, parsed.url), "curl");
    } catch (e) {
      const msg = e instanceof CurlParseError ? e.message : "We couldn't read that curl command.";
      setErrors({ curl: msg });
      setAnnounce(`Error: ${msg}`);
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
    void callApi({ mode: "request", method, url: u, headers, body: hasBody ? body : undefined, ...pg }, describe(method, u), "url");
  }

  function submitDemo() {
    if (demoId === "paste") {
      if (!pasteJson.trim()) {
        setErrors({ json: "Paste a sample response first (JSON or text)." });
        return;
      }
      void callApi({ mode: "payload", json: pasteJson, servedAs }, "Your pasted sample", "json");
      return;
    }
    setErrors({});
    const d = DEMOS.find((x) => x.id === demoId)!;
    showResult(demoResults[d.id], `Demo · ${d.label}`);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (tab === "curl") submitCurl();
    else if (tab === "form") submitForm();
    else submitDemo();
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

  const pageReqs = pageRequests(sessions, pps);
  /** What the cost table multiplies by: requests, or sessions × pages per session. */
  const effectiveRequests = paginated ? pageReqs : requests;

  async function share() {
    const params = new URLSearchParams();
    params.set("r", String(requests));
    params.set("pg", paginated ? "1" : "0");
    params.set("pps", String(pps));
    params.set("s", String(sessions));
    params.set("p", encodeTiers(pricing.tiers));
    if (pricing.currency !== "USD") params.set("c", pricing.currency);
    const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      window.history.replaceState(null, "", `?${params.toString()}`);
    } catch {
      /* ignore */
    }
    try {
      await navigator.clipboard.writeText(link);
      setShareMsg("Link copied. It includes your traffic and pricing, not the API you tested.");
    } catch {
      setShareMsg("The link is now in your address bar. Copy it from there.");
    }
    setAnnounce("Share link ready.");
    setTimeout(() => setShareMsg(""), 5000);
  }

  const currentDemo = DEMOS.find((d) => d.id === demoId);

  // The social demo has a paginated twin; show whichever matches the toggle.
  const isSocialDemo = result === demoResults.social || result === demoResults.socialPaged;
  const displayed = isSocialDemo ? (paginated ? demoResults.socialPaged : demoResults.social) : result;
  const displayedLabel = isSocialDemo && paginated ? "Demo · Social media feed (5 pages × 10 posts)" : resultLabel;

  return (
    <div className="page">
      <a href="#inputs" className="skip-link">
        Skip to calculator
      </a>
      <header className="hero">
        <p className="eyebrow">API Egress Cost Calculator</p>
        <h1>How much does your API response really cost?</h1>
        <p className="subtitle">Paste an endpoint, see your AWS data transfer bill, and what compression would save.</p>
      </header>

      <main className="layout">
        <section className="inputs" id="inputs" aria-label="Inputs">
          <div className="card">
            <h2 className="step">
              <span className="step-num" aria-hidden="true">1</span> Your API response
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
                    rows={7}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    placeholder={`curl https://api.example.com/v1/items \\\n  -H 'Authorization: Bearer test_token'`}
                    value={curlText}
                    onChange={(e) => {
                      setCurlText(e.target.value);
                      clearError("curl");
                    }}
                    aria-invalid={!!errors.curl}
                    aria-describedby={`curl-note${errors.curl ? " curl-error" : ""}`}
                  />
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
                        if (v !== "paste") {
                          const d = DEMOS.find((x) => x.id === v)!;
                          showResult(demoResults[d.id], `Demo · ${d.label}`);
                        }
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
                          rows={7}
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
                            Analyzed on our server, never stored. No outbound request is made.
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

                {paginated && (
                  <div className="pagination-fields">
                    {tab === "demo" ? (
                      <p className="hint">
                        {demoId === "social"
                          ? "The Social media feed demo has 5 locally generated cursor pages (10 posts each). No network call."
                          : demoId === "paste"
                            ? "A pasted sample counts as one average page."
                            : "Only the Social media feed demo is paginated. This one counts as a single page."}
                      </p>
                    ) : (
                      <div className="field">
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
                    )}
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
                        aria-describedby={errors.pps ? "pps-error" : "pps-hint"}
                      />
                      <FieldError id="pps-error" msg={errors.pps} />
                      {!errors.pps && (
                        <p className="hint" id="pps-hint">
                          Assumes the average user scrolls {pps} page{pps === 1 ? "" : "s"}.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <FieldError id="general-error" msg={errors.general} />
              <button type="submit" className="btn-primary" disabled={loading} aria-busy={loading}>
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" /> Analyzing…
                  </>
                ) : (
                  "Analyze"
                )}
              </button>
            </form>
          </div>

          <div className="card">
            <h2 className="step">
              <span className="step-num" aria-hidden="true">2</span> Your traffic
            </h2>
            {paginated ? (
              <div className="field">
                <label htmlFor="sessions">Monthly sessions</label>
                <input
                  id="sessions"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={sessionsText}
                  onChange={(e) => onSessionsChange(e.target.value)}
                  onBlur={() => {
                    if (!errors.sessions) setSessionsText(formatNumber(sessions));
                  }}
                  aria-invalid={!!errors.sessions}
                  aria-describedby={errors.sessions ? "sessions-error" : "sessions-derived sessions-hint"}
                />
                <FieldError id="sessions-error" msg={errors.sessions} />
                <p className="derived" id="sessions-derived">
                  = {formatNumber(pageReqs)} page requests/month <span className="hint-inline">(sessions × pages per session)</span>
                </p>
                <div className="chips" role="group" aria-label="Preset monthly sessions">
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
                      }}
                    >
                      {compactCount(p)}
                    </button>
                  ))}
                </div>
                <p className="hint" id="sessions-hint">
                  Monthly egress = sessions × pages per session × average page size. Headers and TLS overhead are not counted.
                </p>
              </div>
            ) : (
              <div className="field">
                <label htmlFor="requests">Monthly requests</label>
                <input
                  id="requests"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={requestsText}
                  onChange={(e) => onRequestsChange(e.target.value)}
                  onBlur={() => {
                    if (!errors.requests) setRequestsText(formatNumber(requests));
                  }}
                  aria-invalid={!!errors.requests}
                  aria-describedby={errors.requests ? "requests-error" : "requests-hint"}
                />
                <FieldError id="requests-error" msg={errors.requests} />
                <div className="chips" role="group" aria-label="Preset monthly requests">
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
                      }}
                    >
                      {compactCount(p)}
                    </button>
                  ))}
                </div>
                <p className="hint" id="requests-hint">
                  Monthly egress = response size × monthly requests. Assumes every request returns this response; headers and TLS overhead are not counted.
                </p>
              </div>
            )}
          </div>

          <PricingPanel
            draft={draft}
            setDraft={setDraft}
            validation={validation}
            usingDefaults={usingDefaults}
            onShare={share}
            shareMsg={shareMsg}
          />
        </section>

        <section className="results" aria-label="Results">
          <Results
            key={resultKey}
            result={displayed}
            label={displayedLabel}
            requests={effectiveRequests}
            paging={paginated ? { sessions, pagesPerSession: pps } : null}
            pricing={pricing}
            usingDefaults={usingDefaults}
            animate={resultKey > 0}
          />
        </section>
      </main>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      <footer className="footer">
        <p>
          Built by Ibad Amir · Senior Software Engineer ·{" "}
          <a href="https://www.linkedin.com/in/engineer-ibad" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href="https://ibadamir.vercel.app" target="_blank" rel="noopener noreferrer">
            ibadamir.vercel.app
          </a>
        </p>
        <p className="footer-small">Estimates only. Not affiliated with Amazon Web Services.</p>
      </footer>
    </div>
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
      Sent once from our server, never stored. Use a test token if you can.
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
          <span>Redirects aren&apos;t followed. Use the final URL.</span>
        </span>
      )}
    </span>
  );
}

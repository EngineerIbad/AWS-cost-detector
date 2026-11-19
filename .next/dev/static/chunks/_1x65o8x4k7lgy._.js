(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/curl.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pagination.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PricingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PricingPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Results$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Results.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const TABS = [
    {
        id: "curl",
        label: "Paste curl"
    },
    {
        id: "form",
        label: "Form"
    },
    {
        id: "demo",
        label: "Demo"
    }
];
const METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH"
];
const PRESETS = [
    1e6,
    1e7,
    1e8,
    1e9
];
const SESSION_PRESETS = [
    1e5,
    1e6,
    1e7,
    1e8
];
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
    sessions: "aecc:sessions"
};
function lsGet(key) {
    try {
        return window.localStorage.getItem(key);
    } catch  {
        return null;
    }
}
function lsSet(key, value) {
    try {
        if (value === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, value);
    } catch  {
    /* storage unavailable: ignore */ }
}
/** Shared handler for the thousands-separated count inputs (requests, sessions). */ function handleCountInput(v, setText, setValue, setError) {
    if (/^[\d,\s]*$/.test(v)) {
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCount"])(v);
        setText(n === null ? "" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(n));
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
    const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCount"])(v);
    if (n === null || n > MAX_REQUESTS) setError("Enter a whole number like 25,000,000 (or 25M).");
    else {
        setValue(n);
        setError(null);
    }
}
function App({ demoResults }) {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("demo");
    const tabRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        curl: null,
        form: null,
        demo: null
    });
    // Inputs
    const [curlText, setCurlText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [method, setMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("GET");
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showToken, setShowToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [demoId, setDemoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("social");
    const [pasteJson, setPasteJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [servedAs, setServedAs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("identity");
    const curlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Results
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(demoResults.social);
    const [resultLabel, setResultLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(`Demo · ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOS"][0].label}`);
    const [resultKey, setResultKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [announce, setAnnounce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Traffic + pricing
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_REQUESTS);
    const [requestsText, setRequestsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(DEFAULT_REQUESTS));
    // Pagination
    const [paginated, setPaginated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paramName, setParamName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pps, setPps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PAGES_PER_SESSION"]);
    const [ppsText, setPpsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PAGES_PER_SESSION"]));
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_SESSIONS);
    const [sessionsText, setSessionsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(DEFAULT_SESSIONS));
    const lastDetected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "App.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pricingToDraft"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPricing"])())
    }["App.useState"]);
    const lastValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPricing"])());
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shareMsg, setShareMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[validation]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePricing"])(draft)
    }["App.useMemo[validation]"], [
        draft
    ]);
    if (validation.ok && validation.pricing) lastValid.current = validation.pricing;
    const pricing = validation.ok && validation.pricing ? validation.pricing : lastValid.current;
    const usingDefaults = validation.ok && !!validation.pricing && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefaultPricing"])(validation.pricing);
    /* ---------- restore state: share URL > localStorage > defaults ---------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            const params = new URLSearchParams(window.location.search);
            const storedTab = lsGet(LS.tab);
            if (storedTab === "curl" || storedTab === "form" || storedTab === "demo") setTab(storedTab);
            const r = params.get("r") ?? lsGet(LS.requests);
            const n = r ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCount"])(r) : null;
            if (n !== null && n >= 0 && n <= MAX_REQUESTS) {
                setRequests(n);
                setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(n));
            }
            const pg = params.get("pg") ?? lsGet(LS.paginated);
            if (pg === "1" || pg === "0") setPaginated(pg === "1");
            const ppsRaw = params.get("pps") ?? lsGet(LS.pps);
            const ppsN = ppsRaw ? Number(ppsRaw) : NaN;
            if (Number.isInteger(ppsN) && ppsN >= 1 && ppsN <= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_PAGES_PER_SESSION"]) {
                setPps(ppsN);
                setPpsText(String(ppsN));
            }
            const sRaw = params.get("s") ?? lsGet(LS.sessions);
            const sN = sRaw ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCount"])(sRaw) : null;
            if (sN !== null && sN >= 0 && sN <= MAX_REQUESTS) {
                setSessions(sN);
                setSessionsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(sN));
            }
            let restored = null;
            const p = params.get("p");
            if (p) {
                const tiers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeTiers"])(p);
                const c = (params.get("c") ?? "USD").slice(0, 8).trim() || "USD";
                if (tiers) restored = {
                    currency: c,
                    tiers
                };
            } else {
                const stored = lsGet(LS.pricing);
                if (stored) {
                    try {
                        const parsed = JSON.parse(stored);
                        const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validatePricing"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pricingToDraft"])(parsed));
                        if (v.ok && v.pricing) restored = v.pricing;
                    } catch  {
                    /* ignore corrupt storage */ }
                }
            }
            if (restored) setDraft((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pricingToDraft"])(restored));
            setHydrated(true);
        }
    }["App.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (hydrated) lsSet(LS.tab, tab);
        }
    }["App.useEffect"], [
        tab,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (hydrated) lsSet(LS.requests, String(requests));
        }
    }["App.useEffect"], [
        requests,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (!hydrated) return;
            lsSet(LS.paginated, paginated ? "1" : "0");
            lsSet(LS.pps, String(pps));
            lsSet(LS.sessions, String(sessions));
        }
    }["App.useEffect"], [
        paginated,
        pps,
        sessions,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (!hydrated || !validation.ok || !validation.pricing) return;
            lsSet(LS.pricing, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDefaultPricing"])(validation.pricing) ? null : JSON.stringify(validation.pricing));
        }
    }["App.useEffect"], [
        validation,
        hydrated
    ]);
    /* ------------------------ pagination detection ------------------------ */ const activeUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[activeUrl]": ()=>{
            if (tab === "form") {
                const u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeUrl"])(url);
                return u || null;
            }
            if (tab === "curl" && curlText.trim()) {
                try {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCurl"])(curlText).url;
                } catch  {
                    return null;
                }
            }
            return null;
        }
    }["App.useMemo[activeUrl]"], [
        tab,
        url,
        curlText
    ]);
    const detectedParam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "App.useMemo[detectedParam]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectPaginationParam"])(activeUrl)
    }["App.useMemo[detectedParam]"], [
        activeUrl
    ]);
    // Switch the toggle on when a pagination param newly appears in the URL.
    // If the user then turns it off, it stays off until the detected param changes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            if (detectedParam && detectedParam !== lastDetected.current) {
                setPaginated(true);
                setParamName(detectedParam);
                clearError("param");
            }
            lastDetected.current = detectedParam;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["App.useEffect"], [
        detectedParam
    ]);
    /* ---------------------------- tabs ---------------------------- */ const onTabKey = (e)=>{
        const idx = TABS.findIndex((t)=>t.id === tab);
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
    const clearError = (f)=>setErrors((e)=>e[f] ? {
                ...e,
                [f]: undefined
            } : e);
    /* ---------------------------- analyze ---------------------------- */ const showResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[showResult]": (r, label)=>{
            setResult(r);
            setResultLabel(label);
            setResultKey({
                "App.useCallback[showResult]": (k)=>k + 1
            }["App.useCallback[showResult]"]);
            const n = r.findings.length;
            setAnnounce(`Analysis complete for ${label}. ${n} recommendation${n === 1 ? "" : "s"}.`);
        }
    }["App.useCallback[showResult]"], []);
    async function callApi(payload, label, field) {
        setLoading(true);
        setErrors({});
        setAnnounce("Analyzing…");
        const ctrl = new AbortController();
        const t = setTimeout(()=>ctrl.abort(), paginated ? 40_000 : 25_000);
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                signal: ctrl.signal
            });
            const data = await res.json().catch(()=>null);
            if (!res.ok || !data || "error" in data) {
                const e = data && "error" in data ? data.error : null;
                const msg = e?.message ?? "Something went wrong. Please try again.";
                setErrors({
                    [e?.field ?? field]: msg
                });
                setAnnounce(`Error: ${msg}`);
                return;
            }
            showResult(data, label);
        } catch  {
            const msg = ctrl.signal.aborted ? "The analysis took too long. The API may be slow or unreachable. Try again or use a lighter endpoint." : "We couldn't reach our server. Check your connection and try again.";
            setErrors({
                [field]: msg
            });
            setAnnounce(`Error: ${msg}`);
        } finally{
            clearTimeout(t);
            setLoading(false);
        }
    }
    function describe(m, u) {
        try {
            const x = new URL(u);
            const path = x.pathname.length > 40 ? x.pathname.slice(0, 40) + "…" : x.pathname;
            return `${m} ${x.host}${path}`;
        } catch  {
            return `${m} request`;
        }
    }
    /** Pagination options for the API, or an error message for the param field. */ function paginationPayload() {
        if (!paginated) return {};
        const p = paramName.trim();
        if (!p) return {
            error: "Enter the query parameter that changes per page, e.g. page, offset or cursor."
        };
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParamName"])(p)) return {
            error: "Use letters, numbers, _ - . [ ] only (max 64 characters)."
        };
        return {
            pagination: {
                param: p
            }
        };
    }
    function submitCurl() {
        const text = curlText.trim();
        if (!text) {
            setErrors({
                curl: "Paste a curl command first, e.g. curl https://api.example.com/items"
            });
            return;
        }
        try {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCurl"])(text);
            const pg = paginationPayload();
            if (pg.error) {
                setErrors({
                    param: pg.error
                });
                setAnnounce(`Error: ${pg.error}`);
                return;
            }
            void callApi({
                mode: "curl",
                curl: text,
                ...pg
            }, describe(parsed.method, parsed.url), "curl");
        } catch (e) {
            const msg = e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CurlParseError"] ? e.message : "We couldn't read that curl command.";
            setErrors({
                curl: msg
            });
            setAnnounce(`Error: ${msg}`);
        }
    }
    function submitForm() {
        const errs = {};
        const u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeUrl"])(url);
        if (!u) errs.url = "Enter the API URL you want to measure, e.g. api.example.com/items";
        else {
            try {
                const parsed = new URL(u);
                if (parsed.protocol !== "http:" && parsed.protocol !== "https:") errs.url = "Only http:// and https:// URLs are supported.";
            } catch  {
                errs.url = "That doesn't look like a valid URL. Try something like https://api.example.com/items";
            }
        }
        const hasBody = method !== "GET" && body.trim() !== "";
        if (hasBody) {
            try {
                JSON.parse(body);
            } catch (e) {
                errs.body = `This isn't valid JSON (${e.message.replace(/^JSON\.parse: /, "")}). Check for missing quotes or trailing commas.`;
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
        const headers = {
            Accept: "application/json, */*;q=0.8"
        };
        const tok = token.trim().replace(/^Bearer\s+/i, "");
        if (tok) headers["Authorization"] = `Bearer ${tok}`;
        if (hasBody) headers["Content-Type"] = "application/json";
        void callApi({
            mode: "request",
            method,
            url: u,
            headers,
            body: hasBody ? body : undefined,
            ...pg
        }, describe(method, u), "url");
    }
    function submitDemo() {
        if (demoId === "paste") {
            if (!pasteJson.trim()) {
                setErrors({
                    json: "Paste a sample response first (JSON or text)."
                });
                return;
            }
            void callApi({
                mode: "payload",
                json: pasteJson,
                servedAs
            }, "Your pasted sample", "json");
            return;
        }
        setErrors({});
        const d = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOS"].find((x)=>x.id === demoId);
        showResult(demoResults[d.id], `Demo · ${d.label}`);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        if (loading) return;
        if (tab === "curl") submitCurl();
        else if (tab === "form") submitForm();
        else submitDemo();
    };
    function switchToCurl(text) {
        setCurlText(text.trim());
        setTab("curl");
        setErrors({});
        setAnnounce("That looks like a curl command, so we switched to the Paste curl tab.");
        requestAnimationFrame(()=>curlRef.current?.focus());
    }
    /* ---------------------------- traffic ---------------------------- */ const setCountError = (key)=>(msg)=>setErrors((e)=>msg ? {
                    ...e,
                    [key]: msg
                } : e[key] ? {
                    ...e,
                    [key]: undefined
                } : e);
    const onRequestsChange = (v)=>handleCountInput(v, setRequestsText, setRequests, setCountError("requests"));
    const onSessionsChange = (v)=>handleCountInput(v, setSessionsText, setSessions, setCountError("sessions"));
    function onPpsChange(v) {
        setPpsText(v);
        const n = Number(v);
        if (v.trim() !== "" && Number.isInteger(n) && n >= 1 && n <= __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_PAGES_PER_SESSION"]) {
            setPps(n);
            clearError("pps");
        } else {
            setErrors((e)=>({
                    ...e,
                    pps: `Enter a whole number from 1 to ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_PAGES_PER_SESSION"]}.`
                }));
        }
    }
    const pageReqs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pageRequests"])(sessions, pps);
    /** What the cost table multiplies by: requests, or sessions × pages per session. */ const effectiveRequests = paginated ? pageReqs : requests;
    async function share() {
        const params = new URLSearchParams();
        params.set("r", String(requests));
        params.set("pg", paginated ? "1" : "0");
        params.set("pps", String(pps));
        params.set("s", String(sessions));
        params.set("p", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTiers"])(pricing.tiers));
        if (pricing.currency !== "USD") params.set("c", pricing.currency);
        const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        try {
            window.history.replaceState(null, "", `?${params.toString()}`);
        } catch  {
        /* ignore */ }
        try {
            await navigator.clipboard.writeText(link);
            setShareMsg("Link copied. It includes your traffic and pricing, not the API you tested.");
        } catch  {
            setShareMsg("The link is now in your address bar. Copy it from there.");
        }
        setAnnounce("Share link ready.");
        setTimeout(()=>setShareMsg(""), 5000);
    }
    const currentDemo = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOS"].find((d)=>d.id === demoId);
    // The social demo has a paginated twin; show whichever matches the toggle.
    const isSocialDemo = result === demoResults.social || result === demoResults.socialPaged;
    const displayed = isSocialDemo ? paginated ? demoResults.socialPaged : demoResults.social : result;
    const displayedLabel = isSocialDemo && paginated ? "Demo · Social media feed (5 pages × 10 posts)" : resultLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#inputs",
                className: "skip-link",
                children: "Skip to calculator"
            }, void 0, false, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 469,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "API Egress Cost Calculator"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "How much does your API response really cost?"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 474,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "subtitle",
                        children: "Paste an endpoint, see your AWS data transfer bill, and what compression would save."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 472,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "inputs",
                        id: "inputs",
                        "aria-label": "Inputs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "step",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "step-num",
                                                "aria-hidden": "true",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 482,
                                                columnNumber: 15
                                            }, this),
                                            " Your API response"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "tablist",
                                        "aria-label": "Input mode",
                                        className: "tabs",
                                        onKeyDown: onTabKey,
                                        children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                ref: (el)=>{
                                                    tabRefs.current[t.id] = el;
                                                },
                                                role: "tab",
                                                type: "button",
                                                id: `tab-${t.id}`,
                                                "aria-selected": tab === t.id,
                                                "aria-controls": `panel-${t.id}`,
                                                tabIndex: tab === t.id ? 0 : -1,
                                                className: "tab",
                                                onClick: ()=>setTab(t.id),
                                                children: t.label
                                            }, t.id, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 486,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 484,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: onSubmit,
                                        noValidate: true,
                                        children: [
                                            tab === "curl" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-curl",
                                                "aria-labelledby": "tab-curl",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "label-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "curl",
                                                                children: "curl command"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurlTips, {}, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 510,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        id: "curl",
                                                        ref: curlRef,
                                                        className: "mono",
                                                        rows: 7,
                                                        spellCheck: false,
                                                        autoCapitalize: "off",
                                                        autoComplete: "off",
                                                        placeholder: `curl https://api.example.com/v1/items \\\n  -H 'Authorization: Bearer test_token'`,
                                                        value: curlText,
                                                        onChange: (e)=>{
                                                            setCurlText(e.target.value);
                                                            clearError("curl");
                                                        },
                                                        "aria-invalid": !!errors.curl,
                                                        "aria-describedby": `curl-note${errors.curl ? " curl-error" : ""}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                        id: "curl-error",
                                                        msg: errors.curl
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivacyNote, {
                                                        id: "curl-note"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 507,
                                                columnNumber: 17
                                            }, this),
                                            tab === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-form",
                                                "aria-labelledby": "tab-form",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field method-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "method",
                                                                        children: "Method"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 538,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        id: "method",
                                                                        value: method,
                                                                        onChange: (e)=>setMethod(e.target.value),
                                                                        children: METHODS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                children: m
                                                                            }, m, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 541,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field grow",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "url",
                                                                        children: "URL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 546,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "url",
                                                                        type: "text",
                                                                        inputMode: "url",
                                                                        autoComplete: "off",
                                                                        autoCapitalize: "off",
                                                                        spellCheck: false,
                                                                        placeholder: "api.example.com/v1/items",
                                                                        value: url,
                                                                        onPaste: (e)=>{
                                                                            const text = e.clipboardData.getData("text");
                                                                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["looksLikeCurl"])(text)) {
                                                                                e.preventDefault();
                                                                                switchToCurl(text);
                                                                            }
                                                                        },
                                                                        onChange: (e)=>{
                                                                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["looksLikeCurl"])(e.target.value)) return switchToCurl(e.target.value);
                                                                            setUrl(e.target.value);
                                                                            clearError("url");
                                                                        },
                                                                        "aria-invalid": !!errors.url,
                                                                        "aria-describedby": errors.url ? "url-error" : "url-hint"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 547,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 545,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                        id: "url-error",
                                                        msg: errors.url
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 19
                                                    }, this),
                                                    !errors.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "hint",
                                                        id: "url-hint",
                                                        children: "No https:// needed. Pasting a curl command here switches to the curl tab."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "token",
                                                                children: [
                                                                    "Bearer token ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "optional",
                                                                        children: "(optional)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 36
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "input-with-button",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "token",
                                                                        type: showToken ? "text" : "password",
                                                                        autoComplete: "off",
                                                                        spellCheck: false,
                                                                        value: token,
                                                                        onChange: (e)=>{
                                                                            setToken(e.target.value);
                                                                            clearError("token");
                                                                        },
                                                                        "aria-invalid": !!errors.token,
                                                                        "aria-describedby": errors.token ? "token-error" : undefined
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "btn-ghost small",
                                                                        "aria-pressed": showToken,
                                                                        onClick: ()=>setShowToken((s)=>!s),
                                                                        children: [
                                                                            showToken ? "Hide" : "Show",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: " token"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 600,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 598,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                id: "token-error",
                                                                msg: errors.token
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 603,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 19
                                                    }, this),
                                                    method !== "GET" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "body",
                                                                children: [
                                                                    "JSON body ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "optional",
                                                                        children: "(optional, max 100 KB)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 609,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 608,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                id: "body",
                                                                className: "mono",
                                                                rows: 5,
                                                                spellCheck: false,
                                                                placeholder: '{"query": "shoes", "limit": 50}',
                                                                value: body,
                                                                onChange: (e)=>{
                                                                    setBody(e.target.value);
                                                                    clearError("body");
                                                                },
                                                                "aria-invalid": !!errors.body,
                                                                "aria-describedby": errors.body ? "body-error" : undefined
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 611,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                id: "body-error",
                                                                msg: errors.body
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 625,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivacyNote, {
                                                        id: "form-note"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 535,
                                                columnNumber: 17
                                            }, this),
                                            tab === "demo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-demo",
                                                "aria-labelledby": "tab-demo",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "demo",
                                                                children: "Sample payload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 635,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                id: "demo",
                                                                value: demoId,
                                                                onChange: (e)=>{
                                                                    const v = e.target.value;
                                                                    setDemoId(v);
                                                                    setErrors({});
                                                                    if (v !== "paste") {
                                                                        const d = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOS"].find((x)=>x.id === v);
                                                                        showResult(demoResults[d.id], `Demo · ${d.label}`);
                                                                    }
                                                                },
                                                                children: [
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: d.id,
                                                                            children: d.label
                                                                        }, d.id, false, {
                                                                            fileName: "[project]/components/App.tsx",
                                                                            lineNumber: 650,
                                                                            columnNumber: 25
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "paste",
                                                                        children: "Paste your own sample response…"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 654,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 636,
                                                                columnNumber: 21
                                                            }, this),
                                                            currentDemo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "hint",
                                                                children: [
                                                                    currentDemo.blurb,
                                                                    " No network call: generated data."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 656,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this),
                                                    demoId === "paste" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "paste",
                                                                        children: "Sample response"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 661,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                        id: "paste",
                                                                        className: "mono",
                                                                        rows: 7,
                                                                        spellCheck: false,
                                                                        placeholder: '{"items": [ ... ]}',
                                                                        value: pasteJson,
                                                                        onChange: (e)=>{
                                                                            setPasteJson(e.target.value);
                                                                            clearError("json");
                                                                        },
                                                                        "aria-invalid": !!errors.json,
                                                                        "aria-describedby": errors.json ? "paste-error" : "paste-hint"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 662,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                        id: "paste-error",
                                                                        msg: errors.json
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 676,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !errors.json && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "hint",
                                                                        id: "paste-hint",
                                                                        children: "Analyzed on our server, never stored. No outbound request is made."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 660,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "served",
                                                                        children: "How is it served today?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 684,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        id: "served",
                                                                        value: servedAs,
                                                                        onChange: (e)=>setServedAs(e.target.value),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "identity",
                                                                                children: "Uncompressed"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 686,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "gzip",
                                                                                children: "Gzip"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "br",
                                                                                children: "Brotli"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 685,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 683,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 659,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 633,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pagination-box",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "switch",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                role: "switch",
                                                                checked: paginated,
                                                                onChange: (e)=>{
                                                                    setPaginated(e.target.checked);
                                                                    if (e.target.checked && !paramName && detectedParam) setParamName(detectedParam);
                                                                    clearError("param");
                                                                },
                                                                "aria-describedby": detectedParam ? "pagination-detected" : undefined
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 698,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "switch-track",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "switch-thumb"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/App.tsx",
                                                                    lineNumber: 710,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "switch-label",
                                                                children: "Is this endpoint paginated?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 712,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 17
                                                    }, this),
                                                    detectedParam && tab !== "demo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "hint detected",
                                                        id: "pagination-detected",
                                                        children: [
                                                            "Detected pagination param: ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                children: detectedParam
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 48
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 19
                                                    }, this),
                                                    paginated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "pagination-fields",
                                                        children: [
                                                            tab === "demo" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "hint",
                                                                children: demoId === "social" ? "The Social media feed demo has 5 locally generated cursor pages (10 posts each). No network call." : demoId === "paste" ? "A pasted sample counts as one average page." : "Only the Social media feed demo is paginated. This one counts as a single page."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "page-param",
                                                                        children: "Pagination param"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 732,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "page-param",
                                                                        type: "text",
                                                                        list: "page-param-options",
                                                                        autoComplete: "off",
                                                                        autoCapitalize: "off",
                                                                        spellCheck: false,
                                                                        placeholder: "e.g. page, offset or cursor",
                                                                        value: paramName,
                                                                        onChange: (e)=>{
                                                                            setParamName(e.target.value);
                                                                            clearError("param");
                                                                        },
                                                                        "aria-invalid": !!errors.param,
                                                                        "aria-describedby": errors.param ? "param-error" : "param-hint"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 733,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                                                        id: "page-param-options",
                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGINATION_PARAMS"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: p
                                                                            }, p, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 751,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 749,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                        id: "param-error",
                                                                        msg: errors.param
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 754,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !errors.param && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "hint",
                                                                        id: "param-hint",
                                                                        children: [
                                                                            "We fetch up to ",
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_SAMPLED_PAGES"],
                                                                            " real pages, one at a time, changing only this param."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 756,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 731,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field pps-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "pps",
                                                                        children: "Pages per session"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 763,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        id: "pps",
                                                                        type: "number",
                                                                        inputMode: "numeric",
                                                                        min: 1,
                                                                        max: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_PAGES_PER_SESSION"],
                                                                        step: 1,
                                                                        value: ppsText,
                                                                        onChange: (e)=>onPpsChange(e.target.value),
                                                                        onBlur: ()=>{
                                                                            if (!errors.pps) setPpsText(String(pps));
                                                                        },
                                                                        "aria-invalid": !!errors.pps,
                                                                        "aria-describedby": errors.pps ? "pps-error" : "pps-hint"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 764,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                        id: "pps-error",
                                                                        msg: errors.pps
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 779,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    !errors.pps && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "hint",
                                                                        id: "pps-hint",
                                                                        children: [
                                                                            "Assumes the average user scrolls ",
                                                                            pps,
                                                                            " page",
                                                                            pps === 1 ? "" : "s",
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 781,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 762,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 721,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 696,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                id: "general-error",
                                                msg: errors.general
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 790,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                "aria-busy": loading,
                                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "spinner",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/App.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Analyzing…"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/App.tsx",
                                                    lineNumber: 793,
                                                    columnNumber: 19
                                                }, this) : "Analyze"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 791,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 480,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "step",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "step-num",
                                                "aria-hidden": "true",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 805,
                                                columnNumber: 15
                                            }, this),
                                            " Your traffic"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 804,
                                        columnNumber: 13
                                    }, this),
                                    paginated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "sessions",
                                                children: "Monthly sessions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 809,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "sessions",
                                                type: "text",
                                                inputMode: "numeric",
                                                autoComplete: "off",
                                                value: sessionsText,
                                                onChange: (e)=>onSessionsChange(e.target.value),
                                                onBlur: ()=>{
                                                    if (!errors.sessions) setSessionsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(sessions));
                                                },
                                                "aria-invalid": !!errors.sessions,
                                                "aria-describedby": errors.sessions ? "sessions-error" : "sessions-derived sessions-hint"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 810,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                id: "sessions-error",
                                                msg: errors.sessions
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 823,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "derived",
                                                id: "sessions-derived",
                                                children: [
                                                    "= ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(pageReqs),
                                                    " page requests/month ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hint-inline",
                                                        children: "(sessions × pages per session)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 825,
                                                        columnNumber: 66
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 824,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chips",
                                                role: "group",
                                                "aria-label": "Preset monthly sessions",
                                                children: SESSION_PRESETS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "chip",
                                                        "aria-pressed": sessions === p,
                                                        onClick: ()=>{
                                                            setSessions(p);
                                                            setSessionsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(p));
                                                            clearError("sessions");
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compactCount"])(p)
                                                    }, p, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 827,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "hint",
                                                id: "sessions-hint",
                                                children: "Monthly egress = sessions × pages per session × average page size. Headers and TLS overhead are not counted."
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 844,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 808,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "requests",
                                                children: "Monthly requests"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "requests",
                                                type: "text",
                                                inputMode: "numeric",
                                                autoComplete: "off",
                                                value: requestsText,
                                                onChange: (e)=>onRequestsChange(e.target.value),
                                                onBlur: ()=>{
                                                    if (!errors.requests) setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(requests));
                                                },
                                                "aria-invalid": !!errors.requests,
                                                "aria-describedby": errors.requests ? "requests-error" : "requests-hint"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 851,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                id: "requests-error",
                                                msg: errors.requests
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 864,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chips",
                                                role: "group",
                                                "aria-label": "Preset monthly requests",
                                                children: PRESETS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "chip",
                                                        "aria-pressed": requests === p,
                                                        onClick: ()=>{
                                                            setRequests(p);
                                                            setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(p));
                                                            clearError("requests");
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compactCount"])(p)
                                                    }, p, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 867,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 865,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "hint",
                                                id: "requests-hint",
                                                children: "Monthly egress = response size × monthly requests. Assumes every request returns this response; headers and TLS overhead are not counted."
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 882,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 803,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PricingPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                draft: draft,
                                setDraft: setDraft,
                                validation: validation,
                                usingDefaults: usingDefaults,
                                onShare: share,
                                shareMsg: shareMsg
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 889,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "results",
                        "aria-label": "Results",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Results$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            result: displayed,
                            label: displayedLabel,
                            requests: effectiveRequests,
                            paging: paginated ? {
                                sessions,
                                pagesPerSession: pps
                            } : null,
                            pricing: pricing,
                            usingDefaults: usingDefaults,
                            animate: resultKey > 0
                        }, resultKey, false, {
                            fileName: "[project]/components/App.tsx",
                            lineNumber: 900,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 899,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sr-only",
                "aria-live": "polite",
                "aria-atomic": "true",
                children: announce
            }, void 0, false, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 913,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Built by Ibad Amir · Senior Software Engineer ·",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.linkedin.com/in/engineer-ibad",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "LinkedIn"
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 920,
                                columnNumber: 11
                            }, this),
                            " ",
                            "·",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://ibadamir.vercel.app",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "ibadamir.vercel.app"
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 918,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-small",
                        children: "Estimates only. Not affiliated with Amazon Web Services."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 928,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 917,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
_s(App, "fA1fZfA/lv6mSV3KH5Ls+LoKRuU=");
_c = App;
function FieldError({ id, msg }) {
    if (!msg) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "field-error",
        id: id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                width: "14",
                height: "14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "8",
                        cy: "8",
                        r: "7",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.6"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 939,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 4.5v4.2M8 10.8v.7",
                        stroke: "currentColor",
                        strokeWidth: "1.8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 940,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 938,
                columnNumber: 7
            }, this),
            msg
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 937,
        columnNumber: 5
    }, this);
}
_c1 = FieldError;
function PrivacyNote({ id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "privacy",
        id: id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                width: "14",
                height: "14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "3",
                        y: "7",
                        width: "10",
                        height: "7",
                        rx: "1.5",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 951,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M5.5 7V5a2.5 2.5 0 015 0v2",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 952,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 950,
                columnNumber: 7
            }, this),
            "Sent once from our server, never stored. Use a test token if you can."
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 949,
        columnNumber: 5
    }, this);
}
_c2 = PrivacyNote;
function CurlTips() {
    _s1();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CurlTips.useEffect": ()=>{
            if (!open) return;
            const onDoc = {
                "CurlTips.useEffect.onDoc": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
                }
            }["CurlTips.useEffect.onDoc"];
            const onKey = {
                "CurlTips.useEffect.onKey": (e)=>e.key === "Escape" && setOpen(false)
            }["CurlTips.useEffect.onKey"];
            document.addEventListener("mousedown", onDoc);
            document.addEventListener("keydown", onKey);
            return ({
                "CurlTips.useEffect": ()=>{
                    document.removeEventListener("mousedown", onDoc);
                    document.removeEventListener("keydown", onKey);
                }
            })["CurlTips.useEffect"];
        }
    }["CurlTips.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "tip",
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "tip-btn",
                "aria-expanded": open,
                "aria-controls": "curl-tips",
                onClick: ()=>setOpen((o)=>!o),
                children: [
                    "?",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "curl tips"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 978,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 977,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "tip-pop",
                id: "curl-tips",
                role: "note",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Tips"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 982,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "In Chrome DevTools → Network, right-click a request → Copy → Copy as cURL (bash)."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 983,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Supported: -X, -H, -d / --data-raw / --data-binary / --json, -u. Multi-line commands with \\ are fine."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 984,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Ignored: --compressed, -L, -k, -s, -i, -v. We set Accept-Encoding ourselves."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 985,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Redirects aren't followed. Use the final URL."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 986,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 981,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 976,
        columnNumber: 5
    }, this);
}
_s1(CurlTips, "wl9VvfhnMVWQ+kCekFjcRPEi3/0=");
_c3 = CurlTips;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "App");
__turbopack_context__.k.register(_c1, "FieldError");
__turbopack_context__.k.register(_c2, "PrivacyNote");
__turbopack_context__.k.register(_c3, "CurlTips");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PricingPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function verifiedLabel() {
    const d = new Date(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPricing"].lastVerified + "T00:00:00Z");
    return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
    });
}
function prevLimitLabel(draft, i) {
    if (i === 0) return "0";
    const n = Number(draft.tiers[i - 1].upToGB.replace(/[,\s_]/g, ""));
    return Number.isFinite(n) && draft.tiers[i - 1].upToGB !== "" ? n.toLocaleString("en-US") : "–";
}
function PricingPanel({ draft, setDraft, validation, usingDefaults, onShare, shareMsg }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const updateTier = (i, key, value)=>setDraft((d)=>({
                ...d,
                tiers: d.tiers.map((t, j)=>j === i ? {
                        ...t,
                        [key]: value
                    } : t)
            }));
    const addTier = ()=>setDraft((d)=>{
            const tiers = [
                ...d.tiers
            ];
            const lastIdx = tiers.length - 1;
            const prev = lastIdx > 0 ? Number(tiers[lastIdx - 1].upToGB.replace(/[,\s_]/g, "")) : 0;
            const newLimit = Number.isFinite(prev) && prev > 0 ? prev * 2 : 1000;
            tiers.splice(lastIdx, 0, {
                upToGB: String(newLimit),
                pricePerGB: tiers[lastIdx].pricePerGB
            });
            return {
                ...d,
                tiers
            };
        });
    const removeTier = (i)=>setDraft((d)=>{
            if (d.tiers.length <= 1) return d;
            const tiers = d.tiers.filter((_, j)=>j !== i);
            // The final tier is always unlimited.
            tiers[tiers.length - 1] = {
                ...tiers[tiers.length - 1],
                upToGB: ""
            };
            return {
                ...d,
                tiers
            };
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pricing-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "step-num",
                                "aria-hidden": "true",
                                children: "3"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            " Pricing"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `badge ${usingDefaults ? "badge-verified" : "badge-custom"}`,
                        children: usingDefaults ? `AWS rates verified ${verifiedLabel()}` : "Custom pricing"
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PricingPanel.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "hint",
                children: [
                    "AWS data transfer out to the internet, ",
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPricing"].region,
                    ", tiered per month.",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPricing"].source,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        children: "Source"
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PricingPanel.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "disclosure",
                "aria-expanded": open,
                "aria-controls": "pricing-settings",
                onClick: ()=>setOpen((o)=>!o),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        "aria-hidden": "true",
                        viewBox: "0 0 16 16",
                        width: "14",
                        height: "14",
                        className: "chev",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M5 3l5 5-5 5",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/components/PricingPanel.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    "Pricing settings"
                ]
            }, void 0, true, {
                fileName: "[project]/components/PricingPanel.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "pricing-settings",
                className: "pricing-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field currency-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "currency",
                                children: "Currency label"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "currency",
                                type: "text",
                                maxLength: 8,
                                value: draft.currency,
                                onChange: (e)=>setDraft((d)=>({
                                            ...d,
                                            currency: e.target.value
                                        })),
                                "aria-invalid": !!validation.currencyError,
                                "aria-describedby": validation.currencyError ? "currency-error" : undefined
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            validation.currencyError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "field-error",
                                id: "currency-error",
                                children: validation.currencyError
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "tier-table",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                                className: "sr-only",
                                children: "Pricing tiers, cumulative per month"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Tier"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "From (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Up to (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Price / GB"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/PricingPanel.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: draft.tiers.map((t, i)=>{
                                    const isLast = i === draft.tiers.length - 1;
                                    const err = validation.tierErrors[i] ?? {};
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Tier",
                                                children: i + 1
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "From (GB)",
                                                className: "muted-cell",
                                                children: prevLimitLabel(draft, i)
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Up to (GB)",
                                                children: isLast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "muted-cell",
                                                    children: "∞ no limit"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PricingPanel.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "sr-only",
                                                            htmlFor: `tier-${i}-limit`,
                                                            children: [
                                                                "Tier ",
                                                                i + 1,
                                                                " upper limit in GB"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/PricingPanel.tsx",
                                                            lineNumber: 123,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: `tier-${i}-limit`,
                                                            type: "number",
                                                            inputMode: "decimal",
                                                            min: 0,
                                                            step: "any",
                                                            value: t.upToGB,
                                                            onChange: (e)=>updateTier(i, "upToGB", e.target.value),
                                                            "aria-invalid": !!err.upToGB,
                                                            "aria-describedby": err.upToGB ? `tier-${i}-limit-error` : undefined
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PricingPanel.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 27
                                                        }, this),
                                                        err.upToGB && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-error",
                                                            id: `tier-${i}-limit-error`,
                                                            children: err.upToGB
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/PricingPanel.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/PricingPanel.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 118,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Price / GB",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "sr-only",
                                                        htmlFor: `tier-${i}-price`,
                                                        children: [
                                                            "Tier ",
                                                            i + 1,
                                                            " price per GB"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/PricingPanel.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: `tier-${i}-price`,
                                                        type: "number",
                                                        inputMode: "decimal",
                                                        min: 0,
                                                        step: "0.001",
                                                        value: t.pricePerGB,
                                                        onChange: (e)=>updateTier(i, "pricePerGB", e.target.value),
                                                        "aria-invalid": !!err.pricePerGB,
                                                        "aria-describedby": err.pricePerGB ? `tier-${i}-price-error` : undefined
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PricingPanel.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, this),
                                                    err.pricePerGB && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "field-error",
                                                        id: `tier-${i}-price-error`,
                                                        children: err.pricePerGB
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/PricingPanel.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 145,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "btn-icon",
                                                    onClick: ()=>removeTier(i),
                                                    disabled: draft.tiers.length <= 1,
                                                    "aria-label": `Remove tier ${i + 1}`,
                                                    title: "Remove tier",
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PricingPanel.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 166,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/components/PricingPanel.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    validation.formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "field-error",
                        children: validation.formError
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 183,
                        columnNumber: 36
                    }, this),
                    !validation.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hint",
                        children: "Fix the highlighted fields. Costs use your last valid pricing until then."
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 184,
                        columnNumber: 30
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pricing-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-ghost",
                                onClick: addTier,
                                disabled: draft.tiers.length >= 20,
                                children: "+ Add tier"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-ghost",
                                onClick: ()=>setDraft((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pricingToDraft"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultPricing"])())),
                                disabled: usingDefaults,
                                children: "Reset to AWS defaults"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hint",
                        children: "1 GB = 1,000,000,000 bytes. Each GB is billed at the rate of the tier it falls in."
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PricingPanel.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "share-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-ghost",
                        onClick: onShare,
                        children: "Share this setup"
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "share-msg",
                        role: "status",
                        children: shareMsg
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/PricingPanel.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PricingPanel.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(PricingPanel, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = PricingPanel;
var _c;
__turbopack_context__.k.register(_c, "PricingPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Results.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Results
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/costs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pagination.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/** Above this deviation from the mean, warn that page sizes vary a lot. */ const VARIATION_THRESHOLD = 0.3;
const SEV_ORDER = {
    high: 0,
    medium: 1,
    info: 2
};
const SEV_LABEL = {
    high: "High",
    medium: "Medium",
    info: "Info"
};
function Results({ result, label, requests, pricing, usingDefaults, animate = false, paging = null }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const paged = !!paging;
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Results.useMemo[summary]": ()=>result ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeCosts"])(result, requests, pricing, paged) : null
    }["Results.useMemo[summary]"], [
        result,
        requests,
        pricing,
        paged
    ]);
    if (!result || !summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card empty-state",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "No results yet"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Paste a curl command, fill in the form, or pick a demo, then press Analyze."
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    const cur = pricing.currency;
    const a = result;
    const findings = [
        ...a.findings
    ].sort((x, y)=>SEV_ORDER[x.severity] - SEV_ORDER[y.severity]);
    const statusOk = a.status === null || a.status >= 200 && a.status < 300;
    const sizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["effectiveSizes"])(a, paged);
    const sampled = a.pagination?.pages.length ?? 1;
    const unit = paged ? "page" : "response";
    async function copy() {
        const link = ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable";
        const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildCopySummary"])(a, summary, requests, pricing, usingDefaults, link, paging);
        try {
            await navigator.clipboard.writeText(text);
            setCopied("Copied. Paste it into Slack, an issue or a post.");
        } catch  {
            setCopied("Couldn't access the clipboard. Select the table and copy manually.");
        }
        setTimeout(()=>setCopied(""), 4000);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `results-inner${animate ? " fade-in" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "results-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "Results"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "results-title",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "meta",
                                children: [
                                    a.status !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `pill ${statusOk ? "" : "pill-warn"}`,
                                        children: [
                                            "HTTP ",
                                            a.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 68,
                                        columnNumber: 35
                                    }, this),
                                    a.contentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pill",
                                        children: a.contentType.split(";")[0]
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 69,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pill",
                                        children: a.contentEncoding ? `Content-Encoding: ${a.contentEncoding}` : "No compression"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    paged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pill",
                                        children: [
                                            sampled,
                                            " page",
                                            sampled === 1 ? "" : "s",
                                            " sampled"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "copy-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-ghost",
                                onClick: copy,
                                disabled: a.rawBytes === 0,
                                children: "Copy results"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "share-msg",
                                role: "status",
                                children: copied
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            a.rawBytes === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card empty-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "The response body was empty"
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            a.status !== null ? `The API returned HTTP ${a.status} with no body` : "There was nothing to measure",
                            ", so there's nothing to compress or bill.",
                            a.redirectTo ? " Paste the final URL to measure the real response." : " Check the URL, method and auth, then try again."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsCard, {
                        summary: summary,
                        currency: cur,
                        requests: requests,
                        unit: unit
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    !statusOk && !a.redirectTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "notice",
                        children: [
                            "The API returned HTTP ",
                            a.status,
                            ". We analyzed the body it sent, which may be an error message rather than your real data."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this),
                    !a.isJson && !a.alreadyCompressedMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "notice",
                        children: "This response isn't JSON, so there's no minified row. Compression results still apply."
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "card-title",
                                children: "Cost by format"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CostTable, {
                                rows: summary.rows,
                                bestId: summary.best?.id ?? null,
                                rawBytes: sizes.rawBytes,
                                currency: cur,
                                unit: unit
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            paging ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: [
                                    "At ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(requests),
                                    " page requests/month (",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(paging.sessions),
                                    " sessions × ",
                                    paging.pagesPerSession,
                                    " pages). Each row uses the average size of ",
                                    sampled,
                                    " sampled page",
                                    sampled === 1 ? "" : "s",
                                    ".",
                                    paging.pagesPerSession > sampled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    "Based on ",
                                                    sampled,
                                                    " sampled page",
                                                    sampled === 1 ? "" : "s",
                                                    ", extrapolated to ",
                                                    paging.pagesPerSession,
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Results.tsx",
                                                lineNumber: 119,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 117,
                                        columnNumber: 19
                                    }, this),
                                    " ",
                                    "Compression rows compress the body as served."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: [
                                    "At ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(requests),
                                    " requests/month. Compression rows compress the body as served (not minified). Times are single-run on our server."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    paging && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PagesSampled, {
                        pagination: a.pagination ?? null,
                        source: a.source
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 133,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "card-title",
                                children: "Size comparison"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Bars, {
                                rows: summary.rows,
                                bestId: summary.best?.id ?? null
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Browsers can accept Zstd. iOS apps typically get Brotli and Android apps Gzip by default, so serve the best format each client supports."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "card-title",
                        children: "Recommendations"
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    findings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "all-good",
                        children: "Nothing to fix here. This response is already in good shape."
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "findings",
                        children: findings.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FindingItem, {
                                f: f
                            }, f.id, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card details",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: "Response preview"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            a.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "preview",
                                        children: [
                                            a.preview,
                                            a.previewTruncated ? "…" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hint",
                                        children: "First 500 characters only. The full body is never sent to your browser or stored."
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 167,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Empty body."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: "Response headers"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            Object.keys(a.responseHeaders).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "headers",
                                children: Object.entries(a.responseHeaders).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: k
                                            }, void 0, false, {
                                                fileName: "[project]/components/Results.tsx",
                                                lineNumber: 179,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/components/Results.tsx",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "No headers for pasted samples."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Only non-sensitive headers are shown. Cookies are never returned."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(Results, "4mjrN+r7QS4U1Pzrz/me9QlruCA=");
_c = Results;
function SavingsCard({ summary, currency, requests, unit }) {
    const { best, today, monthlySavings, annualSavings } = summary;
    const bestIsToday = !best || best.id === "today";
    if (requests === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Set your traffic"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: unit === "page" ? "Enter monthly sessions" : "Enter monthly requests"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: unit === "page" ? "Add how many sessions load this feed per month to see costs." : "Add how many times this endpoint is called per month to see costs."
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 210,
            columnNumber: 7
        }, this);
    }
    if (bestIsToday) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Already efficient"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(today.monthlyCost, currency),
                        "/month"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: [
                        "You already send the smallest format we tested (",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(today.bytes ?? 0),
                        " per ",
                        unit,
                        ")."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 225,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 222,
            columnNumber: 7
        }, this);
    }
    if (monthlySavings <= 0.004) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Within the free tier"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(0, currency),
                        " savings at this traffic"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(today.monthlyBytes),
                        "/month fits in the free allowance. ",
                        best.label,
                        " would still make each ",
                        unit,
                        " ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(today.bytes ?? 0, best.bytes ?? 0).replace(/,.*/, ""),
                        " and load faster. Try a higher traffic preset."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 235,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 232,
            columnNumber: 7
        }, this);
    }
    const pct = today.monthlyCost > 0 ? Math.round(monthlySavings / today.monthlyCost * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "savings",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-kicker",
                children: [
                    "Switch to ",
                    best.label
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-big",
                children: [
                    "You could save ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(monthlySavings, currency),
                    "/month ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "savings-annual",
                        children: [
                            "(",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(annualSavings, currency),
                            "/year)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 248,
                        columnNumber: 70
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-sub",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(today.monthlyCost, currency),
                    " → ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(best.monthlyCost, currency),
                    " per month (",
                    pct,
                    "% less) · ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(today.bytes ?? 0),
                    " →",
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(best.bytes ?? 0),
                    " per ",
                    unit
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 245,
        columnNumber: 5
    }, this);
}
_c1 = SavingsCard;
function CostTable({ rows, bestId, rawBytes, currency, unit }) {
    const sizeLabel = unit === "page" ? "Avg bytes / page" : "Bytes / response";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "table-wrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "cost-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                    className: "sr-only",
                    children: "Response size and egress cost per format"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Format"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 278,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: sizeLabel
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Monthly data"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Monthly cost"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Annual cost"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 277,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((r)=>{
                        const isBest = r.id === bestId;
                        const na = r.bytes === null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: `${isBest ? "best" : ""} ${r.id === "today" ? "today" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "row",
                                    "data-label": "Format",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-name",
                                            children: [
                                                r.label,
                                                isBest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "best-tag",
                                                    children: "Best"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Results.tsx",
                                                    lineNumber: 302,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-note",
                                            children: [
                                                r.note,
                                                r.ms !== null && r.bytes !== null && r.bytes > 0 ? ` · ${r.ms < 1 ? "<1" : r.ms.toFixed(0)} ms` : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, this),
                                        !na && r.id !== "raw" && rawBytes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-ratio",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(rawBytes, r.bytes)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 308,
                                            columnNumber: 61
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": sizeLabel,
                                    children: na ? "–" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        title: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(r.bytes)} bytes`,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 311,
                                        columnNumber: 31
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 310,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Monthly data",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(r.monthlyBytes)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Monthly cost",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(r.monthlyCost, currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 316,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Annual cost",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(r.annualCost, currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 319,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 298,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 274,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_c2 = CostTable;
function Bars({ rows, bestId }) {
    const avail = rows.filter((r)=>r.bytes !== null);
    const max = Math.max(1, ...avail.map((r)=>r.bytes));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "bars",
        "aria-label": "Bytes per response by format",
        children: avail.map((r)=>{
            const w = Math.max(0.5, r.bytes / max * 100);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: r.id === bestId ? "best" : r.id === "today" ? "today" : "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-label",
                        children: r.label
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 340,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-track",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bar-fill",
                            style: {
                                width: `${w}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 342,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 341,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-value",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 344,
                        columnNumber: 13
                    }, this)
                ]
            }, r.id, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 339,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 335,
        columnNumber: 5
    }, this);
}
_c3 = Bars;
function FindingItem({ f }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: `finding sev-${f.severity}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `sev sev-tag-${f.severity}`,
                children: SEV_LABEL[f.severity]
            }, void 0, false, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "finding-title",
                        children: f.title
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "finding-detail",
                        children: f.detail
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 354,
        columnNumber: 5
    }, this);
}
_c4 = FindingItem;
function PagesSampled({ pagination, source }) {
    if (!pagination || pagination.pages.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "card-title",
                    children: "Pages sampled"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 368,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "hint",
                    children: source === "live" ? "Only one page was measured. Turn pagination on and press Analyze again to sample up to 5 pages." : source === "demo" ? "This demo isn't paginated, so page 1 stands in for every page." : "A pasted sample counts as one average page."
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 369,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 367,
            columnNumber: 7
        }, this);
    }
    const { pages, average } = pagination;
    // Show the compression format that's smallest on average.
    const formats = [
        {
            name: "Brotli",
            avg: average.brotliBytes,
            get: (p)=>p.brotliBytes
        },
        {
            name: "Gzip",
            avg: average.gzipBytes,
            get: (p)=>p.gzipBytes
        },
        ...average.zstdBytes !== null ? [
            {
                name: "Zstd",
                avg: average.zstdBytes,
                get: (p)=>p.zstdBytes ?? 0
            }
        ] : []
    ];
    const fmt = formats.reduce((a, b)=>b.avg < a.avg ? b : a);
    const variesPct = Math.round(pagination.maxDeviation * 100);
    const avgItems = pages.every((p)=>p.items !== null) ? pages.reduce((n, p)=>n + (p.items ?? 0), 0) / pages.length : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "card-title",
                children: "Pages sampled"
            }, void 0, false, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "table-wrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "pages-table",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                            className: "sr-only",
                            children: "Size of each sampled page"
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        children: "Page"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "num",
                                        children: "Items"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "num",
                                        children: "Raw size"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 403,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "num",
                                        children: fmt.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 406,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: pages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "row",
                                            children: p.page
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 414,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "num",
                                            children: p.items === null ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(p.items)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 415,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "num",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(p.rawBytes)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "num",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(fmt.get(p))
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 417,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, p.page, true, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "row",
                                        children: "Average"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "num",
                                        children: avgItems === null ? "–" : avgItems.toFixed(avgItems % 1 ? 1 : 0)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 424,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "num",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(average.rawBytes)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "num",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(fmt.avg)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 422,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 421,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 395,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, this),
            pagination.maxDeviation > VARIATION_THRESHOLD && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "notice",
                children: [
                    "Page sizes vary by up to ",
                    variesPct,
                    "% from the average, so the estimate is less certain. Check that these pages are typical of what users load."
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 432,
                columnNumber: 9
            }, this),
            pagination.stopReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "hint",
                children: [
                    formatStopReason(pagination.stopReason),
                    pages.length === 1 ? " Costs use page 1 only." : ""
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 437,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "hint",
                children: [
                    "Paginated by ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: pagination.param
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 443,
                        columnNumber: 22
                    }, this),
                    " (",
                    pagination.kind === "offset" ? "offset" : pagination.kind === "page" ? "page number" : "cursor",
                    "). Up to",
                    " ",
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pagination$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_SAMPLED_PAGES"],
                    " pages, fetched one at a time."
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, this);
}
_c5 = PagesSampled;
/** "page 4 returned an empty list" -> "Stopped early: page 4 returned an empty list." */ function formatStopReason(reason) {
    const text = reason.startsWith("stopped") ? reason.charAt(0).toUpperCase() + reason.slice(1) : `Stopped early: ${reason}`;
    return /[.!?]$/.test(text) ? text : `${text}.`;
}
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Results");
__turbopack_context__.k.register(_c1, "SavingsCard");
__turbopack_context__.k.register(_c2, "CostTable");
__turbopack_context__.k.register(_c3, "Bars");
__turbopack_context__.k.register(_c4, "FindingItem");
__turbopack_context__.k.register(_c5, "PagesSampled");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/costs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCopySummary",
    ()=>buildCopySummary,
    "computeCosts",
    ()=>computeCosts,
    "effectiveSizes",
    ()=>effectiveSizes,
    "encodingName",
    ()=>encodingName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-client] (ecmascript)");
;
;
const ENC_NAMES = {
    gzip: "Gzip",
    br: "Brotli",
    zstd: "Zstd",
    deflate: "Deflate"
};
function encodingName(enc) {
    return enc ? ENC_NAMES[enc] ?? enc : "uncompressed";
}
function effectiveSizes(a, usePageAverages) {
    if (usePageAverages && a.pagination && a.pagination.pages.length > 0) {
        const avg = a.pagination.average;
        return {
            wireBytes: avg.wireBytes,
            rawBytes: avg.rawBytes,
            minifiedBytes: a.isJson ? avg.minifiedBytes : null,
            gzipBytes: avg.gzipBytes,
            brotliBytes: avg.brotliBytes,
            zstdBytes: a.zstd.available ? avg.zstdBytes : null,
            averaged: true
        };
    }
    return {
        wireBytes: a.wireBytes,
        rawBytes: a.rawBytes,
        minifiedBytes: a.isJson ? a.minifiedBytes : null,
        gzipBytes: a.gzip.bytes,
        brotliBytes: a.brotli.bytes,
        zstdBytes: a.zstd.available ? a.zstd.bytes : null,
        averaged: false
    };
}
function computeCosts(a, monthlyRequests, pricing, usePageAverages = false) {
    const make = (id, label, bytes, ms = null, note)=>{
        const monthlyBytes = bytes === null ? 0 : bytes * monthlyRequests;
        const monthlyCost = bytes === null ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthlyCostForBytes"])(monthlyBytes, pricing);
        return {
            id,
            label,
            note,
            bytes,
            monthlyBytes,
            monthlyCost,
            annualCost: monthlyCost * 12,
            ms
        };
    };
    const todayNote = a.source === "live" ? `as served (${encodingName(a.contentEncoding)})` : a.source === "demo" ? `demo API (${encodingName(a.contentEncoding)})` : `assumed ${encodingName(a.contentEncoding)}`;
    const sz = effectiveSizes(a, usePageAverages);
    const today = make("today", "What you send today", sz.wireBytes, null, todayNote);
    const rows = [
        today,
        make("raw", "Uncompressed", sz.rawBytes)
    ];
    if (sz.minifiedBytes !== null) rows.push(make("minified", "Minified", sz.minifiedBytes, null, "JSON only"));
    rows.push(make("gzip", "Gzip", sz.gzipBytes, a.gzip.ms, "level 6"));
    rows.push(make("brotli", "Brotli", sz.brotliBytes, a.brotli.ms, "quality 5"));
    rows.push(make("zstd", "Zstd", sz.zstdBytes, a.zstd.ms, a.zstd.available ? "level 3" : "not available on this runtime"));
    const candidates = rows.filter((r)=>r.id !== "today" && r.bytes !== null);
    let best = null;
    for (const r of candidates)if (!best || r.bytes < best.bytes) best = r;
    // If today is already as good as the best option, today is best.
    if (best && today.bytes !== null && today.bytes <= best.bytes) best = today;
    const monthlySavings = best ? Math.max(0, today.monthlyCost - best.monthlyCost) : 0;
    return {
        rows,
        best,
        today,
        monthlySavings,
        annualSavings: monthlySavings * 12
    };
}
function buildCopySummary(a, s, monthlyRequests, pricing, defaults, link, sessions) {
    const lines = [];
    const paged = !!sessions;
    const sz = effectiveSizes(a, paged);
    lines.push("API Egress Cost Calculator");
    if (sessions) {
        lines.push(`Traffic: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(sessions.sessions)} sessions/month × ${sessions.pagesPerSession} pages = ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(monthlyRequests)} page requests/month`);
        const sampled = a.pagination?.pages.length ?? 1;
        lines.push(`Pages sampled: ${sampled}${sessions.pagesPerSession > sampled ? ` (extrapolated to ${sessions.pagesPerSession})` : ""}`);
    } else {
        lines.push(`Traffic: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(monthlyRequests)} requests/month`);
    }
    lines.push(`${paged ? "Average page" : "Response"}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(sz.rawBytes)} uncompressed${a.isJson ? " JSON" : ""}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(sz.wireBytes)} on the wire (${encodingName(a.contentEncoding)})`);
    lines.push("");
    for (const r of s.rows){
        if (r.bytes === null) {
            lines.push(`- ${r.label}: n/a`);
            continue;
        }
        const ratio = r.id === "raw" ? "" : ` (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRatio"])(sz.rawBytes, r.bytes)})`;
        lines.push(`- ${r.label}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)}${ratio} → ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatBytes"])(r.monthlyBytes)}/mo, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(r.monthlyCost, pricing.currency)}/mo`);
    }
    lines.push("");
    if (s.best && s.best.id !== "today" && s.monthlySavings > 0) {
        lines.push(`Switching to ${s.best.label} could save ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(s.monthlySavings, pricing.currency)}/month (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(s.annualSavings, pricing.currency)}/year).`);
    } else {
        lines.push("No egress savings available at this traffic level.");
    }
    lines.push(defaults ? "Pricing: AWS data transfer out, us-east-1 (tiered)." : "Pricing: custom tiers.");
    lines.push(paged ? "Monthly data = sessions × pages per session × average page size (1 GB = 10^9 bytes)." : "Monthly data = response size × requests (1 GB = 10^9 bytes).");
    if (link) lines.push(`Try it: ${link}`);
    return lines.join("\n");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/curl.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A small, strict curl command parser. Supports the subset of curl that
 * describes a single HTTP request; anything else produces a clear error.
 */ __turbopack_context__.s([
    "CurlParseError",
    ()=>CurlParseError,
    "looksLikeCurl",
    ()=>looksLikeCurl,
    "normalizeUrl",
    ()=>normalizeUrl,
    "parseCurl",
    ()=>parseCurl,
    "tokenize",
    ()=>tokenize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
class CurlParseError extends Error {
    constructor(message){
        super(message);
        this.name = "CurlParseError";
    }
}
function tokenize(input) {
    const tokens = [];
    let cur = "";
    let inToken = false;
    let i = 0;
    const s = input;
    while(i < s.length){
        const c = s[i];
        // Line continuation: backslash + newline (optionally \r\n). Also handle
        // Windows cmd "^" continuations and PowerShell "`" continuations at EOL.
        if ((c === "\\" || c === "^" || c === "`") && /^\r?\n/.test(s.slice(i + 1, i + 3))) {
            i += s[i + 1] === "\r" ? 3 : 2;
            continue;
        }
        if (c === " " || c === "\t" || c === "\n" || c === "\r") {
            if (inToken) {
                tokens.push(cur);
                cur = "";
                inToken = false;
            }
            i++;
            continue;
        }
        inToken = true;
        if (c === "$" && s[i + 1] === "'") {
            // ANSI-C quoting: $'...'
            i += 2;
            let closed = false;
            while(i < s.length){
                const d = s[i];
                if (d === "'") {
                    closed = true;
                    i++;
                    break;
                }
                if (d === "\\" && i + 1 < s.length) {
                    const n = s[i + 1];
                    const map = {
                        n: "\n",
                        t: "\t",
                        r: "\r",
                        "\\": "\\",
                        "'": "'",
                        '"': '"'
                    };
                    cur += map[n] ?? n;
                    i += 2;
                    continue;
                }
                cur += d;
                i++;
            }
            if (!closed) throw new CurlParseError("There's an unclosed $' quote. Check that every quote has a matching closing quote.");
            continue;
        }
        if (c === "'") {
            const end = s.indexOf("'", i + 1);
            if (end === -1) throw new CurlParseError("There's an unclosed single quote ('). Check that every quote has a matching closing quote.");
            cur += s.slice(i + 1, end);
            i = end + 1;
            continue;
        }
        if (c === '"') {
            i++;
            let closed = false;
            while(i < s.length){
                const d = s[i];
                if (d === '"') {
                    closed = true;
                    i++;
                    break;
                }
                if (d === "\\" && i + 1 < s.length) {
                    const n = s[i + 1];
                    if (n === "\n") {
                        i += 2;
                        continue;
                    }
                    if (n === '"' || n === "\\" || n === "$" || n === "`") {
                        cur += n;
                        i += 2;
                        continue;
                    }
                }
                cur += d;
                i++;
            }
            if (!closed) throw new CurlParseError('There\'s an unclosed double quote ("). Check that every quote has a matching closing quote.');
            continue;
        }
        if (c === "\\" && i + 1 < s.length) {
            cur += s[i + 1];
            i += 2;
            continue;
        }
        cur += c;
        i++;
    }
    if (inToken) tokens.push(cur);
    return tokens;
}
function normalizeUrl(raw) {
    const u = raw.trim();
    if (!u) return u;
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(u)) return u;
    if (u.startsWith("//")) return "https:" + u;
    return "https://" + u;
}
function toBase64(s) {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] !== "undefined") return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(s, "utf8").toString("base64");
    const bytes = new TextEncoder().encode(s);
    let bin = "";
    bytes.forEach((b)=>bin += String.fromCharCode(b));
    return btoa(bin);
}
const VALUE_FLAGS = {
    "-X": "method",
    "--request": "method",
    "-H": "header",
    "--header": "header",
    "-d": "data",
    "--data": "data",
    "--data-raw": "data",
    "--data-binary": "data",
    "--data-ascii": "data",
    "--json": "json",
    "-u": "user",
    "--user": "user",
    "--url": "url",
    "-A": "agent",
    "--user-agent": "agent",
    "-e": "referer",
    "--referer": "referer",
    "-b": "cookie",
    "--cookie": "cookie",
    // Harmless flags that take a value we don't need.
    "-m": "ignore-value",
    "--max-time": "ignore-value",
    "--connect-timeout": "ignore-value",
    "-o": "ignore-value",
    "--output": "ignore-value"
};
const HARMLESS_LONG = new Set([
    "--compressed",
    "--location",
    "--insecure",
    "--silent",
    "--show-error",
    "--include",
    "--verbose",
    "--globoff",
    "--fail",
    "--no-progress-meter",
    "--http1.1",
    "--http2"
]);
const HARMLESS_SHORT = new Set([
    "L",
    "k",
    "s",
    "S",
    "i",
    "v",
    "g",
    "f"
]);
function parseCurl(input) {
    const text = input.trim();
    if (!text) throw new CurlParseError("Paste a curl command, e.g. curl https://api.example.com/items");
    const tokens = tokenize(text);
    if (tokens.length === 0 || tokens[0] !== "curl") {
        throw new CurlParseError('The command should start with "curl". Copy it from your browser\'s dev tools (Copy as cURL) or your API docs.');
    }
    let method;
    const headers = {};
    const dataParts = [];
    let isJsonFlag = false;
    const urls = [];
    const addHeader = (raw)=>{
        const idx = raw.indexOf(":");
        if (idx <= 0) throw new CurlParseError(`This header isn't valid: "${raw.slice(0, 60)}". Headers look like "Name: value".`);
        const name = raw.slice(0, idx).trim();
        const value = raw.slice(idx + 1).trim();
        if (!/^[A-Za-z0-9!#$%&'*+.^_`|~-]+$/.test(name)) {
            throw new CurlParseError(`"${name.slice(0, 60)}" isn't a valid header name.`);
        }
        // Later headers replace earlier ones with the same name (case-insensitive).
        for (const k of Object.keys(headers))if (k.toLowerCase() === name.toLowerCase()) delete headers[k];
        headers[name] = value;
    };
    const apply = (kind, value)=>{
        switch(kind){
            case "method":
                method = value.toUpperCase();
                break;
            case "header":
                addHeader(value);
                break;
            case "data":
                if (value.startsWith("@")) throw new CurlParseError("Reading the body from a file (-d @file) isn't supported. Paste the body inline instead.");
                dataParts.push(value);
                break;
            case "json":
                if (value.startsWith("@")) throw new CurlParseError("Reading the body from a file (--json @file) isn't supported. Paste the body inline instead.");
                dataParts.push(value);
                isJsonFlag = true;
                break;
            case "user":
                addHeader(`Authorization: Basic ${toBase64(value)}`);
                break;
            case "url":
                urls.push(value);
                break;
            case "agent":
                addHeader(`User-Agent: ${value}`);
                break;
            case "referer":
                addHeader(`Referer: ${value}`);
                break;
            case "cookie":
                if (!value.includes("=")) throw new CurlParseError("Reading cookies from a file (-b file) isn't supported. Use -b 'name=value'.");
                addHeader(`Cookie: ${value}`);
                break;
            case "ignore-value":
                break;
        }
    };
    for(let i = 1; i < tokens.length; i++){
        const tok = tokens[i];
        if (tok.startsWith("--")) {
            const eq = tok.indexOf("=");
            const name = eq > -1 ? tok.slice(0, eq) : tok;
            if (HARMLESS_LONG.has(name)) continue;
            const kind = VALUE_FLAGS[name];
            if (!kind) throw new CurlParseError(`The option ${name} isn't supported. Remove it and try again.`);
            let value;
            if (eq > -1) value = tok.slice(eq + 1);
            else {
                if (i + 1 >= tokens.length) throw new CurlParseError(`${name} needs a value after it.`);
                value = tokens[++i];
            }
            apply(kind, value);
            continue;
        }
        if (tok.startsWith("-") && tok.length > 1) {
            // Short options may be grouped (-sSL) or have an attached value (-XPOST, -H'...').
            let j = 1;
            while(j < tok.length){
                const ch = tok[j];
                if (HARMLESS_SHORT.has(ch)) {
                    j++;
                    continue;
                }
                const kind = VALUE_FLAGS["-" + ch];
                if (!kind) throw new CurlParseError(`The option -${ch} isn't supported. Remove it and try again.`);
                let value = tok.slice(j + 1);
                if (!value) {
                    if (i + 1 >= tokens.length) throw new CurlParseError(`-${ch} needs a value after it.`);
                    value = tokens[++i];
                }
                apply(kind, value);
                break;
            }
            continue;
        }
        urls.push(tok);
    }
    if (urls.length === 0) throw new CurlParseError("No URL found in the command. Add the endpoint, e.g. curl https://api.example.com/items");
    if (urls.length > 1) throw new CurlParseError("Found more than one URL. The tool analyzes one request at a time, so keep just one.");
    const url = normalizeUrl(urls[0]);
    try {
        new URL(url);
    } catch  {
        throw new CurlParseError(`"${urls[0].slice(0, 80)}" doesn't look like a valid URL.`);
    }
    let body;
    if (dataParts.length > 0) {
        body = dataParts.join("&");
        if (isJsonFlag) {
            if (!Object.keys(headers).some((k)=>k.toLowerCase() === "content-type")) headers["Content-Type"] = "application/json";
            if (!Object.keys(headers).some((k)=>k.toLowerCase() === "accept")) headers["Accept"] = "application/json";
        } else if (!Object.keys(headers).some((k)=>k.toLowerCase() === "content-type")) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
    }
    const finalMethod = method ?? (body !== undefined ? "POST" : "GET");
    if (!/^[A-Z]+$/.test(finalMethod)) throw new CurlParseError(`"${finalMethod}" isn't a valid HTTP method.`);
    return {
        method: finalMethod,
        url,
        headers,
        body
    };
}
function looksLikeCurl(s) {
    return /^\s*curl\s/i.test(s);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/demo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Deterministic, realistic demo payloads. Seeded so the server render and
 * every build produce identical bytes.
 */ __turbopack_context__.s([
    "DEMOS",
    ()=>DEMOS,
    "SOCIAL_DEMO_PARAM",
    ()=>SOCIAL_DEMO_PARAM,
    "SOCIAL_DEMO_URL",
    ()=>SOCIAL_DEMO_URL,
    "SOCIAL_PAGE_COUNT",
    ()=>SOCIAL_PAGE_COUNT,
    "SOCIAL_PAGE_SIZE",
    ()=>SOCIAL_PAGE_SIZE,
    "demoPayload",
    ()=>demoPayload,
    "socialCursor",
    ()=>socialCursor,
    "socialFeedPages",
    ()=>socialFeedPages
]);
const DEMOS = [
    {
        id: "social",
        label: "Social media feed (50 posts)",
        servedAs: "identity",
        vary: null,
        pretty: false,
        blurb: "Minified JSON served without compression."
    },
    {
        id: "ecommerce",
        label: "E-commerce product list (100 items)",
        servedAs: "gzip",
        vary: null,
        pretty: false,
        blurb: "Gzip-compressed, but without a Vary header."
    },
    {
        id: "analytics",
        label: "Analytics dashboard data",
        servedAs: "identity",
        vary: null,
        pretty: true,
        blurb: "Pretty-printed JSON served without compression."
    }
];
function mulberry32(seed) {
    let a = seed >>> 0;
    return ()=>{
        a = a + 0x6d2b79f5 >>> 0;
        let t = a;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
const FIRST = [
    "Amara",
    "Bilal",
    "Chen",
    "Dana",
    "Elif",
    "Farah",
    "Gabriel",
    "Hana",
    "Ibrahim",
    "Jonas",
    "Kofi",
    "Lena",
    "Mateo",
    "Nadia",
    "Omar",
    "Priya",
    "Quinn",
    "Rosa",
    "Sami",
    "Tariq",
    "Uma",
    "Viktor",
    "Wen",
    "Yusuf",
    "Zara"
];
const LAST = [
    "Okafor",
    "Khan",
    "Li",
    "Silva",
    "Novak",
    "Haddad",
    "Rossi",
    "Tanaka",
    "Nguyen",
    "Müller",
    "Mensah",
    "García",
    "Ahmed",
    "Kowalski",
    "Patel"
];
const WORDS = "the a api latency deploy shipped release team cache edge region query index review pull request test coverage incident postmortem roadmap sprint design system token bundle size performance metrics dashboard pipeline queue worker cron migration schema database replica rollout canary feature flag users growth weekend coffee conference talk slides demo launch".split(" ");
const TAGS = [
    "engineering",
    "devops",
    "aws",
    "frontend",
    "backend",
    "career",
    "productivity",
    "opensource",
    "cloud",
    "ai"
];
const ADJ = [
    "Classic",
    "Premium",
    "Eco",
    "Ultra",
    "Compact",
    "Pro",
    "Everyday",
    "Vintage",
    "Smart",
    "Organic"
];
const NOUN = [
    "Backpack",
    "Water Bottle",
    "Desk Lamp",
    "Headphones",
    "Running Shoes",
    "Coffee Grinder",
    "Notebook",
    "Yoga Mat",
    "Phone Case",
    "Wool Scarf",
    "Keyboard",
    "Sunglasses"
];
const CATS = [
    "bags",
    "kitchen",
    "electronics",
    "sports",
    "stationery",
    "fashion",
    "home"
];
const COUNTRIES = [
    "US",
    "GB",
    "DE",
    "IN",
    "PK",
    "BR",
    "CA",
    "AU",
    "FR",
    "NG",
    "AE",
    "JP"
];
const PAGES = [
    "/",
    "/pricing",
    "/docs",
    "/blog",
    "/signup",
    "/login",
    "/dashboard",
    "/settings",
    "/blog/compression",
    "/docs/api"
];
function pick(r, arr) {
    return arr[Math.floor(r() * arr.length)];
}
function sentence(r, min, max) {
    const n = min + Math.floor(r() * (max - min));
    const w = [];
    for(let i = 0; i < n; i++)w.push(pick(r, WORDS));
    const s = w.join(" ");
    return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
function id(r, len = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let s = "";
    for(let i = 0; i < len; i++)s += chars[Math.floor(r() * chars.length)];
    return s;
}
function isoDate(r, base = Date.UTC(2026, 9, 1)) {
    return new Date(base + Math.floor(r() * 40 * 86400_000)).toISOString();
}
function makePost(r, i) {
    const first = pick(r, FIRST);
    const last = pick(r, LAST);
    const handle = `${first}${last}`.toLowerCase().replace(/[^a-z]/g, "") + Math.floor(r() * 100);
    return {
        id: `post_${id(r)}`,
        author: {
            id: `usr_${id(r, 10)}`,
            handle,
            displayName: `${first} ${last}`,
            avatarUrl: `https://cdn.example.com/avatars/${handle}.jpg`,
            verified: r() > 0.8,
            followers: Math.floor(r() * 50000)
        },
        createdAt: isoDate(r),
        text: sentence(r, 15, 45),
        media: r() > 0.6 ? [
            {
                type: "image",
                url: `https://cdn.example.com/media/${id(r)}.jpg`,
                width: 1200,
                height: 800,
                alt: sentence(r, 4, 9)
            }
        ] : [],
        hashtags: Array.from({
            length: Math.floor(r() * 4)
        }, ()=>pick(r, TAGS)),
        stats: {
            likes: Math.floor(r() * 5000),
            reposts: Math.floor(r() * 800),
            replies: Math.floor(r() * 300),
            views: Math.floor(r() * 90000)
        },
        viewer: {
            liked: r() > 0.7,
            reposted: r() > 0.9,
            bookmarked: r() > 0.85
        },
        position: i
    };
}
function socialFeed() {
    const r = mulberry32(42);
    const posts = Array.from({
        length: 50
    }, (_, i)=>makePost(r, i));
    return {
        data: posts,
        meta: {
            count: posts.length,
            nextCursor: id(r, 24),
            generatedAt: "2026-11-16T09:00:00.000Z"
        }
    };
}
const SOCIAL_PAGE_COUNT = 5;
const SOCIAL_PAGE_SIZE = 10;
const SOCIAL_DEMO_URL = "https://api.example.com/v1/feed?limit=10";
const SOCIAL_DEMO_PARAM = "cursor";
function socialCursor(n) {
    return `c${n}_${id(mulberry32(1000 + n), 16)}`;
}
function socialFeedPages() {
    return Array.from({
        length: SOCIAL_PAGE_COUNT
    }, (_, k)=>{
        const r = mulberry32(500 + k);
        const posts = Array.from({
            length: SOCIAL_PAGE_SIZE
        }, (_, i)=>makePost(r, k * SOCIAL_PAGE_SIZE + i));
        const last = k === SOCIAL_PAGE_COUNT - 1;
        return JSON.stringify({
            data: posts,
            meta: {
                count: posts.length,
                hasMore: !last,
                nextCursor: last ? null : socialCursor(k + 2),
                generatedAt: "2026-11-16T09:00:00.000Z"
            }
        });
    });
}
function productList() {
    const r = mulberry32(7);
    const items = Array.from({
        length: 100
    }, ()=>{
        const name = `${pick(r, ADJ)} ${pick(r, NOUN)}`;
        const price = Math.round((5 + r() * 295) * 100) / 100;
        const sku = `SKU-${id(r, 8).toUpperCase()}`;
        return {
            id: id(r, 16),
            sku,
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + id(r, 4),
            description: sentence(r, 20, 40),
            category: pick(r, CATS),
            price: {
                amount: price,
                currency: "USD",
                compareAt: r() > 0.7 ? Math.round(price * 1.25 * 100) / 100 : null
            },
            inventory: {
                inStock: r() > 0.15,
                quantity: Math.floor(r() * 400),
                warehouse: pick(r, [
                    "us-east-1",
                    "eu-west-1",
                    "ap-south-1"
                ])
            },
            rating: {
                average: Math.round((3 + r() * 2) * 10) / 10,
                count: Math.floor(r() * 2400)
            },
            images: Array.from({
                length: 1 + Math.floor(r() * 3)
            }, (_, k)=>({
                    url: `https://cdn.example.com/products/${sku.toLowerCase()}/${k}.webp`,
                    width: 800,
                    height: 800
                })),
            variants: Array.from({
                length: 1 + Math.floor(r() * 3)
            }, ()=>({
                    id: id(r, 10),
                    color: pick(r, [
                        "black",
                        "white",
                        "navy",
                        "sand",
                        "olive"
                    ]),
                    size: pick(r, [
                        "S",
                        "M",
                        "L",
                        "XL",
                        "One size"
                    ])
                })),
            tags: Array.from({
                length: 1 + Math.floor(r() * 3)
            }, ()=>pick(r, [
                    "new",
                    "bestseller",
                    "sale",
                    "eco",
                    "gift"
                ])),
            updatedAt: isoDate(r)
        };
    });
    return {
        items,
        page: 1,
        pageSize: 100,
        total: 2381
    };
}
function analyticsData() {
    const r = mulberry32(2026);
    const start = Date.UTC(2026, 9, 17);
    const timeseries = Array.from({
        length: 30
    }, (_, d)=>({
            date: new Date(start + d * 86400_000).toISOString().slice(0, 10),
            visitors: 4000 + Math.floor(r() * 3000),
            pageviews: 12000 + Math.floor(r() * 9000),
            bounceRate: Math.round((0.3 + r() * 0.3) * 1000) / 1000,
            avgSessionSeconds: 60 + Math.floor(r() * 240),
            conversions: Math.floor(r() * 300),
            revenue: Math.round(r() * 18000 * 100) / 100
        }));
    const hourly = Array.from({
        length: 7 * 24
    }, (_, h)=>({
            hour: h,
            requests: Math.floor(r() * 9000),
            p50Ms: 40 + Math.floor(r() * 40),
            p95Ms: 120 + Math.floor(r() * 200),
            errors: Math.floor(r() * 30)
        }));
    return {
        range: {
            from: "2026-10-17",
            to: "2026-11-15",
            timezone: "UTC"
        },
        summary: {
            visitors: 158204,
            pageviews: 491337,
            conversions: 4120,
            revenue: 251933.42,
            bounceRate: 0.412
        },
        timeseries,
        hourly,
        topPages: PAGES.map((p)=>({
                path: p,
                views: Math.floor(r() * 60000),
                uniqueVisitors: Math.floor(r() * 30000),
                avgTimeSeconds: Math.floor(r() * 300),
                exitRate: Math.round(r() * 1000) / 1000
            })),
        countries: COUNTRIES.map((c)=>({
                country: c,
                visitors: Math.floor(r() * 20000),
                share: Math.round(r() * 1000) / 1000
            })),
        devices: [
            {
                type: "desktop",
                share: 0.54
            },
            {
                type: "mobile",
                share: 0.41
            },
            {
                type: "tablet",
                share: 0.05
            }
        ]
    };
}
function demoPayload(demoId) {
    const scenario = DEMOS.find((d)=>d.id === demoId) ?? DEMOS[0];
    const data = scenario.id === "social" ? socialFeed() : scenario.id === "ecommerce" ? productList() : analyticsData();
    return scenario.pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compactCount",
    ()=>compactCount,
    "formatBytes",
    ()=>formatBytes,
    "formatMoney",
    ()=>formatMoney,
    "formatNumber",
    ()=>formatNumber,
    "formatRatio",
    ()=>formatRatio,
    "parseCount",
    ()=>parseCount
]);
const UNITS = [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB"
];
function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "–";
    if (bytes < 1000) return `${Math.round(bytes)} B`;
    let i = 0;
    let v = bytes;
    while(v >= 1000 && i < UNITS.length - 1){
        v /= 1000;
        i++;
    }
    const digits = v >= 100 ? 0 : v >= 10 ? 1 : 2;
    return `${v.toFixed(digits)} ${UNITS[i]}`;
}
function formatNumber(n) {
    return Math.round(n).toLocaleString("en-US");
}
function formatMoney(amount, currency) {
    const v = Number.isFinite(amount) ? amount : 0;
    const num = v.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    if (currency.toUpperCase() === "USD") return `$${num}`;
    return `${num} ${currency}`;
}
function formatRatio(baseline, bytes) {
    if (!(baseline > 0) || !(bytes >= 0)) return "";
    if (bytes === baseline) return "same size";
    if (bytes > baseline) {
        const pct = (bytes - baseline) / baseline * 100;
        return `+${pct.toFixed(0)}% larger`;
    }
    const ratio = bytes === 0 ? Infinity : baseline / bytes;
    const pct = (baseline - bytes) / baseline * 100;
    const r = !Number.isFinite(ratio) ? "∞" : ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1);
    return `${r}x smaller, −${pct.toFixed(0)}%`;
}
function parseCount(s) {
    const t = s.trim().replace(/[,\s_]/g, "").toUpperCase();
    if (!t) return null;
    const m = /^(\d+(?:\.\d+)?)([KMB])?$/.exec(t);
    if (!m) return null;
    const mult = m[2] === "K" ? 1e3 : m[2] === "M" ? 1e6 : m[2] === "B" ? 1e9 : 1;
    const n = Math.round(parseFloat(m[1]) * mult);
    return Number.isFinite(n) ? n : null;
}
function compactCount(n) {
    if (n >= 1e9 && n % 1e9 === 0) return `${n / 1e9}B`;
    if (n >= 1e6 && n % 1e6 === 0) return `${n / 1e6}M`;
    if (n >= 1e3 && n % 1e3 === 0) return `${n / 1e3}K`;
    return formatNumber(n);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/pagination.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pure helpers for sampling paginated endpoints. No Node or DOM dependencies,
 * so the same code runs in the browser (detection) and on the server (fetching),
 * and is easy to unit-test.
 */ __turbopack_context__.s([
    "DEFAULT_PAGES_PER_SESSION",
    ()=>DEFAULT_PAGES_PER_SESSION,
    "LIMIT_PARAMS",
    ()=>LIMIT_PARAMS,
    "MAX_PAGES_PER_SESSION",
    ()=>MAX_PAGES_PER_SESSION,
    "MAX_SAMPLED_PAGES",
    ()=>MAX_SAMPLED_PAGES,
    "PAGE_DELAY_MS",
    ()=>PAGE_DELAY_MS,
    "PAGINATION_PARAMS",
    ()=>PAGINATION_PARAMS,
    "buildNextUrl",
    ()=>buildNextUrl,
    "classifyParam",
    ()=>classifyParam,
    "detectPaginationParam",
    ()=>detectPaginationParam,
    "findItemArray",
    ()=>findItemArray,
    "findNextCursor",
    ()=>findNextCursor,
    "getQueryParam",
    ()=>getQueryParam,
    "hasMoreIndicator",
    ()=>hasMoreIndicator,
    "isValidParamName",
    ()=>isValidParamName,
    "itemCount",
    ()=>itemCount,
    "maxDeviation",
    ()=>maxDeviation,
    "mean",
    ()=>mean,
    "pageRequests",
    ()=>pageRequests,
    "sameEndpoint",
    ()=>sameEndpoint,
    "sessionEgressBytes",
    ()=>sessionEgressBytes,
    "setQueryParam",
    ()=>setQueryParam,
    "stopReason",
    ()=>stopReason
]);
const PAGINATION_PARAMS = [
    "skip",
    "offset",
    "page",
    "pageNumber",
    "p",
    "cursor"
];
const LIMIT_PARAMS = [
    "limit",
    "take",
    "size",
    "per_page",
    "perPage",
    "pageSize",
    "page_size"
];
const MAX_SAMPLED_PAGES = 5;
const PAGE_DELAY_MS = 300;
const DEFAULT_PAGES_PER_SESSION = 5;
const MAX_PAGES_PER_SESSION = 50;
function isValidParamName(name) {
    return /^[A-Za-z0-9_.\-[\]]{1,64}$/.test(name);
}
function classifyParam(name) {
    const n = name.toLowerCase();
    if (n === "skip" || n === "offset" || n.includes("offset") || n === "start" || n === "from") return "offset";
    if (n === "page" || n === "pagenumber" || n === "p" || n === "page_number" || n === "pageindex" || n === "page_index") return "page";
    if (n.includes("cursor") || n.includes("token") || n === "after" || n === "before" || n === "starting_after") return "cursor";
    if (n.includes("page")) return "page";
    return "cursor";
}
/* ------------------------------------------------------------------ */ /* Query-string handling that preserves every other byte of the URL    */ /* ------------------------------------------------------------------ */ function splitUrl(url) {
    const hashIdx = url.indexOf("#");
    const hash = hashIdx > -1 ? url.slice(hashIdx) : "";
    const noHash = hashIdx > -1 ? url.slice(0, hashIdx) : url;
    const qIdx = noHash.indexOf("?");
    return {
        base: qIdx > -1 ? noHash.slice(0, qIdx) : noHash,
        query: qIdx > -1 ? noHash.slice(qIdx + 1) : "",
        hash
    };
}
function decodePart(s) {
    try {
        return decodeURIComponent(s.replace(/\+/g, " "));
    } catch  {
        return s;
    }
}
function getQueryParam(url, name) {
    const { query } = splitUrl(url);
    if (!query) return null;
    const want = name.toLowerCase();
    for (const part of query.split("&")){
        const eq = part.indexOf("=");
        const key = decodePart(eq > -1 ? part.slice(0, eq) : part);
        if (key.toLowerCase() === want) return eq > -1 ? decodePart(part.slice(eq + 1)) : "";
    }
    return null;
}
function setQueryParam(url, name, value) {
    const { base, query, hash } = splitUrl(url);
    const want = name.toLowerCase();
    const encoded = encodeURIComponent(value);
    const parts = query ? query.split("&") : [];
    let replaced = false;
    const out = parts.map((part)=>{
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
function detectPaginationParam(url) {
    if (!url) return null;
    const { query } = splitUrl(url);
    if (!query) return null;
    const keys = query.split("&").map((p)=>decodePart(p.split("=")[0]));
    for (const candidate of PAGINATION_PARAMS){
        const hit = keys.find((k)=>k.toLowerCase() === candidate.toLowerCase());
        if (hit) return hit;
    }
    return null;
}
/* ------------------------------------------------------------------ */ /* Reading the response                                                */ /* ------------------------------------------------------------------ */ const ITEM_KEYS = [
    "data",
    "items",
    "posts",
    "results",
    "records",
    "rows",
    "entries",
    "list",
    "products",
    "users",
    "nodes",
    "edges",
    "hits",
    "content",
    "values"
];
const isObj = (v)=>typeof v === "object" && v !== null && !Array.isArray(v);
function findItemArray(json) {
    if (Array.isArray(json)) return json;
    if (!isObj(json)) return null;
    for (const k of ITEM_KEYS)if (Array.isArray(json[k])) return json[k];
    // One level down for envelopes like { data: { items: [...] } }
    for (const k of ITEM_KEYS){
        const inner = json[k];
        if (isObj(inner)) {
            for (const k2 of ITEM_KEYS)if (Array.isArray(inner[k2])) return inner[k2];
        }
    }
    for (const v of Object.values(json))if (Array.isArray(v)) return v;
    return null;
}
function itemCount(json) {
    const arr = findItemArray(json);
    return arr ? arr.length : null;
}
function getPath(json, path) {
    let cur = json;
    for (const seg of path.split(".")){
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
    "meta.next_cursor"
];
function findNextCursor(json) {
    for (const p of CURSOR_PATHS){
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
    "totalResults"
];
const HAS_MORE_CONTAINERS = [
    "",
    "meta",
    "pagination",
    "paging",
    "links",
    "page_info",
    "pageInfo",
    "_links"
];
function hasMoreIndicator(json, linkHeader) {
    if (linkHeader && /rel="?next"?/i.test(linkHeader)) return true;
    if (!isObj(json)) return false;
    for (const c of HAS_MORE_CONTAINERS){
        const scope = c ? json[c] : json;
        if (!isObj(scope)) continue;
        const keys = Object.keys(scope);
        for (const k of HAS_MORE_KEYS)if (keys.includes(k)) return true;
    }
    return false;
}
function parseIntStrict(s) {
    if (s === null || !/^-?\d+$/.test(s.trim())) return null;
    const n = Number(s.trim());
    return Number.isSafeInteger(n) ? n : null;
}
function limitFromUrl(url) {
    for (const name of LIMIT_PARAMS){
        const n = parseIntStrict(getQueryParam(url, name));
        if (n !== null && n > 0) return n;
    }
    return null;
}
/**
 * Resolve a cursor value that might be a full "next" URL. Only accepted if it
 * points at the same origin and path; then we take just the param's value from it.
 */ function cursorFromNext(raw, currentUrl, param) {
    const looksLikeUrl = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) || raw.startsWith("/") || raw.startsWith("?");
    if (!looksLikeUrl) return raw;
    try {
        const cur = new URL(currentUrl);
        const next = new URL(raw, cur);
        if (next.origin !== cur.origin || next.pathname !== cur.pathname) return null;
        return getQueryParam(next.toString(), param);
    } catch  {
        return null;
    }
}
function buildNextUrl(input) {
    const { url, param, kind, json } = input;
    const current = getQueryParam(url, param);
    if (kind === "page") {
        const n = current === null ? 1 : parseIntStrict(current);
        if (n === null) return {
            ok: false,
            reason: `the ${param} value isn't a whole number`
        };
        return {
            ok: true,
            url: setQueryParam(url, param, String(n + 1))
        };
    }
    if (kind === "offset") {
        const n = current === null ? 0 : parseIntStrict(current);
        if (n === null) return {
            ok: false,
            reason: `the ${param} value isn't a whole number`
        };
        const step = limitFromUrl(url) ?? input.firstPageItemCount;
        if (!step || step <= 0) return {
            ok: false,
            reason: "we couldn't tell the page size (no limit param and no item list in page 1)"
        };
        return {
            ok: true,
            url: setQueryParam(url, param, String(n + step))
        };
    }
    const raw = findNextCursor(json);
    if (raw === null) return {
        ok: false,
        reason: "the response has no next cursor"
    };
    const cursor = cursorFromNext(raw, url, param);
    if (cursor === null || cursor === "") return {
        ok: false,
        reason: "the next link points somewhere else, so we didn't follow it"
    };
    if (cursor === current) return {
        ok: false,
        reason: "the next cursor is the same as the current one"
    };
    return {
        ok: true,
        url: setQueryParam(url, param, cursor)
    };
}
function sameEndpoint(a, b) {
    try {
        const x = new URL(a);
        const y = new URL(b);
        return x.protocol === y.protocol && x.host === y.host && x.pathname === y.pathname;
    } catch  {
        return false;
    }
}
function bytesEqual(a, b) {
    if (a.length !== b.length) return false;
    for(let i = 0; i < a.length; i++)if (a[i] !== b[i]) return false;
    return true;
}
function stopReason(c) {
    if (c.status < 200 || c.status >= 300) return `page ${c.pageNumber} returned HTTP ${c.status}`;
    const items = findItemArray(c.json);
    if (items && items.length === 0) return `page ${c.pageNumber} returned an empty list`;
    if (c.body.length === 0) return `page ${c.pageNumber} had an empty body`;
    if (c.previousBody && bytesEqual(c.body, c.previousBody)) return `page ${c.pageNumber} was identical to page ${c.pageNumber - 1}`;
    return null;
}
function pageRequests(sessions, pagesPerSession) {
    return Math.max(0, sessions) * Math.max(0, pagesPerSession);
}
function sessionEgressBytes(sessions, pagesPerSession, avgPageBytes) {
    return pageRequests(sessions, pagesPerSession) * Math.max(0, avgPageBytes);
}
function mean(values) {
    return values.length ? values.reduce((a, b)=>a + b, 0) / values.length : 0;
}
function maxDeviation(values) {
    const m = mean(values);
    if (!(m > 0)) return 0;
    return Math.max(...values.map((v)=>Math.abs(v - m) / m));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/pricing.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pricing model for AWS data transfer out (egress) to the internet.
 *
 * Tiers are cumulative per month: each GB is billed at the rate of the tier
 * it falls into. A tier runs from the previous tier's upper limit to its own
 * `upToGB` (null = unlimited). The last tier must be unlimited.
 */ __turbopack_context__.s([
    "BYTES_PER_GB",
    ()=>BYTES_PER_GB,
    "bytesToGB",
    ()=>bytesToGB,
    "decodeTiers",
    ()=>decodeTiers,
    "defaultPricing",
    ()=>defaultPricing,
    "encodeTiers",
    ()=>encodeTiers,
    "getDefaultPricing",
    ()=>getDefaultPricing,
    "isDefaultPricing",
    ()=>isDefaultPricing,
    "monthlyCostForBytes",
    ()=>monthlyCostForBytes,
    "pricingToDraft",
    ()=>pricingToDraft,
    "tieredCost",
    ()=>tieredCost,
    "validatePricing",
    ()=>validatePricing
]);
const BYTES_PER_GB = 1_000_000_000; // decimal GB, as AWS bills
const defaultPricing = {
    currency: "USD",
    lastVerified: "2026-11-16",
    region: "us-east-1",
    source: "https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer",
    tiers: [
        {
            upToGB: 100,
            pricePerGB: 0
        },
        {
            upToGB: 10_000,
            pricePerGB: 0.09
        },
        {
            upToGB: 50_000,
            pricePerGB: 0.085
        },
        {
            upToGB: 150_000,
            pricePerGB: 0.07
        },
        {
            upToGB: null,
            pricePerGB: 0.05
        }
    ]
};
function getDefaultPricing() {
    return {
        currency: defaultPricing.currency,
        tiers: defaultPricing.tiers.map((t)=>({
                ...t
            }))
    };
}
function tieredCost(gb, tiers) {
    if (!(gb > 0)) return 0;
    let cost = 0;
    let from = 0;
    for (const tier of tiers){
        const to = tier.upToGB ?? Infinity;
        if (gb <= from) break;
        const inTier = Math.min(gb, to) - from;
        if (inTier > 0) cost += inTier * tier.pricePerGB;
        from = to;
    }
    return cost;
}
function bytesToGB(bytes) {
    return bytes / BYTES_PER_GB;
}
function monthlyCostForBytes(bytes, pricing) {
    return tieredCost(bytesToGB(bytes), pricing.tiers);
}
function isDefaultPricing(p) {
    const d = defaultPricing;
    if (p.currency !== d.currency) return false;
    if (p.tiers.length !== d.tiers.length) return false;
    return p.tiers.every((t, i)=>t.upToGB === d.tiers[i].upToGB && t.pricePerGB === d.tiers[i].pricePerGB);
}
function pricingToDraft(p) {
    return {
        currency: p.currency,
        tiers: p.tiers.map((t)=>({
                upToGB: t.upToGB === null ? "" : String(t.upToGB),
                pricePerGB: String(t.pricePerGB)
            }))
    };
}
function parseNum(s) {
    const cleaned = s.replace(/[,\s_]/g, "");
    if (cleaned === "") return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : NaN;
}
function validatePricing(draft) {
    const tierErrors = draft.tiers.map(()=>({}));
    const result = {
        ok: true,
        tierErrors
    };
    const currency = draft.currency.trim();
    if (!currency) {
        result.currencyError = "Enter a currency label, e.g. USD.";
    } else if (currency.length > 8) {
        result.currencyError = "Keep the currency label to 8 characters or fewer.";
    }
    if (draft.tiers.length === 0) {
        result.formError = "Add at least one tier.";
        result.ok = false;
        return result;
    }
    const tiers = [];
    let prevLimit = 0;
    draft.tiers.forEach((t, i)=>{
        const isLast = i === draft.tiers.length - 1;
        const price = parseNum(t.pricePerGB);
        if (price === null) {
            tierErrors[i].pricePerGB = "Enter a price (0 for free).";
        } else if (Number.isNaN(price)) {
            tierErrors[i].pricePerGB = "Price must be a number.";
        } else if (price < 0) {
            tierErrors[i].pricePerGB = "Price can't be negative.";
        }
        let upTo = null;
        if (!isLast) {
            const limit = parseNum(t.upToGB);
            if (limit === null) {
                tierErrors[i].upToGB = "Enter an upper limit in GB.";
            } else if (Number.isNaN(limit)) {
                tierErrors[i].upToGB = "Limit must be a number.";
            } else if (limit <= prevLimit) {
                tierErrors[i].upToGB = i === 0 ? "Limit must be greater than 0." : `Limit must be greater than the previous tier (${prevLimit.toLocaleString("en-US")} GB).`;
            } else {
                upTo = limit;
                prevLimit = limit;
            }
        }
        tiers.push({
            upToGB: upTo,
            pricePerGB: price ?? 0
        });
    });
    const hasTierErrors = tierErrors.some((e)=>e.upToGB || e.pricePerGB);
    if (hasTierErrors || result.currencyError) {
        result.ok = false;
        return result;
    }
    result.pricing = {
        currency,
        tiers
    };
    return result;
}
function encodeTiers(tiers) {
    return tiers.map((t)=>`${t.upToGB === null ? "inf" : t.upToGB}:${t.pricePerGB}`).join(",");
}
function decodeTiers(s) {
    if (!s || s.length > 500) return null;
    const parts = s.split(",");
    if (parts.length === 0 || parts.length > 20) return null;
    const draft = {
        currency: "X",
        tiers: parts.map((p)=>{
            const [limit, price] = p.split(":");
            return {
                upToGB: limit === "inf" ? "" : limit ?? "",
                pricePerGB: price ?? ""
            };
        })
    };
    // Only the final tier may be unlimited.
    if (parts.slice(0, -1).some((p)=>p.startsWith("inf:"))) return null;
    if (!parts[parts.length - 1].startsWith("inf:")) return null;
    const v = validatePricing(draft);
    return v.ok && v.pricing ? v.pricing.tiers : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1x65o8x4k7lgy._.js.map
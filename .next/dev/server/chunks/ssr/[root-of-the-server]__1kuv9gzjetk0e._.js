module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/curl.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PricingPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PricingPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Results$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Results.tsx [app-ssr] (ecmascript)");
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
const DEFAULT_REQUESTS = 10_000_000;
const MAX_REQUESTS = 1e13;
const MAX_BODY_BYTES = 100 * 1024;
const LS = {
    tab: "aecc:tab",
    requests: "aecc:requests",
    pricing: "aecc:pricing"
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
function App({ demoResults }) {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("demo");
    const tabRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        curl: null,
        form: null,
        demo: null
    });
    // Inputs
    const [curlText, setCurlText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [method, setMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("GET");
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showToken, setShowToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [body, setBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [demoId, setDemoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("social");
    const [pasteJson, setPasteJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [servedAs, setServedAs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("identity");
    const curlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Results
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(demoResults.social);
    const [resultLabel, setResultLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(`Demo · ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOS"][0].label}`);
    const [resultKey, setResultKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [announce, setAnnounce] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Traffic + pricing
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_REQUESTS);
    const [requestsText, setRequestsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(DEFAULT_REQUESTS));
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pricingToDraft"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultPricing"])()));
    const lastValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultPricing"])());
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shareMsg, setShareMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validatePricing"])(draft), [
        draft
    ]);
    if (validation.ok && validation.pricing) lastValid.current = validation.pricing;
    const pricing = validation.ok && validation.pricing ? validation.pricing : lastValid.current;
    const usingDefaults = validation.ok && !!validation.pricing && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDefaultPricing"])(validation.pricing);
    /* ---------- restore state: share URL > localStorage > defaults ---------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const params = new URLSearchParams(window.location.search);
        const storedTab = lsGet(LS.tab);
        if (storedTab === "curl" || storedTab === "form" || storedTab === "demo") setTab(storedTab);
        const r = params.get("r") ?? lsGet(LS.requests);
        const n = r ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCount"])(r) : null;
        if (n !== null && n >= 0 && n <= MAX_REQUESTS) {
            setRequests(n);
            setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(n));
        }
        let restored = null;
        const p = params.get("p");
        if (p) {
            const tiers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeTiers"])(p);
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
                    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validatePricing"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pricingToDraft"])(parsed));
                    if (v.ok && v.pricing) restored = v.pricing;
                } catch  {
                /* ignore corrupt storage */ }
            }
        }
        if (restored) setDraft((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pricingToDraft"])(restored));
        setHydrated(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hydrated) lsSet(LS.tab, tab);
    }, [
        tab,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hydrated) lsSet(LS.requests, String(requests));
    }, [
        requests,
        hydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!hydrated || !validation.ok || !validation.pricing) return;
        lsSet(LS.pricing, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDefaultPricing"])(validation.pricing) ? null : JSON.stringify(validation.pricing));
    }, [
        validation,
        hydrated
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
    /* ---------------------------- analyze ---------------------------- */ const showResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((r, label)=>{
        setResult(r);
        setResultLabel(label);
        setResultKey((k)=>k + 1);
        const n = r.findings.length;
        setAnnounce(`Analysis complete for ${label}. ${n} recommendation${n === 1 ? "" : "s"}.`);
    }, []);
    async function callApi(payload, label, field) {
        setLoading(true);
        setErrors({});
        setAnnounce("Analyzing…");
        const ctrl = new AbortController();
        const t = setTimeout(()=>ctrl.abort(), 25_000);
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
    function submitCurl() {
        const text = curlText.trim();
        if (!text) {
            setErrors({
                curl: "Paste a curl command first, e.g. curl https://api.example.com/items"
            });
            return;
        }
        try {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCurl"])(text);
            void callApi({
                mode: "curl",
                curl: text
            }, describe(parsed.method, parsed.url), "curl");
        } catch (e) {
            const msg = e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CurlParseError"] ? e.message : "We couldn't read that curl command.";
            setErrors({
                curl: msg
            });
            setAnnounce(`Error: ${msg}`);
        }
    }
    function submitForm() {
        const errs = {};
        const u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeUrl"])(url);
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
            body: hasBody ? body : undefined
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
        const d = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOS"].find((x)=>x.id === demoId);
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
    /* ---------------------------- traffic ---------------------------- */ function onRequestsChange(v) {
        if (/^[\d,\s]*$/.test(v)) {
            const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCount"])(v);
            setRequestsText(n === null ? "" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(n));
            if (n !== null) {
                if (n > MAX_REQUESTS) {
                    setErrors((e)=>({
                            ...e,
                            requests: "That's more than 10 trillion requests. Enter a smaller number."
                        }));
                    return;
                }
                setRequests(n);
                clearError("requests");
            } else {
                setRequests(0);
            }
            return;
        }
        setRequestsText(v);
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCount"])(v);
        if (n === null || n > MAX_REQUESTS) {
            setErrors((e)=>({
                    ...e,
                    requests: "Enter a whole number like 25,000,000 (or 25M)."
                }));
        } else {
            setRequests(n);
            clearError("requests");
        }
    }
    async function share() {
        const params = new URLSearchParams();
        params.set("r", String(requests));
        params.set("p", (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeTiers"])(pricing.tiers));
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
    const currentDemo = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOS"].find((d)=>d.id === demoId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "#inputs",
                className: "skip-link",
                children: "Skip to calculator"
            }, void 0, false, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "eyebrow",
                        children: "API Egress Cost Calculator"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "How much does your API response really cost?"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "subtitle",
                        children: "Paste an endpoint, see your AWS data transfer bill, and what compression would save."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "inputs",
                        id: "inputs",
                        "aria-label": "Inputs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "step",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "step-num",
                                                "aria-hidden": "true",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            " Your API response"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "tablist",
                                        "aria-label": "Input mode",
                                        className: "tabs",
                                        onKeyDown: onTabKey,
                                        children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 357,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: onSubmit,
                                        noValidate: true,
                                        children: [
                                            tab === "curl" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-curl",
                                                "aria-labelledby": "tab-curl",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "label-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "curl",
                                                                children: "curl command"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 382,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CurlTips, {}, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                        id: "curl-error",
                                                        msg: errors.curl
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivacyNote, {
                                                        id: "curl-note"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this),
                                            tab === "form" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-form",
                                                "aria-labelledby": "tab-form",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field method-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "method",
                                                                        children: "Method"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 411,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        id: "method",
                                                                        value: method,
                                                                        onChange: (e)=>setMethod(e.target.value),
                                                                        children: METHODS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                children: m
                                                                            }, m, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 414,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 412,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field grow",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "url",
                                                                        children: "URL"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["looksLikeCurl"])(text)) {
                                                                                e.preventDefault();
                                                                                switchToCurl(text);
                                                                            }
                                                                        },
                                                                        onChange: (e)=>{
                                                                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["looksLikeCurl"])(e.target.value)) return switchToCurl(e.target.value);
                                                                            setUrl(e.target.value);
                                                                            clearError("url");
                                                                        },
                                                                        "aria-invalid": !!errors.url,
                                                                        "aria-describedby": errors.url ? "url-error" : "url-hint"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 420,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                        id: "url-error",
                                                        msg: errors.url
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 19
                                                    }, this),
                                                    !errors.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "hint",
                                                        id: "url-hint",
                                                        children: "No https:// needed. Pasting a curl command here switches to the curl tab."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "token",
                                                                children: [
                                                                    "Bearer token ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "optional",
                                                                        children: "(optional)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 36
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "input-with-button",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                        lineNumber: 458,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        className: "btn-ghost small",
                                                                        "aria-pressed": showToken,
                                                                        onClick: ()=>setShowToken((s)=>!s),
                                                                        children: [
                                                                            showToken ? "Hide" : "Show",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "sr-only",
                                                                                children: " token"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 473,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 471,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                id: "token-error",
                                                                msg: errors.token
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 19
                                                    }, this),
                                                    method !== "GET" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "body",
                                                                children: [
                                                                    "JSON body ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "optional",
                                                                        children: "(optional, max 100 KB)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 481,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                                                lineNumber: 484,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                id: "body-error",
                                                                msg: errors.body
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PrivacyNote, {
                                                        id: "form-note"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 408,
                                                columnNumber: 17
                                            }, this),
                                            tab === "demo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                role: "tabpanel",
                                                id: "panel-demo",
                                                "aria-labelledby": "tab-demo",
                                                className: "panel",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                htmlFor: "demo",
                                                                children: "Sample payload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                id: "demo",
                                                                value: demoId,
                                                                onChange: (e)=>{
                                                                    const v = e.target.value;
                                                                    setDemoId(v);
                                                                    setErrors({});
                                                                    if (v !== "paste") {
                                                                        const d = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOS"].find((x)=>x.id === v);
                                                                        showResult(demoResults[d.id], `Demo · ${d.label}`);
                                                                    }
                                                                },
                                                                children: [
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEMOS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: d.id,
                                                                            children: d.label
                                                                        }, d.id, false, {
                                                                            fileName: "[project]/components/App.tsx",
                                                                            lineNumber: 523,
                                                                            columnNumber: 25
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "paste",
                                                                        children: "Paste your own sample response…"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 21
                                                            }, this),
                                                            currentDemo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "hint",
                                                                children: [
                                                                    currentDemo.blurb,
                                                                    " No network call: generated data."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 529,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 19
                                                    }, this),
                                                    demoId === "paste" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "paste",
                                                                        children: "Sample response"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
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
                                                                        lineNumber: 535,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                                        id: "paste-error",
                                                                        msg: errors.json
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 549,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !errors.json && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "hint",
                                                                        id: "paste-hint",
                                                                        children: "Analyzed on our server, never stored. No outbound request is made."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 551,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 533,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        htmlFor: "served",
                                                                        children: "How is it served today?"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 557,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        id: "served",
                                                                        value: servedAs,
                                                                        onChange: (e)=>setServedAs(e.target.value),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "identity",
                                                                                children: "Uncompressed"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 559,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "gzip",
                                                                                children: "Gzip"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 560,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "br",
                                                                                children: "Brotli"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/App.tsx",
                                                                                lineNumber: 561,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/App.tsx",
                                                                        lineNumber: 558,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/App.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 506,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                id: "general-error",
                                                msg: errors.general
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 569,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "btn-primary",
                                                disabled: loading,
                                                "aria-busy": loading,
                                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "spinner",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/App.tsx",
                                                            lineNumber: 573,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Analyzing…"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/App.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this) : "Analyze"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 378,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "step",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "step-num",
                                                "aria-hidden": "true",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 584,
                                                columnNumber: 15
                                            }, this),
                                            " Your traffic"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 583,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "requests",
                                                children: "Monthly requests"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 587,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "requests",
                                                type: "text",
                                                inputMode: "numeric",
                                                autoComplete: "off",
                                                value: requestsText,
                                                onChange: (e)=>onRequestsChange(e.target.value),
                                                onBlur: ()=>{
                                                    if (!errors.requests) setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(requests));
                                                },
                                                "aria-invalid": !!errors.requests,
                                                "aria-describedby": errors.requests ? "requests-error" : "requests-hint"
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 588,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldError, {
                                                id: "requests-error",
                                                msg: errors.requests
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 601,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "chips",
                                                role: "group",
                                                "aria-label": "Preset monthly requests",
                                                children: PRESETS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "chip",
                                                        "aria-pressed": requests === p,
                                                        onClick: ()=>{
                                                            setRequests(p);
                                                            setRequestsText((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(p));
                                                            clearError("requests");
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compactCount"])(p)
                                                    }, p, false, {
                                                        fileName: "[project]/components/App.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 602,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "hint",
                                                id: "requests-hint",
                                                children: "Monthly egress = response size × monthly requests. Assumes every request returns this response; headers and TLS overhead are not counted."
                                            }, void 0, false, {
                                                fileName: "[project]/components/App.tsx",
                                                lineNumber: 619,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/App.tsx",
                                        lineNumber: 586,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 582,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PricingPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                draft: draft,
                                setDraft: setDraft,
                                validation: validation,
                                usingDefaults: usingDefaults,
                                onShare: share,
                                shareMsg: shareMsg
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 625,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "results",
                        "aria-label": "Results",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Results$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            result: result,
                            label: resultLabel,
                            requests: requests,
                            pricing: pricing,
                            usingDefaults: usingDefaults,
                            animate: resultKey > 0
                        }, resultKey, false, {
                            fileName: "[project]/components/App.tsx",
                            lineNumber: 636,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sr-only",
                "aria-live": "polite",
                "aria-atomic": "true",
                children: announce
            }, void 0, false, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 640,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Built by Ibad Amir · Senior Software Engineer ·",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.linkedin.com/in/engineer-ibad",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "LinkedIn"
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 647,
                                columnNumber: 11
                            }, this),
                            " ",
                            "·",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://ibadamir.vercel.app",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "ibadamir.vercel.app"
                            }, void 0, false, {
                                fileName: "[project]/components/App.tsx",
                                lineNumber: 651,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "footer-small",
                        children: "Estimates only. Not affiliated with Amazon Web Services."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 655,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
function FieldError({ id, msg }) {
    if (!msg) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "field-error",
        id: id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                width: "14",
                height: "14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "8",
                        cy: "8",
                        r: "7",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.6"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 666,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M8 4.5v4.2M8 10.8v.7",
                        stroke: "currentColor",
                        strokeWidth: "1.8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 667,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 665,
                columnNumber: 7
            }, this),
            msg
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 664,
        columnNumber: 5
    }, this);
}
function PrivacyNote({ id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "privacy",
        id: id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": "true",
                viewBox: "0 0 16 16",
                width: "14",
                height: "14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
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
                        lineNumber: 678,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M5.5 7V5a2.5 2.5 0 015 0v2",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 679,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 677,
                columnNumber: 7
            }, this),
            "Sent once from our server, never stored. Use a test token if you can."
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 676,
        columnNumber: 5
    }, this);
}
function CurlTips() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        const onDoc = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e)=>e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onDoc);
        document.addEventListener("keydown", onKey);
        return ()=>{
            document.removeEventListener("mousedown", onDoc);
            document.removeEventListener("keydown", onKey);
        };
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "tip",
        ref: ref,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "tip-btn",
                "aria-expanded": open,
                "aria-controls": "curl-tips",
                onClick: ()=>setOpen((o)=>!o),
                children: [
                    "?",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "curl tips"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 705,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "tip-pop",
                id: "curl-tips",
                role: "note",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Tips"
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "In Chrome DevTools → Network, right-click a request → Copy → Copy as cURL (bash)."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Supported: -X, -H, -d / --data-raw / --data-binary / --json, -u. Multi-line commands with \\ are fine."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 711,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Ignored: --compressed, -L, -k, -s, -i, -v. We set Accept-Encoding ourselves."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 712,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Redirects aren't followed. Use the final URL."
                    }, void 0, false, {
                        fileName: "[project]/components/App.tsx",
                        lineNumber: 713,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/App.tsx",
                lineNumber: 708,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/App.tsx",
        lineNumber: 703,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/PricingPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function verifiedLabel() {
    const d = new Date(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPricing"].lastVerified + "T00:00:00Z");
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
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pricing-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "step",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "hint",
                children: [
                    "AWS data transfer out to the internet, ",
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPricing"].region,
                    ", tiered per month.",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultPricing"].source,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "disclosure",
                "aria-expanded": open,
                "aria-controls": "pricing-settings",
                onClick: ()=>setOpen((o)=>!o),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        "aria-hidden": "true",
                        viewBox: "0 0 16 16",
                        width: "14",
                        height: "14",
                        className: "chev",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "pricing-settings",
                className: "pricing-body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "field currency-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "currency",
                                children: "Currency label"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            validation.currencyError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "tier-table",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                                className: "sr-only",
                                children: "Pricing tiers, cumulative per month"
                            }, void 0, false, {
                                fileName: "[project]/components/PricingPanel.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Tier"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "From (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 100,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Up to (GB)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: "Price / GB"
                                        }, void 0, false, {
                                            fileName: "[project]/components/PricingPanel.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: draft.tiers.map((t, i)=>{
                                    const isLast = i === draft.tiers.length - 1;
                                    const err = validation.tierErrors[i] ?? {};
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Tier",
                                                children: i + 1
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "From (GB)",
                                                className: "muted-cell",
                                                children: prevLimitLabel(draft, i)
                                            }, void 0, false, {
                                                fileName: "[project]/components/PricingPanel.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Up to (GB)",
                                                children: isLast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "muted-cell",
                                                    children: "∞ no limit"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/PricingPanel.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                        err.upToGB && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                "data-label": "Price / GB",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                    err.pricePerGB && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    validation.formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "field-error",
                        children: validation.formError
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 183,
                        columnNumber: 36
                    }, this),
                    !validation.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hint",
                        children: "Fix the highlighted fields. Costs use your last valid pricing until then."
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 184,
                        columnNumber: 30
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pricing-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-ghost",
                                onClick: ()=>setDraft((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pricingToDraft"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultPricing"])())),
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "share-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "btn-ghost",
                        onClick: onShare,
                        children: "Share this setup"
                    }, void 0, false, {
                        fileName: "[project]/components/PricingPanel.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/components/Results.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Results
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/costs.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
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
function Results({ result, label, requests, pricing, usingDefaults, animate = false }) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>result ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeCosts"])(result, requests, pricing) : null, [
        result,
        requests,
        pricing
    ]);
    if (!result || !summary) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card empty-state",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "No results yet"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Paste a curl command, fill in the form, or pick a demo, then press Analyze."
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this);
    }
    const cur = pricing.currency;
    const a = result;
    const findings = [
        ...a.findings
    ].sort((x, y)=>SEV_ORDER[x.severity] - SEV_ORDER[y.severity]);
    const statusOk = a.status === null || a.status >= 200 && a.status < 300;
    async function copy() {
        const link = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
        const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$costs$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildCopySummary"])(a, summary, requests, pricing, usingDefaults, link);
        try {
            await navigator.clipboard.writeText(text);
            setCopied("Copied. Paste it into Slack, an issue or a post.");
        } catch  {
            setCopied("Couldn't access the clipboard. Select the table and copy manually.");
        }
        setTimeout(()=>setCopied(""), 4000);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `results-inner${animate ? " fade-in" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "results-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "Results"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "results-title",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "meta",
                                children: [
                                    a.status !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `pill ${statusOk ? "" : "pill-warn"}`,
                                        children: [
                                            "HTTP ",
                                            a.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 58,
                                        columnNumber: 35
                                    }, this),
                                    a.contentType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pill",
                                        children: a.contentType.split(";")[0]
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 59,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "pill",
                                        children: a.contentEncoding ? `Content-Encoding: ${a.contentEncoding}` : "No compression"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "copy-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn-ghost",
                                onClick: copy,
                                disabled: a.rawBytes === 0,
                                children: "Copy results"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "share-msg",
                                role: "status",
                                children: copied
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            a.rawBytes === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card empty-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "The response body was empty"
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            a.status !== null ? `The API returned HTTP ${a.status} with no body` : "There was nothing to measure",
                            ", so there's nothing to compress or bill.",
                            a.redirectTo ? " Paste the final URL to measure the real response." : " Check the URL, method and auth, then try again."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsCard, {
                        summary: summary,
                        currency: cur,
                        requests: requests
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    !statusOk && !a.redirectTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "notice",
                        children: [
                            "The API returned HTTP ",
                            a.status,
                            ". We analyzed the body it sent, which may be an error message rather than your real data."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this),
                    !a.isJson && !a.alreadyCompressedMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "notice",
                        children: "This response isn't JSON, so there's no minified row. Compression results still apply."
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "card-title",
                                children: "Cost by format"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CostTable, {
                                rows: summary.rows,
                                bestId: summary.best?.id ?? null,
                                rawBytes: a.rawBytes,
                                currency: cur
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: [
                                    "At ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(requests),
                                    " requests/month. Compression rows compress the body as served (not minified). Times are single-run on our server."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "card-title",
                                children: "Size comparison"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Bars, {
                                rows: summary.rows,
                                bestId: summary.best?.id ?? null
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Browsers can accept Zstd. iOS apps typically get Brotli and Android apps Gzip by default, so serve the best format each client supports."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "card-title",
                        children: "Recommendations"
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    findings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "all-good",
                        children: "Nothing to fix here. This response is already in good shape."
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "findings",
                        children: findings.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FindingItem, {
                                f: f
                            }, f.id, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card details",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: "Response preview"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            a.preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "preview",
                                        children: [
                                            a.preview,
                                            a.previewTruncated ? "…" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hint",
                                        children: "First 500 characters only. The full body is never sent to your browser or stored."
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Empty body."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: "Response headers"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            Object.keys(a.responseHeaders).length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "headers",
                                children: Object.entries(a.responseHeaders).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: k
                                            }, void 0, false, {
                                                fileName: "[project]/components/Results.tsx",
                                                lineNumber: 146,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                children: v
                                            }, void 0, false, {
                                                fileName: "[project]/components/Results.tsx",
                                                lineNumber: 147,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, k, true, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "No headers for pasted samples."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: "Only non-sensitive headers are shown. Cookies are never returned."
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
function SavingsCard({ summary, currency, requests }) {
    const { best, today, monthlySavings, annualSavings } = summary;
    const bestIsToday = !best || best.id === "today";
    if (requests === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Set your traffic"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: "Enter monthly requests"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: "Add how many times this endpoint is called per month to see costs."
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 167,
            columnNumber: 7
        }, this);
    }
    if (bestIsToday) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Already efficient"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(today.monthlyCost, currency),
                        "/month"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: [
                        "You already send the smallest format we tested (",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(today.bytes ?? 0),
                        " per response)."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this);
    }
    if (monthlySavings <= 0.004) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "savings savings-neutral",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-kicker",
                    children: "Within the free tier"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-big",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(0, currency),
                        " savings at this traffic"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 189,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "savings-sub",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(today.monthlyBytes),
                        "/month fits in the free allowance. ",
                        best.label,
                        " would still make each response",
                        " ",
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(today.bytes ?? 0, best.bytes ?? 0).replace(/,.*/, ""),
                        " and load faster. Try a higher traffic preset."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this);
    }
    const pct = today.monthlyCost > 0 ? Math.round(monthlySavings / today.monthlyCost * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "savings",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-kicker",
                children: [
                    "Switch to ",
                    best.label
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-big",
                children: [
                    "You could save ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(monthlySavings, currency),
                    "/month ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "savings-annual",
                        children: [
                            "(",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(annualSavings, currency),
                            "/year)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 203,
                        columnNumber: 70
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "savings-sub",
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(today.monthlyCost, currency),
                    " → ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(best.monthlyCost, currency),
                    " per month (",
                    pct,
                    "% less) · ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(today.bytes ?? 0),
                    " →",
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(best.bytes ?? 0),
                    " per response"
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
function CostTable({ rows, bestId, rawBytes, currency }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "table-wrap",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "cost-table",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                    className: "sr-only",
                    children: "Response size and egress cost per format"
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                children: "Format"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Bytes / response"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Monthly data"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Monthly cost"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                scope: "col",
                                className: "num",
                                children: "Annual cost"
                            }, void 0, false, {
                                fileName: "[project]/components/Results.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: rows.map((r)=>{
                        const isBest = r.id === bestId;
                        const na = r.bytes === null;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: `${isBest ? "best" : ""} ${r.id === "today" ? "today" : ""}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    scope: "row",
                                    "data-label": "Format",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-name",
                                            children: [
                                                r.label,
                                                isBest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "best-tag",
                                                    children: "Best"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Results.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 32
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 242,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-note",
                                            children: [
                                                r.note,
                                                r.ms !== null && r.bytes !== null && r.bytes > 0 ? ` · ${r.ms < 1 ? "<1" : r.ms.toFixed(0)} ms` : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 246,
                                            columnNumber: 19
                                        }, this),
                                        !na && r.id !== "raw" && rawBytes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "fmt-ratio",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(rawBytes, r.bytes)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Results.tsx",
                                            lineNumber: 250,
                                            columnNumber: 61
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Bytes / response",
                                    children: na ? "–" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        title: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(r.bytes)} bytes`,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Results.tsx",
                                        lineNumber: 253,
                                        columnNumber: 31
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Monthly data",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(r.monthlyBytes)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Monthly cost",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(r.monthlyCost, currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "num",
                                    "data-label": "Annual cost",
                                    children: na ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(r.annualCost, currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/Results.tsx",
                                    lineNumber: 261,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 240,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/Results.tsx",
                    lineNumber: 235,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Results.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, this);
}
function Bars({ rows, bestId }) {
    const avail = rows.filter((r)=>r.bytes !== null);
    const max = Math.max(1, ...avail.map((r)=>r.bytes));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "bars",
        "aria-label": "Bytes per response by format",
        children: avail.map((r)=>{
            const w = Math.max(0.5, r.bytes / max * 100);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: r.id === bestId ? "best" : r.id === "today" ? "today" : "",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-label",
                        children: r.label
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-track",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bar-fill",
                            style: {
                                width: `${w}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/Results.tsx",
                            lineNumber: 284,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 283,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "bar-value",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 286,
                        columnNumber: 13
                    }, this)
                ]
            }, r.id, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 281,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 277,
        columnNumber: 5
    }, this);
}
function FindingItem({ f }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: `finding sev-${f.severity}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `sev sev-tag-${f.severity}`,
                children: SEV_LABEL[f.severity]
            }, void 0, false, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "finding-title",
                        children: f.title
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "finding-detail",
                        children: f.detail
                    }, void 0, false, {
                        fileName: "[project]/components/Results.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Results.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Results.tsx",
        lineNumber: 296,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/costs.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pricing.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/format.ts [app-ssr] (ecmascript)");
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
        const monthlyCost = bytes === null ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pricing$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["monthlyCostForBytes"])(monthlyBytes, pricing);
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
        lines.push(`Traffic: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(sessions.sessions)} sessions/month × ${sessions.pagesPerSession} pages = ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(monthlyRequests)} page requests/month`);
        const sampled = a.pagination?.pages.length ?? 1;
        lines.push(`Pages sampled: ${sampled}${sessions.pagesPerSession > sampled ? ` (extrapolated to ${sessions.pagesPerSession})` : ""}`);
    } else {
        lines.push(`Traffic: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatNumber"])(monthlyRequests)} requests/month`);
    }
    lines.push(`${paged ? "Average page" : "Response"}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(sz.rawBytes)} uncompressed${a.isJson ? " JSON" : ""}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(sz.wireBytes)} on the wire (${encodingName(a.contentEncoding)})`);
    lines.push("");
    for (const r of s.rows){
        if (r.bytes === null) {
            lines.push(`- ${r.label}: n/a`);
            continue;
        }
        const ratio = r.id === "raw" ? "" : ` (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRatio"])(sz.rawBytes, r.bytes)})`;
        lines.push(`- ${r.label}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(r.bytes)}${ratio} → ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatBytes"])(r.monthlyBytes)}/mo, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(r.monthlyCost, pricing.currency)}/mo`);
    }
    lines.push("");
    if (s.best && s.best.id !== "today" && s.monthlySavings > 0) {
        lines.push(`Switching to ${s.best.label} could save ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(s.monthlySavings, pricing.currency)}/month (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMoney"])(s.annualSavings, pricing.currency)}/year).`);
    } else {
        lines.push("No egress savings available at this traffic level.");
    }
    lines.push(defaults ? "Pricing: AWS data transfer out, us-east-1 (tiered)." : "Pricing: custom tiers.");
    lines.push(paged ? "Monthly data = sessions × pages per session × average page size (1 GB = 10^9 bytes)." : "Monthly data = response size × requests (1 GB = 10^9 bytes).");
    if (link) lines.push(`Try it: ${link}`);
    return lines.join("\n");
}
}),
"[project]/lib/curl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if (typeof Buffer !== "undefined") return Buffer.from(s, "utf8").toString("base64");
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
}),
"[project]/lib/demo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/pricing.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1kuv9gzjetk0e._.js.map
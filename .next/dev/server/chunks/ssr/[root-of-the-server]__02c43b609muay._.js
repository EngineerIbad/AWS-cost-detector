module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:perf_hooks", () => require("node:perf_hooks"));

module.exports = mod;
}),
"[project]/app/icon.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.3wjj0-ngxryzs.svg" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/icon.svg.mjs { IMAGE => \"[project]/app/icon.svg (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/icon.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 32,
    height: 32
};
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/App.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analyze.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo.ts [app-rsc] (ecmascript)");
;
;
;
;
const dynamic = "force-static";
function buildDemoResults() {
    const out = {};
    for (const d of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEMOS"]){
        const raw = Buffer.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["demoPayload"])(d.id), "utf8");
        const wire = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encodeAs"])(raw, d.servedAs);
        const headers = {
            "content-type": "application/json; charset=utf-8",
            "content-length": String(wire.length),
            "cache-control": "private, max-age=0"
        };
        if (d.servedAs !== "identity") headers["content-encoding"] = d.servedAs;
        out[d.id] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["analyzeBody"])({
            source: "demo",
            raw,
            wireBytes: wire.length,
            status: 200,
            contentType: "application/json; charset=utf-8",
            contentEncoding: d.servedAs === "identity" ? null : d.servedAs,
            vary: d.vary,
            responseHeaders: headers
        });
    }
    return out;
}
function Page() {
    const demoResults = buildDemoResults();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        demoResults: demoResults
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/App.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/App.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/App.tsx", "default");
}),
"[project]/components/App.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/App.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/lib/analyze.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DecodeError",
    ()=>DecodeError,
    "MAX_DECODED_BYTES",
    ()=>MAX_DECODED_BYTES,
    "acceptEncodingHeader",
    ()=>acceptEncodingHeader,
    "analyzeBody",
    ()=>analyzeBody,
    "compressAll",
    ()=>compressAll,
    "decodeBody",
    ()=>decodeBody,
    "encodeAs",
    ()=>encodeAs,
    "measurePage",
    ()=>measurePage,
    "parseBody",
    ()=>parseBody,
    "zstdCompressAvailable",
    ()=>zstdCompressAvailable,
    "zstdDecompressAvailable",
    ()=>zstdDecompressAvailable
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:zlib [external] (node:zlib, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$perf_hooks__$5b$external$5d$__$28$node$3a$perf_hooks$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/findings.ts [app-rsc] (ecmascript)");
;
;
;
const MAX_DECODED_BYTES = 25 * 1024 * 1024;
const PREVIEW_CHARS = 500;
const z = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"];
function zstdCompressAvailable() {
    return typeof z.zstdCompressSync === "function";
}
function zstdDecompressAvailable() {
    return typeof z.zstdDecompressSync === "function";
}
function acceptEncodingHeader() {
    return zstdDecompressAvailable() ? "br, gzip, zstd" : "br, gzip";
}
class DecodeError extends Error {
}
function decodeBody(wire, contentEncoding) {
    if (!contentEncoding || wire.length === 0) return wire;
    const encodings = contentEncoding.toLowerCase().split(",").map((s)=>s.trim()).filter((s)=>s && s !== "identity").reverse();
    const opts = {
        maxOutputLength: MAX_DECODED_BYTES
    };
    let buf = wire;
    try {
        for (const enc of encodings){
            if (enc === "gzip" || enc === "x-gzip") buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].gunzipSync(buf, opts);
            else if (enc === "br") buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].brotliDecompressSync(buf, opts);
            else if (enc === "deflate") {
                try {
                    buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].inflateSync(buf, opts);
                } catch  {
                    buf = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].inflateRawSync(buf, opts);
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
        if (e instanceof RangeError || /maxOutputLength|buffer/i.test(String(e?.message))) {
            throw new DecodeError("The decompressed response is larger than 25 MB, so we stopped.");
        }
        throw new DecodeError("We couldn't decompress the response. The server's Content-Encoding may not match the body.");
    }
    return buf;
}
function timed(fn) {
    const t0 = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$perf_hooks__$5b$external$5d$__$28$node$3a$perf_hooks$2c$__cjs$29$__["performance"].now();
    const out = fn();
    const ms = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$perf_hooks__$5b$external$5d$__$28$node$3a$perf_hooks$2c$__cjs$29$__["performance"].now() - t0;
    return {
        available: true,
        bytes: out.length,
        ms: Math.round(ms * 100) / 100
    };
}
function compressAll(raw) {
    if (raw.length === 0) {
        const empty = {
            available: true,
            bytes: 0,
            ms: 0
        };
        return {
            gzip: empty,
            brotli: empty,
            zstd: zstdCompressAvailable() ? empty : {
                available: false,
                bytes: null,
                ms: null
            }
        };
    }
    const gzip = timed(()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].gzipSync(raw, {
            level: 6
        }));
    const brotli = timed(()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].brotliCompressSync(raw, {
            params: {
                [__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].constants.BROTLI_PARAM_QUALITY]: 5,
                [__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].constants.BROTLI_PARAM_SIZE_HINT]: raw.length
            }
        }));
    let zstd = {
        available: false,
        bytes: null,
        ms: null
    };
    if (z.zstdCompressSync) {
        const level = z.constants.ZSTD_c_compressionLevel;
        zstd = timed(()=>z.zstdCompressSync(raw, level !== undefined ? {
                params: {
                    [level]: 3
                }
            } : undefined));
    }
    return {
        gzip,
        brotli,
        zstd
    };
}
function encodeAs(raw, enc) {
    if (enc === "gzip") return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].gzipSync(raw, {
        level: 6
    });
    if (enc === "br") return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].brotliCompressSync(raw, {
        params: {
            [__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__["default"].constants.BROTLI_PARAM_QUALITY]: 5
        }
    });
    if (enc === "zstd" && z.zstdCompressSync) return z.zstdCompressSync(raw);
    return raw;
}
function looksBinary(buf) {
    const n = Math.min(buf.length, 1024);
    for(let i = 0; i < n; i++)if (buf[i] === 0) return true;
    return false;
}
function parseBody(raw, contentType) {
    const out = {
        text: null,
        json: undefined,
        isJson: false,
        minifiedBytes: null
    };
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAlreadyCompressedType"])(contentType) || looksBinary(raw) || raw.length === 0) return out;
    out.text = raw.toString("utf8");
    const trimmed = out.text.trimStart();
    const ctSaysJson = !!contentType && /[/+]json\b/i.test(contentType);
    if (ctSaysJson || trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
            out.json = JSON.parse(out.text);
            out.isJson = true;
            out.minifiedBytes = Buffer.byteLength(JSON.stringify(out.json), "utf8");
        } catch  {
            out.isJson = false;
        }
    }
    return out;
}
function measurePage(page, status, raw, wireBytes, parsed, items) {
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
        zstdBytes: zstd.available ? zstd.bytes : null
    };
}
function analyzeBody(input) {
    const { raw } = input;
    const ct = input.contentType;
    const media = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAlreadyCompressedType"])(ct);
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
    const findings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildFindings"])({
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
        pagination: input.pagination ? {
            hasMoreIndicator: input.pagination.hasMoreIndicator
        } : null
    });
    return {
        source: input.source,
        status: input.status,
        contentType: ct,
        contentEncoding: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeEncoding"])(input.contentEncoding),
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
        pagination: input.pagination ?? null
    };
}
}),
"[project]/lib/demo.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/findings.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFindings",
    ()=>buildFindings,
    "isAlreadyCompressedType",
    ()=>isAlreadyCompressedType,
    "normalizeEncoding",
    ()=>normalizeEncoding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/urlChecks.ts [app-rsc] (ecmascript)");
;
const SMALL_BYTES = 1000;
function isAlreadyCompressedType(contentType) {
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
        "font/woff2"
    ].includes(ct);
}
function times(a, b) {
    if (!(b > 0)) return "";
    const r = a / b;
    return r >= 10 ? r.toFixed(0) : r.toFixed(1);
}
function normalizeEncoding(ce) {
    if (!ce) return null;
    const parts = ce.toLowerCase().split(",").map((s)=>s.trim()).filter((s)=>s && s !== "identity");
    if (parts.length === 0) return null;
    const last = parts[parts.length - 1];
    return last === "x-gzip" ? "gzip" : last;
}
function buildFindings(f) {
    const out = [];
    const enc = normalizeEncoding(f.contentEncoding);
    if (f.redirectTo) {
        out.push({
            id: "redirect",
            severity: "high",
            title: `This endpoint redirects to ${f.redirectTo}`,
            detail: "We don't follow redirects for safety. Paste the final URL to measure the real response."
        });
    }
    if (f.status !== null && (f.status < 200 || f.status >= 300) && !f.redirectTo) {
        out.push({
            id: "non-2xx",
            severity: "info",
            title: `The API answered with status ${f.status}`,
            detail: f.rawBytes > 0 ? "We analyzed the error body it returned. Check the URL, method and auth if you expected real data." : "There was no body to analyze. Check the URL, method and auth."
        });
    }
    if (f.requestUrl) {
        const missing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findMissingValueLiterals"])(f.requestUrl);
        if (missing.length > 0) {
            const lit = missing[0].literal ?? "undefined";
            out.push({
                id: "url-missing-value",
                severity: "medium",
                title: `Your client is sending '${lit}' in the URL`,
                detail: `This is likely a missing value (e.g. token or ID) at request time. Found in ${missing.map((m)=>m.where).join(", ")}.`
            });
        }
        const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findTokensInUrl"])(f.requestUrl);
        if (tokens.length > 0) {
            out.push({
                id: "url-token",
                severity: "high",
                title: `A token appears to be in the URL (${tokens.map((t)=>t.where).join(", ")})`,
                detail: "Tokens in URLs end up in server, proxy and analytics logs. Send them in the Authorization header instead."
            });
        }
    }
    const ok2xx = f.status === null || f.status >= 200 && f.status < 300;
    if (f.pagination && !f.pagination.hasMoreIndicator && f.isJson && ok2xx && f.rawBytes > 0) {
        out.push({
            id: "no-has-more",
            severity: "medium",
            title: "No \"has more\" or next-page indicator",
            detail: "Add hasMore or a next cursor so clients don't request empty pages."
        });
    }
    if (f.rawBytes === 0) return out;
    if (f.alreadyCompressedMedia) {
        out.push({
            id: "media",
            severity: "medium",
            title: "This is media that's already compressed",
            detail: "Gzip, Brotli and Zstd won't shrink images, video, audio or archives. Serve them from a CDN (e.g. CloudFront) to cut egress cost and latency."
        });
        return out;
    }
    if (f.rawBytes < SMALL_BYTES) {
        out.push({
            id: "small",
            severity: "info",
            title: "This response is too small to matter",
            detail: "Under 1 KB, compression saves little and headers often outweigh the body. Focus on your larger endpoints."
        });
    }
    const candidates = [
        {
            name: "Brotli",
            bytes: f.brotliBytes
        },
        {
            name: "Zstd",
            bytes: f.zstdBytes
        },
        {
            name: "Gzip",
            bytes: f.gzipBytes
        }
    ].filter((c)=>c.bytes !== null && c.bytes > 0);
    const best = candidates.reduce((acc, c)=>!acc || c.bytes < acc.bytes ? c : acc, null);
    if (!enc && f.rawBytes >= SMALL_BYTES && best && best.bytes < f.rawBytes * 0.9) {
        out.push({
            id: "no-compression",
            severity: "high",
            title: f.assumedEncoding ? "Turn on compression (assuming it's off today)" : "Compression is off",
            detail: `This response would shrink ${times(f.rawBytes, best.bytes)}x with ${best.name}${f.isJson ? " (JSON typically shrinks ~4–6x)" : ""}. Enable it at your server, API gateway or CDN.`
        });
    }
    if (enc === "gzip" && f.rawBytes >= SMALL_BYTES && f.gzipBytes) {
        const better = [
            {
                name: "Brotli",
                bytes: f.brotliBytes
            },
            {
                name: "Zstd",
                bytes: f.zstdBytes
            }
        ].filter((c)=>c.bytes !== null && c.bytes > 0 && c.bytes <= f.gzipBytes * 0.9);
        if (better.length > 0) {
            const b = better.reduce((a, c)=>c.bytes < a.bytes ? c : a);
            const pct = Math.round((1 - b.bytes / f.gzipBytes) * 100);
            out.push({
                id: "gzip-only",
                severity: "medium",
                title: `You serve Gzip only; ${b.name} is ${pct}% smaller`,
                detail: `Negotiate per client using Accept-Encoding: send ${better.map((x)=>x.name).join(" or ")} to clients that support it and fall back to Gzip.`
            });
        }
    }
    if (f.isJson && f.minifiedBytes !== null && f.rawBytes >= SMALL_BYTES && f.minifiedBytes < f.rawBytes * 0.9) {
        const pct = Math.round((1 - f.minifiedBytes / f.rawBytes) * 100);
        out.push({
            id: "pretty-json",
            severity: "medium",
            title: `Your JSON is pretty-printed (${pct}% whitespace)`,
            detail: "Minify JSON in production. Compression hides most of it, but minifying still trims bytes and CPU."
        });
    }
    if (enc && !f.assumedEncoding) {
        const varyHasAE = (f.vary ?? "").toLowerCase().split(",").map((s)=>s.trim()).some((s)=>s === "accept-encoding" || s === "*");
        if (!varyHasAE) {
            out.push({
                id: "missing-vary",
                severity: "medium",
                title: "Missing Vary: Accept-Encoding",
                detail: `The response is ${enc}-compressed but doesn't send Vary: Accept-Encoding, so a shared cache could serve compressed bytes to a client that can't read them.`
            });
        }
    }
    return out;
}
}),
"[project]/lib/urlChecks.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pure URL hygiene checks. Results never include the suspicious value itself,
 * only where it was found, so tokens are not echoed back to the browser.
 */ __turbopack_context__.s([
    "findMissingValueLiterals",
    ()=>findMissingValueLiterals,
    "findTokensInUrl",
    ()=>findTokensInUrl,
    "looksLikeSecret",
    ()=>looksLikeSecret
]);
function safeDecode(s) {
    try {
        return decodeURIComponent(s.replace(/\+/g, " "));
    } catch  {
        return s;
    }
}
function parts(url) {
    let u;
    try {
        u = new URL(url);
    } catch  {
        return null;
    }
    const segments = u.pathname.split("/").filter(Boolean).map(safeDecode);
    const query = u.search.replace(/^\?/, "").split("&").filter(Boolean).map((p)=>{
        const eq = p.indexOf("=");
        return [
            safeDecode(eq > -1 ? p.slice(0, eq) : p),
            eq > -1 ? safeDecode(p.slice(eq + 1)) : ""
        ];
    });
    return {
        segments,
        query
    };
}
const MISSING_RE = /^(undefined|null|nan)$/i;
function findMissingValueLiterals(url) {
    const p = parts(url);
    if (!p) return [];
    const hits = [];
    p.segments.forEach((s, i)=>{
        if (MISSING_RE.test(s)) hits.push({
            where: `path segment ${i + 1}`,
            literal: s
        });
    });
    for (const [k, v] of p.query){
        if (MISSING_RE.test(v)) hits.push({
            where: `?${k}`,
            literal: v
        });
        else if (MISSING_RE.test(k)) hits.push({
            where: `query key "${k}"`,
            literal: k
        });
    }
    return hits;
}
const TOKEN_PARAM_NAMES = new Set([
    "token",
    "access_token",
    "accesstoken",
    "auth_token",
    "id_token",
    "refresh_token",
    "key",
    "api_key",
    "apikey",
    "api-key",
    "client_secret",
    "secret",
    "password"
]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HEX_RE = /^[0-9a-f]+$/i;
const JWT_RE = /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/;
function entropyPerChar(s) {
    const freq = new Map();
    for (const c of s)freq.set(c, (freq.get(c) ?? 0) + 1);
    let h = 0;
    for (const n of freq.values()){
        const p = n / s.length;
        h -= p * Math.log2(p);
    }
    return h;
}
function looksLikeSecret(s) {
    if (JWT_RE.test(s)) return true;
    if (s.length < 32 || s.length > 4096) return false;
    if (!/^[A-Za-z0-9_\-.~+/=]+$/.test(s)) return false;
    if (UUID_RE.test(s) || HEX_RE.test(s)) return false;
    if (!/[A-Za-z]/.test(s) || !/\d/.test(s)) return false;
    return entropyPerChar(s) >= 3.5;
}
function findTokensInUrl(url) {
    const p = parts(url);
    if (!p) return [];
    const hits = [];
    for (const [k, v] of p.query){
        if (!v) continue;
        if (TOKEN_PARAM_NAMES.has(k.toLowerCase()) || looksLikeSecret(v)) hits.push({
            where: `?${k}`
        });
    }
    p.segments.forEach((s, i)=>{
        if (looksLikeSecret(s)) hits.push({
            where: `path segment ${i + 1}`
        });
    });
    return hits;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02c43b609muay._.js.map
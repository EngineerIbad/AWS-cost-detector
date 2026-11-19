module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:dns/promises [external] (node:dns/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:dns/promises", () => require("node:dns/promises"));

module.exports = mod;
}),
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:https [external] (node:https, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:https", () => require("node:https"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:perf_hooks", () => require("node:perf_hooks"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/analyze/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "maxDuration",
    ()=>maxDuration,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analyze.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/curl.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/rateLimit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$safeFetch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/safeFetch.ts [app-route] (ecmascript)");
;
;
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
const maxDuration = 20;
/** Pasted samples can be larger than outbound request bodies. */ const MAX_PAYLOAD_SAMPLE_BYTES = 4 * 1024 * 1024;
const MAX_API_BODY_BYTES = MAX_PAYLOAD_SAMPLE_BYTES + 64 * 1024;
function err(status, code, message, field = "general", extra) {
    const body = {
        error: {
            code,
            message,
            field
        }
    };
    return Response.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",
            ...extra
        }
    });
}
async function POST(request) {
    // NOTE: never log anything from the request or response in this handler.
    const limit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimit"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clientIp"])(request.headers));
    if (!limit.ok) {
        return err(429, "rate_limited", `You've hit the limit of 10 analyses per minute. Try again in ${limit.retryAfterSec}s.`, "general", {
            "Retry-After": String(limit.retryAfterSec)
        });
    }
    const declared = Number(request.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > MAX_API_BODY_BYTES) {
        return err(413, "too_large", "That input is too large. Keep samples under 4 MB.");
    }
    let input;
    try {
        const text = await request.text();
        if (text.length > MAX_API_BODY_BYTES) return err(413, "too_large", "That input is too large. Keep samples under 4 MB.");
        input = JSON.parse(text);
    } catch  {
        return err(400, "bad_json", "The request couldn't be read. Refresh the page and try again.");
    }
    if (!input || typeof input !== "object" || typeof input.mode !== "string") {
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
            const wire = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeAs"])(raw, servedAs);
            const trimmed = input.json.trim();
            const ct = trimmed.startsWith("{") || trimmed.startsWith("[") ? "application/json" : "text/plain";
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeBody"])({
                source: "payload",
                raw,
                wireBytes: wire.length,
                status: null,
                contentType: ct,
                contentEncoding: servedAs === "identity" ? null : servedAs,
                vary: null,
                assumedEncoding: true
            });
            return Response.json(result, {
                headers: {
                    "Cache-Control": "no-store"
                }
            });
        }
        let req;
        if (input.mode === "curl") {
            if (typeof input.curl !== "string") return err(400, "bad_request", "Paste a curl command.", "curl");
            if (input.curl.length > 200_000) return err(413, "too_large", "That curl command is too long.", "curl");
            try {
                req = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCurl"])(input.curl);
            } catch (e) {
                if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CurlParseError"]) return err(400, "curl_parse", e.message, "curl");
                throw e;
            }
        } else if (input.mode === "request") {
            if (typeof input.url !== "string" || !input.url.trim()) return err(400, "no_url", "Enter the API URL you want to measure.", "url");
            req = {
                method: typeof input.method === "string" ? input.method.toUpperCase() : "GET",
                url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$curl$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeUrl"])(input.url),
                headers: input.headers && typeof input.headers === "object" ? input.headers : {},
                body: typeof input.body === "string" && input.body !== "" ? input.body : undefined
            };
        } else {
            return err(400, "bad_request", "Unknown request type.");
        }
        if (req.body !== undefined && Buffer.byteLength(req.body, "utf8") > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$safeFetch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_REQUEST_BODY_BYTES"]) {
            return err(413, "body_too_large", "The request body is over 100 KB. Send a smaller sample body.", input.mode === "curl" ? "curl" : "body");
        }
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$safeFetch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["safeFetch"])({
            ...req,
            acceptEncoding: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["acceptEncodingHeader"])()
        });
        let redirectTo = null;
        if (res.status >= 300 && res.status < 400) {
            if (res.location) {
                try {
                    redirectTo = new URL(res.location, req.url).toString().slice(0, 300);
                } catch  {
                    redirectTo = res.location.slice(0, 300);
                }
            } else {
                redirectTo = "another location";
            }
        }
        const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeBody"])(res.wire, res.contentEncoding);
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeBody"])({
            source: "live",
            raw,
            wireBytes: res.wire.length,
            status: res.status,
            contentType: res.contentType,
            contentEncoding: res.contentEncoding,
            vary: res.vary,
            responseHeaders: res.headers,
            redirectTo
        });
        return Response.json(result, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (e) {
        const field = input.mode === "curl" ? "curl" : input.mode === "payload" ? "json" : "url";
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$safeFetch$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SafeFetchError"]) {
            const f = input.mode === "curl" || e.field === "url" || e.field === "general" ? field : e.field;
            return err(e.httpStatus, e.code, e.message, f);
        }
        if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analyze$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecodeError"]) return err(502, "decode_failed", e.message, field);
        return err(500, "internal", "Something went wrong on our side. Please try again.", field);
    }
}
}),
"[project]/lib/analyze.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/findings.ts [app-route] (ecmascript)");
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
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAlreadyCompressedType"])(contentType) || looksBinary(raw) || raw.length === 0) return out;
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
    const media = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAlreadyCompressedType"])(ct);
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
    const findings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildFindings"])({
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
        contentEncoding: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$findings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeEncoding"])(input.contentEncoding),
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
"[project]/lib/curl.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/findings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFindings",
    ()=>buildFindings,
    "isAlreadyCompressedType",
    ()=>isAlreadyCompressedType,
    "normalizeEncoding",
    ()=>normalizeEncoding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/urlChecks.ts [app-route] (ecmascript)");
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
        const missing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findMissingValueLiterals"])(f.requestUrl);
        if (missing.length > 0) {
            const lit = missing[0].literal ?? "undefined";
            out.push({
                id: "url-missing-value",
                severity: "medium",
                title: `Your client is sending '${lit}' in the URL`,
                detail: `This is likely a missing value (e.g. token or ID) at request time. Found in ${missing.map((m)=>m.where).join(", ")}.`
            });
        }
        const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$urlChecks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findTokensInUrl"])(f.requestUrl);
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
"[project]/lib/ip.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Decide whether an IP address is safe to connect to from our server.
 * Pure functions with no Node dependencies so they're easy to unit-test.
 * Anything we can't parse is treated as blocked (fail closed).
 */ __turbopack_context__.s([
    "isBlockedAddress",
    ()=>isBlockedAddress,
    "isBlockedIPv4",
    ()=>isBlockedIPv4,
    "isBlockedIPv6",
    ()=>isBlockedIPv6,
    "parseIPv4",
    ()=>parseIPv4,
    "parseIPv6",
    ()=>parseIPv6
]);
function v4(a, b, c, d) {
    return (a << 24 >>> 0) + (b << 16) + (c << 8) + d;
}
const BLOCKED_V4 = [
    [
        v4(0, 0, 0, 0),
        8
    ],
    [
        v4(10, 0, 0, 0),
        8
    ],
    [
        v4(100, 64, 0, 0),
        10
    ],
    [
        v4(127, 0, 0, 0),
        8
    ],
    [
        v4(169, 254, 0, 0),
        16
    ],
    [
        v4(172, 16, 0, 0),
        12
    ],
    [
        v4(192, 0, 0, 0),
        24
    ],
    [
        v4(192, 0, 2, 0),
        24
    ],
    [
        v4(192, 88, 99, 0),
        24
    ],
    [
        v4(192, 168, 0, 0),
        16
    ],
    [
        v4(198, 18, 0, 0),
        15
    ],
    [
        v4(198, 51, 100, 0),
        24
    ],
    [
        v4(203, 0, 113, 0),
        24
    ],
    [
        v4(224, 0, 0, 0),
        4
    ],
    [
        v4(240, 0, 0, 0),
        4
    ]
];
function parseIPv4(ip) {
    const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
    if (!m) return null;
    const parts = m.slice(1).map(Number);
    if (parts.some((p)=>p > 255)) return null;
    // Reject leading zeros ("010") which some stacks read as octal.
    if (m.slice(1).some((p)=>p.length > 1 && p.startsWith("0"))) return null;
    return v4(parts[0], parts[1], parts[2], parts[3]);
}
function inCidr4(addr, [net, bits]) {
    if (bits === 0) return true;
    const mask = 0xffffffff << 32 - bits >>> 0;
    return (addr & mask) >>> 0 === (net & mask) >>> 0;
}
function isBlockedIPv4(ip) {
    const n = parseIPv4(ip);
    if (n === null) return true;
    return BLOCKED_V4.some((c)=>inCidr4(n, c));
}
function parseIPv6(input) {
    let ip = input.trim();
    if (ip.startsWith("[") && ip.endsWith("]")) ip = ip.slice(1, -1);
    const zone = ip.indexOf("%");
    if (zone > -1) ip = ip.slice(0, zone);
    if (!ip.includes(":")) return null;
    // Embedded IPv4 tail, e.g. ::ffff:127.0.0.1 -> rewrite as two hex groups.
    const lastColon = ip.lastIndexOf(":");
    const maybeV4 = ip.slice(lastColon + 1);
    if (maybeV4.includes(".")) {
        const n = parseIPv4(maybeV4);
        if (n === null) return null;
        ip = ip.slice(0, lastColon + 1) + (n >>> 16).toString(16) + ":" + (n & 0xffff).toString(16);
    }
    const dbl = ip.split("::");
    if (dbl.length > 2) return null;
    const parseGroups = (s)=>{
        if (s === "") return [];
        const out = [];
        for (const g of s.split(":")){
            if (!/^[0-9a-f]{1,4}$/i.test(g)) return null;
            out.push(parseInt(g, 16));
        }
        return out;
    };
    if (dbl.length === 2) {
        const head = parseGroups(dbl[0]);
        const rest = parseGroups(dbl[1]);
        if (!head || !rest) return null;
        const fill = 8 - head.length - rest.length;
        if (fill < 1) return null;
        return [
            ...head,
            ...new Array(fill).fill(0),
            ...rest
        ];
    }
    const all = parseGroups(ip);
    return all && all.length === 8 ? all : null;
}
function embeddedV4(g, hiIdx) {
    const hi = g[hiIdx];
    const lo = g[hiIdx + 1];
    return `${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`;
}
function isBlockedIPv6(ip) {
    const g = parseIPv6(ip);
    if (!g) return true;
    const allZero = (from, to)=>g.slice(from, to).every((x)=>x === 0);
    // :: (unspecified) and ::1 (loopback)
    if (allZero(0, 7) && (g[7] === 0 || g[7] === 1)) return true;
    // IPv4-mapped ::ffff:a.b.c.d -> judge the IPv4 address
    if (allZero(0, 5) && g[5] === 0xffff) return isBlockedIPv4(embeddedV4(g, 6));
    // IPv4-translated ::ffff:0:a.b.c.d (RFC 2765)
    if (allZero(0, 4) && g[4] === 0xffff && g[5] === 0) return isBlockedIPv4(embeddedV4(g, 6));
    // Deprecated IPv4-compatible ::a.b.c.d
    if (allZero(0, 6)) return true;
    // NAT64 64:ff9b::/96 -> judge the embedded IPv4
    if (g[0] === 0x64 && g[1] === 0xff9b && allZero(2, 6)) return isBlockedIPv4(embeddedV4(g, 6));
    // NAT64 local-use 64:ff9b:1::/48
    if (g[0] === 0x64 && g[1] === 0xff9b && g[2] === 1) return true;
    // 6to4 2002::/16 -> embedded IPv4 in groups 1-2
    if (g[0] === 0x2002) return isBlockedIPv4(embeddedV4(g, 1));
    // Discard-only 100::/64
    if (g[0] === 0x100 && allZero(1, 4)) return true;
    // Documentation 2001:db8::/32
    if (g[0] === 0x2001 && g[1] === 0x0db8) return true;
    // Teredo 2001::/32 (tunnels, can reach arbitrary IPv4)
    if (g[0] === 0x2001 && g[1] === 0) return true;
    // Unique local fc00::/7
    if ((g[0] & 0xfe00) === 0xfc00) return true;
    // Link-local fe80::/10
    if ((g[0] & 0xffc0) === 0xfe80) return true;
    // Deprecated site-local fec0::/10
    if ((g[0] & 0xffc0) === 0xfec0) return true;
    // Multicast ff00::/8
    if ((g[0] & 0xff00) === 0xff00) return true;
    // Only global unicast 2000::/3 is reachable on the public internet.
    if ((g[0] & 0xe000) !== 0x2000) return true;
    return false;
}
function isBlockedAddress(ip) {
    const s = ip.trim();
    if (s.includes(":")) return isBlockedIPv6(s);
    return isBlockedIPv4(s);
}
}),
"[project]/lib/rateLimit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientIp",
    ()=>clientIp,
    "rateLimit",
    ()=>rateLimit
]);
/**
 * Best-effort in-memory sliding-window rate limiter (per server instance).
 * Serverless instances don't share memory, so pair this with Vercel Firewall
 * rate limiting in production (see README).
 */ const WINDOW_MS = 60_000;
const hits = new Map();
function rateLimit(key, limit = 10, now = Date.now()) {
    const recent = (hits.get(key) ?? []).filter((t)=>now - t < WINDOW_MS);
    if (recent.length >= limit) {
        hits.set(key, recent);
        return {
            ok: false,
            retryAfterSec: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000)
        };
    }
    recent.push(now);
    hits.set(key, recent);
    // Opportunistic cleanup so the map can't grow without bound.
    if (hits.size > 5000) {
        for (const [k, ts] of hits)if (ts.every((t)=>now - t >= WINDOW_MS)) hits.delete(k);
    }
    return {
        ok: true,
        retryAfterSec: 0
    };
}
function clientIp(headers) {
    const xff = headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return headers.get("x-real-ip") ?? "unknown";
}
}),
"[project]/lib/safeFetch.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALLOWED_METHODS",
    ()=>ALLOWED_METHODS,
    "ALLOWED_PORTS",
    ()=>ALLOWED_PORTS,
    "MAX_REQUEST_BODY_BYTES",
    ()=>MAX_REQUEST_BODY_BYTES,
    "MAX_RESPONSE_BYTES",
    ()=>MAX_RESPONSE_BYTES,
    "SafeFetchError",
    ()=>SafeFetchError,
    "TIMEOUT_MS",
    ()=>TIMEOUT_MS,
    "safeFetch",
    ()=>safeFetch,
    "sanitizeRequestHeaders",
    ()=>sanitizeRequestHeaders,
    "vetTarget",
    ()=>vetTarget
]);
/**
 * SSRF-hardened, single-shot HTTP client.
 *
 * - http/https only, ports 80/443/8080/8443 only
 * - every resolved address is vetted; if ANY is private/reserved we refuse
 * - the socket connects to the vetted IP via a custom `lookup` (no DNS rebinding)
 *   while Host header and TLS SNI keep the original hostname
 * - no redirects, no retries, 10 s deadline, 5 MB response cap, 100 KB request body cap
 *
 * Nothing in this module logs. Errors never echo headers, tokens or bodies.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:dns/promises [external] (node:dns/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$http__$5b$external$5d$__$28$node$3a$http$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:http [external] (node:http, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$https__$5b$external$5d$__$28$node$3a$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:https [external] (node:https, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$net__$5b$external$5d$__$28$node$3a$net$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:net [external] (node:net, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ip.ts [app-route] (ecmascript)");
;
;
;
;
;
const ALLOWED_PORTS = new Set([
    80,
    443,
    8080,
    8443
]);
const ALLOWED_METHODS = new Set([
    "GET",
    "POST",
    "PUT",
    "PATCH"
]);
const TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;
const MAX_REQUEST_BODY_BYTES = 100 * 1024;
class SafeFetchError extends Error {
    code;
    field;
    httpStatus;
    constructor(code, message, field = "url", httpStatus = 400){
        super(message), this.code = code, this.field = field, this.httpStatus = httpStatus;
        this.name = "SafeFetchError";
    }
}
const SAFE_RESPONSE_HEADERS = [
    "content-type",
    "content-encoding",
    "content-length",
    "vary",
    "cache-control",
    "etag",
    "last-modified",
    "age",
    "date",
    "server",
    "via",
    "x-cache",
    "cf-cache-status",
    "transfer-encoding",
    "access-control-allow-origin"
];
/** Request headers the user may not control. */ const STRIPPED_REQUEST_HEADERS = new Set([
    "host",
    "content-length",
    "transfer-encoding",
    "connection",
    "keep-alive",
    "upgrade",
    "te",
    "trailer",
    "expect",
    "accept-encoding",
    "proxy-authorization",
    "proxy-connection",
    "forwarded",
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-real-ip"
]);
function withDeadline(p, deadline, onTimeout) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) return Promise.reject(onTimeout());
    let t;
    return Promise.race([
        p.finally(()=>clearTimeout(t)),
        new Promise((_, reject)=>{
            t = setTimeout(()=>reject(onTimeout()), remaining);
        })
    ]);
}
const timeoutError = ()=>new SafeFetchError("timeout", "The API didn't respond within 10 seconds. Check it's publicly reachable, or try a lighter endpoint.", "url", 504);
const privateError = ()=>new SafeFetchError("private_address", "This looks like a private address. The tool can only reach public APIs.", "url", 400);
async function vetTarget(rawUrl, deadline = Date.now() + TIMEOUT_MS) {
    let url;
    try {
        url = new URL(rawUrl);
    } catch  {
        throw new SafeFetchError("invalid_url", "That doesn't look like a valid URL. Try something like https://api.example.com/items.");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new SafeFetchError("bad_scheme", "Only http:// and https:// URLs are supported.");
    }
    if (url.username || url.password) {
        throw new SafeFetchError("credentials_in_url", "Remove the username/password from the URL and use a Bearer token or curl -u instead.");
    }
    const port = url.port ? Number(url.port) : url.protocol === "https:" ? 443 : 80;
    if (!ALLOWED_PORTS.has(port)) {
        throw new SafeFetchError("bad_port", `Port ${port} isn't allowed. The tool only connects to ports 80, 443, 8080 and 8443.`);
    }
    const hostname = url.hostname.replace(/^\[|\]$/g, "");
    if (!hostname) throw new SafeFetchError("invalid_url", "The URL is missing a hostname.");
    const lower = hostname.toLowerCase().replace(/\.$/, "");
    if (lower === "localhost" || lower.endsWith(".localhost") || lower.endsWith(".local") || lower.endsWith(".internal")) {
        throw privateError();
    }
    let addresses;
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$net__$5b$external$5d$__$28$node$3a$net$2c$__cjs$29$__["default"].isIP(hostname)) {
        addresses = [
            {
                address: hostname,
                family: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$net__$5b$external$5d$__$28$node$3a$net$2c$__cjs$29$__["default"].isIP(hostname)
            }
        ];
    } else {
        try {
            addresses = await withDeadline(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__["default"].lookup(hostname, {
                all: true,
                verbatim: true
            }), deadline, timeoutError);
        } catch (e) {
            if (e instanceof SafeFetchError) throw e;
            throw new SafeFetchError("dns_failed", `We couldn't find "${hostname.slice(0, 100)}". Check the domain is spelled right and is public.`);
        }
    }
    if (addresses.length === 0) {
        throw new SafeFetchError("dns_failed", `We couldn't find "${hostname.slice(0, 100)}". Check the domain is spelled right and is public.`);
    }
    if (addresses.some((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBlockedAddress"])(a.address))) throw privateError();
    const first = addresses[0];
    return {
        url,
        hostname,
        port,
        address: first.address,
        family: first.family === 6 ? 6 : 4
    };
}
function sanitizeRequestHeaders(headers) {
    const out = {};
    let count = 0;
    for (const [k, v] of Object.entries(headers ?? {})){
        if (typeof k !== "string" || typeof v !== "string") continue;
        const name = k.trim();
        if (!/^[A-Za-z0-9!#$%&'*+.^_`|~-]+$/.test(name)) {
            throw new SafeFetchError("bad_header", `"${name.slice(0, 40)}" isn't a valid header name.`, "general");
        }
        if (/[\r\n\0]/.test(v)) throw new SafeFetchError("bad_header", `The ${name.slice(0, 40)} header contains a line break.`, "general");
        const lname = name.toLowerCase();
        if (STRIPPED_REQUEST_HEADERS.has(lname) || lname.startsWith("proxy-")) continue;
        if (++count > 50) throw new SafeFetchError("bad_header", "That's too many headers (max 50).", "general");
        out[name] = v;
    }
    return out;
}
async function safeFetch(req) {
    const deadline = Date.now() + TIMEOUT_MS;
    const method = req.method.toUpperCase();
    if (!ALLOWED_METHODS.has(method)) {
        throw new SafeFetchError("bad_method", `${method} isn't supported. Use GET, POST, PUT or PATCH.`, "method");
    }
    const bodyBuf = req.body !== undefined && method !== "GET" ? Buffer.from(req.body, "utf8") : undefined;
    if (bodyBuf && bodyBuf.length > MAX_REQUEST_BODY_BYTES) {
        throw new SafeFetchError("body_too_large", "The request body is over 100 KB. Send a smaller sample body.", "body");
    }
    const target = await vetTarget(req.url, deadline);
    const headers = sanitizeRequestHeaders(req.headers);
    if (!Object.keys(headers).some((k)=>k.toLowerCase() === "user-agent")) headers["User-Agent"] = "API-Egress-Cost-Calculator/1.0";
    if (!Object.keys(headers).some((k)=>k.toLowerCase() === "accept")) headers["Accept"] = "*/*";
    headers["Accept-Encoding"] = req.acceptEncoding;
    headers["Connection"] = "close";
    if (bodyBuf) headers["Content-Length"] = String(bodyBuf.length);
    // Pin the connection to the vetted address. Called by net.connect with the
    // original hostname; we ignore it and return the IP we already checked.
    const pinnedLookup = (_host, options, cb)=>{
        if (options && options.all) cb(null, [
            {
                address: target.address,
                family: target.family
            }
        ]);
        else cb(null, target.address, target.family);
    };
    const isHttps = target.url.protocol === "https:";
    const transport = isHttps ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$https__$5b$external$5d$__$28$node$3a$https$2c$__cjs$29$__["default"] : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$http__$5b$external$5d$__$28$node$3a$http$2c$__cjs$29$__["default"];
    const isIpLiteral = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$net__$5b$external$5d$__$28$node$3a$net$2c$__cjs$29$__["default"].isIP(target.hostname) !== 0;
    return new Promise((resolve, reject)=>{
        let settled = false;
        const fail = (e)=>{
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            request.destroy();
            reject(e);
        };
        const request = transport.request({
            protocol: target.url.protocol,
            host: target.hostname,
            port: target.port,
            path: target.url.pathname + target.url.search,
            method,
            headers,
            lookup: pinnedLookup,
            agent: false,
            ...isHttps && !isIpLiteral ? {
                servername: target.hostname
            } : {},
            ...isHttps ? {
                rejectUnauthorized: true
            } : {}
        }, (res)=>{
            // Defense in depth: verify the socket really went where we vetted.
            const remote = res.socket?.remoteAddress;
            if (remote && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ip$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBlockedAddress"])(remote)) {
                fail(privateError());
                return;
            }
            const declared = Number(res.headers["content-length"]);
            if (Number.isFinite(declared) && declared > MAX_RESPONSE_BYTES) {
                fail(new SafeFetchError("response_too_large", "The response is over 5 MB. Try a smaller page (e.g. ?limit=50).", "url", 413));
                return;
            }
            const chunks = [];
            let total = 0;
            res.on("data", (c)=>{
                total += c.length;
                if (total > MAX_RESPONSE_BYTES) {
                    fail(new SafeFetchError("response_too_large", "The response is over 5 MB. Try a smaller page (e.g. ?limit=50).", "url", 413));
                    return;
                }
                chunks.push(c);
            });
            res.on("end", ()=>{
                if (settled) return;
                settled = true;
                clearTimeout(timer);
                const safeHeaders = {};
                for (const h of SAFE_RESPONSE_HEADERS){
                    const v = res.headers[h];
                    if (v !== undefined) safeHeaders[h] = (Array.isArray(v) ? v.join(", ") : v).slice(0, 300);
                }
                const one = (h)=>{
                    const v = res.headers[h];
                    return v === undefined ? null : Array.isArray(v) ? v.join(", ") : v;
                };
                resolve({
                    status: res.statusCode ?? 0,
                    headers: safeHeaders,
                    contentType: one("content-type"),
                    contentEncoding: one("content-encoding"),
                    vary: one("vary"),
                    location: one("location"),
                    wire: Buffer.concat(chunks)
                });
            });
            res.on("error", ()=>fail(new SafeFetchError("network", "The connection dropped while reading the response.", "url", 502)));
            res.on("aborted", ()=>fail(new SafeFetchError("network", "The connection dropped while reading the response.", "url", 502)));
        });
        const timer = setTimeout(()=>fail(timeoutError()), Math.max(0, deadline - Date.now()));
        request.on("error", (err)=>{
            const code = err?.code ?? "";
            let msg = "We couldn't connect to the API. Check the URL and that it's publicly reachable.";
            if (code === "ECONNREFUSED") msg = "The server refused the connection. Check the port and that the API is running.";
            else if (code === "ECONNRESET") msg = "The server closed the connection unexpectedly.";
            else if (code.startsWith("ERR_TLS") || code.includes("CERT") || code === "DEPTH_ZERO_SELF_SIGNED_CERT") msg = "The API's TLS certificate isn't valid, so we didn't connect.";
            else if (code === "ERR_INVALID_CHAR" || code === "ERR_INVALID_HTTP_TOKEN") msg = "One of the headers contains characters that aren't allowed.";
            fail(new SafeFetchError("network", msg, "url", 502));
        });
        if (bodyBuf) request.write(bodyBuf);
        request.end();
    });
}
}),
"[project]/lib/urlChecks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0kxs2pxkgu_a2._.js.map
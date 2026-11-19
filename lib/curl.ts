/**
 * A small, strict curl command parser. Supports the subset of curl that
 * describes a single HTTP request; anything else produces a clear error.
 */

export interface ParsedRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export class CurlParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CurlParseError";
  }
}

/** Shell-style tokenizer: single quotes, double quotes, $'...', backslash escapes and line continuations. */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let cur = "";
  let inToken = false;
  let i = 0;
  const s = input;

  while (i < s.length) {
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
      while (i < s.length) {
        const d = s[i];
        if (d === "'") {
          closed = true;
          i++;
          break;
        }
        if (d === "\\" && i + 1 < s.length) {
          const n = s[i + 1];
          const map: Record<string, string> = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"' };
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
      while (i < s.length) {
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

/** Trim and add https:// when no scheme is given. */
export function normalizeUrl(raw: string): string {
  const u = raw.trim();
  if (!u) return u;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(u)) return u;
  if (u.startsWith("//")) return "https:" + u;
  return "https://" + u;
}

function toBase64(s: string): string {
  if (typeof Buffer !== "undefined") return Buffer.from(s, "utf8").toString("base64");
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

const VALUE_FLAGS: Record<string, string> = {
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
  "--output": "ignore-value",
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
  "--http2",
]);
const HARMLESS_SHORT = new Set(["L", "k", "s", "S", "i", "v", "g", "f"]);

/**
 * Parse a curl command into a request description.
 * Throws CurlParseError with a plain-language message on failure.
 */
export function parseCurl(input: string): ParsedRequest {
  const text = input.trim();
  if (!text) throw new CurlParseError("Paste a curl command, e.g. curl https://api.example.com/items");

  const tokens = tokenize(text);
  if (tokens.length === 0 || tokens[0] !== "curl") {
    throw new CurlParseError('The command should start with "curl". Copy it from your browser\'s dev tools (Copy as cURL) or your API docs.');
  }

  let method: string | undefined;
  const headers: Record<string, string> = {};
  const dataParts: string[] = [];
  let isJsonFlag = false;
  const urls: string[] = [];

  const addHeader = (raw: string) => {
    const idx = raw.indexOf(":");
    if (idx <= 0) throw new CurlParseError(`This header isn't valid: "${raw.slice(0, 60)}". Headers look like "Name: value".`);
    const name = raw.slice(0, idx).trim();
    const value = raw.slice(idx + 1).trim();
    if (!/^[A-Za-z0-9!#$%&'*+.^_`|~-]+$/.test(name)) {
      throw new CurlParseError(`"${name.slice(0, 60)}" isn't a valid header name.`);
    }
    // Later headers replace earlier ones with the same name (case-insensitive).
    for (const k of Object.keys(headers)) if (k.toLowerCase() === name.toLowerCase()) delete headers[k];
    headers[name] = value;
  };

  const apply = (kind: string, value: string) => {
    switch (kind) {
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

  for (let i = 1; i < tokens.length; i++) {
    const tok = tokens[i];

    if (tok.startsWith("--")) {
      const eq = tok.indexOf("=");
      const name = eq > -1 ? tok.slice(0, eq) : tok;
      if (HARMLESS_LONG.has(name)) continue;
      const kind = VALUE_FLAGS[name];
      if (!kind) throw new CurlParseError(`The option ${name} isn't supported. Remove it and try again.`);
      let value: string;
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
      while (j < tok.length) {
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
  } catch {
    throw new CurlParseError(`"${urls[0].slice(0, 80)}" doesn't look like a valid URL.`);
  }

  let body: string | undefined;
  if (dataParts.length > 0) {
    body = dataParts.join("&");
    if (isJsonFlag) {
      if (!Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) headers["Content-Type"] = "application/json";
      if (!Object.keys(headers).some((k) => k.toLowerCase() === "accept")) headers["Accept"] = "application/json";
    } else if (!Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
  }

  const finalMethod = method ?? (body !== undefined ? "POST" : "GET");
  if (!/^[A-Z]+$/.test(finalMethod)) throw new CurlParseError(`"${finalMethod}" isn't a valid HTTP method.`);

  return { method: finalMethod, url, headers, body };
}

/** Quick check used by the form to detect a pasted curl command. */
export function looksLikeCurl(s: string): boolean {
  return /^\s*curl\s/i.test(s);
}

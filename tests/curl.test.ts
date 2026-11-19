import { describe, expect, it } from "vitest";
import { CurlParseError, normalizeUrl, parseCurl, tokenize } from "../lib/curl";

describe("tokenize", () => {
  it("handles single and double quotes", () => {
    expect(tokenize(`curl 'a b' "c d" e`)).toEqual(["curl", "a b", "c d", "e"]);
  });
  it("handles escaped quotes inside double quotes", () => {
    expect(tokenize(`curl -d "{\\"a\\":1}"`)).toEqual(["curl", "-d", '{"a":1}']);
  });
  it("keeps backslashes literal inside single quotes", () => {
    expect(tokenize(`curl -d 'a\\nb'`)).toEqual(["curl", "-d", "a\\nb"]);
  });
  it("handles $'...' ANSI-C quoting", () => {
    expect(tokenize(`curl --data-raw $'{"a":"it\\'s"}'`)).toEqual(["curl", "--data-raw", `{"a":"it's"}`]);
  });
  it("throws on unclosed quotes", () => {
    expect(() => tokenize(`curl 'https://x.com`)).toThrow(CurlParseError);
    expect(() => tokenize(`curl "https://x.com`)).toThrow(CurlParseError);
  });
});

describe("parseCurl", () => {
  it("parses a simple GET", () => {
    expect(parseCurl("curl https://api.example.com/items")).toEqual({
      method: "GET",
      url: "https://api.example.com/items",
      headers: {},
      body: undefined,
    });
  });

  it("handles multiline commands with backslash continuations", () => {
    const cmd = `curl 'https://api.example.com/v1/users?limit=50' \\
  -H 'Accept: application/json' \\
  -H "Authorization: Bearer abc.def" \\
  --compressed`;
    const r = parseCurl(cmd);
    expect(r.url).toBe("https://api.example.com/v1/users?limit=50");
    expect(r.headers).toEqual({ Accept: "application/json", Authorization: "Bearer abc.def" });
    expect(r.method).toBe("GET");
  });

  it("handles CRLF continuations", () => {
    const r = parseCurl("curl https://a.com \\\r\n  -H 'X-A: 1'");
    expect(r.headers).toEqual({ "X-A": "1" });
  });

  it("-d implies POST when no -X is given", () => {
    const r = parseCurl(`curl https://api.example.com/search -d '{"q":"shoes"}' -H 'Content-Type: application/json'`);
    expect(r.method).toBe("POST");
    expect(r.body).toBe('{"q":"shoes"}');
    expect(r.headers["Content-Type"]).toBe("application/json");
  });

  it("--data-raw and --data-binary also imply POST", () => {
    expect(parseCurl(`curl https://a.com --data-raw 'x=1'`).method).toBe("POST");
    expect(parseCurl(`curl https://a.com --data-binary 'x=1'`).method).toBe("POST");
  });

  it("-X overrides the implied method", () => {
    const r = parseCurl(`curl -X PUT https://a.com -d 'x=1'`);
    expect(r.method).toBe("PUT");
  });

  it("supports attached and = forms", () => {
    expect(parseCurl(`curl -XPATCH https://a.com`).method).toBe("PATCH");
    expect(parseCurl(`curl --request=post https://a.com`).method).toBe("POST");
    expect(parseCurl(`curl -H'X-Test: yes' https://a.com`).headers).toEqual({ "X-Test": "yes" });
  });

  it("collects multiple headers", () => {
    const r = parseCurl(`curl https://a.com -H 'A: 1' --header 'B: 2' -H "C: three: parts"`);
    expect(r.headers).toEqual({ A: "1", B: "2", C: "three: parts" });
  });

  it("--json implies POST with JSON headers", () => {
    const r = parseCurl(`curl --json '{"a":1}' https://a.com`);
    expect(r.method).toBe("POST");
    expect(r.headers["Content-Type"]).toBe("application/json");
    expect(r.headers["Accept"]).toBe("application/json");
  });

  it("-u becomes a Basic Authorization header", () => {
    const r = parseCurl(`curl -u user:pass https://a.com`);
    expect(r.headers.Authorization).toBe("Basic " + Buffer.from("user:pass").toString("base64"));
  });

  it("ignores harmless flags, including grouped short flags", () => {
    const r = parseCurl(`curl -sSL -k -i -v --compressed --location https://a.com`);
    expect(r.url).toBe("https://a.com/".replace(/\/$/, ""));
    expect(r.method).toBe("GET");
  });

  it("adds https:// when missing", () => {
    expect(parseCurl("curl api.example.com/x").url).toBe("https://api.example.com/x");
    expect(normalizeUrl("  example.com ")).toBe("https://example.com");
    expect(normalizeUrl("http://example.com")).toBe("http://example.com");
  });

  it("gives clear errors", () => {
    expect(() => parseCurl("")).toThrow(/Paste a curl command/);
    expect(() => parseCurl("wget https://a.com")).toThrow(/start with "curl"/);
    expect(() => parseCurl("curl -H 'A: 1'")).toThrow(/No URL/);
    expect(() => parseCurl("curl https://a.com https://b.com")).toThrow(/more than one URL/);
    expect(() => parseCurl("curl --proxy http://p https://a.com")).toThrow(/--proxy isn't supported/);
    expect(() => parseCurl("curl -H 'nocolon' https://a.com")).toThrow(/Name: value/);
    expect(() => parseCurl("curl -d @body.json https://a.com")).toThrow(/file/);
    expect(() => parseCurl("curl -X")).toThrow(/needs a value/);
  });
});

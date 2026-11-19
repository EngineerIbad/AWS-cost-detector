/**
 * Decide whether an IP address is safe to connect to from our server.
 * Pure functions with no Node dependencies so they're easy to unit-test.
 * Anything we can't parse is treated as blocked (fail closed).
 */

type Cidr4 = [number, number]; // [network as uint32, prefix length]

function v4(a: number, b: number, c: number, d: number): number {
  return ((a << 24) >>> 0) + (b << 16) + (c << 8) + d;
}

const BLOCKED_V4: Cidr4[] = [
  [v4(0, 0, 0, 0), 8], // "this" network / unspecified
  [v4(10, 0, 0, 0), 8], // private
  [v4(100, 64, 0, 0), 10], // CGNAT
  [v4(127, 0, 0, 0), 8], // loopback
  [v4(169, 254, 0, 0), 16], // link-local (incl. cloud metadata 169.254.169.254)
  [v4(172, 16, 0, 0), 12], // private
  [v4(192, 0, 0, 0), 24], // IETF protocol assignments
  [v4(192, 0, 2, 0), 24], // TEST-NET-1
  [v4(192, 88, 99, 0), 24], // 6to4 relay anycast (deprecated)
  [v4(192, 168, 0, 0), 16], // private
  [v4(198, 18, 0, 0), 15], // benchmarking
  [v4(198, 51, 100, 0), 24], // TEST-NET-2
  [v4(203, 0, 113, 0), 24], // TEST-NET-3
  [v4(224, 0, 0, 0), 4], // multicast
  [v4(240, 0, 0, 0), 4], // reserved + broadcast
];

export function parseIPv4(ip: string): number | null {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
  if (!m) return null;
  const parts = m.slice(1).map(Number);
  if (parts.some((p) => p > 255)) return null;
  // Reject leading zeros ("010") which some stacks read as octal.
  if (m.slice(1).some((p) => p.length > 1 && p.startsWith("0"))) return null;
  return v4(parts[0], parts[1], parts[2], parts[3]);
}

function inCidr4(addr: number, [net, bits]: Cidr4): boolean {
  if (bits === 0) return true;
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return ((addr & mask) >>> 0) === ((net & mask) >>> 0);
}

export function isBlockedIPv4(ip: string): boolean {
  const n = parseIPv4(ip);
  if (n === null) return true;
  return BLOCKED_V4.some((c) => inCidr4(n, c));
}

/** Parse an IPv6 address into 8 16-bit groups. Returns null if invalid. */
export function parseIPv6(input: string): number[] | null {
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

  const parseGroups = (s: string): number[] | null => {
    if (s === "") return [];
    const out: number[] = [];
    for (const g of s.split(":")) {
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
    return [...head, ...new Array(fill).fill(0), ...rest];
  }
  const all = parseGroups(ip);
  return all && all.length === 8 ? all : null;
}

function embeddedV4(g: number[], hiIdx: number): string {
  const hi = g[hiIdx];
  const lo = g[hiIdx + 1];
  return `${hi >> 8}.${hi & 0xff}.${lo >> 8}.${lo & 0xff}`;
}

export function isBlockedIPv6(ip: string): boolean {
  const g = parseIPv6(ip);
  if (!g) return true;
  const allZero = (from: number, to: number) => g.slice(from, to).every((x) => x === 0);

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

/** True if we must not connect to this address. */
export function isBlockedAddress(ip: string): boolean {
  const s = ip.trim();
  if (s.includes(":")) return isBlockedIPv6(s);
  return isBlockedIPv4(s);
}

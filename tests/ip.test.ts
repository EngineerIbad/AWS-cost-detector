import { describe, expect, it } from "vitest";
import { isBlockedAddress, parseIPv6 } from "../lib/ip";

describe("IPv4", () => {
  it.each([
    "0.0.0.0",
    "10.0.0.1",
    "10.255.255.255",
    "100.64.0.1",
    "100.127.255.254",
    "127.0.0.1",
    "127.1.2.3",
    "169.254.169.254",
    "172.16.0.1",
    "172.31.255.255",
    "192.0.0.8",
    "192.168.1.1",
    "198.18.0.1",
    "198.19.255.255",
    "224.0.0.1",
    "239.255.255.255",
    "240.0.0.1",
    "255.255.255.255",
  ])("blocks %s", (ip) => expect(isBlockedAddress(ip)).toBe(true));

  it.each(["8.8.8.8", "1.1.1.1", "93.184.216.34", "172.15.255.255", "172.32.0.1", "100.63.255.255", "100.128.0.0", "198.20.0.1", "11.0.0.1"])(
    "allows %s",
    (ip) => expect(isBlockedAddress(ip)).toBe(false),
  );

  it("fails closed on garbage and octal-looking input", () => {
    expect(isBlockedAddress("999.1.1.1")).toBe(true);
    expect(isBlockedAddress("010.0.0.1")).toBe(true);
    expect(isBlockedAddress("not-an-ip")).toBe(true);
    expect(isBlockedAddress("")).toBe(true);
  });
});

describe("IPv6", () => {
  it.each([
    "::1",
    "::",
    "0:0:0:0:0:0:0:1",
    "fc00::1",
    "fd12:3456:789a::1",
    "fe80::1",
    "fe80::1%eth0",
    "febf::1",
    "ff02::1",
    "ff00::",
    "2001:db8::1",
    "[::1]",
  ])("blocks %s", (ip) => expect(isBlockedAddress(ip)).toBe(true));

  it.each(["2606:4700:4700::1111", "2001:4860:4860::8888", "2a00:1450:4001:80b::200e"])("allows %s", (ip) =>
    expect(isBlockedAddress(ip)).toBe(false),
  );

  it("parses compressed forms", () => {
    expect(parseIPv6("::1")).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
    expect(parseIPv6("2001:db8::")).toEqual([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]);
    expect(parseIPv6("1:2:3:4:5:6:7:8")).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(parseIPv6("1::2::3")).toBeNull();
    expect(parseIPv6("1:2:3")).toBeNull();
  });

  it("fails closed on garbage", () => {
    expect(isBlockedAddress("gggg::1")).toBe(true);
    expect(isBlockedAddress(":::")).toBe(true);
  });
});

describe("IPv4-mapped and embedded IPv6", () => {
  it.each([
    "::ffff:127.0.0.1",
    "::ffff:10.0.0.1",
    "::ffff:169.254.169.254",
    "::ffff:192.168.0.1",
    "::ffff:7f00:1", // hex form of 127.0.0.1
    "0:0:0:0:0:ffff:7f00:0001",
    "::ffff:0:127.0.0.1", // IPv4-translated
    "::127.0.0.1", // deprecated IPv4-compatible
    "64:ff9b::10.0.0.1", // NAT64
    "64:ff9b::a00:1", // NAT64, hex
    "2002:7f00:1::1", // 6to4 of 127.0.0.1
    "2002:a9fe:a9fe::", // 6to4 of 169.254.169.254
  ])("blocks %s", (ip) => expect(isBlockedAddress(ip)).toBe(true));

  it.each(["::ffff:8.8.8.8", "::ffff:808:808", "64:ff9b::8.8.8.8", "2002:808:808::1"])("allows %s (public IPv4 inside)", (ip) =>
    expect(isBlockedAddress(ip)).toBe(false),
  );
});

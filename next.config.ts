import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Dev only: let `next dev` serve its scripts to devices on the local network
  // (e.g. testing on a phone at http://192.168.x.x:3000). No effect in production.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // The OG image route reads Poppins TTFs from disk at runtime.
  outputFileTracingIncludes: {
    "/api/og": ["./assets/fonts/*.ttf"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;

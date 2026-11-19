import { ImageResponse } from "next/og";

export const alt = "API Egress Cost Calculator: how much does your API response really cost?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars = [
    { label: "Uncompressed", w: 100, v: "412 KB" },
    { label: "Gzip", w: 22, v: "91 KB" },
    { label: "Brotli", w: 17, v: "70 KB" },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FFF9F2",
          padding: "64px 72px",
          color: "#1F1A17",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: "#800020" }} />
          <div style={{ fontSize: 28, color: "#800020", fontWeight: 700 }}>API Egress Cost Calculator</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 36, maxWidth: 980 }}>
          How much does your API response really cost?
        </div>
        <div style={{ fontSize: 28, color: "#6B5E57", marginTop: 20, maxWidth: 960 }}>
          Measure it, test Gzip, Brotli and Zstd, and see your AWS data transfer bill.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: "auto" }}>
          {bars.map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 200, fontSize: 24, color: "#6B5E57" }}>{b.label}</div>
              <div style={{ display: "flex", width: 700, height: 28, background: "#F3E6D5", borderRadius: 8 }}>
                <div style={{ width: `${b.w}%`, height: 28, background: "#800020", borderRadius: 8 }} />
              </div>
              <div style={{ fontSize: 24, fontWeight: 600 }}>{b.v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

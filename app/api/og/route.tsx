import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { decodeShare, shareHeadline, shareSummary } from "../../../lib/share";

export const runtime = "nodejs";

const SIZE = { width: 1200, height: 630 };
const C = {
  primary: "#800020",
  surface: "#F3E6D5",
  bg: "#FFF9F2",
  text: "#1F1A17",
  muted: "#6B5E57",
};

let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]> | null = null;
function fonts() {
  fontsPromise ??= Promise.all(
    (
      [
        ["Regular", 400],
        ["SemiBold", 600],
        ["Bold", 700],
      ] as const
    ).map(async ([file, weight]) => ({
      name: "Poppins",
      data: await readFile(join(process.cwd(), "assets", "fonts", `Poppins-${file}.ttf`)),
      weight,
      style: "normal" as const,
    })),
  );
  return fontsPromise;
}

/** Poppins has no "→" glyph, so draw it. */
function Arrow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ margin: "0 20px" }}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke={C.muted} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, background: C.primary }} />
      <div style={{ fontSize: 28, color: C.primary, fontWeight: 700 }}>API Egress Cost Calculator</div>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        padding: "56px 72px",
        color: C.text,
        fontFamily: "Poppins",
      }}
    >
      {children}
    </div>
  );
}

function DefaultCard() {
  const bars = [
    { label: "Uncompressed", w: 100, v: "412 KB" },
    { label: "Gzip", w: 22, v: "91 KB" },
    { label: "Brotli", w: 17, v: "70 KB" },
  ];
  return (
    <Frame>
      <Brand />
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginTop: 36, maxWidth: 980 }}>How much does your API response really cost?</div>
      <div style={{ fontSize: 28, color: C.muted, marginTop: 20, maxWidth: 960 }}>
        Measure it, test Gzip, Brotli and Zstd, and see your AWS data transfer bill.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: "auto" }}>
        {bars.map((b) => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 200, fontSize: 24, color: C.muted }}>{b.label}</div>
            <div style={{ display: "flex", width: 700, height: 28, background: C.surface, borderRadius: 8 }}>
              <div style={{ width: `${b.w}%`, height: 28, background: C.primary, borderRadius: 8 }} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>{b.v}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function SharedCard({ h, todayCost, bestCost }: { h: ReturnType<typeof shareHeadline>; todayCost: number; bestCost: number | null }) {
  const bestW = bestCost !== null && todayCost > 0 ? Math.max(2, Math.round((bestCost / todayCost) * 100)) : 0;
  return (
    <Frame>
      <Brand />
      <div style={{ fontSize: 28, color: C.muted, marginTop: 34 }}>Estimated AWS data transfer, per month</div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
        <div style={{ fontSize: 112, fontWeight: 700, color: h.best ? C.muted : C.primary, lineHeight: 1.1 }}>{h.today}</div>
        {h.best ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Arrow size={72} />
            <div style={{ fontSize: 112, fontWeight: 700, color: C.primary, lineHeight: 1.1 }}>{h.best}</div>
          </div>
        ) : null}
        <div style={{ fontSize: 40, fontWeight: 600, color: C.muted, marginLeft: 20, marginTop: 36 }}>/ month</div>
      </div>
      <div style={{ fontSize: 34, fontWeight: 600, marginTop: 6 }}>
        {h.best ? `with ${h.bestLabel} · ${h.savingsPct}% less` : "Already sending the smallest format tested"}
      </div>
      <div style={{ fontSize: 24, color: C.muted, marginTop: 10 }}>{h.details}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 170, fontSize: 22, color: C.muted }}>Today</div>
          <div style={{ display: "flex", width: 760, height: 26, background: C.surface, borderRadius: 8 }}>
            <div style={{ width: "100%", height: 26, background: h.best ? C.muted : C.primary, borderRadius: 8 }} />
          </div>
        </div>
        {h.best ? (
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 170, fontSize: 22, color: C.muted }}>{h.bestLabel}</div>
            <div style={{ display: "flex", width: 760, height: 26, background: C.surface, borderRadius: 8 }}>
              <div style={{ width: `${bestW}%`, height: 26, background: C.primary, borderRadius: 8 }} />
            </div>
          </div>
        ) : null}
        <div style={{ fontSize: 18, color: C.muted, marginTop: 6 }}>Estimate only. Not affiliated with Amazon Web Services.</div>
      </div>
    </Frame>
  );
}

export async function GET(request: Request) {
  const state = decodeShare(new URL(request.url).searchParams);
  let node: React.ReactElement;
  if (state) {
    const sum = shareSummary(state);
    const h = shareHeadline(state);
    node = <SharedCard h={h} todayCost={sum.today.monthlyCost} bestCost={h.best ? sum.best!.monthlyCost : null} />;
  } else {
    node = <DefaultCard />;
  }
  return new ImageResponse(node, {
    ...SIZE,
    fonts: await fonts(),
    headers: {
      // The image is a pure function of the query string, so it can be cached hard.
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
    },
  });
}

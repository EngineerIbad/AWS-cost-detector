/**
 * Every number the UI shows goes through here, so rounding is the same
 * everywhere: Intl.NumberFormat (en-US, thousands separators), decimal units
 * (1 KB = 1,000 B, 1 GB = 10^9 B, as AWS bills), and one rule for reductions.
 */
const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

const intFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const usdFmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const decFmt = [0, 1, 2].map((d) => new Intl.NumberFormat("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }));

/** Human-readable decimal sizes: "999 B", "1.50 KB", "33.6 KB", "7,200 GB" → "7.20 TB". */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "–";
  if (bytes < 1000) return `${intFmt.format(Math.round(bytes))} B`;
  let i = 0;
  let v = bytes;
  while (v >= 1000 && i < UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  const digits = v >= 100 ? 0 : v >= 10 ? 1 : 2;
  return `${decFmt[digits].format(v)} ${UNITS[i]}`;
}

export function formatNumber(n: number): string {
  return intFmt.format(Math.round(n));
}

/** "$1,234.50". Non-USD currencies render as "1,234.50 EUR". */
export function formatMoney(amount: number, currency = "USD"): string {
  const v = Number.isFinite(amount) ? amount : 0;
  if (currency.toUpperCase() === "USD") return usdFmt.format(v);
  return `${decFmt[2].format(v)} ${currency}`;
}

export function formatPercent(fraction: number): string {
  return `${intFmt.format(Math.round(fraction * 100))}%`;
}

/**
 * The one rounding rule for "how much smaller". Ratio and percent both come
 * from the same pair of byte counts: ratio to 1 decimal below 10x (else whole),
 * percent to a whole number.
 */
export interface Reduction {
  /** baseline / bytes. Infinity if bytes is 0. */
  ratio: number;
  /** 1 − bytes / baseline (negative if larger). */
  fraction: number;
  /** "3.7x" */
  ratioText: string;
  /** "73%" */
  pctText: string;
}

export function sizeReduction(baseline: number, bytes: number): Reduction | null {
  if (!(baseline > 0) || !(bytes >= 0)) return null;
  const ratio = bytes === 0 ? Infinity : baseline / bytes;
  const fraction = 1 - bytes / baseline;
  const ratioText = !Number.isFinite(ratio) ? "∞" : `${decFmt[ratio >= 10 ? 0 : 1].format(ratio)}x`;
  return { ratio, fraction, ratioText, pctText: formatPercent(Math.abs(fraction)) };
}

/** "3.7x smaller, −73%" relative to a baseline. */
export function formatRatio(baseline: number, bytes: number): string {
  const r = sizeReduction(baseline, bytes);
  if (!r) return "";
  if (bytes === baseline) return "same size";
  if (bytes > baseline) return `+${r.pctText} larger`;
  return `${r.ratioText} smaller, −${r.pctText}`;
}

/** Parses "10,000,000" / "10M" / "1.5B" style input into an integer. */
export function parseCount(s: string): number | null {
  const t = s.trim().replace(/[,\s_]/g, "").toUpperCase();
  if (!t) return null;
  const m = /^(\d+(?:\.\d+)?)([KMB])?$/.exec(t);
  if (!m) return null;
  const mult = m[2] === "K" ? 1e3 : m[2] === "M" ? 1e6 : m[2] === "B" ? 1e9 : 1;
  const n = Math.round(parseFloat(m[1]) * mult);
  return Number.isFinite(n) ? n : null;
}

export function compactCount(n: number): string {
  if (n >= 1e9 && n % 1e9 === 0) return `${n / 1e9}B`;
  if (n >= 1e6 && n % 1e6 === 0) return `${n / 1e6}M`;
  if (n >= 1e3 && n % 1e3 === 0) return `${n / 1e3}K`;
  return formatNumber(n);
}

const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

/** Human-readable decimal sizes (1 KB = 1000 B), matching how AWS bills. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "–";
  if (bytes < 1000) return `${Math.round(bytes)} B`;
  let i = 0;
  let v = bytes;
  while (v >= 1000 && i < UNITS.length - 1) {
    v /= 1000;
    i++;
  }
  const digits = v >= 100 ? 0 : v >= 10 ? 1 : 2;
  return `${v.toFixed(digits)} ${UNITS[i]}`;
}

export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** Currency with 2 decimals. Uses the symbol for USD, else "123.45 EUR". */
export function formatMoney(amount: number, currency: string): string {
  const v = Number.isFinite(amount) ? amount : 0;
  const num = v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (currency.toUpperCase() === "USD") return `$${num}`;
  return `${num} ${currency}`;
}

/** "5.2x smaller, −81%" relative to a baseline. */
export function formatRatio(baseline: number, bytes: number): string {
  if (!(baseline > 0) || !(bytes >= 0)) return "";
  if (bytes === baseline) return "same size";
  if (bytes > baseline) {
    const pct = ((bytes - baseline) / baseline) * 100;
    return `+${pct.toFixed(0)}% larger`;
  }
  const ratio = bytes === 0 ? Infinity : baseline / bytes;
  const pct = ((baseline - bytes) / baseline) * 100;
  const r = !Number.isFinite(ratio) ? "∞" : ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1);
  return `${r}x smaller, −${pct.toFixed(0)}%`;
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

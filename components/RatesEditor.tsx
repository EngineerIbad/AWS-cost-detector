"use client";

import { useMemo, useState } from "react";
import {
  defaultRates,
  formatVerifiedDate,
  getModel,
  MAX_TIERS,
  ratesEqual,
  ratesToDraft,
  validateRates,
  type ModelRates,
  type PricingModelId,
  type RatesDraft,
} from "../lib/pricing";

interface Props {
  model: PricingModelId;
  /** Rates currently in effect (custom or default). */
  rates: ModelRates;
  /** Called with valid rates, or null when they match the AWS defaults. */
  onChange: (r: ModelRates | null) => void;
  idPrefix: string;
}

/**
 * Lets a visitor enter new rates if AWS changes prices before the defaults in
 * lib/pricing.ts are updated. Invalid input is flagged and ignored; costs keep
 * using the last valid rates. Mount with `key={model}` so it resets per model.
 */
export default function RatesEditor({ model, rates, onChange, idPrefix }: Props) {
  const m = getModel(model);
  const defaults = useMemo(() => defaultRates(model), [model]);
  const [open, setOpen] = useState(() => !ratesEqual(rates, defaults));
  const [draft, setDraftState] = useState<RatesDraft>(() => ratesToDraft(rates));
  const v = useMemo(() => validateRates(draft), [draft]);
  const custom = v.ok && !ratesEqual(v.rates!, defaults);

  function setDraft(next: RatesDraft) {
    setDraftState(next);
    const res = validateRates(next);
    if (res.ok) onChange(ratesEqual(res.rates!, defaults) ? null : res.rates!);
  }
  const setTier = (i: number, key: "upToGB" | "pricePerGB", value: string) =>
    setDraft({ ...draft, tiers: draft.tiers.map((t, j) => (j === i ? { ...t, [key]: value } : t)) });

  function addTier() {
    const tiers = [...draft.tiers];
    const last = tiers.length - 1;
    const prev = last > 0 ? Number(tiers[last - 1].upToGB.replace(/[,\s_]/g, "")) : 0;
    const limit = Number.isFinite(prev) && prev > 0 ? prev * 2 : 10_000;
    tiers.splice(last, 0, { upToGB: String(limit), pricePerGB: tiers[last].pricePerGB });
    setDraft({ ...draft, tiers });
  }
  function removeTier(i: number) {
    if (draft.tiers.length <= 1) return;
    const tiers = draft.tiers.filter((_, j) => j !== i);
    tiers[tiers.length - 1] = { ...tiers[tiers.length - 1], upToGB: "" };
    setDraft({ ...draft, tiers });
  }
  function reset() {
    setDraftState(ratesToDraft(defaults));
    onChange(null);
  }

  const fromLabel = (i: number) => {
    if (i === 0) return "0";
    const n = Number(draft.tiers[i - 1].upToGB.replace(/[,\s_]/g, ""));
    return draft.tiers[i - 1].upToGB !== "" && Number.isFinite(n) ? n.toLocaleString("en-US") : "–";
  };
  const panelId = `${idPrefix}-rates`;

  return (
    <div className="rates">
      <button type="button" className="disclosure" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="chev">
          <path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Edit rates
        {custom && <span className="badge badge-custom">Custom</span>}
      </button>

      {open && (
        <div id={panelId} className="rates-body">
          <p className="hint">
            Defaults are AWS&apos;s published rates, verified {formatVerifiedDate(m.lastVerified)}. If AWS changes prices, enter the new ones from the{" "}
            <a href={m.source} target="_blank" rel="noopener noreferrer">
              pricing page
            </a>
            . Results will be labelled &quot;custom rates&quot;.
          </p>

          <div className="field rates-free">
            <label htmlFor={`${idPrefix}-free-gb`}>Free allowance (GB/month)</label>
            <input
              id={`${idPrefix}-free-gb`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={draft.freeGB}
              onChange={(e) => setDraft({ ...draft, freeGB: e.target.value })}
              aria-invalid={!!v.freeError}
              aria-describedby={v.freeError ? `${idPrefix}-free-gb-error` : undefined}
            />
            {v.freeError && (
              <p className="field-error" id={`${idPrefix}-free-gb-error`}>
                {v.freeError}
              </p>
            )}
          </div>

          <div className="rates-grid" role="group" aria-label="Paid tiers, cumulative per month">
            <div className="rates-row rates-head" aria-hidden="true">
              <span>Tier ends at (GB)</span>
              <span>Price / GB (USD)</span>
              <span />
            </div>
            {draft.tiers.map((t, i) => {
              const last = i === draft.tiers.length - 1;
              const err = v.tierErrors[i] ?? {};
              return (
                <div className="rates-row" key={i}>
                  <div>
                    {last ? (
                      <span className="rates-inf">No limit</span>
                    ) : (
                      <input
                        id={`${idPrefix}-tier-${i}-limit`}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        value={t.upToGB}
                        onChange={(e) => setTier(i, "upToGB", e.target.value)}
                        aria-label={`Tier ${i + 1}, from ${fromLabel(i)} GB, ends at GB`}
                        aria-invalid={!!err.upToGB}
                      />
                    )}
                    {err.upToGB && <p className="field-error">{err.upToGB}</p>}
                  </div>
                  <div>
                    <input
                      id={`${idPrefix}-tier-${i}-price`}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={t.pricePerGB}
                      onChange={(e) => setTier(i, "pricePerGB", e.target.value)}
                      aria-label={`Tier ${i + 1} price per GB in USD`}
                      aria-invalid={!!err.pricePerGB}
                    />
                    {err.pricePerGB && <p className="field-error">{err.pricePerGB}</p>}
                  </div>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => removeTier(i)}
                    disabled={draft.tiers.length <= 1}
                    aria-label={`Remove tier ${i + 1}`}
                    title="Remove tier"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          {v.formError && <p className="field-error">{v.formError}</p>}
          {!v.ok && <p className="hint">Fix the highlighted fields. Costs use the last valid rates until then.</p>}

          <div className="share-row rates-actions">
            <button type="button" className="btn-ghost" onClick={addTier} disabled={draft.tiers.length >= MAX_TIERS}>
              + Add tier
            </button>
            <button type="button" className="btn-ghost" onClick={reset} disabled={!custom && v.ok}>
              Reset to AWS rates
            </button>
          </div>
          <p className="hint">Tiers are cumulative per month: each GB is billed at the rate of the tier it falls in. 1 GB = 10⁹ bytes.</p>
        </div>
      )}
    </div>
  );
}

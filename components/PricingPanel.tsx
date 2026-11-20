"use client";

import {
  activeRates,
  CLOUDFRONT_NOTE,
  FREE_TIER_HELP,
  formatGB,
  getModel,
  PRICING_MODELS,
  type ModelRates,
  type PricingModelId,
  type PricingOptions,
} from "../lib/pricing";
import RatesEditor from "./RatesEditor";

interface Props {
  /** Current options, including any custom rates for the selected model. */
  pricing: PricingOptions;
  /** Model or free-tier change. Custom rates are kept per model by the parent. */
  onChange: (p: { model: PricingModelId; freeTier: boolean }) => void;
  /** Custom rates for the selected model; null = back to AWS defaults. */
  onRatesChange: (r: ModelRates | null) => void;
  /** Change this to reset the rates editor (e.g. after restoring saved rates). */
  editorKey?: string | number;
  /** Card heading: a numbered step on the calculator, plain on shared pages. */
  step?: number;
  onShare?: () => void;
  shareDisabled?: boolean;
  /** One line under the heading, e.g. "Adjust the estimate — updates instantly." */
  intro?: string;
  children?: React.ReactNode;
}

const MODEL_IDS = Object.keys(PRICING_MODELS) as PricingModelId[];

export default function PricingPanel({ pricing, onChange, onRatesChange, editorKey, step, onShare, shareDisabled, intro, children }: Props) {
  const model = getModel(pricing.model);
  const idPrefix = step ? "calc" : "shared";
  return (
    <div className="card">
      <h2 className="step">
        {step ? (
          <span className="step-num" aria-hidden="true">
            {step}
          </span>
        ) : null}{" "}
        Pricing
      </h2>
      {intro && <p className="step-intro">{intro}</p>}

      <fieldset className="choice-group">
        <legend>How is this served?</legend>
        {MODEL_IDS.map((id) => (
          <label key={id} className="choice">
            <input
              type="radio"
              name={`${idPrefix}-model`}
              value={id}
              checked={pricing.model === id}
              onChange={() => onChange({ model: id, freeTier: pricing.freeTier })}
              aria-describedby={`${idPrefix}-model-note`}
            />
            <span>{PRICING_MODELS[id].label}</span>
          </label>
        ))}
      </fieldset>
      <p className="hint" id={`${idPrefix}-model-note`}>
        {pricing.model === "cloudfront" ? CLOUDFRONT_NOTE : `Tiered ${model.scope}.`}
      </p>

      <label className="switch free-switch">
        <input
          type="checkbox"
          role="switch"
          checked={pricing.freeTier}
          onChange={(e) => onChange({ model: pricing.model, freeTier: e.target.checked })}
          aria-describedby={`${idPrefix}-free-help`}
        />
        <span className="switch-track" aria-hidden="true">
          <span className="switch-thumb" />
        </span>
        <span className="switch-label">Apply {formatGB(activeRates(pricing).freeGB)} free tier</span>
      </label>
      <p className="hint" id={`${idPrefix}-free-help`}>
        {FREE_TIER_HELP}
      </p>

      <RatesEditor key={`${pricing.model}-${editorKey ?? ""}`}model={pricing.model} rates={activeRates(pricing)} onChange={onRatesChange} idPrefix={idPrefix} />

      {children}

      {onShare && (
        <div className="share-row">
          <button type="button" className="btn-ghost" onClick={onShare} disabled={shareDisabled}>
            Share this setup
          </button>
        </div>
      )}
    </div>
  );
}

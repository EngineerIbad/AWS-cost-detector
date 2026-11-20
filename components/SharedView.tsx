"use client";

import { useMemo, useState } from "react";
import { DEFAULT_CLIENT_MIX, type ClientMix } from "../lib/estimate";
import { formatBytes, formatNumber } from "../lib/format";
import type { ModelRates, PricingModelId, PricingOptions } from "../lib/pricing";
import { resultFromShare, shareMonthlyRequests, type ShareState } from "../lib/share";
import PricingPanel from "./PricingPanel";
import Results from "./Results";
import SiteFooter from "./SiteFooter";
import ToastHost from "./Toast";

/**
 * Read-only results rebuilt from a share link. No request is re-run: the
 * numbers come from the sizes in the URL. Pricing toggles only change this
 * viewer's view and are never saved.
 */
export default function SharedView({ state }: { state: ShareState }) {
  const [base, setBase] = useState<Pick<PricingOptions, "model" | "freeTier">>({ model: state.pricing.model, freeTier: state.pricing.freeTier });
  const [customRates, setCustomRates] = useState<Partial<Record<PricingModelId, ModelRates>>>(() =>
    state.pricing.custom ? { [state.pricing.model]: state.pricing.custom } : {},
  );
  const pricing: PricingOptions = { ...base, custom: customRates[base.model] ?? null };
  const [mix, setMix] = useState<ClientMix>(DEFAULT_CLIENT_MIX);
  const result = useMemo(() => resultFromShare(state), [state]);
  const requests = shareMonthlyRequests(state);
  const paging = state.paging ? { sessions: state.paging.sessions, pagesPerSession: state.paging.pagesPerSession } : null;

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">API Egress Cost Calculator</p>
        <h1>How much does your API response really cost?</h1>
        <p className="subtitle">Paste an endpoint, see your AWS data transfer bill, and what compression would save.</p>
      </header>

      <div className="shared-banner" role="note">
        <p>
          <strong>Shared result:</strong> sizes were measured by the person who shared this.
        </p>
        <a href="/" className="btn-primary btn-compact">
          Test your own endpoint
        </a>
      </div>

      <main className="layout">
        <section className="inputs" aria-label="Shared setup">
          <div className="card">
            <h2 className="step">Shared setup</h2>
            <dl className="assume-list">
              <div>
                <dt>{state.paging ? "Average page" : "Response"}</dt>
                <dd>
                  {formatBytes(state.sizes.raw)} uncompressed, {formatBytes(state.sizes.wire)} as served
                  {state.contentType !== "other" ? ` (${state.contentType})` : ""}
                </dd>
              </div>
              <div>
                <dt>Traffic</dt>
                <dd>
                  {state.paging
                    ? `${formatNumber(state.paging.sessions)} sessions/month × ${state.paging.pagesPerSession} pages per session = ${formatNumber(requests)} requests/month`
                    : `${formatNumber(requests)} requests/month`}
                </dd>
              </div>
              {state.paging && (
                <div>
                  <dt>Pages sampled</dt>
                  <dd>{state.paging.sampledPages}</dd>
                </div>
              )}
            </dl>
            <p className="hint">The link contains only these sizes and settings. It never includes the endpoint, headers, tokens or the response itself.</p>
          </div>

          <PricingPanel
            pricing={pricing}
            onChange={setBase}
            onRatesChange={(r) => setCustomRates((m) => ({ ...m, [base.model]: r ?? undefined }))}
          >
            <p className="hint">Changing these only affects your view of this shared result.</p>
          </PricingPanel>
        </section>

        <section className="results" aria-label="Results">
          <Results result={result} label="Shared result" requests={requests} paging={paging} pricing={pricing} mix={mix} onMixChange={setMix} />
        </section>
      </main>

      <SiteFooter />
      <ToastHost />
    </div>
  );
}

import { activeRates, formatGB, formatVerifiedDate, getModel, isCustom, tierRows, type PricingOptions } from "../lib/pricing";

/** Read-only view of exactly what the numbers above were calculated with. */
export default function AssumptionsPanel({ pricing, paged }: { pricing: PricingOptions; paged: boolean }) {
  const model = getModel(pricing.model);
  const custom = isCustom(pricing);
  const { rows, free } = tierRows(pricing);
  const verified = formatVerifiedDate(model.lastVerified);
  const freeGB = activeRates(pricing).freeGB;
  return (
    <div className="card assumptions">
      <div className="pricing-head">
        <h3 className="card-title">Pricing assumptions</h3>
        <span className={`badge ${custom ? "badge-custom" : "badge-verified"}`}>
          {model.shortLabel}
          {custom ? " · custom rates" : ""}
        </span>
      </div>
      {custom && (
        <p className="notice">
          These results use <strong>custom rates</strong> entered in Edit rates, not AWS&apos;s published defaults.
        </p>
      )}
      <p className="hint">{model.scope}. Tiered per month: each GB is billed at the rate of the tier it falls in.</p>

      <table className="assume-table">
        <caption className="sr-only">Active pricing tiers</caption>
        <thead>
          <tr>
            <th scope="col">Monthly egress</th>
            <th scope="col" className="num">
              Price / GB
            </th>
          </tr>
        </thead>
        <tbody>
          {free && (
            <tr>
              <td>{free.range}</td>
              <td className="num">Free</td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.range}>
              <td>{r.range}</td>
              <td className="num">${r.pricePerGB.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="assume-list">
        <div>
          <dt>Free tier</dt>
          <dd>
            {!pricing.freeTier
              ? "Not applied. Every GB is billed."
              : custom
                ? `Applied: first ${formatGB(freeGB)}/month free (custom).`
                : `Applied. ${model.freeNote}`}
          </dd>
        </div>
        <div>
          <dt>Formula</dt>
          <dd>
            {paged ? "Monthly egress = average page size × sessions × pages per session" : "Monthly egress = response size × monthly requests"}{" "}
            <span className="hint-inline">(1 GB = 10⁹ bytes; headers and TLS overhead not counted)</span>
          </dd>
        </div>
      </dl>
      <p className="hint">
        {custom ? "AWS default rates last verified" : "Pricing last verified"}: {verified} ·{" "}
        <a href={model.source} target="_blank" rel="noopener noreferrer">
          AWS pricing page
        </a>
        . Estimates only, not a quote. Not affiliated with Amazon Web Services.
      </p>
    </div>
  );
}

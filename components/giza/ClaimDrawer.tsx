import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { getClaim, getSourcesForClaim } from "@/lib/content";

export function ClaimDrawer({ claimId, label = "Inspect the evidence" }: { claimId: string; label?: string }) {
  const claim = getClaim(claimId);
  const sources = getSourcesForClaim(claim);

  return (
    <details className="giza-claim-drawer">
      <summary>
        <span>{label}</span>
        <i aria-hidden="true">+</i>
      </summary>
      <div className="giza-claim-drawer-body">
        <div className="giza-claim-drawer-meta">
          <EvidenceBadge status={claim.status} />
          <time dateTime={claim.reviewedOn}>Reviewed {claim.reviewedOn} · v{claim.version}</time>
        </div>
        <h4>{claim.title}</h4>
        <p>{claim.statement}</p>
        <div className="giza-claim-drawer-grid">
          <div><span>Interpretation</span><p>{claim.interpretation}</p></div>
          <div><span>What this does not prove</span><p>{claim.doesNotProve}</p></div>
        </div>
        <div className="giza-claim-drawer-sources">
          <span>{sources.length} source{sources.length === 1 ? "" : "s"}</span>
          {sources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
              <strong>{source.title}</strong>
              <small>{source.publisher} · {source.publishedYear ?? "Live resource"}</small>
            </a>
          ))}
        </div>
      </div>
    </details>
  );
}

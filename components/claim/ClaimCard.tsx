import { EvidenceBadge } from "./EvidenceBadge";
import { SourceList } from "@/components/source/SourceList";
import type { Claim } from "@/types/content";

export function ClaimCard({ claim, compact = false }: { claim: Claim; compact?: boolean }) {
  return (
    <article className={`claim-card${compact ? " claim-card-compact" : ""}`} id={claim.id}>
      <div className="claim-topline">
        <EvidenceBadge status={claim.status} />
        <time dateTime={claim.reviewedOn}>Reviewed {claim.reviewedOn} · v{claim.version} · {claim.editorialState}</time>
      </div>
      <h3>{claim.title}</h3>
      <p className="claim-statement">{claim.statement}</p>
      {!compact && (
        <div className="claim-interpretation">
          <div><span>Interpretation</span><p>{claim.interpretation}</p></div>
          <div><span>What this does not prove</span><p>{claim.doesNotProve}</p></div>
        </div>
      )}
      <SourceList claim={claim} />
    </article>
  );
}

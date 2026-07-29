import Link from "next/link";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import type { DiscoveryDispatch } from "@/types/dispatch";

export function DispatchCard({ dispatch, featured = false }: { dispatch: DiscoveryDispatch; featured?: boolean }) {
  return (
    <article className={`dispatch-card ${featured ? "dispatch-card-featured" : ""}`}>
      <div className="dispatch-card-meta">
        <EvidenceBadge status={dispatch.evidenceStatus} />
        <span>Research published {dispatch.sourceYear}</span>
        <span>{dispatch.readTime}</span>
      </div>
      <h2>{dispatch.title}</h2>
      <p>{dispatch.dek}</p>
      <div className="dispatch-card-question"><span>What remains open</span><p>{dispatch.openQuestion}</p></div>
      <Link href={`/dispatches/${dispatch.slug}/`}>Read the dispatch →</Link>
    </article>
  );
}

import { getSourcesForClaim } from "@/lib/content";
import type { Claim } from "@/types/content";

export function SourceList({ claim }: { claim: Claim }) {
  const claimSources = getSourcesForClaim(claim);
  return (
    <details className="source-list">
      <summary>{claimSources.length} source{claimSources.length === 1 ? "" : "s"}</summary>
      <div className="source-list-body">
        {claimSources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
            <span>{source.publisher} · {source.publishedYear ?? "Live resource"}</span>
            <strong>{source.title}</strong>
            <small>{source.note}</small>
            <small>Accessed {source.accessedOn} · {source.kind.replaceAll("-", " ")}</small>
          </a>
        ))}
      </div>
    </details>
  );
}

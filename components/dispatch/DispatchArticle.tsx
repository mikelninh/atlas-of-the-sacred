import Link from "next/link";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimCard } from "@/components/claim/ClaimCard";
import { getDispatchClaims, getDispatchSources } from "@/lib/dispatches";
import type { DiscoveryDispatch } from "@/types/dispatch";

export function DispatchArticle({ dispatch }: { dispatch: DiscoveryDispatch }) {
  const claims = getDispatchClaims(dispatch);
  const sources = getDispatchSources(dispatch);

  return (
    <article className="dispatch-article">
      <header className="dispatch-article-hero">
        <div className="dispatch-article-meta">
          <EvidenceBadge status={dispatch.evidenceStatus} />
          <span>Research published {dispatch.sourceYear}</span>
          <span>Atlas dispatch · {dispatch.atlasPublishedOn}</span>
          <span>{dispatch.readTime}</span>
        </div>
        <h1>{dispatch.title}</h1>
        <p>{dispatch.dek}</p>
        <div className="dispatch-article-rule"><span>The dispatch rule</span><strong>Update the map of knowledge without filling its blank spaces with spectacle.</strong></div>
      </header>

      <div className="dispatch-article-body">
        <section>
          <p className="eyebrow">What changed</p>
          <h2>A meaningful update to the evidence</h2>
          <p>{dispatch.whatChanged}</p>
        </section>
        <section>
          <p className="eyebrow">Why it matters</p>
          <h2>The larger story shifts</h2>
          <p>{dispatch.whyItMatters}</p>
        </section>

        <div className="dispatch-two-column">
          <section className="dispatch-supports">
            <p className="eyebrow">The evidence supports</p>
            <ol>{dispatch.evidenceSupports.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>
          <section className="dispatch-overreach">
            <p className="eyebrow">Headlines overreach when</p>
            <ol>{dispatch.headlinesOverreach.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>
        </div>

        <section className="dispatch-open-question">
          <span>Still open</span>
          <blockquote>{dispatch.openQuestion}</blockquote>
        </section>

        <section className="dispatch-affected-claims">
          <div><p className="eyebrow">Atlas impact</p><h2>Claims touched by this research</h2><p>A dispatch never silently rewrites the Atlas. It identifies the claims that should be reviewed, strengthened, narrowed or left unchanged.</p></div>
          <div className="registry-grid registry-grid-single">{claims.map((claim) => <ClaimCard claim={claim} compact key={claim.id} />)}</div>
        </section>

        <section className="dispatch-source-dossier">
          <p className="eyebrow">Source dossier</p>
          <h2>Read beyond the dispatch</h2>
          <div>
            {sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                <span>{source.publisher} · {source.publishedYear ?? "Live resource"}</span>
                <strong>{source.title}</strong>
                <p>{source.note}</p>
                <small>{source.kind.replaceAll("-", " ")} · accessed {source.accessedOn}</small>
              </a>
            ))}
          </div>
        </section>

        <div className="dispatch-article-actions">
          <Link className="button button-primary" href="/dispatches/">Return to all dispatches</Link>
          <Link className="button button-ghost" href="/editorial/">Inspect the editorial system</Link>
        </div>
      </div>
    </article>
  );
}

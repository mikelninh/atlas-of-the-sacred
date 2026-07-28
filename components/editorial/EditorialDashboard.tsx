import { claims } from "@/content/claims";
import { reviews } from "@/content/reviews";
import { revisions } from "@/content/revisions";
import { sources } from "@/content/sources";
import { editorialReadiness, getLatestReview, isReviewDue } from "@/lib/editorial";

const readinessLabel = {
  ready: "Ready",
  "needs-review": "Needs review",
  "review-due": "Review due",
  "needs-revision": "Needs revision",
  blocked: "Blocked"
} as const;

export function EditorialDashboard() {
  const claimList = Object.values(claims);
  const sourceList = Object.values(sources);
  const queue = claimList
    .map((claim) => ({
      claim,
      readiness: editorialReadiness(claim, reviews),
      latestReview: getLatestReview(claim.id, reviews)
    }))
    .sort((a, b) => {
      const rank = { blocked: 0, "needs-revision": 1, "needs-review": 2, "review-due": 3, ready: 4 };
      return rank[a.readiness] - rank[b.readiness];
    });

  const stats = {
    claims: claimList.length,
    sources: sourceList.length,
    reviewed: new Set(reviews.map((review) => review.claimId)).size,
    due: claimList.filter(isReviewDue).length,
    revisions: revisions.length
  };

  return (
    <div className="editorial-dashboard">
      <section className="editorial-metrics" aria-label="Editorial metrics">
        <article><strong>{stats.claims}</strong><span>Traceable claims</span></article>
        <article><strong>{stats.sources}</strong><span>Registered sources</span></article>
        <article><strong>{stats.reviewed}</strong><span>Independently reviewed</span></article>
        <article><strong>{stats.due}</strong><span>Review due</span></article>
        <article><strong>{stats.revisions}</strong><span>Recorded revisions</span></article>
      </section>

      <section className="editorial-panel">
        <div className="editorial-panel-heading">
          <div><p className="eyebrow">Publication gate</p><h2>Claim review queue</h2></div>
          <p>A claim is publishable only when it has sources, explicit limits, a current review and no unresolved changes request.</p>
        </div>
        <div className="editorial-table-wrap">
          <table className="editorial-table">
            <thead><tr><th>Claim</th><th>Evidence</th><th>State</th><th>Review</th><th>Next action</th></tr></thead>
            <tbody>
              {queue.map(({ claim, readiness, latestReview }) => (
                <tr key={claim.id}>
                  <td><a href={`/sites/giza/#${claim.id}`}>{claim.title}</a><small>{claim.id} · v{claim.version}</small></td>
                  <td><span className={`evidence-dot evidence-${claim.status}`}/>{claim.status.replace("-", " ")}</td>
                  <td>{claim.editorialState}</td>
                  <td>{latestReview ? <>{latestReview.decision}<small>{latestReview.reviewedOn}</small></> : "—"}</td>
                  <td><span className={`readiness readiness-${readiness}`}>{readinessLabel[readiness]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="editorial-two-column">
        <article className="editorial-panel compact-panel">
          <p className="eyebrow">Revision integrity</p>
          <h2>Nothing silently changes</h2>
          <p>Material edits create a new version and preserve the previous statement, evidence status and rationale.</p>
          <ol className="revision-list">
            {revisions.map((revision) => <li key={revision.id}><strong>{revision.claimId} · v{revision.version}</strong><span>{revision.summary}</span><time>{revision.changedOn}</time></li>)}
          </ol>
        </article>
        <article className="editorial-panel compact-panel">
          <p className="eyebrow">Source health</p>
          <h2>Evidence can decay</h2>
          <p>The scheduled source-health workflow checks redirects, broken links and access failures without treating temporary blocks as historical refutations.</p>
          <div className="source-health-summary"><strong>{sourceList.length}</strong><span>sources waiting for the first automated health run</span></div>
          <code>npm run check:sources</code>
        </article>
      </section>
    </div>
  );
}

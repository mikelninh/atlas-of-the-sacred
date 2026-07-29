import type { Metadata } from "next";
import { DispatchCard } from "@/components/dispatch/DispatchCard";
import { getPublishedDispatches } from "@/lib/dispatches";

export const metadata: Metadata = {
  title: "Dispatches from Deep Time",
  description: "Evidence-led updates on discoveries that change, strengthen or complicate the Atlas of the Sacred.",
};

export default function DispatchesPage() {
  const dispatches = getPublishedDispatches();
  const [featured, ...rest] = dispatches;

  return (
    <>
      <header className="dispatch-feed-hero">
        <div>
          <p className="eyebrow">A living discovery feed</p>
          <h1>Dispatches from Deep Time</h1>
          <p>What changed. What the evidence supports. What the headlines exaggerate. Which Atlas claims must now be reconsidered.</p>
        </div>
        <div className="dispatch-feed-covenant">
          <span>Our promise</span>
          <strong>Fast enough to stay alive. Slow enough to remain trustworthy.</strong>
          <p>Dispatches are research updates, not final verdicts. Every one links back to registered claims and sources.</p>
        </div>
      </header>

      <main className="dispatch-feed">
        {featured ? <DispatchCard dispatch={featured} featured /> : null}
        <section className="dispatch-feed-grid" aria-label="All research dispatches">
          {rest.map((dispatch) => <DispatchCard dispatch={dispatch} key={dispatch.id} />)}
        </section>
        <section className="dispatch-method">
          <p className="eyebrow">How a dispatch earns publication</p>
          <div>
            <article><span>01</span><h2>Find the primary signal</h2><p>Begin with the paper, official record or field archive—not a recycled headline.</p></article>
            <article><span>02</span><h2>Map the claim impact</h2><p>Name which Atlas claims become stronger, weaker, narrower or newly reviewable.</p></article>
            <article><span>03</span><h2>Publish the boundary</h2><p>State what the research does not demonstrate before speculation fills the space.</p></article>
            <article><span>04</span><h2>Keep the question open</h2><p>End with the next discriminating question rather than a manufactured revelation.</p></article>
          </div>
        </section>
      </main>
    </>
  );
}

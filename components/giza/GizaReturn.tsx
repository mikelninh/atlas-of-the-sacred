import Link from "next/link";

export function GizaReturn() {
  return (
    <section className="giza-return" id="return">
      <p className="eyebrow">Return to the present</p>
      <blockquote>What are we building now that deserves to outlive us?</blockquote>
      <p>
        Giza is not powerful because it gives us one secret answer. It is powerful because it reveals what becomes
        possible when a society aligns material, organisation, imagination and time around what it considers eternal.
      </p>
      <div className="giza-return-actions">
        <Link className="button button-primary" href="/journeys/common-thread/">Continue the Common Thread</Link>
        <a className="button button-ghost" href="#evidence">Inspect every claim</a>
      </div>
      <div className="giza-share-thesis">
        <span>The thesis to carry outward</span>
        <strong>Monuments preserve values as much as they preserve stone.</strong>
      </div>
    </section>
  );
}

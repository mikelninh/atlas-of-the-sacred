import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { getClaim } from "@/lib/content";

const chapters = [
  { id: "construction", number: "01", title: "Build", question: "What kind of society can organise a mountain?", claimId: "giza-construction-method-open" },
  { id: "nile-landscape", number: "02", title: "Landscape", question: "What changes when the desert becomes a river world?", claimId: "giza-ahramat-branch" },
  { id: "royal-complex", number: "03", title: "Approach", question: "How did movement turn architecture into ritual?", claimId: "giza-royal-complex" },
  { id: "alignment", number: "04", title: "Orient", question: "How do you make north endure in stone?", claimId: "giza-cardinal-alignment" },
  { id: "interior", number: "05", title: "Enter", question: "What do we do when discovery outruns explanation?", claimId: "giza-void-purpose" },
] as const;

const scaleClaims = [
  { claimId: "giza-scale-materials", value: "146.5 m", label: "original height" },
  { claimId: "giza-big-void", value: "≥30 m", label: "detected Big Void length" },
  { claimId: "giza-north-face-corridor", value: "≈9 m", label: "North Face Corridor length" },
] as const;

export function GizaExpeditionIntro() {
  return (
    <section className="giza-expedition" id="expedition">
      <div className="giza-expedition-copy">
        <div>
          <p className="eyebrow">Giza V2.1 · flagship expedition</p>
          <h2>A mountain built from systems.</h2>
          <p>
            The pyramid is the visible summit. Beneath it sits a network of stone, water, food, labour,
            surveying, ritual movement and questions that remain genuinely open.
          </p>
        </div>
        <div className="giza-evidence-rule">
          <span>How to read this portal</span>
          <strong>Document what is known. Visualise what is plausible. Leave the unresolved unresolved.</strong>
        </div>
      </div>

      <div className="giza-scale-grid" aria-label="Scale anchors from published claims">
        {scaleClaims.map((item) => {
          const claim = getClaim(item.claimId);
          return (
            <article key={item.claimId}>
              <EvidenceBadge status={claim.status} />
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{claim.title}</small>
            </article>
          );
        })}
      </div>

      <div className="giza-scale-tableau" aria-label="Relative scale view of the Great Pyramid and detected spaces">
        <div className="giza-scale-tableau-copy">
          <span>Read the monument vertically</span>
          <strong>The detected spaces are large. The monument around them is larger still.</strong>
          <p>Relative visual using the published dimensions above. The human figure is illustrative.</p>
        </div>
        <div className="giza-scale-tableau-visual" aria-hidden="true">
          <div className="scale-pyramid"><span>146.5 m</span></div>
          <div className="scale-big-void"><span>≥30 m</span></div>
          <div className="scale-corridor"><span>≈9 m</span></div>
          <div className="scale-human"><i /><span>you</span></div>
        </div>
      </div>

      <nav className="giza-expedition-rail" aria-label="Giza expedition chapters">
        {chapters.map((chapter) => {
          const claim = getClaim(chapter.claimId);
          return (
            <a href={`#${chapter.id}`} key={chapter.id}>
              <span>{chapter.number}</span>
              <div>
                <strong>{chapter.title}</strong>
                <small>{chapter.question}</small>
              </div>
              <EvidenceBadge status={claim.status} />
            </a>
          );
        })}
      </nav>
    </section>
  );
}

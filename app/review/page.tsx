import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founding Review Circle",
  description: "A public invitation for specialists to challenge the claims, boundaries and cultural framing of Atlas of the Sacred.",
};

const roles = [
  {
    title: "Egyptology and Giza archaeology",
    question: "Do our claims, terminology and uncertainty boundaries reflect the archaeological record?",
    packet: "Giza identity, royal complex, landscape, alignment and detected-space claims.",
  },
  {
    title: "Construction and structural reasoning",
    question: "Does the systems language clarify what is documented without implying an unsupported building sequence?",
    packet: "Quarrying, transport, workforce, scale, load-space and construction-method boundaries.",
  },
  {
    title: "Religion, ritual and comparative interpretation",
    question: "Does the Common Thread recognise recurring questions without erasing cultural difference?",
    packet: "Seven threshold interpretations, cultural-boundary statements and return practices.",
  },
  {
    title: "Egyptian heritage and public education",
    question: "Does the experience respect living context, local authority and the difference between access and ownership?",
    packet: "Giza presentation, image framing, public-language choices and visitor takeaways.",
  },
] as const;

const principles = [
  ["Challenge, not endorsement", "We are asking reviewers to find errors, overreach and missing perspectives—not to lend their name to marketing."],
  ["Bounded packets", "Each review has a defined claim set, question and expected effort. We do not send an entire platform and ask for vague approval."],
  ["Visible disagreement", "Accepted, rejected and unresolved feedback is logged with a rationale. Silence is never presented as consensus."],
  ["Consent and attribution", "Public naming, biography, quotation and institutional affiliation require explicit permission. Anonymous review remains possible."],
  ["Conflicts disclosed", "Reviewers state relevant employment, funding, authorship or personal involvement. A conflict does not automatically invalidate expertise."],
  ["Terms agreed first", "Scope, timing, attribution and compensation—where applicable—are agreed before substantive review begins."],
] as const;

export default function ReviewPage() {
  return (
    <>
      <header className="review-circle-hero">
        <div>
          <p className="eyebrow">Founding Review Circle</p>
          <h1>Help us find where the Atlas is wrong.</h1>
          <p>Atlas of the Sacred is building beautiful public experiences around ancient architecture. Beauty can make weak claims feel stronger than they are. We need specialists willing to challenge the evidence, interpretation and cultural framing before the platform grows.</p>
        </div>
        <div className="review-circle-status">
          <span>Current public status</span>
          <strong>0 external specialist reviews</strong>
          <p>Four claims have passed internal editorial checks. None has yet received independent specialist endorsement.</p>
          <Link className="button button-primary" href="https://github.com/mikelninh/atlas-of-the-sacred/issues/new?template=founding-reviewer.yml">Express review interest</Link>
        </div>
      </header>

      <main className="review-circle">
        <section className="review-circle-intro">
          <div><p className="eyebrow">The first four seats</p><h2>Different expertise. Different authority.</h2></div>
          <p>No single reviewer can certify archaeology, engineering, religion, digital interpretation and local heritage context at once. The founding circle is deliberately plural.</p>
        </section>

        <section className="review-role-grid">
          {roles.map((role, index) => (
            <article key={role.title}>
              <span>0{index + 1}</span>
              <h2>{role.title}</h2>
              <blockquote>{role.question}</blockquote>
              <p>{role.packet}</p>
            </article>
          ))}
        </section>

        <section className="review-process">
          <div className="review-process-heading"><p className="eyebrow">A review is a traceable event</p><h2>From invitation to correction</h2></div>
          <ol>
            <li><span>01</span><div><strong>Agree the packet</strong><p>Define the claims, framing questions, expected effort, attribution and conflict statement.</p></div></li>
            <li><span>02</span><div><strong>Review the evidence trail</strong><p>Inspect claim wording, source choice, status, interpretation and explicit non-proof boundary.</p></div></li>
            <li><span>03</span><div><strong>Record a decision</strong><p>Approve, approve with notes, request changes or reject—without forcing false consensus.</p></div></li>
            <li><span>04</span><div><strong>Publish the response</strong><p>Log what changed, what did not change and why. Reviewer identity appears only with permission.</p></div></li>
            <li><span>05</span><div><strong>Re-review material revisions</strong><p>A past review does not automatically endorse a substantially changed claim or experience.</p></div></li>
          </ol>
        </section>

        <section className="review-principles">
          <div><p className="eyebrow">The review covenant</p><h2>Expertise without theatre.</h2></div>
          <div>
            {principles.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="review-first-packet">
          <div>
            <p className="eyebrow">Founding packet 001</p>
            <h2>Giza: evidence, systems and honest mystery</h2>
            <p>The first packet asks reviewers to examine the most load-bearing Giza claims and the interfaces that translate them for the public.</p>
          </div>
          <div className="review-packet-questions">
            <article><span>Claim language</span><strong>What is inaccurate, too broad or missing necessary qualification?</strong></article>
            <article><span>Evidence status</span><strong>Which claims should be established, probable, contested or open mystery?</strong></article>
            <article><span>Interface inference</span><strong>Could any diagram or interaction make visitors infer more than the evidence permits?</strong></article>
            <article><span>Cultural framing</span><strong>Where does our language centre modern fascination over Egyptian historical context?</strong></article>
          </div>
        </section>

        <section className="review-circle-cta">
          <p className="eyebrow">Join by disagreement</p>
          <h2>The best founding reviewer is not the person most impressed by the project.</h2>
          <p>It is the person willing to tell us precisely where beauty, interpretation or enthusiasm has outrun the record.</p>
          <div>
            <Link className="button button-primary" href="https://github.com/mikelninh/atlas-of-the-sacred/issues/new?template=founding-reviewer.yml">Express review interest</Link>
            <Link className="button button-ghost" href="/editorial/">Inspect the evidence system</Link>
          </div>
        </section>
      </main>
    </>
  );
}

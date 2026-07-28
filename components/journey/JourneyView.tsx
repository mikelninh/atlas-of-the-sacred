"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { claims } from "@/content/claims";
import type { Claim, Journey } from "@/types/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimCard } from "@/components/claim/ClaimCard";

export function JourneyView({ journey }: { journey: Journey }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const active = journey.steps[activeIndex];
  const activeClaims = useMemo(() => active.claimIds.map((id) => claims[id as keyof typeof claims] as Claim), [active]);
  const progress = ((activeIndex + 1) / journey.steps.length) * 100;

  const move = (next: number) => {
    setActiveIndex(Math.max(0, Math.min(journey.steps.length - 1, next)));
    setEvidenceOpen(false);
    document.getElementById("journey-experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="journey-experience" id="journey-experience">
      <div className="journey-progress" aria-label={`Step ${activeIndex + 1} of ${journey.steps.length}`}><span style={{ width: `${progress}%` }} /></div>
      <aside className="journey-rail" aria-label="Journey thresholds">
        {journey.steps.map((step, index) => (
          <button className={index === activeIndex ? "active" : ""} key={step.id} onClick={() => move(index)} aria-label={`Open ${step.title}`}>
            <span>{String(index + 1).padStart(2, "0")}</span><i />
          </button>
        ))}
      </aside>

      <div className="journey-stage">
        <div className="journey-image" style={{ backgroundImage: `url("${active.image}")` }} role="img" aria-label={active.imageAlt}>
          <div className="journey-image-shade" />
          <div className="journey-location"><span>{active.siteName}</span><small>{active.locationLabel}</small></div>
          <div className="journey-image-label">{active.imageLabel}</div>
          <div className="journey-voice">“{active.voice}”</div>
        </div>

        <article className="journey-copy">
          <div className="journey-copy-top"><p className="eyebrow">{active.eyebrow}</p><span>{activeIndex + 1} / {journey.steps.length}</span></div>
          <h2>{active.title}</h2>
          <p className="journey-insight">{active.humanInsight}</p>

          <div className="journey-fact">
            <div><EvidenceBadge status={activeClaims[0].status} /><span>What the evidence supports</span></div>
            <p>{activeClaims[0].statement}</p>
          </div>

          <button className="evidence-toggle" onClick={() => setEvidenceOpen((open) => !open)} aria-expanded={evidenceOpen}>
            {evidenceOpen ? "Close the evidence" : `Inspect ${activeClaims.length} traceable claim${activeClaims.length > 1 ? "s" : ""}`} <span>{evidenceOpen ? "−" : "+"}</span>
          </button>
          {evidenceOpen && <div className="journey-evidence">{activeClaims.map((claim) => <ClaimCard claim={claim} compact key={claim.id} />)}</div>}

          <blockquote>{active.reflection}</blockquote>
          <div className="journey-controls">
            <button onClick={() => move(activeIndex - 1)} disabled={activeIndex === 0}>← Previous</button>
            <Link href={`/sites/${active.siteId}/`}>Enter site note ↗</Link>
            {activeIndex < journey.steps.length - 1 ? <button onClick={() => move(activeIndex + 1)}>Next threshold →</button> : <a href="#journey-return">Return to the present →</a>}
          </div>
        </article>
      </div>

      <section className="journey-return" id="journey-return">
        <p className="eyebrow">The eighth threshold · Us</p>
        <h2>{journey.closingTitle}</h2>
        <p>{journey.closingText}</p>
        <blockquote>{journey.closingPrompt}</blockquote>
        <div><Link className="button button-primary" href="/sites/giza/">Enter the deep Giza portal</Link><button className="button button-ghost" onClick={() => move(0)}>Walk the journey again</button></div>
      </section>
    </section>
  );
}

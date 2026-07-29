"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { claims } from "@/content/claims";
import type { Claim, Journey } from "@/types/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimCard } from "@/components/claim/ClaimCard";
import { JourneyGesture } from "@/components/journey/JourneyGesture";

const doorways = [
  {
    id: "remember",
    title: "Remember",
    question: "What must not disappear?",
    practice: "Choose one fact, story or place from the journey and preserve it with its source and limits intact.",
  },
  {
    id: "cooperate",
    title: "Cooperate",
    question: "What deserves a shared centre?",
    practice: "Invite one other person into a question that cannot be carried well alone.",
  },
  {
    id: "heal",
    title: "Heal",
    question: "What relationship needs repair?",
    practice: "Notice where your built environment separates life, care and belonging—and make one small reconnection.",
  },
  {
    id: "awaken",
    title: "Awaken",
    question: "What have you stopped seeing?",
    practice: "Return to an ordinary place with ceremonial attention: light, sound, movement, material and the lives around it.",
  },
] as const;

export function JourneyView({ journey }: { journey: Journey }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [doorwayId, setDoorwayId] = useState<(typeof doorways)[number]["id"]>("remember");
  const active = journey.steps[activeIndex];
  const activeClaims = useMemo(() => active.claimIds.map((id) => claims[id as keyof typeof claims] as Claim), [active]);
  const progress = ((activeIndex + 1) / journey.steps.length) * 100;
  const doorway = doorways.find((item) => item.id === doorwayId) ?? doorways[0];

  const move = (next: number) => {
    const bounded = Math.max(0, Math.min(journey.steps.length - 1, next));
    setActiveIndex(bounded);
    setEvidenceOpen(false);
    const nextStep = journey.steps[bounded];
    window.history.replaceState(null, "", `#${nextStep.id}`);
    document.getElementById("journey-experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const initialIndex = journey.steps.findIndex((step) => step.id === hash);
    if (initialIndex >= 0) setActiveIndex(initialIndex);
  }, [journey.steps]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, button, a, summary, textarea, select")) return;
      if (event.key === "ArrowRight") move(activeIndex + 1);
      if (event.key === "ArrowLeft") move(activeIndex - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const markComplete = () => {
    setCompletedSteps((current) => current.includes(active.id) ? current : [...current, active.id]);
  };

  return (
    <section className={`journey-experience journey-v2 theme-${active.id}`} id="journey-experience">
      <div className="journey-progress journey-progress-v2" aria-label={`Threshold ${activeIndex + 1} of ${journey.steps.length}`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <nav className="journey-constellation" aria-label="The seven thresholds">
        {journey.steps.map((step, index) => (
          <button
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "step" : undefined}
            onClick={() => move(index)}
            key={step.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{step.title.replace("We ", "")}</strong><small>{step.siteName}</small></div>
            <i className={completedSteps.includes(step.id) ? "complete" : ""} aria-label={completedSteps.includes(step.id) ? "Gesture completed" : "Gesture not completed"} />
          </button>
        ))}
      </nav>

      <div className="journey-stage journey-stage-v2" key={active.id}>
        <div className="journey-image journey-image-v2" style={{ backgroundImage: `url("${active.image}")` }} role="img" aria-label={active.imageAlt}>
          <div className="journey-image-shade" />
          <div className="journey-atmosphere" aria-hidden="true"><i /><i /><i /></div>
          <div className="journey-location"><span>{active.siteName}</span><small>{active.locationLabel}</small></div>
          <div className="journey-image-label">{active.imageLabel}</div>
          <div className="journey-voice">“{active.voice}”</div>
          <div className="journey-threshold-number">{String(activeIndex + 1).padStart(2, "0")}</div>
        </div>

        <article className="journey-copy journey-copy-v2">
          <div className="journey-copy-top"><p className="eyebrow">{active.eyebrow}</p><span>{activeIndex + 1} / {journey.steps.length}</span></div>
          <h2>{active.title}</h2>
          <p className="journey-insight">{active.humanInsight}</p>

          <div className="journey-fact journey-fact-v2">
            <div><EvidenceBadge status={activeClaims[0].status} /><span>What the evidence supports</span></div>
            <p>{activeClaims[0].statement}</p>
          </div>

          <div className="journey-cultural-boundary">
            <span>Difference before commonality</span>
            <p>{active.culturalBoundary}</p>
          </div>

          <JourneyGesture step={active} onComplete={markComplete} />

          <button className="evidence-toggle evidence-toggle-v2" onClick={() => setEvidenceOpen((open) => !open)} aria-expanded={evidenceOpen}>
            {evidenceOpen ? "Close the evidence" : `Inspect ${activeClaims.length} traceable claim${activeClaims.length > 1 ? "s" : ""}`} <span>{evidenceOpen ? "−" : "+"}</span>
          </button>
          {evidenceOpen && <div className="journey-evidence journey-evidence-v2">{activeClaims.map((claim) => <ClaimCard claim={claim} compact key={claim.id} />)}</div>}

          <blockquote>{active.reflection}</blockquote>
          <div className="journey-carry-forward"><span>Carry forward</span><p>{active.carryForward}</p></div>
          <div className="journey-controls journey-controls-v2">
            <button onClick={() => move(activeIndex - 1)} disabled={activeIndex === 0}>← Previous</button>
            <Link href={`/sites/${active.siteId}/`}>Enter {active.siteName} note ↗</Link>
            {activeIndex < journey.steps.length - 1 ? <button onClick={() => move(activeIndex + 1)}>Next threshold →</button> : <a href="#journey-return">Return to the present →</a>}
          </div>
        </article>
      </div>

      <section className="journey-return journey-return-v2" id="journey-return">
        <p className="eyebrow">The eighth threshold · Us</p>
        <h2>{journey.closingTitle}</h2>
        <p>{journey.closingText}</p>
        <blockquote>{journey.closingPrompt}</blockquote>

        <div className="journey-completion-readout">
          <strong>{completedSteps.length} / {journey.steps.length}</strong>
          <span>interpretive gestures completed</span>
          <small>Completion is optional. Attention matters more than collecting checks.</small>
        </div>

        <div className="journey-doorways">
          <div className="journey-doorways-heading"><span>Choose your doorway back into life</span><strong>What should this journey become in you?</strong></div>
          <div className="journey-doorway-options" role="group" aria-label="Choose a doorway">
            {doorways.map((item) => (
              <button type="button" aria-pressed={doorwayId === item.id} onClick={() => setDoorwayId(item.id)} key={item.id}>
                <span>{item.title}</span><small>{item.question}</small>
              </button>
            ))}
          </div>
          <article className="journey-doorway-practice">
            <span>Your return practice · {doorway.title}</span>
            <h3>{doorway.question}</h3>
            <p>{doorway.practice}</p>
          </article>
        </div>

        <div className="journey-return-actions">
          <Link className="button button-primary" href="/sites/giza/">Enter the deep Giza portal</Link>
          <button className="button button-ghost" onClick={() => move(0)}>Walk the journey again</button>
        </div>
      </section>
    </section>
  );
}

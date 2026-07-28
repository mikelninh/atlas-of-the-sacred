"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const phases = [
  { id: "old", label: "Old Kingdom river world", note: "Interpretive reconstruction based on landscape research." },
  { id: "buried", label: "River branch disappears", note: "A transition view showing the ancient watercourse becoming buried." },
  { id: "present", label: "Present floodplain", note: "The ancient branch is now beneath the modern landscape." },
] as const;

export function NileLandscape() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = phases[phaseIndex];
  const claim = getClaim("giza-ahramat-branch");

  return (
    <div className={`nile-v2 phase-${phase.id}`}>
      <div className="giza-module-toolbar nile-v2-toolbar">
        <div className="landscape-timeline" role="group" aria-label="Landscape phase">
          {phases.map((item, index) => (
            <button key={item.id} aria-pressed={phaseIndex === index} onClick={() => setPhaseIndex(index)}>
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="nile-scene nile-scene-v2">
        <div className="nile-sky" />
        <div className="nile-plateau" />
        <div className="nile-pyramid one" />
        <div className="nile-pyramid two" />
        <div className="nile-water"><span>Ahramat branch reconstruction</span><i className="nile-boat">◢</i></div>
        <div className="nile-silt" />
        <div className="modern-field" />
        <div className="valley-temple">Valley temple</div>
        <div className="causeway-line" />
        <div className="mortuary-temple">Mortuary temple</div>
        <div className="procession-trace"><i /><i /><i /><i /><span>river edge → plateau</span></div>
        <div className="nile-phase-caption"><strong>{phase.label}</strong><span>{phase.note}</span></div>
      </div>

      <aside className="giza-module-copy">
        <p className="eyebrow">Landscape claim</p>
        <EvidenceBadge status={claim.status} />
        <h3>{claim.title}</h3>
        <p>{claim.statement}</p>
        <div className="giza-insight"><span>What changes in the story</span><p>{claim.interpretation}</p></div>
        <div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

export function NileLandscape() {
  const [past, setPast] = useState(true);
  const claim = getClaim("giza-ahramat-branch");
  return (
    <div className={`nile-module ${past ? "show-past" : "show-present"}`}>
      <div className="nile-controls" role="group" aria-label="Landscape period">
        <button aria-pressed={past} onClick={() => setPast(true)}>Old Kingdom landscape</button>
        <button aria-pressed={!past} onClick={() => setPast(false)}>Present-day reading</button>
      </div>
      <div className="nile-scene">
        <div className="nile-sky"/><div className="nile-plateau"/><div className="nile-pyramid one"/><div className="nile-pyramid two"/>
        <div className="nile-water"><span>Ahramat branch reconstruction</span><i className="nile-boat">◢</i></div>
        <div className="modern-field"/>
        <div className="valley-temple">Valley temple</div><div className="causeway-line"/><div className="mortuary-temple">Mortuary temple</div>
      </div>
      <div className="module-copy"><EvidenceBadge status={claim.status}/><h3>{claim.title}</h3><p>{claim.statement}</p><small>{past ? "Interpretive reconstruction based on landscape research." : "The ancient watercourse is now buried beneath the modern floodplain."}</small></div>
    </div>
  );
}

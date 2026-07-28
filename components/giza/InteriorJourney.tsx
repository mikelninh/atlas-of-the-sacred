"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const stops = [
  { id: "subterranean", label: "Subterranean chamber", x: 26, y: 82, claimId: "giza-known-interior", feeling: "Descent below the monument into bedrock." },
  { id: "ascending", label: "Ascending passage", x: 42, y: 61, claimId: "giza-known-interior", feeling: "A narrow reversal: downward movement becomes ascent." },
  { id: "gallery", label: "Grand Gallery", x: 55, y: 42, claimId: "giza-known-interior", feeling: "Vertical release within a steep corbelled volume." },
  { id: "king", label: "King’s Chamber", x: 68, y: 31, claimId: "giza-scale-materials", feeling: "Stillness after ascent." },
  { id: "void", label: "Big Void", x: 60, y: 17, claimId: "giza-big-void", feeling: "The tension of discovery without explanation." },
  { id: "corridor", label: "North Face Corridor", x: 35, y: 28, claimId: "giza-north-face-corridor", feeling: "A threshold where the known structure opens again." }
];

export function InteriorJourney() {
  const [active, setActive] = useState(stops[0]);
  const claim = getClaim(active.claimId);
  return (
    <div className="interior-module">
      <div className="pyramid-section">
        <div className="section-pyramid"/><div className="descending-line"/><div className="ascending-line"/><div className="gallery-line"/>
        {stops.map((stop) => <button key={stop.id} aria-label={stop.label} className={active.id === stop.id ? "active" : ""} style={{ left: `${stop.x}%`, top: `${stop.y}%` }} onClick={() => setActive(stop)}><i/><span>{stop.label}</span></button>)}
      </div>
      <div className="interior-copy"><p className="eyebrow">Interior stop</p><h3>{active.label}</h3><p className="feeling">{active.feeling}</p><EvidenceBadge status={claim.status}/><p>{claim.statement}</p><div className="limit-box"><span>Keep the mystery honest</span>{claim.doesNotProve}</div></div>
    </div>
  );
}

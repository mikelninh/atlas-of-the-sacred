"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const places = [
  { id: "pyramid", label: "Great Pyramid", x: 32, y: 27, claimId: "giza-khufu-tomb" },
  { id: "mortuary", label: "Mortuary temple", x: 47, y: 43, claimId: "giza-complex-route" },
  { id: "causeway", label: "Causeway", x: 62, y: 58, claimId: "giza-complex-route" },
  { id: "valley", label: "Valley temple + harbor", x: 82, y: 76, claimId: "giza-complex-route" },
  { id: "queens", label: "Subsidiary pyramids", x: 26, y: 58, claimId: "giza-subsidiary-pyramids" },
  { id: "boats", label: "Boat pits", x: 43, y: 20, claimId: "giza-boat-pits" },
] as const;

export function RoyalComplexMap() {
  const [activeId, setActiveId] = useState<(typeof places)[number]["id"]>("pyramid");
  const active = places.find((place) => place.id === activeId) ?? places[0];
  const claim = getClaim(active.claimId);
  return (
    <div className="complex-module">
      <div className="complex-map" aria-label="Interactive schematic of Khufu's royal complex">
        <div className="desert-grid"/><div className="complex-river">River edge</div><div className="complex-route"/>
        {places.map((place) => (
          <button key={place.id} className={active.id === place.id ? "active" : ""} style={{ left: `${place.x}%`, top: `${place.y}%` }} onClick={() => setActiveId(place.id)}>
            <i/>{place.label}
          </button>
        ))}
      </div>
      <div className="complex-copy">
        <p className="eyebrow">Selected place</p><EvidenceBadge status={claim.status}/><h3>{claim.title}</h3><p>{claim.statement}</p><hr/>
        <p className="trace-note"><strong>Interpretation:</strong> {claim.interpretation}</p>
        <div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
      </div>
    </div>
  );
}

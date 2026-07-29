"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimDrawer } from "@/components/giza/ClaimDrawer";

const places = [
  { id: "valley", label: "Valley temple + harbor", x: 82, y: 76, claimId: "giza-complex-route", movement: "Arrive at the riverward edge." },
  { id: "causeway", label: "Causeway", x: 62, y: 58, claimId: "giza-complex-route", movement: "Move upward toward the plateau." },
  { id: "mortuary", label: "Mortuary temple", x: 47, y: 43, claimId: "giza-royal-complex", movement: "Cross into architecture beside the pyramid." },
  { id: "pyramid", label: "Great Pyramid", x: 32, y: 27, claimId: "giza-khufu-tomb", movement: "Encounter the central royal monument." },
  { id: "boats", label: "Boat pits", x: 43, y: 20, claimId: "giza-boat-pits", movement: "Read movement and ritual imagery around the complex." },
  { id: "queens", label: "Subsidiary pyramids", x: 26, y: 58, claimId: "giza-subsidiary-pyramids", movement: "See royal memory distributed across several structures." },
] as const;

export function RoyalComplexMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = places[activeIndex];
  const claim = getClaim(active.claimId);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + places.length) % places.length);
  };

  return (
    <div className="complex-v2">
      <div className="complex-map complex-map-v2" aria-label="Interactive schematic of Khufu's royal complex">
        <div className="desert-grid" />
        <div className="complex-river">River edge</div>
        <div className="complex-route" />
        <div className="procession-line" />
        {places.map((place, index) => (
          <button
            key={place.id}
            className={active.id === place.id ? "active" : ""}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
            onClick={() => setActiveIndex(index)}
          >
            <i>{index + 1}</i><span>{place.label}</span>
          </button>
        ))}
        <div className="map-orientation"><span>N</span><i /></div>
        <p className="schematic-label map-label">Schematic plan · spatial relationships simplified</p>
      </div>

      <aside className="giza-module-copy complex-copy-v2">
        <div className="route-progress"><span>Procession stop {activeIndex + 1} of {places.length}</span><i style={{ width: `${((activeIndex + 1) / places.length) * 100}%` }} /></div>
        <p className="eyebrow">{active.movement}</p>
        <EvidenceBadge status={claim.status} />
        <h3>{active.label}</h3>
        <p>{claim.statement}</p>
        <div className="giza-insight"><span>Human reading</span><p>{claim.interpretation}</p></div>
        <div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
        <ClaimDrawer claimId={claim.id} label="Open evidence for this place" />
        <div className="module-step-actions">
          <button onClick={() => move(-1)}>← Previous</button>
          <button onClick={() => move(1)}>Next place →</button>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimDrawer } from "@/components/giza/ClaimDrawer";

const stops = [
  { id: "entrance", label: "North entrance", x: 32, y: 34, claimId: "giza-known-interior", layer: "known", feeling: "A threshold cut into the monument’s north face.", metric: "known passage system" },
  { id: "subterranean", label: "Subterranean chamber", x: 26, y: 82, claimId: "giza-known-interior", layer: "known", feeling: "Descent below the monument into bedrock.", metric: "below the pyramid" },
  { id: "queen", label: "So-called Queen’s Chamber", x: 53, y: 52, claimId: "giza-known-interior", layer: "known", feeling: "A horizontal pause inside the ascending system.", metric: "modern chamber name" },
  { id: "gallery", label: "Grand Gallery", x: 57, y: 39, claimId: "giza-known-interior", layer: "known", feeling: "Vertical release inside a steep corbelled volume.", metric: "elevated masonry space" },
  { id: "king", label: "So-called King’s Chamber", x: 69, y: 31, claimId: "giza-scale-materials", layer: "known", feeling: "Stillness after ascent.", metric: "one of three principal chambers" },
  { id: "void", label: "Big Void", x: 60, y: 17, claimId: "giza-big-void", layer: "detected", feeling: "A major detection whose purpose remains unknown.", metric: "≥30 m detected length" },
  { id: "corridor", label: "North Face Corridor", x: 36, y: 27, claimId: "giza-north-face-corridor", layer: "detected", feeling: "A newly characterised space behind the north-face chevrons.", metric: "≈9 m long · ≈2 × 2 m section" },
] as const;

type Layer = "all" | "known" | "detected";

export function InteriorJourney() {
  const [layer, setLayer] = useState<Layer>("all");
  const [activeId, setActiveId] = useState<(typeof stops)[number]["id"]>(stops[0].id);
  const visibleStops = useMemo(() => stops.filter((stop) => layer === "all" || stop.layer === layer), [layer]);
  const active = visibleStops.find((stop) => stop.id === activeId) ?? visibleStops[0];
  const activeIndex = visibleStops.findIndex((stop) => stop.id === active.id);
  const claim = getClaim(active.claimId);
  const mystery = getClaim("giza-void-purpose");

  const chooseLayer = (nextLayer: Layer) => {
    setLayer(nextLayer);
    const first = stops.find((stop) => nextLayer === "all" || stop.layer === nextLayer);
    if (first) setActiveId(first.id);
  };

  const move = (direction: number) => {
    const nextIndex = (activeIndex + direction + visibleStops.length) % visibleStops.length;
    setActiveId(visibleStops[nextIndex].id);
  };

  return (
    <div className="interior-v2">
      <div className="interior-layer-controls" role="group" aria-label="Interior evidence layer">
        <button aria-pressed={layer === "all"} onClick={() => chooseLayer("all")}>All spaces</button>
        <button aria-pressed={layer === "known"} onClick={() => chooseLayer("known")}>Known passages</button>
        <button aria-pressed={layer === "detected"} onClick={() => chooseLayer("detected")}>Detected spaces</button>
      </div>

      <div className="pyramid-section pyramid-section-v2">
        <div className="section-pyramid" />
        <div className="descending-line" /><div className="ascending-line" /><div className="gallery-line" />
        <div className="big-void-shape" /><div className="corridor-shape" />
        {visibleStops.map((stop) => (
          <button
            key={stop.id}
            aria-label={stop.label}
            className={`${active.id === stop.id ? "active" : ""} layer-${stop.layer}`}
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            onClick={() => setActiveId(stop.id)}
          >
            <i /><span>{stop.label}</span>
          </button>
        ))}
        <div className="interior-legend"><span><i className="known" />Known</span><span><i className="detected" />Detected</span></div>
        <p className="schematic-label interior-label">Schematic section · vertical and horizontal relationships simplified</p>
      </div>

      <aside className="giza-module-copy interior-copy-v2">
        <div className="route-progress"><span>Interior stop {activeIndex + 1} of {visibleStops.length}</span><i style={{ width: `${((activeIndex + 1) / visibleStops.length) * 100}%` }} /></div>
        <p className="eyebrow">{active.layer === "known" ? "Documented interior" : "Scientific detection"}</p>
        <h3>{active.label}</h3>
        <p className="feeling">{active.feeling}</p>
        <div className="interior-metric">{active.metric}</div>
        <EvidenceBadge status={claim.status} />
        <p>{claim.statement}</p>
        <div className="limit-box"><span>Keep the mystery honest</span>{claim.doesNotProve}</div>
        <ClaimDrawer claimId={claim.id} label="Open evidence for this space" />
        {active.layer === "detected" && (
          <>
            <div className="open-mystery-note"><EvidenceBadge status={mystery.status} /><p>{mystery.statement}</p></div>
            <ClaimDrawer claimId={mystery.id} label="Inspect the unresolved function" />
          </>
        )}
        <div className="module-step-actions">
          <button onClick={() => move(-1)}>← Previous</button>
          <button onClick={() => move(1)}>Next space →</button>
        </div>
      </aside>
    </div>
  );
}

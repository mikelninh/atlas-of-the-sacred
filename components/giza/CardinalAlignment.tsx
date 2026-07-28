"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

export function CardinalAlignment() {
  const [mode, setMode] = useState<"measurement" | "method">("measurement");
  const [rotation, setRotation] = useState(0);
  const alignment = getClaim("giza-cardinal-alignment");
  const method = getClaim("giza-alignment-method");
  const claim = mode === "measurement" ? alignment : method;

  return (
    <div className="alignment-v2">
      <div className={`alignment-visual alignment-visual-v2 ${mode === "method" ? "show-stars" : "show-cardinal"}`}>
        <div className="compass-ring">
          <span className="north">N</span><span className="east">E</span><span className="south">S</span><span className="west">W</span>
          <i className="axis-ns" /><i className="axis-ew" />
          <div className="alignment-pyramid" style={{ transform: `rotate(${45 + rotation}deg)` }} />
        </div>
        <div className="star star-a">✦</div><div className="star star-b">✦</div><div className="stellar-line" />
        <div className="alignment-readout"><strong>{rotation > 0 ? "+" : ""}{rotation.toFixed(1)}°</strong><span>conceptual offset</span></div>
        <p className="schematic-label alignment-label">Conceptual simulator · not the measured pyramid deviation</p>
      </div>

      <aside className="giza-module-copy alignment-copy-v2">
        <div className="segmented" role="group" aria-label="Alignment evidence layer">
          <button aria-pressed={mode === "measurement"} onClick={() => setMode("measurement")}>Measured result</button>
          <button aria-pressed={mode === "method"} onClick={() => setMode("method")}>Debated method</button>
        </div>
        {mode === "measurement" && (
          <label className="alignment-slider">
            <span>Rotate the conceptual footprint</span>
            <input type="range" min="-4" max="4" step="0.5" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} />
            <small>At zero, the simulated sides meet the cardinal axes. Move it to feel how quickly orientation becomes visible.</small>
          </label>
        )}
        <EvidenceBadge status={claim.status} />
        <h3>{claim.title}</h3>
        <p>{claim.statement}</p>
        <div className="giza-insight"><span>Interpretation</span><p>{claim.interpretation}</p></div>
        <div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
      </aside>
    </div>
  );
}

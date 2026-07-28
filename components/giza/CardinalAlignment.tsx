"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

export function CardinalAlignment() {
  const [showMethod, setShowMethod] = useState(false);
  const alignment = getClaim("giza-cardinal-alignment");
  const method = getClaim("giza-alignment-method");
  const claim = showMethod ? method : alignment;
  return (
    <div className="alignment-module">
      <div className={`alignment-visual ${showMethod ? "show-stars" : "show-cardinal"}`}>
        <div className="compass-ring"><span className="north">N</span><span className="east">E</span><span className="south">S</span><span className="west">W</span><i className="axis-ns"/><i className="axis-ew"/><div className="alignment-pyramid"/></div>
        <div className="star star-a">✦</div><div className="star star-b">✦</div><div className="stellar-line"/>
      </div>
      <div className="alignment-copy">
        <div className="segmented"><button aria-pressed={!showMethod} onClick={() => setShowMethod(false)}>What is established</button><button aria-pressed={showMethod} onClick={() => setShowMethod(true)}>How it may have been done</button></div>
        <EvidenceBadge status={claim.status}/><h3>{claim.title}</h3><p>{claim.statement}</p><div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
      </div>
    </div>
  );
}

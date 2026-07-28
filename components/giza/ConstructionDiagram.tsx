"use client";

import { useState } from "react";
import { getClaim } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const systemNodes = [
  { id: "quarry", label: "Plateau quarry", claimId: "giza-scale-materials" },
  { id: "river", label: "Water logistics", claimId: "giza-tura-transport" },
  { id: "settlement", label: "Settlement + supplies", claimId: "giza-worker-city" },
  { id: "raising", label: "Raising sequence", claimId: "giza-construction-method-open" },
] as const;

const modelFamilies = [
  { id: "direct", title: "Direct approach", copy: "A simple route family for testing long, changing slopes against the growing monument." },
  { id: "turning", title: "Turning approach", copy: "A conceptual route that changes direction beside or around the pyramid as height increases." },
  { id: "combined", title: "Combined systems", copy: "Different stages may have required different combinations of ramps, hauling and levering." },
] as const;

export function ConstructionDiagram() {
  const [mode, setMode] = useState<"system" | "method">("system");
  const [activeNode, setActiveNode] = useState<(typeof systemNodes)[number]>(systemNodes[0]);
  const [activeModel, setActiveModel] = useState<(typeof modelFamilies)[number]>(modelFamilies[2]);
  const claim = getClaim(mode === "system" ? activeNode.claimId : "giza-construction-method-open");

  return (
    <div className="construction-v2">
      <div className="giza-module-toolbar">
        <div className="segmented" role="group" aria-label="Construction view">
          <button aria-pressed={mode === "system"} onClick={() => setMode("system")}>Documented system</button>
          <button aria-pressed={mode === "method"} onClick={() => setMode("method")}>Open method lab</button>
        </div>
        <small>{mode === "system" ? "Claim-backed network" : "Interpretive models · not reconstructions"}</small>
      </div>

      <div className={`construction-stage construction-stage-v2 mode-${mode} model-${activeModel.id}`} aria-label="Interactive diagram of the systems behind pyramid construction">
        <div className="sun-orbit" />
        <div className="giza-scale-tower"><span>146.5 m</span><i /></div>
        <div className="quarry-cliff" />
        <div className="river-route"><i className="boat">◢</i></div>
        <div className="worker-city" />
        <div className="pyramid-build"><i className="model-route" /></div>
        <div className="construction-human" aria-hidden="true"><i /><span>human scale</span></div>

        {mode === "system" ? systemNodes.map((node) => (
          <button
            key={node.id}
            className={`construction-node node-${node.id} ${activeNode.id === node.id ? "active" : ""}`}
            onClick={() => setActiveNode(node)}
          >
            <i />{node.label}
          </button>
        )) : (
          <div className="method-model-picker">
            {modelFamilies.map((model) => (
              <button key={model.id} aria-pressed={activeModel.id === model.id} onClick={() => setActiveModel(model)}>
                <span>{model.title}</span>
                <small>{model.copy}</small>
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="giza-module-copy construction-copy-v2">
        <p className="eyebrow">{mode === "system" ? "Selected system" : "Method boundary"}</p>
        <EvidenceBadge status={claim.status} />
        <h3>{mode === "system" ? claim.title : activeModel.title}</h3>
        <p>{mode === "system" ? claim.statement : activeModel.copy}</p>
        <div className="giza-insight"><span>Interpretation</span><p>{claim.interpretation}</p></div>
        <div className="limit-box"><span>What this does not prove</span>{claim.doesNotProve}</div>
        {mode === "method" && <p className="schematic-label">Conceptual route family only. No complete end-to-end raising sequence is established.</p>}
      </aside>
    </div>
  );
}

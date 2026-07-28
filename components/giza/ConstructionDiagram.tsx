import { getClaims } from "@/lib/content";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const ids = ["giza-scale-materials", "giza-tura-transport", "giza-worker-city", "giza-construction-method-open"];

export function ConstructionDiagram() {
  const steps = getClaims(ids);
  return (
    <div className="construction-layout">
      <div className="construction-stage" aria-label="Diagram of the connected systems behind pyramid construction">
        <div className="sun-orbit" />
        <div className="quarry-cliff"><span>Plateau quarry</span></div>
        <div className="river-route"><span>Water network</span><i className="boat">◢</i></div>
        <div className="worker-city"><span>Settlement + supplies</span></div>
        <div className="pyramid-build"><i/><i/><i/><i/><span>Raising sequence remains unresolved</span></div>
      </div>
      <ol className="diagram-steps">
        {steps.map((claim, index) => (
          <li key={claim.id}>
            <span className="step-number">0{index + 1}</span>
            <div><EvidenceBadge status={claim.status}/><h3>{claim.diagramLabel}</h3><p>{claim.statement}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}

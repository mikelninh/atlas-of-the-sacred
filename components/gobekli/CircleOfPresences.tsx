"use client";

import { useMemo, useState } from "react";
import { EvidenceBadge } from "@/components/claim/EvidenceBadge";
import { ClaimDrawer } from "@/components/giza/ClaimDrawer";
import { getClaim } from "@/lib/content";

type Mode = "stone" | "body" | "relation";

type Feature = {
  id: string;
  label: string;
  claimId: string;
  kind: "pillar" | "animal" | "edge";
  position: string;
  glyph?: string;
};

const modeCopy: Record<Mode, { label: string; instruction: string; boundary: string }> = {
  stone: {
    label: "Stone",
    instruction: "Enter the architecture as an arrangement: central pair, surrounding pillars, wall and local limestone.",
    boundary: "Schematic spatial relationships only. This is not a literal reconstruction of one excavated building."
  },
  body: {
    label: "Body",
    instruction: "Reveal only the human-like features documented on some T-pillars: arms, hands, belts and loincloths.",
    boundary: "Anthropomorphic does not identify a god, ancestor, priest, ruler or named being."
  },
  relation: {
    label: "Relation",
    instruction: "Move among selected animal motifs and hold observation apart from the stories we place around them.",
    boundary: "Species and placement are evidence. Myth, clan, constellation and catastrophe remain interpretations."
  }
};

const featuresByMode: Record<Mode, Feature[]> = {
  stone: [
    { id: "central-west", label: "Western central pillar", claimId: "gobekli-monumental-gathering", kind: "pillar", position: "central-west" },
    { id: "central-east", label: "Eastern central pillar", claimId: "gobekli-monumental-gathering", kind: "pillar", position: "central-east" },
    { id: "ring-north", label: "Surrounding pillar", claimId: "gobekli-chronology", kind: "pillar", position: "ring-north" },
    { id: "ring-east", label: "Pillar integrated with the enclosure", claimId: "gobekli-monumental-gathering", kind: "pillar", position: "ring-east" },
    { id: "quarry", label: "Limestone plateau", claimId: "gobekli-local-quarries", kind: "edge", position: "quarry-edge" }
  ],
  body: [
    { id: "hands", label: "Arms and hands", claimId: "gobekli-anthropomorphic-pillars", kind: "pillar", position: "central-west", glyph: "⌒" },
    { id: "belt", label: "Belt and loincloth", claimId: "gobekli-anthropomorphic-pillars", kind: "pillar", position: "central-east", glyph: "═" },
    { id: "t-form", label: "Abstract human-like form", claimId: "gobekli-anthropomorphic-pillars", kind: "pillar", position: "ring-north", glyph: "T" }
  ],
  relation: [
    { id: "fox", label: "Fox image", claimId: "gobekli-animal-imagery", kind: "animal", position: "animal-fox", glyph: "FOX" },
    { id: "boar", label: "Boar image", claimId: "gobekli-animal-imagery", kind: "animal", position: "animal-boar", glyph: "BOAR" },
    { id: "bird", label: "Bird image", claimId: "gobekli-animal-imagery", kind: "animal", position: "animal-bird", glyph: "BIRD" },
    { id: "snake", label: "Snake image", claimId: "gobekli-animal-imagery", kind: "animal", position: "animal-snake", glyph: "SNAKE" }
  ]
};

export function CircleOfPresences() {
  const [mode, setMode] = useState<Mode>("stone");
  const [selectedId, setSelectedId] = useState(featuresByMode.stone[0].id);

  const features = featuresByMode[mode];
  const selected = useMemo(
    () => features.find((feature) => feature.id === selectedId) ?? features[0],
    [features, selectedId]
  );
  const claim = getClaim(selected.claimId);

  function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    setSelectedId(featuresByMode[nextMode][0].id);
  }

  return (
    <div className={`presence-lab presence-mode-${mode}`}>
      <div className="presence-toolbar">
        <div className="segmented" role="group" aria-label="Circle of Presences view">
          {(Object.keys(modeCopy) as Mode[]).map((item) => (
            <button key={item} aria-pressed={mode === item} onClick={() => chooseMode(item)}>
              {modeCopy[item].label}
            </button>
          ))}
        </div>
        <small>Schematic encounter · not an archaeological reconstruction</small>
      </div>

      <div className="presence-grid">
        <div className="presence-stage" aria-label={`${modeCopy[mode].label} mode interactive enclosure diagram`}>
          <div className="presence-horizon" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="presence-enclosure" aria-hidden="true"><span /><span /></div>
          <div className="presence-centerline" aria-hidden="true" />

          {features.map((feature) => (
            <button
              key={feature.id}
              className={`presence-feature ${feature.kind} ${feature.position} ${selected.id === feature.id ? "active" : ""}`}
              aria-pressed={selected.id === feature.id}
              aria-label={feature.label}
              onClick={() => setSelectedId(feature.id)}
            >
              <i aria-hidden="true">{feature.glyph}</i>
              <span>{feature.label}</span>
            </button>
          ))}

          <div className="presence-stage-label">
            <span>{modeCopy[mode].label} mode</span>
            <strong>{modeCopy[mode].instruction}</strong>
          </div>
        </div>

        <aside className="presence-copy" aria-live="polite">
          <p className="eyebrow">Selected evidence</p>
          <EvidenceBadge status={claim.status} />
          <h3>{claim.title}</h3>
          <p>{claim.statement}</p>
          <div className="presence-observation">
            <span>What the interaction lets us notice</span>
            <p>{claim.interpretation}</p>
          </div>
          <div className="presence-boundary">
            <span>Boundary</span>
            <p>{modeCopy[mode].boundary}</p>
            <small>{claim.doesNotProve}</small>
          </div>
          <ClaimDrawer claimId={claim.id} label="Open sources, status and review" />
        </aside>
      </div>

      <div className="presence-question">
        <span>The question this mode leaves open</span>
        <p>
          {mode === "stone" && "What kind of gathering required architecture like this?"}
          {mode === "body" && "Who—or what—was made present through these human-like stones?"}
          {mode === "relation" && "Were these animals threats, identities, stories, memories—or relationships for which we no longer possess the language?"}
        </p>
      </div>
    </div>
  );
}

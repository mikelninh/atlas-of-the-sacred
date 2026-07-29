"use client";

import { useState } from "react";
import type { JourneyStep } from "@/types/content";

export function JourneyGesture({ step, onComplete }: { step: JourneyStep; onComplete: () => void }) {
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [position, setPosition] = useState(12);
  const [depth, setDepth] = useState(0);
  const [terrace, setTerrace] = useState(0);

  const finish = () => {
    if (completed) return;
    setCompleted(true);
    onComplete();
  };

  const toggle = (index: number, required: number) => {
    const next = selected.includes(index) ? selected.filter((item) => item !== index) : [...selected, index];
    setSelected(next);
    if (next.length === required) finish();
  };

  const renderGesture = () => {
    switch (step.gestureKind) {
      case "gather":
        return (
          <div className={`threshold-gesture-scene gesture-gather ${completed ? "complete" : ""}`}>
            <div className="gather-centre"><i /><span>shared centre</span></div>
            {[0, 1, 2, 3].map((index) => (
              <button
                type="button"
                className={selected.includes(index) ? "active" : ""}
                aria-pressed={selected.includes(index)}
                aria-label={`Relate marker ${index + 1} to the shared centre`}
                onClick={() => toggle(index, 4)}
                key={index}
              ><i /></button>
            ))}
          </div>
        );
      case "watch":
        return (
          <div className={`threshold-gesture-scene gesture-watch ${completed ? "complete" : ""}`}>
            <div className="watch-horizon"><i style={{ left: `${position}%` }} /></div>
            <label>
              <span>Move the returning light</span>
              <input type="range" min="5" max="95" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
            </label>
            <button type="button" disabled={position < 78} onClick={finish}>Mark the return</button>
          </div>
        );
      case "invite-light":
        return (
          <div className={`threshold-gesture-scene gesture-light ${completed ? "complete" : ""}`}>
            <div className="light-passage"><i style={{ width: `${position}%` }} /><span>chamber</span></div>
            <label>
              <span>Guide the beam inward</span>
              <input
                type="range"
                min="5"
                max="100"
                value={position}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setPosition(next);
                  if (next >= 96) finish();
                }}
              />
            </label>
          </div>
        );
      case "endure": {
        const systems = ["Stone", "Water", "Labour", "Orientation"];
        return (
          <div className={`threshold-gesture-scene gesture-endure ${completed ? "complete" : ""}`}>
            <div className="endure-pyramid"><i /></div>
            <div className="endure-systems">
              {systems.map((system, index) => (
                <button type="button" aria-pressed={selected.includes(index)} onClick={() => toggle(index, systems.length)} key={system}>
                  <i />{system}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case "descend": {
        const layers = ["Open world", "Carved chamber", "Mortality held in depth"];
        return (
          <div className={`threshold-gesture-scene gesture-descend level-${depth} ${completed ? "complete" : ""}`}>
            <div className="descent-well"><i /><i /><i /><span>{layers[depth]}</span></div>
            <button
              type="button"
              onClick={() => {
                const next = Math.min(2, depth + 1);
                setDepth(next);
                if (next === 2) finish();
              }}
              disabled={depth === 2}
            >{depth === 2 ? "Depth reached" : "Descend one level"}</button>
          </div>
        );
      }
      case "flow": {
        const nodes = ["Water", "Settlement", "Cultivation", "Temple"];
        return (
          <div className={`threshold-gesture-scene gesture-flow ${completed ? "complete" : ""}`}>
            <div className="flow-network"><i /><i /><i /><i /><span /></div>
            <div className="flow-controls">
              {nodes.map((node, index) => (
                <button type="button" aria-pressed={selected.includes(index)} onClick={() => toggle(index, nodes.length)} key={node}>
                  <i />{node}
                </button>
              ))}
            </div>
          </div>
        );
      }
      case "walk": {
        const terraces = ["Stories and conduct", "Form becoming spacious", "Open horizon"];
        return (
          <div className={`threshold-gesture-scene gesture-walk terrace-${terrace} ${completed ? "complete" : ""}`}>
            <div className="walk-terraces"><i /><i /><i /><span>{terraces[terrace]}</span></div>
            <button
              type="button"
              onClick={() => {
                const next = Math.min(2, terrace + 1);
                setTerrace(next);
                if (next === 2) finish();
              }}
              disabled={terrace === 2}
            >{terrace === 2 ? "Horizon reached" : "Walk the next terrace"}</button>
          </div>
        );
      }
    }
  };

  return (
    <section className="threshold-gesture" aria-label={`Interpretive gesture: ${step.title}`}>
      <div className="threshold-gesture-heading">
        <div><span>Interpretive gesture</span><strong>{step.title}</strong></div>
        <small>Symbolic interaction · not an archaeological reconstruction</small>
      </div>
      <p>{step.gestureInstruction}</p>
      {renderGesture()}
      <div className={`threshold-gesture-result ${completed ? "visible" : ""}`} aria-live="polite">
        <span>Gesture complete</span>
        <p>{step.gestureCompletion}</p>
      </div>
    </section>
  );
}

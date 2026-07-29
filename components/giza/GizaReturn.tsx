"use client";

import { useState } from "react";
import Link from "next/link";

const thesis = "Monuments preserve values as much as they preserve stone.";
const shareText = `${thesis} — Atlas of the Sacred: Giza`;

export function GizaReturn() {
  const [status, setStatus] = useState("");

  const shareThesis = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Atlas of the Sacred · Giza", text: shareText, url: window.location.href });
        setStatus("Shared.");
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setStatus("Thesis copied to your clipboard.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing was unavailable on this device.");
    }
  };

  const saveCard = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs><radialGradient id="glow" cx="50%" cy="25%" r="70%"><stop offset="0" stop-color="#2a372c"/><stop offset="1" stop-color="#07100f"/></radialGradient></defs>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <path d="M760 470 L965 145 L1170 470 Z" fill="none" stroke="#d9b76d" stroke-width="3" opacity="0.7"/>
      <text x="90" y="90" fill="#d9b76d" font-family="Arial, sans-serif" font-size="20" letter-spacing="5">ATLAS OF THE SACRED · GIZA</text>
      <text x="90" y="245" fill="#f0d59a" font-family="Georgia, serif" font-size="64">Monuments preserve values</text>
      <text x="90" y="325" fill="#f0d59a" font-family="Georgia, serif" font-size="64">as much as they preserve stone.</text>
      <text x="90" y="530" fill="#bdb39e" font-family="Arial, sans-serif" font-size="22">What are we building now that deserves to outlive us?</text>
    </svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "atlas-of-the-sacred-giza-thesis.svg";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Share card saved.");
  };

  return (
    <section className="giza-return" id="return">
      <p className="eyebrow">Return to the present</p>
      <blockquote>What are we building now that deserves to outlive us?</blockquote>
      <p>
        Giza is not powerful because it gives us one secret answer. It is powerful because it reveals what becomes
        possible when a society aligns material, organisation, imagination and time around what it considers eternal.
      </p>
      <div className="giza-return-actions">
        <Link className="button button-primary" href="/journeys/common-thread/">Continue the Common Thread</Link>
        <a className="button button-ghost" href="#evidence">Inspect every claim</a>
      </div>
      <div className="giza-share-ritual">
        <div className="giza-share-card" role="img" aria-label={`Share card reading: ${thesis}`}>
          <span>Atlas of the Sacred · Giza</span>
          <strong>{thesis}</strong>
          <i aria-hidden="true" />
          <small>What are we building now that deserves to outlive us?</small>
        </div>
        <div className="giza-share-actions">
          <button className="button button-ghost" type="button" onClick={shareThesis}>Share the thesis</button>
          <button className="button button-ghost" type="button" onClick={saveCard}>Save the card</button>
        </div>
        <p className="giza-share-status" aria-live="polite">{status}</p>
      </div>
    </section>
  );
}

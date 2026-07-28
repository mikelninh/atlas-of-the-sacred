"use client";

import Link from "next/link";
import { useState } from "react";

type PurposeKey = "remember" | "cooperate" | "heal" | "awaken";

type Purpose = {
  key: PurposeKey;
  number: string;
  title: string;
  verb: string;
  question: string;
  description: string;
  promise: string;
  cta: string;
  href: string;
  image: string;
};

const purposes: Purpose[] = [
  {
    key: "remember",
    number: "01",
    title: "Remember",
    verb: "Preserve what matters",
    question: "What must not disappear?",
    description:
      "Hold evidence, stories, rituals and hard-won knowledge in forms that future people can inspect, question and continue.",
    promise: "Memory with provenance—not nostalgia without receipts.",
    cta: "Walk the Common Thread",
    href: "/journeys/common-thread/",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gobeklitepe_Panorama.jpg",
  },
  {
    key: "cooperate",
    number: "02",
    title: "Cooperate",
    verb: "Gather around meaning",
    question: "What becomes possible together?",
    description:
      "Let different cultures, disciplines and people meet around a shared question without erasing their differences or surrendering intellectual honesty.",
    promise: "Build common ground without manufacturing sameness.",
    cta: "Explore seven distinct voices",
    href: "/journeys/common-thread/",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Stonehenge_at_Sunrise.jpg",
  },
  {
    key: "heal",
    number: "03",
    title: "Heal",
    verb: "Re-enter relationship",
    question: "What has modern life separated?",
    description:
      "Use encounters with time, death, landscape and renewal to restore perspective—not as escape, but as a more intimate return to life.",
    promise: "No spiritual bypassing. Wonder must return us to reality with greater care.",
    cta: "Enter the return of light",
    href: "/journeys/common-thread/",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/NewgrangeTombEntrance.jpg",
  },
  {
    key: "awaken",
    number: "04",
    title: "Awaken",
    verb: "Change the person who enters",
    question: "What can only be understood by walking it?",
    description:
      "Turn knowledge into an embodied path: move through evidence, uncertainty and reflection until an ancient site becomes a mirror for the present.",
    promise: "Not infinite engagement—an intentional entrance, transformation and return.",
    cta: "Begin the pilgrimage",
    href: "/journeys/common-thread/",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Borobudur_Sunrise.jpg",
  },
];

export function PurposeCompass() {
  const [activeKey, setActiveKey] = useState<PurposeKey>("remember");
  const active = purposes.find((purpose) => purpose.key === activeKey) ?? purposes[0];

  return (
    <section className="purpose-compass" id="purpose">
      <div className="purpose-heading">
        <div>
          <p className="eyebrow">Enter through what humanity needs</p>
          <h2>Four ways a beautiful product can serve life.</h2>
        </div>
        <p>
          The Atlas is not a warehouse of ancient objects. It is an invitation to remember, cooperate, heal and become more conscious—through experiences people genuinely want to enter.
        </p>
      </div>

      <div className="purpose-layout">
        <div className="purpose-orbit" aria-label="Purpose compass">
          <div className="purpose-centre">
            <span>Our centre</span>
            <strong>Human flourishing</strong>
            <small>made inhabitable</small>
          </div>
          {purposes.map((purpose, index) => (
            <button
              className={`purpose-node purpose-node-${index + 1} ${purpose.key === active.key ? "active" : ""}`}
              key={purpose.key}
              onClick={() => setActiveKey(purpose.key)}
              aria-pressed={purpose.key === active.key}
            >
              <span>{purpose.number}</span>
              <strong>{purpose.title}</strong>
            </button>
          ))}
        </div>

        <article className="purpose-detail" style={{ backgroundImage: `url("${active.image}")` }}>
          <div className="purpose-detail-shade" />
          <div className="purpose-detail-copy">
            <p className="eyebrow">{active.number} · {active.verb}</p>
            <h3>{active.question}</h3>
            <p>{active.description}</p>
            <blockquote>{active.promise}</blockquote>
            <Link className="button button-primary" href={active.href}>{active.cta}</Link>
          </div>
        </article>
      </div>
    </section>
  );
}

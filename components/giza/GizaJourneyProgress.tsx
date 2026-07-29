"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "construction", number: "01", label: "Build" },
  { id: "nile-landscape", number: "02", label: "Landscape" },
  { id: "royal-complex", number: "03", label: "Approach" },
  { id: "alignment", number: "04", label: "Orient" },
  { id: "interior", number: "05", label: "Enter" },
] as const;

export function GizaJourneyProgress() {
  const [activeId, setActiveId] = useState<(typeof chapters)[number]["id"]>(chapters[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = visible[0]?.target.id as (typeof chapters)[number]["id"] | undefined;
        if (next) setActiveId(next);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    const updateProgress = () => {
      const start = document.getElementById("construction")?.offsetTop ?? 0;
      const endElement = document.getElementById("return");
      const end = endElement ? endElement.offsetTop + endElement.offsetHeight : document.documentElement.scrollHeight;
      const travelled = window.scrollY + window.innerHeight * 0.35 - start;
      setProgress(Math.max(0, Math.min(100, (travelled / Math.max(1, end - start)) * 100)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <nav className="giza-journey-progress" aria-label="Giza expedition progress">
      <div className="giza-journey-progress-bar" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      <span className="giza-journey-progress-title">Giza expedition</span>
      <div className="giza-journey-progress-links">
        {chapters.map((chapter) => (
          <a href={`#${chapter.id}`} aria-current={activeId === chapter.id ? "step" : undefined} key={chapter.id}>
            <span>{chapter.number}</span>{chapter.label}
          </a>
        ))}
      </div>
      <a className="giza-journey-progress-evidence" href="#evidence">Evidence</a>
    </nav>
  );
}

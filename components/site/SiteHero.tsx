import Image from "next/image";
import type { Site } from "@/types/content";

export function SiteHero({ site }: { site: Site }) {
  const firstAnchor = site.id === "giza" ? "construction" : "field-note";
  return (
    <section className="site-hero">
      <Image src={site.heroImage} alt={site.heroAlt} fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="site-hero-content">
        <p className="eyebrow">Atlas field note · {site.locationLabel}</p>
        <h1>{site.name}</h1>
        <blockquote>{site.poeticThesis}</blockquote>
        <p className="hero-question">{site.interpretiveQuestion}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={`#${firstAnchor}`}>Begin the journey</a>
          <a className="button button-ghost" href="#evidence">Inspect the evidence</a>
        </div>
      </div>
      <p className="visual-label">{site.visualLabel ?? "Interpretive visual"}</p>
    </section>
  );
}

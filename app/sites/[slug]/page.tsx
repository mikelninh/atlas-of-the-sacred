import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sites } from "@/content/sites";
import { getClaims, getSite } from "@/lib/content";
import { SiteHero } from "@/components/site/SiteHero";
import { ConstructionDiagram } from "@/components/giza/ConstructionDiagram";
import { NileLandscape } from "@/components/giza/NileLandscape";
import { RoyalComplexMap } from "@/components/giza/RoyalComplexMap";
import { CardinalAlignment } from "@/components/giza/CardinalAlignment";
import { InteriorJourney } from "@/components/giza/InteriorJourney";
import { GizaExpeditionIntro } from "@/components/giza/GizaExpeditionIntro";
import { GizaReturn } from "@/components/giza/GizaReturn";
import { ClaimCard } from "@/components/claim/ClaimCard";

export function generateStaticParams() {
  return Object.values(sites).map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getSite(slug);
  return site ? { title: site.name, description: `${site.name}: an evidence-led immersive site portal.` } : {};
}

const modules = {
  construction: ConstructionDiagram,
  "nile-landscape": NileLandscape,
  "royal-complex": RoyalComplexMap,
  alignment: CardinalAlignment,
  interior: InteriorJourney,
} as const;

const moduleDescriptions: Record<string, string> = {
  construction: "Follow what the evidence can document—from quarry and water logistics to settlement—and stop where the complete raising sequence disappears.",
  "nile-landscape": "Recover a river-connected world hidden beneath the modern desert view, without turning reconstruction into certainty.",
  "royal-complex": "Walk from the riverward edge toward the pyramid and see the monument as one part of a connected ritual landscape.",
  alignment: "Feel the difference between the measured result and the debated method used to achieve it.",
  interior: "Move through known passages and scientifically detected spaces while keeping discovery separate from explanation.",
};

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) notFound();
  const allClaims = getClaims(site.modules.flatMap((module) => module.claimIds));
  const uniqueClaims = [...new Map(allClaims.map((claim) => [claim.id, claim])).values()];

  if (site.id !== "giza") {
    return (
      <>
        <SiteHero site={site} />
        <section className="field-note" id="field-note">
          <div className="field-note-copy">
            <p className="eyebrow">{site.modules[0]?.eyebrow}</p>
            <h2>{site.modules[0]?.title}</h2>
            <blockquote>{site.poeticThesis}</blockquote>
            <p>{uniqueClaims[0]?.interpretation}</p>
            <Link className="button button-primary" href="/journeys/common-thread/">Continue the Common Thread</Link>
          </div>
          <div className="field-note-question"><span>The question it leaves us</span><p>{site.interpretiveQuestion}</p></div>
        </section>
        <section className="evidence-registry" id="evidence">
          <div className="chapter-heading"><p className="eyebrow">Traceable knowledge</p><h2>{site.name} evidence note</h2><p>This first edition begins with one load-bearing claim. Future research chapters will expand without changing the evidence contract.</p></div>
          <div className="registry-grid registry-grid-single">{uniqueClaims.map((claim) => <ClaimCard claim={claim} key={claim.id} />)}</div>
        </section>
      </>
    );
  }

  return (
    <>
      <SiteHero site={site} />
      <GizaExpeditionIntro />
      <nav className="chapter-nav chapter-nav-v2" aria-label="Giza chapters">
        {site.modules.map((module) => <a href={`#${module.id}`} key={module.id}><span>{module.eyebrow}</span>{module.title}</a>)}
      </nav>
      {site.modules.map((module) => {
        const Module = modules[module.id as keyof typeof modules];
        return (
          <section className={`site-chapter giza-v2-chapter chapter-${module.id}`} id={module.id} key={module.id}>
            <div className="chapter-heading chapter-heading-v2">
              <p className="eyebrow">{module.eyebrow}</p>
              <h2>{module.title}</h2>
              <p>{moduleDescriptions[module.id]}</p>
            </div>
            <Module />
          </section>
        );
      })}
      <GizaReturn />
      <section className="evidence-registry" id="evidence">
        <div className="chapter-heading"><p className="eyebrow">Traceable knowledge</p><h2>Giza evidence registry</h2><p>Every factual statement used by the portal appears below with its sources, review date, interpretation and limits.</p></div>
        <div className="registry-grid">{uniqueClaims.map((claim) => <ClaimCard claim={claim} key={claim.id} />)}</div>
      </section>
    </>
  );
}

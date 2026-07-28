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
      <nav className="chapter-nav" aria-label="Giza chapters">
        {site.modules.map((module) => <a href={`#${module.id}`} key={module.id}><span>{module.eyebrow}</span>{module.title}</a>)}
      </nav>
      {site.modules.map((module) => {
        const Module = modules[module.id as keyof typeof modules];
        return <section className="site-chapter" id={module.id} key={module.id}><div className="chapter-heading"><p className="eyebrow">{module.eyebrow}</p><h2>{module.title}</h2></div><Module /></section>;
      })}
      <section className="evidence-registry" id="evidence">
        <div className="chapter-heading"><p className="eyebrow">Traceable knowledge</p><h2>Giza evidence registry</h2><p>Every factual statement used by the portal appears below with its sources, review date, interpretation and limits.</p></div>
        <div className="registry-grid">{uniqueClaims.map((claim) => <ClaimCard claim={claim} key={claim.id} />)}</div>
      </section>
    </>
  );
}

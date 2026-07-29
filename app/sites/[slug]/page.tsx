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
import { GizaJourneyProgress } from "@/components/giza/GizaJourneyProgress";
import { GizaChapterBridge } from "@/components/giza/GizaChapterBridge";
import { GizaReturn } from "@/components/giza/GizaReturn";
import { GobekliPortalIntro } from "@/components/gobekli/GobekliPortalIntro";
import { CircleOfPresences } from "@/components/gobekli/CircleOfPresences";
import { GobekliReturn } from "@/components/gobekli/GobekliReturn";
import { ClaimCard } from "@/components/claim/ClaimCard";

export function generateStaticParams() {
  return Object.values(sites).map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getSite(slug);
  return site ? {
    title: site.name,
    description: `${site.name}: an evidence-led immersive site portal.`,
    alternates: { canonical: `/sites/${site.slug}/` }
  } : {};
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

const chapterBridges: Record<string, { number: string; prompt: string; nextId?: string; nextLabel?: string }> = {
  construction: {
    number: "01",
    prompt: "The monument begins to look less like one impossible trick and more like a civilisation coordinating many ordinary systems extraordinarily well.",
    nextId: "nile-landscape",
    nextLabel: "the river world",
  },
  "nile-landscape": {
    number: "02",
    prompt: "Once water returns to the picture, the pyramid stops floating alone in desert and becomes part of movement between river, settlement and plateau.",
    nextId: "royal-complex",
    nextLabel: "the ceremonial approach",
  },
  "royal-complex": {
    number: "03",
    prompt: "The pyramid was not only seen. It was approached through a sequence that organised bodies, attention and royal memory across the landscape.",
    nextId: "alignment",
    nextLabel: "the cardinal sky",
  },
  alignment: {
    number: "04",
    prompt: "Precision is established. The exact surveying act is not. The distinction is where honest wonder begins.",
    nextId: "interior",
    nextLabel: "the known and detected interior",
  },
  interior: {
    number: "05",
    prompt: "Discovery enlarges the monument without completing its explanation. We leave with better questions, not manufactured answers.",
  },
};

const gobekliDescriptions: Record<string, string> = {
  "neolithic-landscape": "Place the hill inside centuries of change, apparent habitation and a regional network rather than treating it as an isolated miracle.",
  "work-of-gathering": "Follow the local stone, cereal processing and coordination that made repeated gathering materially possible.",
  "building-biographies": "Separate repair, deposition, collapse and sediment movement from the popular story of one deliberate site-wide burial.",
};

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) notFound();
  const allClaims = getClaims(site.modules.flatMap((module) => module.claimIds));
  const uniqueClaims = [...new Map(allClaims.map((claim) => [claim.id, claim])).values()];

  if (site.id === "gobekli-tepe") {
    const evidenceModules = site.modules.filter((module) => ["neolithic-landscape", "work-of-gathering", "building-biographies"].includes(module.id));
    return (
      <>
        <SiteHero site={site} />
        <GobekliPortalIntro />

        <section className="site-chapter gobekli-map-chapter" id="gobekli-chapter-1">
          <div className="chapter-heading">
            <p className="eyebrow">Chapter 01 · Evidence before spectacle</p>
            <h2>A hill inside a changing world</h2>
            <p>{gobekliDescriptions["neolithic-landscape"]}</p>
          </div>
          <div className="gobekli-evidence-strip">
            {getClaims(site.modules[0].claimIds).map((claim) => <ClaimCard claim={claim} key={claim.id} />)}
          </div>
        </section>

        <section className="site-chapter gobekli-presence-chapter" id="circle-of-presences">
          <div className="chapter-heading">
            <p className="eyebrow">Chapter 02 · First interaction prototype</p>
            <h2>The Circle of Presences</h2>
            <p>Move between documented architecture, human-like features and animal imagery without turning the schematic into a recovered ceremony.</p>
          </div>
          <CircleOfPresences />
        </section>

        {evidenceModules.slice(1).map((module, index) => (
          <section className="site-chapter gobekli-map-chapter" id={`gobekli-chapter-${index + 3}`} key={module.id}>
            <div className="chapter-heading gobekli-mapped-heading">
              <p className="eyebrow">Mapped next · evidence ready</p>
              <h2>{module.title}</h2>
              <p>{gobekliDescriptions[module.id]}</p>
              <span className="gobekli-prototype-label">Interaction design follows specialist review of the evidence map.</span>
            </div>
            <div className="gobekli-evidence-strip">
              {getClaims(module.claimIds).map((claim) => <ClaimCard claim={claim} key={claim.id} />)}
            </div>
          </section>
        ))}

        <GobekliReturn />

        <section className="evidence-registry" id="evidence">
          <div className="chapter-heading">
            <p className="eyebrow">Traceable knowledge</p>
            <h2>Göbekli Tepe evidence registry</h2>
            <p>Every factual statement used by the prototype appears below with its sources, evidence status, review date, interpretation and limits.</p>
          </div>
          <div className="registry-grid">{uniqueClaims.map((claim) => <ClaimCard claim={claim} key={claim.id} />)}</div>
        </section>
      </>
    );
  }

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
      <GizaJourneyProgress />
      {site.modules.map((module) => {
        const Module = modules[module.id as keyof typeof modules];
        const bridge = chapterBridges[module.id];
        return (
          <section className={`site-chapter giza-v2-chapter chapter-${module.id}`} id={module.id} key={module.id}>
            <div className="chapter-heading chapter-heading-v2">
              <p className="eyebrow">{module.eyebrow}</p>
              <h2>{module.title}</h2>
              <p>{moduleDescriptions[module.id]}</p>
            </div>
            <Module />
            <GizaChapterBridge {...bridge} />
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

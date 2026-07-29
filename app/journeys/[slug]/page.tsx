import type { Metadata } from "next";
import { journeys } from "@/content/journeys";
import { getJourney } from "@/lib/content";
import { JourneyView } from "@/components/journey/JourneyView";
import { notFound } from "next/navigation";

export function generateStaticParams() { return Object.values(journeys).map((journey) => ({ slug: journey.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  return journey ? { title: journey.title, description: journey.description } : {};
}

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();
  return (
    <>
      <header className="journey-hero journey-hero-v2">
        <div className="journey-hero-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="journey-hero-copy">
          <p className="eyebrow">Guided journey · {journey.durationLabel}</p>
          <h1>{journey.title}</h1>
          <p>{journey.description}</p>
          <div className="journey-hero-covenant">
            <span>The covenant</span>
            <strong>Look for recurring human questions without pretending the cultures gave one answer.</strong>
          </div>
          <a className="button button-primary" href="#journey-experience">Cross the first threshold</a>
        </div>
        <div className="journey-hero-thresholds" aria-label="Seven thresholds in this journey">
          {journey.steps.map((step, index) => (
            <a href={`#${step.id}`} key={step.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{step.title}</strong><small>{step.siteName}</small></div>
            </a>
          ))}
        </div>
      </header>
      <JourneyView journey={journey} />
    </>
  );
}

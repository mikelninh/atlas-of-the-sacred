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
      <header className="journey-hero">
        <p className="eyebrow">Guided journey · {journey.durationLabel}</p>
        <h1>{journey.title}</h1>
        <p>{journey.description}</p>
        <a className="button button-primary" href="#journey-experience">Cross the first threshold</a>
      </header>
      <JourneyView journey={journey} />
    </>
  );
}

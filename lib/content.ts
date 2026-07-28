import { claims, type ClaimId } from "@/content/claims";
import { journeys } from "@/content/journeys";
import { sites } from "@/content/sites";
import { sources, type SourceId } from "@/content/sources";
import type { Claim, Journey, Site, Source } from "@/types/content";

export function getClaim(id: string): Claim {
  const claim = claims[id as ClaimId];
  if (!claim) throw new Error(`Unknown claim: ${id}`);
  return claim;
}

export function getClaims(ids: string[]): Claim[] {
  return ids.map(getClaim);
}

export function getSource(id: string): Source {
  const source = sources[id as SourceId];
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

export function getSourcesForClaim(claim: Claim): Source[] {
  return claim.sourceIds.map(getSource);
}

export function getSite(slug: string): Site | undefined {
  return Object.values(sites).find((site) => site.slug === slug);
}

export function getJourney(slug: string): Journey | undefined {
  return Object.values(journeys).find((journey) => journey.slug === slug);
}

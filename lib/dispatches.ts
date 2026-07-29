import { dispatches } from "@/content/dispatches";
import { claims } from "@/content/claims";
import { sources } from "@/content/sources";
import type { Claim, Source } from "@/types/content";
import type { DiscoveryDispatch } from "@/types/dispatch";

export function getDispatch(slug: string): DiscoveryDispatch | undefined {
  return Object.values(dispatches).find((dispatch) => dispatch.slug === slug);
}

export function getPublishedDispatches(): DiscoveryDispatch[] {
  return Object.values(dispatches)
    .filter((dispatch) => dispatch.editorialState === "published")
    .sort((a, b) => b.sourceYear - a.sourceYear || b.atlasPublishedOn.localeCompare(a.atlasPublishedOn));
}

export function getDispatchClaims(dispatch: DiscoveryDispatch): Claim[] {
  return dispatch.claimIds.map((id) => claims[id as keyof typeof claims] as Claim);
}

export function getDispatchSources(dispatch: DiscoveryDispatch): Source[] {
  return dispatch.sourceIds.map((id) => sources[id as keyof typeof sources] as Source);
}

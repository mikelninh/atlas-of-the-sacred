import { claims } from "@/content/claims";
import { journeys } from "@/content/journeys";
import { reviews } from "@/content/reviews";
import { revisions } from "@/content/revisions";
import { sites } from "@/content/sites";
import { sources } from "@/content/sources";
import type { AtlasRepository } from "./contracts";

export const staticRepository: AtlasRepository = {
  async getClaim(id) {
    return Object.values(claims).find((claim) => claim.id === id);
  },
  async listClaims() {
    return Object.values(claims);
  },
  async listClaimsForSite(siteId) {
    return Object.values(claims).filter((claim) => claim.siteId === siteId);
  },
  async listSources() {
    return Object.values(sources);
  },
  async getSite(slug) {
    return Object.values(sites).find((site) => site.slug === slug);
  },
  async getJourney(slug) {
    return Object.values(journeys).find((journey) => journey.slug === slug);
  },
  async listReviews(claimId) {
    return claimId ? reviews.filter((review) => review.claimId === claimId) : reviews;
  },
  async listRevisions(claimId) {
    return claimId ? revisions.filter((revision) => revision.claimId === claimId) : revisions;
  }
};

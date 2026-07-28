import type { Claim, Journey, Site, Source } from "@/types/content";
import type { ClaimRevision, ReviewRecord } from "@/types/editorial";

export interface AtlasRepository {
  getClaim(id: string): Promise<Claim | undefined>;
  listClaims(): Promise<Claim[]>;
  listClaimsForSite(siteId: string): Promise<Claim[]>;
  listSources(): Promise<Source[]>;
  getSite(slug: string): Promise<Site | undefined>;
  getJourney(slug: string): Promise<Journey | undefined>;
  listReviews(claimId?: string): Promise<ReviewRecord[]>;
  listRevisions(claimId?: string): Promise<ClaimRevision[]>;
}

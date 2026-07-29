import type { EvidenceStatus } from "./content";
import type { EditorialState } from "./editorial";

export interface DiscoveryDispatch {
  id: string;
  slug: string;
  title: string;
  dek: string;
  sourceYear: number;
  atlasPublishedOn: string;
  updatedOn: string;
  readTime: string;
  evidenceStatus: EvidenceStatus;
  editorialState: EditorialState;
  siteIds: string[];
  claimIds: string[];
  sourceIds: string[];
  whatChanged: string;
  whyItMatters: string;
  evidenceSupports: string[];
  headlinesOverreach: string[];
  openQuestion: string;
}

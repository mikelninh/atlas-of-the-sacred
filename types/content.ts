import type { EditorialState } from "./editorial";

export type EvidenceStatus =
  | "established"
  | "probable"
  | "contested"
  | "open-mystery";

export type SourceKind =
  | "official-record"
  | "primary-research"
  | "scholarly-archive"
  | "critical-edition";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  publishedYear?: number;
  accessedOn: string;
  url: string;
  kind: SourceKind;
  note: string;
}

export interface Claim {
  id: string;
  siteId: string;
  title: string;
  statement: string;
  status: EvidenceStatus;
  sourceIds: string[];
  reviewedOn: string;
  editorialState: EditorialState;
  version: number;
  owner: string;
  interpretation: string;
  doesNotProve: string;
  tags: string[];
  diagramLabel?: string;
}

export interface SiteModule {
  id: string;
  title: string;
  eyebrow: string;
  claimIds: string[];
}

export interface Site {
  id: string;
  slug: string;
  name: string;
  locationLabel: string;
  heroImage: string;
  heroAlt: string;
  poeticThesis: string;
  interpretiveQuestion: string;
  visualLabel?: string;
  modules: SiteModule[];
}

export type JourneyGestureKind =
  | "gather"
  | "watch"
  | "invite-light"
  | "endure"
  | "descend"
  | "flow"
  | "walk";

export interface JourneyStep {
  id: string;
  title: string;
  siteId: string;
  siteName: string;
  locationLabel: string;
  eyebrow: string;
  voice: string;
  humanInsight: string;
  image: string;
  imageAlt: string;
  imageLabel: string;
  claimIds: string[];
  reflection: string;
  gestureKind: JourneyGestureKind;
  gestureInstruction: string;
  gestureCompletion: string;
  culturalBoundary: string;
  carryForward: string;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationLabel?: string;
  closingTitle?: string;
  closingText?: string;
  closingPrompt?: string;
  steps: JourneyStep[];
}

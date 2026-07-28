import type { EvidenceStatus } from "./content";

export type EditorialState =
  | "draft"
  | "in-review"
  | "approved"
  | "published"
  | "needs-revision"
  | "archived";

export type ReviewDecision =
  | "approved"
  | "approved-with-notes"
  | "changes-requested"
  | "rejected";

export interface ReviewRecord {
  id: string;
  claimId: string;
  reviewer: string;
  reviewedOn: string;
  decision: ReviewDecision;
  evidenceAssessment: EvidenceStatus;
  notes: string;
  requestedChanges: string[];
}

export interface ClaimRevision {
  id: string;
  claimId: string;
  version: number;
  changedOn: string;
  changedBy: string;
  summary: string;
  previousStatement?: string;
  previousStatus?: EvidenceStatus;
}

export type SourceHealthStatus =
  | "healthy"
  | "redirected"
  | "blocked"
  | "broken"
  | "unchecked";

export interface SourceHealthCheck {
  sourceId: string;
  checkedOn: string;
  status: SourceHealthStatus;
  httpStatus?: number;
  resolvedUrl?: string;
  note?: string;
}

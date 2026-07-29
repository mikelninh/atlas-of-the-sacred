import type { ReviewRecord } from "@/types/editorial";

export const reviews = [
  {
    id: "review-giza-khufu-tomb-1",
    claimId: "giza-khufu-tomb",
    reviewer: "Atlas internal editorial review",
    reviewKind: "internal-editorial",
    reviewerDiscipline: "editorial provenance check",
    conflictStatement: "Conducted by the Atlas project team; not an independent specialist endorsement.",
    reviewedOn: "2026-07-28",
    decision: "approved",
    evidenceAssessment: "established",
    notes: "Attribution, function and complex context are supported by official and scholarly records.",
    requestedChanges: []
  },
  {
    id: "review-giza-alignment-method-1",
    claimId: "giza-alignment-method",
    reviewer: "Atlas internal editorial review",
    reviewKind: "internal-editorial",
    reviewerDiscipline: "editorial provenance check",
    conflictStatement: "Conducted by the Atlas project team; not an independent specialist endorsement.",
    reviewedOn: "2026-07-28",
    decision: "approved-with-notes",
    evidenceAssessment: "contested",
    notes: "Retain the model as an influential hypothesis and avoid presenting it as the documented ancient procedure.",
    requestedChanges: ["Add a second scholarly alignment model before the next public review."]
  },
  {
    id: "review-giza-big-void-1",
    claimId: "giza-big-void",
    reviewer: "Atlas internal editorial review",
    reviewKind: "internal-editorial",
    reviewerDiscipline: "editorial provenance check",
    conflictStatement: "Conducted by the Atlas project team; not an independent specialist endorsement.",
    reviewedOn: "2026-07-28",
    decision: "approved",
    evidenceAssessment: "established",
    notes: "Detection is established; architectural function remains explicitly unresolved.",
    requestedChanges: []
  },
  {
    id: "review-giza-construction-method-open-1",
    claimId: "giza-construction-method-open",
    reviewer: "Atlas internal editorial review",
    reviewKind: "internal-editorial",
    reviewerDiscipline: "editorial provenance check",
    conflictStatement: "Conducted by the Atlas project team; not an independent specialist endorsement.",
    reviewedOn: "2026-07-28",
    decision: "approved-with-notes",
    evidenceAssessment: "open-mystery",
    notes: "The negative claim is carefully bounded. Future versions should map competing construction models individually.",
    requestedChanges: ["Create separate claim objects for major ramp and levering models."]
  }
] satisfies ReviewRecord[];

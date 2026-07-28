import type { ClaimRevision } from "@/types/editorial";

export const revisions = [
  {
    id: "revision-giza-big-void-1",
    claimId: "giza-big-void",
    version: 1,
    changedOn: "2026-07-28",
    changedBy: "atlas-editorial",
    summary: "Initial evidence-led publication with explicit limits on interpretation."
  },
  {
    id: "revision-giza-alignment-method-1",
    claimId: "giza-alignment-method",
    version: 1,
    changedOn: "2026-07-28",
    changedBy: "atlas-editorial",
    summary: "Initial publication classified as contested rather than established."
  }
] satisfies ClaimRevision[];

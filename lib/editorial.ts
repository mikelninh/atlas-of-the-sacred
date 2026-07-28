import type { Claim } from "@/types/content";
import type { ReviewRecord } from "@/types/editorial";

const REVIEW_WINDOW_DAYS = 180;

export function daysSince(date: string, now = new Date("2026-07-28T12:00:00Z")) {
  const reviewed = new Date(`${date}T00:00:00Z`);
  return Math.floor((now.getTime() - reviewed.getTime()) / 86_400_000);
}

export function isReviewDue(claim: Claim) {
  return daysSince(claim.reviewedOn) >= REVIEW_WINDOW_DAYS || claim.editorialState === "needs-revision";
}

export function getLatestReview(claimId: string, reviews: ReviewRecord[]) {
  return reviews
    .filter((review) => review.claimId === claimId)
    .sort((a, b) => b.reviewedOn.localeCompare(a.reviewedOn))[0];
}

export function editorialReadiness(claim: Claim, reviews: ReviewRecord[]) {
  const latest = getLatestReview(claim.id, reviews);
  if (claim.sourceIds.length === 0) return "blocked" as const;
  if (claim.editorialState === "needs-revision") return "needs-revision" as const;
  if (!latest) return "needs-review" as const;
  if (latest.decision === "changes-requested" || latest.decision === "rejected") return "blocked" as const;
  if (isReviewDue(claim)) return "review-due" as const;
  return "ready" as const;
}

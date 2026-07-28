import { getClaims } from "@/lib/content";
import { ClaimCard } from "./ClaimCard";

export function ClaimStrip({ claimIds }: { claimIds: string[] }) {
  return <div className="claim-strip">{getClaims(claimIds).map((claim) => <ClaimCard key={claim.id} claim={claim} compact />)}</div>;
}

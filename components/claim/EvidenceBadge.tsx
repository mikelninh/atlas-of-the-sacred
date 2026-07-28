import type { EvidenceStatus } from "@/types/content";

const labels: Record<EvidenceStatus, string> = {
  established: "Established",
  probable: "Probable",
  contested: "Contested",
  "open-mystery": "Open mystery"
};

export function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return <span className={`evidence-badge evidence-${status}`}>{labels[status]}</span>;
}

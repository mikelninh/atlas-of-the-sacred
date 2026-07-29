import { ClaimDrawer } from "@/components/giza/ClaimDrawer";

export function GobekliReturn() {
  return (
    <section className="gobekli-return" id="gobekli-chapter-5">
      <div>
        <p className="eyebrow">Return · Stewardship</p>
        <h2>Not everything must be uncovered to become meaningful.</h2>
        <p>
          Most of the mound remains beyond the excavated enclosures. Preservation is not the opposite of discovery;
          it protects the contexts from which future knowledge may still emerge.
        </p>
        <ClaimDrawer claimId="gobekli-conservation-priority" label="Inspect the current conservation boundary" />
      </div>
      <blockquote>
        <span>Carry this outward</span>
        What becomes possible when people gather around something larger than themselves—and what must they protect for those who come after?
      </blockquote>
    </section>
  );
}

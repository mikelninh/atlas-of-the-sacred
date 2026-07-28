import type { Metadata } from "next";
import { EditorialDashboard } from "@/components/editorial/EditorialDashboard";

export const metadata: Metadata = {
  title: "Editorial operating system",
  description: "The evidence, review, revision and source-health system behind Atlas of the Sacred."
};

export default function EditorialPage() {
  return (
    <>
      <header className="editorial-hero">
        <p className="eyebrow">Behind the wonder</p>
        <h1>The editorial operating system</h1>
        <p>Trust is designed. Every claim moves through provenance, review, publication, correction and renewal.</p>
      </header>
      <EditorialDashboard />
    </>
  );
}

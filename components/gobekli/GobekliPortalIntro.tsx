import { EvidenceBadge } from "@/components/claim/EvidenceBadge";

const chapters = [
  ["01", "Landscape", "A changing regional world"],
  ["02", "Presence", "Stone, body and animal relation"],
  ["03", "Work", "Quarry, food and coordination"],
  ["04", "Biography", "Repair, filling and unresolved meaning"],
  ["05", "Stewardship", "What should remain unexcavated"]
] as const;

export function GobekliPortalIntro() {
  return (
    <section className="gobekli-threshold" aria-labelledby="gobekli-threshold-title">
      <div className="gobekli-threshold-copy">
        <p className="eyebrow">Göbekli Tepe · Deep portal prototype</p>
        <EvidenceBadge status="established" />
        <h2 id="gobekli-threshold-title">Before the city, people were already building worlds together.</h2>
        <p>
          This is not a journey toward one recovered religion. It is an encounter with a changing place where
          monumental gathering, habitation, food, stone and images overlapped across centuries.
        </p>
        <div className="gobekli-boundary">
          <span>Portal covenant</span>
          <strong>Recurring human questions do not mean identical ancient answers.</strong>
        </div>
      </div>

      <div className="gobekli-threshold-map" aria-label="Five planned Göbekli Tepe portal chapters">
        {chapters.map(([number, label, description], index) => (
          <a href={index === 1 ? "#circle-of-presences" : `#gobekli-chapter-${index + 1}`} key={number}>
            <span>{number}</span>
            <div><strong>{label}</strong><small>{description}</small></div>
            <i aria-hidden="true">↘</i>
          </a>
        ))}
      </div>
    </section>
  );
}

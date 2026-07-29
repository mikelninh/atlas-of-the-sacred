import type { Site } from "@/types/content";

export const gobekliTepe: Site = {
  id: "gobekli-tepe",
  slug: "gobekli-tepe",
  name: "Göbekli Tepe",
  locationLabel: "Şanlıurfa Province · Türkiye",
  heroImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gobeklitepe_Panorama.jpg",
  heroAlt: "Archaeological photograph of the carved pillars and enclosures of Göbekli Tepe beneath the protective canopy",
  poeticThesis: "Meaning gathers us.",
  interpretiveQuestion: "What becomes possible when people gather around something larger than themselves?",
  visualLabel: "Archaeological photograph · Wikimedia Commons · see image credits",
  modules: [
    {
      id: "neolithic-landscape",
      eyebrow: "Chapter 01 · Before one hill",
      title: "A landscape of changing communities",
      claimIds: ["gobekli-chronology", "gobekli-regional-network", "gobekli-apparent-domestic"]
    },
    {
      id: "circle-of-presences",
      eyebrow: "Chapter 02 · Stone, body, relation",
      title: "The circle of presences",
      claimIds: ["gobekli-monumental-gathering", "gobekli-anthropomorphic-pillars", "gobekli-animal-imagery"]
    },
    {
      id: "work-of-gathering",
      eyebrow: "Chapter 03 · What gathering required",
      title: "Stone, food and coordinated work",
      claimIds: ["gobekli-local-quarries", "gobekli-cereal-processing", "gobekli-social-organisation-open"]
    },
    {
      id: "building-biographies",
      eyebrow: "Chapter 04 · Buildings change",
      title: "No single ending, no single meaning",
      claimIds: ["gobekli-building-biographies", "gobekli-meaning-open"]
    },
    {
      id: "stewardship",
      eyebrow: "Chapter 05 · Discovery has limits",
      title: "What should remain unexcavated?",
      claimIds: ["gobekli-conservation-priority"]
    }
  ]
};

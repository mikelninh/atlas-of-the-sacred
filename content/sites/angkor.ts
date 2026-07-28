import type { Site } from "@/types/content";

export const angkor: Site = {
  id: "angkor",
  slug: "angkor",
  name: "Angkor",
  locationLabel: "Siem Reap · Cambodia",
  heroImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Angkor_Wat_with_its_reflection_(cropped).jpg",
  heroAlt: "Archaeological photograph of Angkor Wat reflected in water at sunrise",
  poeticThesis: "Let the cosmos flow.",
  interpretiveQuestion: "Can an entire inhabited landscape become an expression of order?",
  visualLabel: "Archaeological photograph · Wikimedia Commons · see image credits",
  modules: [{ id: "field-note", eyebrow: "Common Thread · 06", title: "Water, city, temple and living heritage", claimIds: ["angkor-hydraulic-cosmos"] }]
};

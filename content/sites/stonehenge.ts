import type { Site } from "@/types/content";

export const stonehenge: Site = {
  id: "stonehenge",
  slug: "stonehenge",
  name: "Stonehenge",
  locationLabel: "Wiltshire · England",
  heroImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Stonehenge_at_Sunrise.jpg",
  heroAlt: "Archaeological photograph of Stonehenge in dawn mist",
  poeticThesis: "Time is sacred.",
  interpretiveQuestion: "How does watching the sky change the way a community inhabits time?",
  visualLabel: "Archaeological photograph · Wikimedia Commons · see image credits",
  modules: [{ id: "field-note", eyebrow: "Common Thread · 02", title: "A landscape made for memory and return", claimIds: ["stonehenge-ceremonial-landscape"] }]
};

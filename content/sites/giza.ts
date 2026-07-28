import type { Site } from "@/types/content";

export const giza: Site = {
  id: "giza",
  slug: "giza",
  name: "Giza",
  locationLabel: "Giza Plateau · Egypt",
  heroImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Giza_Pyramids_Panorama.jpg",
  heroAlt: "Archaeological photograph of the Giza pyramid complex at sunrise",
  poeticThesis: "Make order endure.",
  interpretiveQuestion: "What do we build today that is meant to outlive us—and whose values will it preserve?",
  visualLabel: "Archaeological photograph · Wikimedia Commons · see image credits",
  modules: [
    {
      id: "construction",
      eyebrow: "01 · Build",
      title: "Construction as a living system",
      claimIds: [
        "giza-scale-materials",
        "giza-tura-transport",
        "giza-worker-city",
        "giza-construction-method-open"
      ]
    },
    {
      id: "nile-landscape",
      eyebrow: "02 · Landscape",
      title: "Before the desert view",
      claimIds: ["giza-ahramat-branch", "giza-tura-transport"]
    },
    {
      id: "royal-complex",
      eyebrow: "03 · Ritual geography",
      title: "The pyramid was never alone",
      claimIds: ["giza-khufu-tomb", "giza-royal-complex", "giza-complex-route", "giza-subsidiary-pyramids", "giza-boat-pits"]
    },
    {
      id: "alignment",
      eyebrow: "04 · Sky",
      title: "Making north visible in stone",
      claimIds: ["giza-cardinal-alignment", "giza-alignment-method"]
    },
    {
      id: "interior",
      eyebrow: "05 · Within",
      title: "A journey through compression, ascent and mystery",
      claimIds: [
        "giza-known-interior",
        "giza-big-void",
        "giza-north-face-corridor",
        "giza-void-purpose"
      ]
    }
  ]
};

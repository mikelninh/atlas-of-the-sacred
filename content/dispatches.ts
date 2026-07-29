import type { DiscoveryDispatch } from "@/types/dispatch";

export const dispatches = {
  "ahramat-river-branch": {
    id: "ahramat-river-branch",
    slug: "ahramat-river-branch",
    title: "The river beside the pyramids returns to the map",
    dek: "Geophysics and sediment cores strengthen the case that many Egyptian pyramid fields once faced an active Nile branch rather than an empty desert margin.",
    sourceYear: 2024,
    atlasPublishedOn: "2026-07-29",
    updatedOn: "2026-07-29",
    readTime: "4 min",
    evidenceStatus: "probable",
    editorialState: "published",
    siteIds: ["giza"],
    claimIds: ["giza-ahramat-branch", "giza-royal-complex"],
    sourceIds: ["nature-ahramat", "digital-giza-faq"],
    whatChanged: "A combined remote-sensing, geophysical and sediment study reconstructed an extinct Nile channel running beside a long chain of pyramid fields. The work gives a stronger physical basis to interpret valley temples and causeway endings in relation to an ancient river edge.",
    whyItMatters: "The familiar image of pyramids isolated in dry desert is a modern landscape. Restoring water, floodplain and harbor access changes how we understand transport, ceremonial approach and the placement of royal complexes.",
    evidenceSupports: [
      "An extinct Nile branch existed beside numerous pyramid fields.",
      "Several causeways terminate near the reconstructed branch at valley temples.",
      "The original monumental landscape was more connected to water and floodplain than the present view suggests."
    ],
    headlinesOverreach: [
      "The study does not show that the pyramid plateaus were underwater.",
      "It does not demonstrate that water directly raised blocks up pyramid faces.",
      "It does not reduce every pyramid location to one single environmental cause."
    ],
    openQuestion: "How did the river branch, harbors and seasonal water levels vary across individual pyramid projects and construction phases?"
  },
  "north-face-corridor": {
    id: "north-face-corridor",
    slug: "north-face-corridor",
    title: "A corridor behind the north-face chevrons becomes measurable",
    dek: "Muon measurements and endoscopic observation turned an anomaly inside Khufu’s Pyramid into a characterised corridor—while leaving its ancient function unresolved.",
    sourceYear: 2023,
    atlasPublishedOn: "2026-07-29",
    updatedOn: "2026-07-29",
    readTime: "3 min",
    evidenceStatus: "established",
    editorialState: "published",
    siteIds: ["giza"],
    claimIds: ["giza-north-face-corridor", "giza-void-purpose"],
    sourceIds: ["nature-north-corridor"],
    whatChanged: "Researchers characterised a corridor-shaped structure behind the chevrons on the pyramid’s north face as roughly nine metres long with a transverse section of about two by two metres. A small endoscopic view confirmed an empty internal space.",
    whyItMatters: "The result shows how non-destructive sensing can move from anomaly to geometry. It also offers new evidence for studying how the north-face chevrons and surrounding masonry manage space or load.",
    evidenceSupports: [
      "A corridor-shaped space exists behind the north-face chevrons.",
      "Its approximate length and cross-section have been measured.",
      "The space can be investigated without destructive excavation."
    ],
    headlinesOverreach: [
      "The corridor is not established as a hidden entrance.",
      "No secret archive, treasure or burial was detected.",
      "A connection to the Big Void has not been demonstrated."
    ],
    openQuestion: "Was the corridor primarily structural, constructional, access-related, symbolic—or some combination not yet recoverable from the available evidence?"
  },
  "big-void-muon-discovery": {
    id: "big-void-muon-discovery",
    slug: "big-void-muon-discovery",
    title: "Muon imaging reveals a large void—and leaves its purpose open",
    dek: "Three independent cosmic-ray muon techniques detected a major space above the Grand Gallery. The discovery is established; the story we tell about it is not.",
    sourceYear: 2017,
    atlasPublishedOn: "2026-07-29",
    updatedOn: "2026-07-29",
    readTime: "4 min",
    evidenceStatus: "established",
    editorialState: "published",
    siteIds: ["giza"],
    claimIds: ["giza-big-void", "giza-void-purpose"],
    sourceIds: ["nature-big-void"],
    whatChanged: "Three muon-detection methods independently identified a void at least thirty metres long above the Grand Gallery. The convergence of separate instruments made the existence of a large low-density region a strong result rather than a single-device anomaly.",
    whyItMatters: "The discovery expanded the known internal architecture of the Great Pyramid without opening the masonry. It demonstrated that particle physics can reveal large hidden structural features while preserving the monument.",
    evidenceSupports: [
      "A large void exists above the Grand Gallery.",
      "The detected feature has a minimum length of about thirty metres.",
      "Independent muon technologies produced compatible results."
    ],
    headlinesOverreach: [
      "The measurements do not reveal the void’s contents or exact shape.",
      "They do not establish an accessible chamber, royal burial or treasure room.",
      "Scientific uncertainty is not evidence for whichever dramatic explanation attracts the most attention."
    ],
    openQuestion: "What geometry, construction context and comparative evidence would distinguish a structural space from a passage, chamber or other architectural function?"
  }
} satisfies Record<string, DiscoveryDispatch>;

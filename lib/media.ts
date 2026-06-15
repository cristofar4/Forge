/**
 * Real photography referenced from public CDNs and loaded directly in the
 * visitor's browser. Each image flows through <SmartImage>, which renders a
 * branded glass fallback if a URL is ever unreachable, so the layout never breaks.
 */

const ux = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const img = {
  // Atmosphere
  heroAtmos: ux("1535378620166-273708d44e4c", 2000),
  circuit: ux("1518770660439-4636190af475", 1800),
  dataCore: ux("1620712943543-bcc4688e7485", 1600),

  // Robots / humanoids
  humanoid: ux("1561557944-6e7860d1a7eb", 1600),
  humanoidB: ux("1620712943543-bcc4688e7485", 1400),
  armFactory: ux("1565514020179-026b92b84bb6", 1600),
  cobot: ux("1581092160562-40aa08e78837", 1600),
  drone: ux("1473968512647-3e447244af8f", 1400),
  medical: ux("1581595219315-a187dd40c322", 1500),
  logistics: ux("1586528116311-ad8dd3c8310d", 1600),
  security: ux("1563207153-f403bf289096", 1400),

  // Research / lab
  lab: ux("1581091226825-a6a2a5aee158", 1600),
  vision: ux("1535378917042-10a22c95931a", 1500),
  neural: ux("1551288049-bebda4e38f71", 1500),
  engineer: ux("1581092918056-0c4c3acd3789", 1500),

  // Smart cities / industry
  city: ux("1480714378408-67cf0d13bc1b", 1800),
  factory: ux("1504917595217-d4dc5ebe6122", 1600),

  // People / culture
  team: ux("1522071820081-009f0129c71c", 1600),
  culture: ux("1531482615713-2afd69097998", 1600),
  workshop: ux("1559136555-9303baea8ebd", 1500),
} as const;

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: "Humanoid" | "Industrial" | "Research" | "Field";
  tall?: boolean;
  wide?: boolean;
};

export const galleryItems: GalleryItem[] = [
  { id: "p1", src: img.humanoid, title: "Atlas X in motion", category: "Humanoid", tall: true },
  { id: "p2", src: img.armFactory, title: "Titan assembly cell", category: "Industrial", wide: true },
  { id: "p3", src: img.lab, title: "Perception lab", category: "Research" },
  { id: "p4", src: img.cobot, title: "Collaborative line", category: "Industrial" },
  { id: "p5", src: img.vision, title: "Machine vision array", category: "Research", tall: true },
  { id: "p6", src: img.logistics, title: "Logistics One fleet", category: "Field", wide: true },
  { id: "p7", src: img.humanoidB, title: "Nova interaction study", category: "Humanoid" },
  { id: "p8", src: img.drone, title: "Aerial survey unit", category: "Field" },
  { id: "p9", src: img.neural, title: "Neural core training", category: "Research" },
  { id: "p10", src: img.factory, title: "Munich gigafactory", category: "Industrial", tall: true },
  { id: "p11", src: img.security, title: "Guardian night patrol", category: "Field" },
  { id: "p12", src: img.engineer, title: "Calibration bay", category: "Research", wide: true },
];

/** Real ambient video over a real poster; degrades to the poster if blocked. */
export const ambientVideo = {
  src: "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-working-in-a-factory-44900-large.mp4",
  poster: img.armFactory,
};

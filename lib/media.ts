/**
 * Local vendored artwork served from /public. Same origin, so it always loads
 * with no dependency on any external image host. <SmartImage> still keeps a
 * branded panel as a last resort.
 */

export const img = {
  heroAtmos: "/img/atlas.svg",
  circuit: "/img/neural.svg",
  dataCore: "/img/neural.svg",

  humanoid: "/img/atlas.svg",
  humanoidB: "/img/nova.svg",
  armFactory: "/img/titan.svg",
  cobot: "/img/factory.svg",
  drone: "/img/drone.svg",
  medical: "/img/medi.svg",
  logistics: "/img/logistics.svg",
  security: "/img/guardian.svg",

  lab: "/img/lab.svg",
  vision: "/img/vision.svg",
  neural: "/img/neural.svg",
  engineer: "/img/lab.svg",

  city: "/img/city.svg",
  factory: "/img/factory.svg",

  team: "/img/neural.svg",
  culture: "/img/lab.svg",
  workshop: "/img/factory.svg",
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
  { id: "p1", src: "/img/atlas.svg", title: "Atlas X in motion", category: "Humanoid", tall: true },
  { id: "p2", src: "/img/titan.svg", title: "Titan assembly cell", category: "Industrial", wide: true },
  { id: "p3", src: "/img/lab.svg", title: "Perception lab", category: "Research" },
  { id: "p4", src: "/img/factory.svg", title: "Collaborative line", category: "Industrial" },
  { id: "p5", src: "/img/vision.svg", title: "Machine vision array", category: "Research", tall: true },
  { id: "p6", src: "/img/logistics.svg", title: "Logistics One fleet", category: "Field", wide: true },
  { id: "p7", src: "/img/nova.svg", title: "Nova interaction study", category: "Humanoid" },
  { id: "p8", src: "/img/drone.svg", title: "Aerial survey unit", category: "Field" },
  { id: "p9", src: "/img/neural.svg", title: "Neural core training", category: "Research" },
  { id: "p10", src: "/img/city.svg", title: "Smart city deployment", category: "Field", tall: true },
  { id: "p11", src: "/img/guardian.svg", title: "Guardian night patrol", category: "Field" },
  { id: "p12", src: "/img/medi.svg", title: "Medi Care rounds", category: "Research", wide: true },
];

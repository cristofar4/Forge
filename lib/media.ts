/**
 * Real photography loaded directly in the visitor's browser. We use a themed
 * image source with a deterministic seed so the same picture loads every time.
 * <SmartImage> falls back to a second real source, then a branded panel, so a
 * picture always appears.
 */

const lf = (kw: string, lock: number, w = 1280, h = 920) =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${lock}`;

export const img = {
  heroAtmos: lf("robot,technology", 21, 1600, 1100),
  circuit: lf("circuit,technology", 22),
  dataCore: lf("server,data,center", 23),

  humanoid: lf("robot,humanoid", 31),
  humanoidB: lf("robot,android", 32),
  armFactory: lf("robot,factory,arm", 33),
  cobot: lf("robot,industrial", 34),
  drone: lf("drone,technology", 35),
  medical: lf("medical,technology", 36),
  logistics: lf("warehouse,logistics", 37),
  security: lf("security,camera", 38),

  lab: lf("laboratory,technology", 41),
  vision: lf("camera,lens,technology", 42),
  neural: lf("network,technology,abstract", 43),
  engineer: lf("engineer,technology", 44),

  city: lf("city,night,skyline", 51),
  factory: lf("factory,industrial", 52),

  team: lf("team,office,technology", 61),
  culture: lf("office,people,technology", 62),
  workshop: lf("workshop,engineering", 63),
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
  { id: "p1", src: lf("robot,humanoid", 71), title: "Atlas X in motion", category: "Humanoid", tall: true },
  { id: "p2", src: lf("robot,factory,arm", 72), title: "Titan assembly cell", category: "Industrial", wide: true },
  { id: "p3", src: lf("laboratory,technology", 73), title: "Perception lab", category: "Research" },
  { id: "p4", src: lf("robot,industrial", 74), title: "Collaborative line", category: "Industrial" },
  { id: "p5", src: lf("camera,lens,technology", 75), title: "Machine vision array", category: "Research", tall: true },
  { id: "p6", src: lf("warehouse,logistics", 76), title: "Logistics One fleet", category: "Field", wide: true },
  { id: "p7", src: lf("robot,android", 77), title: "Nova interaction study", category: "Humanoid" },
  { id: "p8", src: lf("drone,technology", 78), title: "Aerial survey unit", category: "Field" },
  { id: "p9", src: lf("network,technology,abstract", 79), title: "Neural core training", category: "Research" },
  { id: "p10", src: lf("factory,industrial", 80), title: "Munich gigafactory", category: "Industrial", tall: true },
  { id: "p11", src: lf("security,camera", 81), title: "Guardian night patrol", category: "Field" },
  { id: "p12", src: lf("engineer,technology", 82), title: "Calibration bay", category: "Research", wide: true },
];

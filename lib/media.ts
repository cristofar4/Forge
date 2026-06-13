/**
 * Real photography & video, referenced from public CDNs and loaded directly in
 * the visitor's browser. The build sandbox is network-restricted, so assets are
 * not vendored locally; every <SmartImage> degrades to a branded fallback panel
 * if a URL is ever unreachable, so the composition never breaks.
 */

/** Build a tuned Unsplash delivery URL. */
const ux = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${
    h ? `&h=${h}` : ""
  }`;

export const images = {
  // Atmosphere & craft
  shopInterior: ux("1585747860715-2ba37e788b70", 1800),
  barberChair: ux("1521590832167-7bcbfaaa1ca4", 1600),
  razorShave: ux("1599351431202-1e0f0137899a", 1600),
  beardTrim: ux("1605497788044-5a32c7078486", 1400),
  clippers: ux("1622286342621-4bd786c2447c", 1400),
  tools: ux("1503951914875-452162b0f3f1", 1600),
  pomade: ux("1621607512214-68297480165e", 1200),
  detailHands: ux("1567894340315-735d7c361db0", 1400),

  // Atelier / about
  craftWide: ux("1622287162716-f311baa1a2b8", 2000),
  portraitMood: ux("1503443207922-dff7d543fd0e", 1400),
} as const;

/** Editorial gallery — shot like a fashion campaign. */
export const galleryShots: {
  id: string;
  src: string;
  title: string;
  meta: string;
  tall?: boolean;
}[] = [
  {
    id: "g1",
    src: ux("1599351431202-1e0f0137899a", 1400),
    title: "The Straight Razor",
    meta: "Ritual № 01",
    tall: true,
  },
  {
    id: "g2",
    src: ux("1605497788044-5a32c7078486", 1400),
    title: "Sculpted Beard",
    meta: "Form & Line",
  },
  {
    id: "g3",
    src: ux("1503951914875-452162b0f3f1", 1400),
    title: "Heritage Tools",
    meta: "Steel & Bone",
  },
  {
    id: "g4",
    src: ux("1521590832167-7bcbfaaa1ca4", 1400),
    title: "The Throne",
    meta: "Mid-Century Leather",
    tall: true,
  },
  {
    id: "g5",
    src: ux("1622286342621-4bd786c2447c", 1400),
    title: "Precision Fade",
    meta: "Tapered Geometry",
  },
  {
    id: "g6",
    src: ux("1585747860715-2ba37e788b70", 1400),
    title: "The Atelier",
    meta: "Mayfair Light",
  },
  {
    id: "g7",
    src: ux("1567894340315-735d7c361db0", 1400),
    title: "Finishing Touch",
    meta: "Detail Work",
    tall: true,
  },
  {
    id: "g8",
    src: ux("1622287162716-f311baa1a2b8", 1400),
    title: "House Pomade",
    meta: "Signature Hold",
  },
];

/** Ambient craft video. Plays over a real poster; degrades to poster if blocked. */
export const ambientVideo = {
  src: "https://assets.mixkit.co/videos/preview/mixkit-barber-cutting-the-hair-of-a-client-43933-large.mp4",
  poster: images.razorShave,
};

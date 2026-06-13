import { images } from "@/lib/media";

const ux = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export type Service = {
  index: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  includes: string[];
  image: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "The Signature Cut",
    tagline: "Architecture for the head",
    description:
      "A bespoke consultation followed by a precision scissor-and-clipper cut, finished with a hot-towel refresh and a tailored style. Engineered around your bone structure, never a template.",
    duration: "55 min",
    price: "£68",
    includes: ["Bespoke consultation", "Precision cut", "Hot towel", "Style & finish"],
    image: ux("1503951914875-452162b0f3f1"),
  },
  {
    index: "02",
    title: "The Royal Shave",
    tagline: "The lost art, restored",
    description:
      "A traditional straight-razor shave performed as ceremony — warm oils, hot towels, a hand-stropped blade and a cooling balm. Forty minutes of stillness and steel.",
    duration: "45 min",
    price: "£55",
    includes: ["Pre-shave oil", "Hot towel ritual", "Straight razor", "Cooling balm"],
    image: ux("1599351431202-1e0f0137899a"),
  },
  {
    index: "03",
    title: "Beard Sculpture",
    tagline: "Line, weight, intention",
    description:
      "Your beard, treated as form. Defined edges, balanced density and conditioning oils chosen for your hair — shaped freehand by a master's eye.",
    duration: "35 min",
    price: "£42",
    includes: ["Shape & line-up", "Razor detailing", "Conditioning oil", "Balm finish"],
    image: ux("1605497788044-5a32c7078486"),
  },
  {
    index: "04",
    title: "The Crown Ritual",
    tagline: "The full experience",
    description:
      "Our flagship. Cut, royal shave, scalp therapy and a finishing tonic — accompanied by a single-origin espresso or a dram of aged whisky. Ninety minutes of complete restoration.",
    duration: "90 min",
    price: "£140",
    includes: ["Signature cut", "Royal shave", "Scalp therapy", "Whisky / espresso"],
    image: images.barberChair,
  },
  {
    index: "05",
    title: "Grey Architecture",
    tagline: "Subtle, never obvious",
    description:
      "Bespoke colour and grey-blending for a result that reads as nature, not product. Matched to your tone and refined to vanish at the hairline.",
    duration: "60 min",
    price: "£75",
    includes: ["Tone matching", "Blend application", "Wash & treat", "Style"],
    image: ux("1622286342621-4bd786c2447c"),
  },
];

export type Master = {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  years: string;
  handle: string;
  image: string;
};

export const masters: Master[] = [
  {
    name: "Marcus Vane",
    role: "Founder · Master Barber",
    bio: "Trained on Savile Row, Marcus founded Crown & Blade to treat barbering as fine craft. His scissor work is studied; his shaves are legend.",
    specialty: "Scissor Architecture",
    years: "19 yrs",
    handle: "@marcus.vane",
    image: ux("1507003211169-0a1dd7228f2d"),
  },
  {
    name: "Elias Thorne",
    role: "Senior Master · The Razor",
    bio: "A purist of the blade. Elias restored the straight-razor shave to ceremony — patient, exact and quietly theatrical.",
    specialty: "Straight Razor",
    years: "14 yrs",
    handle: "@elias.thorne",
    image: ux("1500648767791-00dcc994a43e"),
  },
  {
    name: "Idris Calloway",
    role: "Master · Texture & Fade",
    bio: "Idris reads hair like a sculptor reads stone. His fades dissolve into nothing; his textured cuts move like they were always meant to.",
    specialty: "Precision Fades",
    years: "11 yrs",
    handle: "@idris.cuts",
    image: ux("1506794778202-cad84cf45f1d"),
  },
  {
    name: "Theo Marchetti",
    role: "Master · Beard & Colour",
    bio: "Equal parts barber and colourist. Theo's grey-blending is invisible and his beard work is architectural — Milan-trained, London-honed.",
    specialty: "Beard & Colour",
    years: "9 yrs",
    handle: "@theo.m",
    image: ux("1519085360753-af0119f7cbe7"),
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I have been groomed in three cities on two continents. Nothing comes close to the ritual at Crown & Blade. You arrive a man and leave a statement.",
    author: "Julian R.",
    role: "Creative Director",
  },
  {
    quote:
      "The royal shave is forty-five minutes of pure cinema. Elias works like a surgeon and a poet at once. I will never use a cartridge razor again.",
    author: "Dr. Adewale O.",
    role: "Consultant Surgeon",
  },
  {
    quote:
      "Marcus understood my hair in a single consultation in a way no barber ever has. The cut grows out perfectly. This is craft of the highest order.",
    author: "Henrik L.",
    role: "Architect",
  },
  {
    quote:
      "It does not feel like a barbershop. It feels like being let in on a secret. The whisky helps. The work is flawless.",
    author: "Sebastián V.",
    role: "Restaurateur",
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "19", label: "Years of craft" },
  { value: "42K", label: "Cuts perfected" },
  { value: "11", label: "Master barbers" },
  { value: "4.98", label: "Guest rating" },
];

export const ritual: { index: string; title: string; copy: string }[] = [
  {
    index: "01",
    title: "Consultation",
    copy: "We read your hair, your face and your life. Nothing is decided before it is understood.",
  },
  {
    index: "02",
    title: "Cleanse",
    copy: "A warm cleanse and scalp preparation — the canvas readied before the first cut.",
  },
  {
    index: "03",
    title: "Craft",
    copy: "Scissor, blade and clipper in the hands of a master. Precision measured in millimetres.",
  },
  {
    index: "04",
    title: "Finish",
    copy: "Styled, tonic-finished and sealed. You leave looking like the best version of yourself.",
  },
];

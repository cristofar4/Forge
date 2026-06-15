export const site = {
  name: "Forge",
  wordmark: "FORGE",
  tagline: "Intelligent machines for the physical world",
  founded: "2019",
  description:
    "Forge designs and builds intelligent robots for industry, healthcare, logistics, security, manufacturing and smart cities.",
  email: "hello@forge.systems",
  press: "press@forge.systems",
  phone: "+1 415 555 0199",
  phoneHref: "tel:+14155550199",
  socials: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export type NavItem = { label: string; href: string; index: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/", index: "01" },
  { label: "About", href: "/about", index: "02" },
  { label: "Robots", href: "/robots", index: "03" },
  { label: "Solutions", href: "/solutions", index: "04" },
  { label: "Research", href: "/research", index: "05" },
  { label: "Gallery", href: "/gallery", index: "06" },
  { label: "Careers", href: "/careers", index: "07" },
  { label: "Contact", href: "/contact", index: "08" },
];

export type Office = {
  city: string;
  country: string;
  role: string;
  address: string[];
  coords: string;
};

export const offices: Office[] = [
  {
    city: "San Francisco",
    country: "United States",
    role: "Global Headquarters",
    address: ["Pier 70, Building 12", "San Francisco, CA 94107"],
    coords: "37.76° N, 122.38° W",
  },
  {
    city: "Tokyo",
    country: "Japan",
    role: "Robotics Lab",
    address: ["Toranomon Hills, 39F", "Minato City, Tokyo 105-6339"],
    coords: "35.66° N, 139.74° E",
  },
  {
    city: "Munich",
    country: "Germany",
    role: "Manufacturing",
    address: ["Werksviertel 4", "81677 Munich"],
    coords: "48.13° N, 11.60° E",
  },
  {
    city: "Singapore",
    country: "Singapore",
    role: "Deployment Center",
    address: ["One North Crescent", "Singapore 138567"],
    coords: "1.30° N, 103.79° E",
  },
];

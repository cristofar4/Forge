export const site = {
  name: "Crown & Blade",
  monogram: "C&B",
  tagline: "The Art of the Modern Gentleman",
  established: "MMXIV",
  description:
    "An atelier of grooming craftsmanship — precision cuts, hot-towel rituals and master barbers.",
  address: {
    line1: "14 Marlowe Court",
    line2: "Mayfair, London W1K 4QH",
  },
  phone: "+44 20 7946 0381",
  phoneHref: "tel:+442079460381",
  email: "atelier@crownandblade.studio",
  hours: [
    { day: "Mon — Thu", time: "09:00 — 20:00" },
    { day: "Friday", time: "09:00 — 22:00" },
    { day: "Saturday", time: "08:00 — 22:00" },
    { day: "Sunday", time: "10:00 — 18:00" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export type NavItem = { label: string; href: string; index: string };

export const navItems: NavItem[] = [
  { label: "Atelier", href: "#about", index: "01" },
  { label: "Services", href: "#services", index: "02" },
  { label: "Gallery", href: "#gallery", index: "03" },
  { label: "Masters", href: "#team", index: "04" },
  { label: "Voices", href: "#testimonials", index: "05" },
  { label: "Visit", href: "#contact", index: "06" },
];

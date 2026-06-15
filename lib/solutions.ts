import { img } from "@/lib/media";

export type Solution = {
  id: string;
  icon: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  outcomes: { value: string; label: string }[];
  robots: string[];
};

export const solutions: Solution[] = [
  {
    id: "manufacturing",
    icon: "factory",
    name: "Manufacturing",
    headline: "Production lines that think",
    description:
      "Forge platforms bring precision, force and endurance to the factory floor. Lines reconfigure in software, quality climbs and downtime falls as machines learn the work alongside your people.",
    image: img.factory,
    outcomes: [
      { value: "3.2x", label: "Throughput gain" },
      { value: "0.02mm", label: "Assembly precision" },
      { value: "24/7", label: "Continuous duty" },
    ],
    robots: ["Titan Industrial", "Atlas X"],
  },
  {
    id: "healthcare",
    icon: "activity",
    name: "Healthcare",
    headline: "More time for patients",
    description:
      "From sterile delivery to patient guidance, Forge robots take on the logistics of care so clinical teams can focus on people. Every motion is gentle, aware and safe by design.",
    image: img.medical,
    outcomes: [
      { value: "41%", label: "Less staff transit" },
      { value: "99.9%", label: "Delivery accuracy" },
      { value: "Zero", label: "Contact errors" },
    ],
    robots: ["Medi Care Robot", "Nova Assistant"],
  },
  {
    id: "logistics",
    icon: "truck",
    name: "Logistics",
    headline: "Fulfillment at the speed of demand",
    description:
      "Swarms of mobile robots route inventory with centimeter accuracy and zero collisions. Your warehouse becomes a living system that optimizes itself with every order.",
    image: img.logistics,
    outcomes: [
      { value: "5x", label: "Order velocity" },
      { value: "2000", label: "Units per site" },
      { value: "99.99%", label: "Routing uptime" },
    ],
    robots: ["Logistics One"],
  },
  {
    id: "security",
    icon: "shield",
    name: "Security",
    headline: "A constant, calm presence",
    description:
      "Guardian units patrol perimeters across day and night, detecting anomalies through thermal and acoustic sensing. Teams get earlier warning and a privacy first record of everything that matters.",
    image: img.security,
    outcomes: [
      { value: "120m", label: "Detection range" },
      { value: "12 hrs", label: "Patrol per charge" },
      { value: "4s", label: "Alert latency" },
    ],
    robots: ["Guardian Security"],
  },
  {
    id: "smart-cities",
    icon: "building",
    name: "Smart Cities",
    headline: "Infrastructure that responds",
    description:
      "Forge fleets inspect, maintain and monitor the systems a city depends on. Data flows into a living digital twin so operators can see, predict and act across the whole environment.",
    image: img.city,
    outcomes: [
      { value: "62%", label: "Faster inspection" },
      { value: "Live", label: "Digital twin" },
      { value: "30%", label: "Lower maintenance cost" },
    ],
    robots: ["Guardian Security", "Logistics One"],
  },
  {
    id: "energy",
    icon: "zap",
    name: "Energy and Utilities",
    headline: "Work where people should not go",
    description:
      "Hazardous inspection, confined spaces and extreme conditions are routine for Forge platforms. Keep crews safe while uptime and coverage rise across your most critical assets.",
    image: img.engineer,
    outcomes: [
      { value: "100%", label: "Hazard coverage" },
      { value: "0", label: "Human risk exposure" },
      { value: "5x", label: "Inspection frequency" },
    ],
    robots: ["Atlas X", "Guardian Security"],
  },
];

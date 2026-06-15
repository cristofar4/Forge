import { img } from "@/lib/media";

export const milestones: { year: string; title: string; copy: string }[] = [
  {
    year: "2019",
    title: "Forge is founded",
    copy: "Six engineers set out to build robots that work in the world people actually live in.",
  },
  {
    year: "2020",
    title: "First walking prototype",
    copy: "Our balance control stack takes its first autonomous steps across uneven terrain.",
  },
  {
    year: "2021",
    title: "Forge Cortex",
    copy: "We ship the first version of our onboard reasoning engine, bringing perception and planning together.",
  },
  {
    year: "2022",
    title: "Titan enters production",
    copy: "Heavy manipulation moves from the lab to the factory floor with our first industrial customers.",
  },
  {
    year: "2024",
    title: "One million autonomous hours",
    copy: "Across deployed fleets, Forge robots cross a million hours of safe autonomous operation.",
  },
  {
    year: "2026",
    title: "Atlas X pilots open",
    copy: "Our general purpose humanoid begins pilot programs with partners across four continents.",
  },
];

export type Pillar = {
  id: string;
  label: string;
  title: string;
  copy: string;
  image: string;
  metric: { value: string; label: string };
};

export const pillars: Pillar[] = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    title: "A reasoning core for the body",
    copy: "Forge Cortex unifies perception, language and planning into a single model that lets a robot understand a task, break it into steps and adapt when the world changes.",
    image: img.neural,
    metric: { value: "40B", label: "Parameters in Cortex" },
  },
  {
    id: "vision",
    label: "Machine Vision",
    title: "Seeing in three dimensions",
    copy: "Stereo depth, lidar and tactile sensing fuse into a continuous spatial map. Our robots recognize objects, read scenes and track motion with superhuman consistency.",
    image: img.vision,
    metric: { value: "120 fps", label: "Perception rate" },
  },
  {
    id: "navigation",
    label: "Autonomous Navigation",
    title: "Moving with intent",
    copy: "From crowded hospital corridors to open warehouse floors, our navigation stack plans paths in real time, avoids people gracefully and never loses its place.",
    image: img.lab,
    metric: { value: "1 cm", label: "Localization grade" },
  },
  {
    id: "digital-twin",
    label: "Digital Twin",
    title: "Simulate before you ship",
    copy: "Every deployment lives as a living digital twin. We rehearse millions of scenarios in simulation, then mirror the real site so operators can see and predict everything.",
    image: img.dataCore,
    metric: { value: "10M", label: "Scenarios per day" },
  },
];

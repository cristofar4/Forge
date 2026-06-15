import { img } from "@/lib/media";

export type Robot = {
  id: string;
  name: string;
  class: string;
  tagline: string;
  summary: string;
  description: string;
  image: string;
  status: "Shipping" | "Pilot" | "Preorder";
  height: string;
  payload: string;
  runtime: string;
  topSpeed: string;
  specs: { label: string; value: string }[];
  capabilities: string[];
};

export const robots: Robot[] = [
  {
    id: "atlas-x",
    name: "Atlas X",
    class: "General Purpose Humanoid",
    tagline: "A body for the physical world",
    summary:
      "A bipedal humanoid built to operate in spaces designed for people, from warehouses to research floors.",
    description:
      "Atlas X is our flagship humanoid. Twenty eight degrees of freedom, whole body balance control and a perception stack that reasons about its surroundings in real time. It walks, climbs, lifts and manipulates objects with a dexterity that closes the gap between machines and people.",
    image: img.humanoid,
    status: "Pilot",
    height: "1.7 m",
    payload: "25 kg",
    runtime: "5 hrs",
    topSpeed: "2.5 m/s",
    specs: [
      { label: "Degrees of freedom", value: "28" },
      { label: "Actuators", value: "Electric, custom" },
      { label: "Sensing", value: "Lidar, stereo, tactile" },
      { label: "Compute", value: "Forge Cortex onboard" },
      { label: "Battery", value: "2.3 kWh swappable" },
      { label: "Mass", value: "82 kg" },
    ],
    capabilities: [
      "Dynamic bipedal locomotion over uneven ground",
      "Two handed manipulation of everyday objects",
      "Natural language task instruction",
      "Whole body collision awareness",
    ],
  },
  {
    id: "nova-assistant",
    name: "Nova Assistant",
    class: "Human Interaction Robot",
    tagline: "Presence you can talk to",
    summary:
      "An expressive assistant robot built for reception, guidance and care environments.",
    description:
      "Nova reads a room. With expressive motion, spatial audio and a conversational core, it greets visitors, answers questions and guides people through complex spaces. Nova turns a lobby, a clinic or a showroom into something that feels alive and attentive.",
    image: img.humanoidB,
    status: "Shipping",
    height: "1.4 m",
    payload: "8 kg",
    runtime: "9 hrs",
    topSpeed: "1.6 m/s",
    specs: [
      { label: "Display", value: "Expressive face array" },
      { label: "Audio", value: "Six microphone beam" },
      { label: "Languages", value: "32 conversational" },
      { label: "Navigation", value: "Autonomous indoor" },
      { label: "Battery", value: "1.1 kWh" },
      { label: "Mass", value: "44 kg" },
    ],
    capabilities: [
      "Real time conversation with memory",
      "Face and gesture recognition",
      "Autonomous wayfinding indoors",
      "Emotionally aware expression",
    ],
  },
  {
    id: "titan-industrial",
    name: "Titan Industrial",
    class: "Heavy Manipulation Platform",
    tagline: "Force, precision, endurance",
    summary:
      "A high payload manipulation platform for manufacturing and heavy industry.",
    description:
      "Titan brings industrial muscle with surgical precision. Its reinforced arm handles loads that would stop a conventional cobot, while force feedback keeps every motion accurate to a fraction of a millimeter. Built for around the clock duty on the factory floor.",
    image: img.armFactory,
    status: "Shipping",
    height: "2.1 m",
    payload: "120 kg",
    runtime: "Continuous",
    topSpeed: "3.0 m/s arm",
    specs: [
      { label: "Reach", value: "2.4 m" },
      { label: "Repeatability", value: "0.02 mm" },
      { label: "Force feedback", value: "6 axis" },
      { label: "Duty cycle", value: "24 / 7" },
      { label: "Power", value: "Wired three phase" },
      { label: "Mass", value: "340 kg" },
    ],
    capabilities: [
      "High payload pick and place",
      "Submillimeter assembly precision",
      "Adaptive force control",
      "Safe operation beside people",
    ],
  },
  {
    id: "guardian-security",
    name: "Guardian Security",
    class: "Autonomous Patrol Unit",
    tagline: "Eyes that never blink",
    summary:
      "An autonomous patrol robot for perimeter security and situational awareness.",
    description:
      "Guardian patrols continuously across day and night, detecting anomalies long before a human would. Thermal vision, acoustic sensing and a privacy first analytics core give security teams a calm, constant presence that escalates only when it matters.",
    image: img.security,
    status: "Pilot",
    height: "1.3 m",
    payload: "Sensor suite",
    runtime: "12 hrs",
    topSpeed: "4.0 m/s",
    specs: [
      { label: "Vision", value: "Thermal and optical" },
      { label: "Detection range", value: "120 m" },
      { label: "Audio", value: "Acoustic anomaly" },
      { label: "Sealing", value: "IP66 all weather" },
      { label: "Battery", value: "Auto docking" },
      { label: "Mass", value: "96 kg" },
    ],
    capabilities: [
      "Continuous autonomous patrol",
      "Thermal and night perception",
      "Anomaly detection and escalation",
      "Self charging at dock",
    ],
  },
  {
    id: "medi-care",
    name: "Medi Care Robot",
    class: "Clinical Support Robot",
    tagline: "Care, delivered with precision",
    summary:
      "A clinical support robot for hospitals, easing the load on care teams.",
    description:
      "Medi Care moves medication, samples and supplies through busy hospital corridors so clinicians can stay with their patients. Sterile by design, gentle in motion and aware of every person around it, it is the quiet teammate that gives time back to care.",
    image: img.medical,
    status: "Preorder",
    height: "1.5 m",
    payload: "40 kg",
    runtime: "10 hrs",
    topSpeed: "1.4 m/s",
    specs: [
      { label: "Compartments", value: "Sterile, locked" },
      { label: "Navigation", value: "Crowd aware" },
      { label: "Hygiene", value: "Self sanitizing" },
      { label: "Integration", value: "Hospital systems" },
      { label: "Battery", value: "1.4 kWh" },
      { label: "Mass", value: "61 kg" },
    ],
    capabilities: [
      "Autonomous delivery across floors",
      "Secure access controlled storage",
      "Elevator and door integration",
      "Gentle motion among patients",
    ],
  },
  {
    id: "logistics-one",
    name: "Logistics One",
    class: "Mobile Fulfillment Robot",
    tagline: "The warehouse, in motion",
    summary:
      "A mobile fulfillment robot that moves inventory at the speed of demand.",
    description:
      "Logistics One turns a warehouse into a living system. Hundreds of units coordinate as a swarm, routing inventory with zero collisions and learning the fastest path with every order. Throughput climbs, errors fall and the floor runs itself.",
    image: img.logistics,
    status: "Shipping",
    height: "0.4 m",
    payload: "600 kg",
    runtime: "16 hrs",
    topSpeed: "5.0 m/s",
    specs: [
      { label: "Fleet size", value: "Up to 2000" },
      { label: "Coordination", value: "Swarm routing" },
      { label: "Localization", value: "Centimeter grade" },
      { label: "Charging", value: "Opportunistic" },
      { label: "Lift", value: "Powered deck" },
      { label: "Mass", value: "180 kg" },
    ],
    capabilities: [
      "Swarm coordinated routing",
      "Collision free navigation",
      "Self optimizing throughput",
      "Twenty four hour operation",
    ],
  },
];

export const robotById = (id: string) => robots.find((r) => r.id === id);

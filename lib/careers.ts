export type Position = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
};

export const positions: Position[] = [
  { id: "p1", title: "Senior Robotics Engineer", team: "Hardware", location: "San Francisco", type: "Full time" },
  { id: "p2", title: "Perception Research Scientist", team: "AI Research", location: "Tokyo", type: "Full time" },
  { id: "p3", title: "Controls Engineer, Locomotion", team: "Controls", location: "San Francisco", type: "Full time" },
  { id: "p4", title: "Manufacturing Process Lead", team: "Operations", location: "Munich", type: "Full time" },
  { id: "p5", title: "Embedded Systems Engineer", team: "Firmware", location: "Remote", type: "Full time" },
  { id: "p6", title: "Product Designer, Interfaces", team: "Design", location: "San Francisco", type: "Full time" },
  { id: "p7", title: "Field Deployment Engineer", team: "Deployment", location: "Singapore", type: "Full time" },
  { id: "p8", title: "Machine Learning Engineer", team: "AI Research", location: "Remote", type: "Full time" },
];

export const benefits: { title: string; copy: string }[] = [
  { title: "Equity for everyone", copy: "Every employee owns a meaningful piece of what we build together." },
  { title: "World class health", copy: "Comprehensive medical, dental and vision coverage for you and your family." },
  { title: "Build real machines", copy: "Ship hardware that operates in the physical world, not slides in a deck." },
  { title: "Open research time", copy: "Dedicated time and budget to explore the ideas that matter to you." },
  { title: "Relocation support", copy: "We help you and your family land wherever the work takes you." },
  { title: "Rest that counts", copy: "Generous, genuinely respected time away to recharge." },
];

export const culture: string[] = [
  "We build for the real world",
  "Bias toward shipping",
  "Curiosity over ego",
  "Safety is a feature",
  "Earn trust every day",
];

export const hiringSteps: { step: string; title: string; copy: string }[] = [
  { step: "01", title: "Apply", copy: "Send us your story. We read every application from a real person." },
  { step: "02", title: "Conversation", copy: "A relaxed call to understand what you want to build and why." },
  { step: "03", title: "Deep dive", copy: "A technical session grounded in real problems we are solving today." },
  { step: "04", title: "Onsite", copy: "Meet the team, see the robots and feel the floor for yourself." },
  { step: "05", title: "Offer", copy: "We move fast. A clear, generous offer and a warm welcome." },
];

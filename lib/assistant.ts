export type Intent = {
  id: string;
  keywords: string[];
  answer: string;
  link?: { label: string; href: string };
};

export const welcome =
  "Hello, I am Vex, the Forge assistant. I can tell you about our robots, our solutions and our research, or guide you anywhere on the site. What would you like to explore?";

export const suggestions: string[] = [
  "What robots do you build?",
  "Tell me about Atlas X",
  "Which industries do you serve?",
  "Are you hiring?",
  "How do I book a demo?",
];

export const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    answer:
      "Welcome to Forge. We design intelligent robots for the physical world. Ask me about our machines, the industries we serve, or our research.",
  },
  {
    id: "about",
    keywords: ["about", "company", "who", "forge", "mission", "founded", "story"],
    answer:
      "Forge was founded in 2019 to build robots that work in the world people actually live in. We unite advanced hardware with our Cortex reasoning core to deliver machines for industry, healthcare, logistics, security, manufacturing and smart cities.",
    link: { label: "Read our story", href: "/about" },
  },
  {
    id: "robots",
    keywords: ["robot", "robots", "products", "machines", "lineup", "models", "build"],
    answer:
      "We build six robots today. Atlas X, our general purpose humanoid. Nova Assistant for human interaction. Titan Industrial for heavy manipulation. Guardian Security for autonomous patrol. Medi Care for hospitals. And Logistics One for fulfillment.",
    link: { label: "View all robots", href: "/robots" },
  },
  {
    id: "atlas",
    keywords: ["atlas", "humanoid", "bipedal", "walking"],
    answer:
      "Atlas X is our flagship humanoid. With twenty eight degrees of freedom and whole body balance control, it walks, climbs, lifts and manipulates objects in spaces built for people. It is currently in pilot programs worldwide.",
    link: { label: "Explore Atlas X", href: "/robots" },
  },
  {
    id: "solutions",
    keywords: ["solution", "industry", "industries", "sector", "healthcare", "logistics", "security", "manufacturing", "city", "cities", "use case"],
    answer:
      "Forge serves manufacturing, healthcare, logistics, security, smart cities and energy. Each deployment pairs the right robots with our Cortex core and a living digital twin of your site.",
    link: { label: "See solutions", href: "/solutions" },
  },
  {
    id: "research",
    keywords: ["research", "ai", "artificial intelligence", "vision", "navigation", "cortex", "innovation", "twin", "lab"],
    answer:
      "Our research spans four pillars. The Cortex reasoning core, machine vision in three dimensions, autonomous navigation, and digital twin simulation. Together they let a robot understand a task and adapt when the world changes.",
    link: { label: "Visit the lab", href: "/research" },
  },
  {
    id: "careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "hire", "work", "position", "apply", "join"],
    answer:
      "We are growing fast and hiring across hardware, AI research, controls, manufacturing and deployment. Every role comes with meaningful equity and the chance to ship real machines.",
    link: { label: "See open roles", href: "/careers" },
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "office", "offices", "location", "reach", "talk", "address"],
    answer:
      "You can reach us at hello@forge.systems, or visit our offices in San Francisco, Tokyo, Munich and Singapore. The contact page has everything you need.",
    link: { label: "Contact us", href: "/contact" },
  },
  {
    id: "demo",
    keywords: ["demo", "pilot", "trial", "test", "evaluate", "book", "schedule"],
    answer:
      "We would love to show you what our robots can do. Tell us about your environment on the contact page and our deployment team will arrange a tailored demonstration.",
    link: { label: "Book a demo", href: "/contact" },
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "buy", "purchase", "quote", "much"],
    answer:
      "Forge platforms are tailored to each deployment, so pricing depends on your fleet size and integration needs. Share your goals on the contact page and we will prepare a proposal.",
    link: { label: "Request a quote", href: "/contact" },
  },
  {
    id: "gallery",
    keywords: ["gallery", "photos", "images", "pictures", "see", "look"],
    answer:
      "The gallery is the best way to see our machines in motion, from the lab to the field. Take a look.",
    link: { label: "Open the gallery", href: "/gallery" },
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "appreciate", "cheers", "great"],
    answer: "My pleasure. Ask me anything else, or I can guide you to the right page whenever you are ready.",
  },
];

const fallback =
  "That is a great question. I can tell you about our robots, our solutions across industry and healthcare, our research, or careers at Forge. Try asking about Atlas X or which industries we serve.";

export function respond(input: string): Intent {
  const text = input.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) {
      if (text.includes(k)) score += k.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best && bestScore > 0
    ? best
    : { id: "fallback", keywords: [], answer: fallback };
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Eye, Navigation, Layers, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { GlowButton } from "@/components/interactive/GlowButton";
import { pillars, milestones } from "@/lib/research";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

const pillarIcons: Record<string, LucideIcon> = {
  ai: Brain,
  vision: Eye,
  navigation: Navigation,
  "digital-twin": Layers,
};

export function ResearchPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Research and innovation"
        titleLines={["Inside the", "Forge lab."]}
        subtitle="Our research turns raw capability into intelligence. Four pillars define the work, from the reasoning core that thinks to the digital twins where every robot is born."
        image={img.lab}
      />

      <div className="bg-void">
        {pillars.map((p, i) => {
          const Icon = pillarIcons[p.id];
          const flip = i % 2 === 1;
          return (
            <section key={p.id} className="border-b border-ice/10 py-20 md:py-28">
              <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={cn(flip && "lg:order-2")}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl glass">
                    <SmartImage src={p.image} alt={p.title} className="h-full w-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
                    {p.id === "vision" && <VisionOverlay />}
                    {p.id === "navigation" && <PathOverlay />}
                    <div className="absolute bottom-4 left-4 rounded-lg glass px-3 py-2">
                      <span className="font-mono text-xs text-cyan">{p.metric.value}</span>
                      <span className="ml-2 text-[0.65rem] text-mist">{p.metric.label}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(flip && "lg:order-1")}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/30">
                    {Icon && <Icon className="h-6 w-6" strokeWidth={1.5} />}
                  </span>
                  <p className="eyebrow mt-5">{p.label}</p>
                  <h2 className="display mt-3 text-4xl text-ice md:text-5xl">{p.title}</h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">{p.copy}</p>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Interactive milestones */}
      <section className="bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="01" eyebrow="Milestones" lines={["A timeline of", "breakthroughs."]} />
          <InteractiveTimeline />
          <div className="mt-14">
            <GlowButton href="/careers" cursorText="Join">Build the future with us</GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}

function InteractiveTimeline() {
  const [active, setActive] = useState(milestones.length - 1);
  const m = milestones[active];
  return (
    <div className="mt-14">
      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ice/10" />
        {milestones.map((mile, i) => (
          <button
            key={mile.year}
            onClick={() => setActive(i)}
            data-cursor
            className="relative flex flex-col items-center gap-3"
          >
            <span
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full ring-1 transition-all",
                i === active ? "bg-cyan ring-cyan shadow-[0_0_14px_rgba(40,215,251,0.8)]" : "bg-void ring-ice/30",
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", i === active ? "bg-void" : "bg-ice/40")} />
            </span>
            <span className={cn("font-mono text-xs transition-colors", i === active ? "text-cyan" : "text-fade")}>
              {mile.year}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 min-h-[120px] rounded-2xl glass p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-display text-2xl text-ice md:text-3xl">{m.title}</h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">{m.copy}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VisionOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* corner brackets */}
      {["left-4 top-4 border-l-2 border-t-2", "right-4 top-4 border-r-2 border-t-2", "left-4 bottom-4 border-l-2 border-b-2", "right-4 bottom-4 border-r-2 border-b-2"].map((c) => (
        <span key={c} className={cn("absolute h-6 w-6 border-cyan/70", c)} />
      ))}
      {/* scanline */}
      <span className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-cyan/30 to-transparent" style={{ animation: "scanline 3s ease-in-out infinite" }} />
      {/* detection box */}
      <span className="absolute left-[22%] top-[34%] h-20 w-16 rounded border border-cyan/70">
        <span className="absolute -top-5 left-0 rounded bg-cyan/90 px-1.5 py-0.5 font-mono text-[0.55rem] text-void">UNIT 0.98</span>
      </span>
    </div>
  );
}

function PathOverlay() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
      <path d="M40 260 C 140 220, 120 120, 240 90 S 360 40, 370 30" fill="none" stroke="rgba(40,215,251,0.7)" strokeWidth="2" strokeDasharray="6 8" />
      <circle cx="40" cy="260" r="5" fill="#28d7fb" />
      <circle cx="370" cy="30" r="5" fill="#28d7fb" />
    </svg>
  );
}

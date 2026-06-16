"use client";

import { motion } from "framer-motion";
import { Brain, Eye, Waypoints, Orbit, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { GlowButton } from "@/components/interactive/GlowButton";

const items: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Brain, title: "Cortex Reasoning", copy: "A single onboard model unites perception, language and planning, so a robot understands a task and adapts when the world changes." },
  { icon: Eye, title: "Machine Vision", copy: "Stereo depth, lidar and tactile sensing fuse into a continuous three dimensional map of the world around it." },
  { icon: Waypoints, title: "Autonomous Navigation", copy: "Paths are planned in real time. Our robots move with intent and step around people with grace." },
  { icon: Orbit, title: "Whole Body Control", copy: "Balance and force control coordinate every joint, for motion that is powerful, precise and safe beside people." },
];

export function Capabilities() {
  return (
    <section className="relative bg-void py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="02"
            eyebrow="Built different"
            lines={["Intelligence in", "every joint."]}
          />
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Hardware and intelligence engineered together. Four systems that turn a
            machine into a teammate.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-void p-7 transition-colors duration-500 hover:bg-carbon"
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-cyan transition-all duration-700 group-hover:w-full" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/30 transition-shadow group-hover:shadow-[0_0_24px_-4px_rgba(40,215,251,0.6)]">
                <it.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl text-ice">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{it.copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <GlowButton href="/research" variant="ghost" cursorText="Lab">Inside the research lab</GlowButton>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { GlowButton } from "@/components/interactive/GlowButton";
import { pillars } from "@/lib/research";
import { SplitWords } from "@/components/typography/Reveal";

export function ResearchPreview() {
  return (
    <section className="relative overflow-clip bg-abyss py-24 md:py-36">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <ParallaxImage
            src={pillars[0].image}
            alt="Forge research lab"
            className="aspect-[5/4] w-full rounded-2xl"
            amount={0.12}
          />
        </div>

        <div className="lg:col-span-6">
          <SectionHeading index="04" eyebrow="Research and innovation" lines={["The mind", "behind the", "machine."]} />
          <p className="mt-8 max-w-md text-base leading-relaxed text-mist">
            <SplitWords text="Forge Cortex is our reasoning core, a model that brings perception, language and planning into one. It is how a robot understands what you ask and figures out how to do it." />
          </p>

          <ul className="mt-10 space-y-px overflow-hidden rounded-xl border border-ice/10">
            {pillars.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center justify-between bg-void/60 px-5 py-4"
              >
                <span className="text-sm text-ice">{p.label}</span>
                <span className="font-mono text-xs text-cyan">{p.metric.value}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10">
            <GlowButton href="/research" cursorText="Explore">Explore the research</GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}

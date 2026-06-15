"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SmartImage } from "@/components/media/SmartImage";
import { TiltCard } from "@/components/interactive/TiltCard";
import { GlowButton } from "@/components/interactive/GlowButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { robots, type Robot } from "@/lib/robots";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

export function RobotsPage() {
  const { scrollTo } = useSmoothScroll();

  return (
    <>
      <PageHero
        index="03"
        eyebrow="The lineup"
        titleLines={["A robot for every", "kind of work."]}
        subtitle="Six machines, one intelligence core. From a general purpose humanoid to a swarm of fulfillment robots, every Forge platform is built to operate safely and tirelessly in the real world."
        image={img.humanoid}
      />

      {/* quick nav */}
      <div className="sticky top-[68px] z-30 border-y border-ice/10 glass-strong">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {robots.map((r) => (
            <button
              key={r.id}
              onClick={() => scrollTo(`#${r.id}`, -90)}
              data-cursor
              className="shrink-0 rounded-full border border-ice/15 px-4 py-1.5 text-xs text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-void">
        {robots.map((r, i) => (
          <RobotRow key={r.id} robot={r} index={i} />
        ))}
      </div>
    </>
  );
}

function RobotRow({ robot: r, index }: { robot: Robot; index: number }) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  return (
    <section id={r.id} className="scroll-mt-28 border-b border-ice/10 py-20 md:py-28">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* media */}
        <div className={cn(flip && "lg:order-2")}>
          <TiltCard intensity={6}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl glass">
              <SmartImage src={r.image} alt={r.name} className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-cyan/15 px-3 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-cyan ring-1 ring-cyan/30">
                {r.status}
              </span>
              <span className="absolute right-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mist">
                0{index + 1}
              </span>
            </div>
          </TiltCard>
        </div>

        {/* content */}
        <div className={cn(flip && "lg:order-1")}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">{r.class}</p>
            <h2 className="display mt-3 text-5xl text-ice md:text-6xl">{r.name}</h2>
            <p className="mt-3 font-serif text-lg italic text-cyan">{r.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">{r.description}</p>

            {/* quick stats */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ice/10 bg-ice/[0.06] sm:grid-cols-4">
              {[
                { k: "Height", v: r.height },
                { k: "Payload", v: r.payload },
                { k: "Runtime", v: r.runtime },
                { k: "Top speed", v: r.topSpeed },
              ].map((s) => (
                <div key={s.k} className="bg-void px-4 py-4 text-center">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fade">{s.k}</p>
                  <p className="mt-1 text-sm text-ice">{s.v}</p>
                </div>
              ))}
            </div>

            {/* expandable */}
            <button
              onClick={() => setOpen((o) => !o)}
              data-cursor
              className="mt-8 flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-ice transition-colors hover:text-cyan"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ice/20">
                {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
              {open ? "Hide specifications" : "View specifications"}
            </button>

            <div className={cn("grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow mb-3">Specifications</p>
                    <dl className="divide-y divide-ice/10">
                      {r.specs.map((sp) => (
                        <div key={sp.label} className="flex items-center justify-between py-2.5">
                          <dt className="text-sm text-mist">{sp.label}</dt>
                          <dd className="font-mono text-sm text-ice">{sp.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Capabilities</p>
                    <ul className="space-y-3">
                      {r.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-sm text-mist">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-[0_0_8px_rgba(40,215,251,0.8)]" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <GlowButton href="/contact" variant="ghost" cursorText="Demo">Request a demo</GlowButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

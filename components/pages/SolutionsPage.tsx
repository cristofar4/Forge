"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/pages/PageHero";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { GlowButton } from "@/components/interactive/GlowButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { solutions } from "@/lib/solutions";
import { solutionIcons } from "@/components/icons";
import { img } from "@/lib/media";
import { cn } from "@/lib/utils";

export function SolutionsPage() {
  const { scrollTo } = useSmoothScroll();

  return (
    <>
      <PageHero
        index="04"
        eyebrow="Solutions"
        titleLines={["One platform.", "Every industry."]}
        subtitle="Forge robots adapt to the work in front of them. We pair the right machines with our Cortex core and a living digital twin of your site, then deploy alongside your team."
        image={img.factory}
      />

      <div className="sticky top-[68px] z-30 border-y border-ice/10 glass-strong">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {solutions.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(`#${s.id}`, -90)}
              data-cursor
              className="shrink-0 rounded-full border border-ice/15 px-4 py-1.5 text-xs text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-void">
        {solutions.map((s, i) => {
          const Icon = solutionIcons[s.icon];
          const flip = i % 2 === 1;
          return (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-ice/10 py-20 md:py-28">
              <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={cn(flip && "lg:order-2")}>
                  <ParallaxImage src={s.image} alt={s.name} className="aspect-[4/3] w-full rounded-2xl" amount={0.1} />
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
                  <p className="eyebrow mt-5">{s.name}</p>
                  <h2 className="display mt-3 text-4xl text-ice md:text-5xl">{s.headline}</h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">{s.description}</p>

                  <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-ice/10 bg-ice/[0.06]">
                    {s.outcomes.map((o) => (
                      <div key={o.label} className="bg-void px-3 py-5 text-center">
                        <div className="display text-2xl text-energy md:text-3xl">{o.value}</div>
                        <p className="mt-1 text-[0.7rem] leading-tight text-mist">{o.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-fade">Deployed</span>
                    {s.robots.map((rb) => (
                      <span key={rb} className="rounded-full border border-ice/15 px-3 py-1 text-xs text-mist">
                        {rb}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="bg-abyss py-20 text-center">
        <div className="container-x">
          <GlowButton href="/contact" cursorText="Talk">Discuss your deployment</GlowButton>
        </div>
      </section>
    </>
  );
}

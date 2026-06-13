"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { LuxeButton } from "@/components/interactive/LuxeButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="services" className="relative bg-obsidian-soft py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="02"
            eyebrow="The Craft"
            lines={["Services,", "engineered", "around you."]}
          />
          <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
            Hover a service to preview the experience. Every treatment is bespoke
            — never a template.
          </p>
        </div>

        {/* Desktop: interactive configurator */}
        <div className="mt-16 hidden grid-cols-12 gap-12 lg:grid">
          {/* List */}
          <ul className="col-span-7 -mt-2">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.index}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor
                    className="group flex w-full items-center justify-between border-b border-bone/10 py-7 text-left"
                  >
                    <div className="flex items-baseline gap-6">
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors",
                          isActive ? "text-gold" : "text-bone-dim",
                        )}
                      >
                        {s.index}
                      </span>
                      <span
                        className={cn(
                          "display text-4xl transition-all duration-500 xl:text-5xl",
                          isActive
                            ? "translate-x-3 text-gold"
                            : "text-bone group-hover:translate-x-1",
                        )}
                      >
                        {s.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span
                        className={cn(
                          "font-display text-2xl transition-colors",
                          isActive ? "text-bone" : "text-bone-dim",
                        )}
                      >
                        {s.price}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 transition-all duration-500",
                          isActive
                            ? "rotate-0 text-gold opacity-100"
                            : "-rotate-45 text-bone-dim opacity-0 group-hover:opacity-60",
                        )}
                        strokeWidth={1.5}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sticky preview */}
          <div className="col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={svc.index}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <SmartImage
                      src={svc.image}
                      alt={svc.title}
                      reveal={false}
                      className="h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-serif text-lg italic text-gold">
                    {svc.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {svc.includes.map((inc) => (
                      <span
                        key={inc}
                        className="rounded-full border border-bone/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-bone-soft"
                      >
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={svc.index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-6"
                >
                  <p className="text-sm leading-relaxed text-bone-soft">
                    {svc.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bone-dim">
                      <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
                      {svc.duration}
                    </span>
                    <LuxeButton
                      onClick={() => scrollTo("#booking")}
                      cursorText="Reserve"
                      className="px-6 py-3 text-[0.7rem]"
                    >
                      Reserve
                    </LuxeButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-12 space-y-6 lg:hidden">
          {services.map((s, i) => (
            <motion.article
              key={s.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              className="overflow-hidden rounded-[2px] border border-bone/10"
            >
              <div className="relative aspect-[16/10]">
                <SmartImage src={s.image} alt={s.title} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-xs text-gold">{s.index}</span>
                    <h3 className="font-display text-3xl text-bone">{s.title}</h3>
                  </div>
                  <span className="font-display text-2xl text-bone">{s.price}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="font-serif italic text-gold">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {s.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-bone-dim">
                    {s.duration}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { AtSign } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { TiltCard } from "@/components/interactive/TiltCard";
import { masters } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Team() {
  return (
    <section id="team" className="relative bg-obsidian-soft py-28 md:py-40">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            index="04"
            eyebrow="The Masters"
            lines={["Artists of", "the chair."]}
          />
          <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
            Hand-picked, endlessly trained, quietly obsessive. Choose your master
            — or let us pair you with the right hands.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {masters.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <TiltCard className="h-full">
                <article
                  data-cursor
                  data-cursor-text={m.name.split(" ")[0]}
                  className="relative aspect-[3/4.3] overflow-hidden rounded-[2px] bg-charcoal"
                >
                  <SmartImage
                    src={m.image}
                    alt={m.name}
                    reveal={false}
                    className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                    position="center 30%"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

                  {/* top meta */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <span className="font-mono text-xs text-gold">
                      0{i + 1}
                    </span>
                    <span className="rounded-full border border-bone/20 px-3 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-bone-soft backdrop-blur-sm">
                      {m.years}
                    </span>
                  </div>

                  {/* bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="eyebrow text-gold">{m.specialty}</p>
                    <h3 className="mt-2 font-display text-3xl leading-none text-bone">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs text-bone-dim">{m.role}</p>

                    {/* reveal-on-hover bio */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-bone-soft">
                          {m.bio}
                        </p>
                        <a
                          href="#"
                          className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gold"
                        >
                          <AtSign className="h-3.5 w-3.5" strokeWidth={1.5} />
                          {m.handle}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

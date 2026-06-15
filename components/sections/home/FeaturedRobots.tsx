"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { TiltCard } from "@/components/interactive/TiltCard";
import { GlowButton } from "@/components/interactive/GlowButton";
import { robots } from "@/lib/robots";

const featured = ["atlas-x", "titan-industrial", "logistics-one"]
  .map((id) => robots.find((r) => r.id === id)!)
  .filter(Boolean);

export function FeaturedRobots() {
  return (
    <section className="relative bg-abyss py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="02" eyebrow="The lineup" lines={["Meet the", "machines."]} />
          <GlowButton href="/robots" variant="ghost" cursorText="All six">View all six robots</GlowButton>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard>
                <Link href="/robots" data-cursor data-cursor-text={r.name.split(" ")[0]} className="block">
                  <article className="relative aspect-[4/5] overflow-hidden rounded-2xl glass">
                    <SmartImage src={r.image} alt={r.name} reveal={false} className="h-full w-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />

                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan">{r.class}</span>
                      <span className="rounded-full bg-cyan/15 px-3 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-cyan ring-1 ring-cyan/30">
                        {r.status}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="font-display text-3xl text-ice">{r.name}</h3>
                          <p className="mt-1 font-serif text-sm italic text-mist">{r.tagline}</p>
                        </div>
                        <ArrowUpRight className="h-6 w-6 text-cyan transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                      </div>
                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ice/10 pt-4">
                        <Spec k="Payload" v={r.payload} />
                        <Spec k="Speed" v={r.topSpeed} />
                        <Spec k="Runtime" v={r.runtime} />
                      </div>
                    </div>
                  </article>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-fade">{k}</p>
      <p className="mt-0.5 text-sm text-ice">{v}</p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { SplitWords } from "@/components/typography/Reveal";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { Counter } from "@/components/interactive/Counter";
import { stats, ritual } from "@/lib/content";
import { images, ambientVideo } from "@/lib/media";

const statMeta = [
  { value: 19, decimals: 0, suffix: "" },
  { value: 42, decimals: 0, suffix: "K" },
  { value: 11, decimals: 0, suffix: "" },
  { value: 4.98, decimals: 2, suffix: "" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-clip bg-obsidian py-28 md:py-40">
      <div className="container-luxe">
        {/* Manifesto */}
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <SectionHeading
              index="01"
              eyebrow="The Atelier"
              lines={["Not a barbershop.", "An atelier of", "craftsmanship."]}
            />
            <p className="mt-10 max-w-md text-base leading-relaxed text-bone-soft">
              <SplitWords text="Founded in Mayfair in 2014, Crown & Blade was built on a single conviction — that grooming, done properly, is a craft worthy of mastery. We treat every chair as a studio and every guest as the subject of a portrait." />
            </p>

            <div className="mt-12 flex items-center gap-5">
              <div className="h-px w-12 bg-gold/50" />
              <div>
                <p className="font-serif text-3xl italic text-bone">Marcus Vane</p>
                <p className="eyebrow mt-1">Founder · Master Barber</p>
              </div>
            </div>
          </div>

          {/* Tall media, offset for editorial tension */}
          <div className="lg:col-span-5 lg:col-start-8">
            <AmbientVideo
              src={ambientVideo.src}
              poster={ambientVideo.poster}
              alt="A master barber at work inside the Crown & Blade atelier"
              className="aspect-[3/4.2] w-full rounded-[2px] lg:-mt-20"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="eyebrow">Vol. 01 — The Craft</span>
              <span className="eyebrow text-gold">Mayfair</span>
            </div>
          </div>
        </div>

        {/* Pull statement */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-32 max-w-5xl text-center font-display text-3xl leading-[1.2] tracking-tight text-bone-soft sm:text-4xl md:text-[3.2rem] md:leading-[1.15]"
        >
          “A great cut is not a service. It is a{" "}
          <span className="font-serif italic text-gold-foil">ritual</span> — and
          every gentleman deserves the{" "}
          <span className="font-serif italic text-gold-foil">ceremony</span>.”
        </motion.blockquote>

        {/* Stats */}
        <div className="mt-28 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] border border-bone/10 bg-bone/10 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-obsidian px-6 py-10 text-center">
              <div className="font-display text-5xl text-gold md:text-6xl">
                <Counter
                  value={statMeta[i].value}
                  decimals={statMeta[i].decimals}
                  suffix={statMeta[i].suffix}
                />
              </div>
              <p className="eyebrow mt-3">{s.label}</p>
            </div>
          ))}
        </div>

        {/* The Ritual */}
        <div className="mt-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The Process"
              lines={["The Ritual"]}
              titleClassName="text-4xl sm:text-5xl md:text-6xl"
            />
            <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
              Four movements, performed the same way every time — because
              consistency is the truest sign of mastery.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-y border-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {ritual.map((step, i) => (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-obsidian px-7 py-12 transition-colors duration-500 hover:bg-charcoal"
              >
                <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                <span className="font-mono text-xs text-gold">{step.index}</span>
                <h3 className="mt-6 font-display text-2xl text-bone">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {step.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* faint texture image bleeding at edge */}
      <div className="pointer-events-none absolute -right-24 top-1/3 hidden h-80 w-80 opacity-[0.07] xl:block">
        <ParallaxImage src={images.tools} alt="" className="h-full w-full" amount={0.2} />
      </div>
    </section>
  );
}

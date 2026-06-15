"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { Timeline } from "@/components/pages/Timeline";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { Counter } from "@/components/interactive/Counter";
import { GlowButton } from "@/components/interactive/GlowButton";
import { milestones } from "@/lib/research";
import { img } from "@/lib/media";

const values = [
  { icon: Compass, title: "Built for the real world", copy: "We ship machines that operate where people live and work, not demos behind glass." },
  { icon: ShieldCheck, title: "Safety is a feature", copy: "Every robot is designed to work safely beside people, from the first sketch to the field." },
  { icon: Sparkles, title: "Curiosity over ego", copy: "The best idea wins. We stay humble, ask hard questions and follow the evidence." },
  { icon: Users, title: "Earn trust daily", copy: "Our customers stake their operations on us. We honor that with relentless reliability." },
];

const numbers = [
  { value: 420, suffix: "+", label: "Team members" },
  { value: 4, suffix: "", label: "Global offices" },
  { value: 1, suffix: "M+", label: "Autonomous hours" },
  { value: 19, suffix: "", label: "Patents granted" },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="About Forge"
        titleLines={["We engineer the", "next species", "of machines."]}
        subtitle="Forge was founded in 2019 by a small team of roboticists with one belief. That robots should work in the world people actually live in, and that intelligence belongs in the body as much as the cloud."
        image={img.team}
      />

      {/* Mission */}
      <section className="relative bg-void py-24 md:py-32">
        <div className="container-x">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-5xl text-center font-display text-3xl leading-[1.25] tracking-tight text-ice sm:text-4xl md:text-[3rem] md:leading-[1.18]"
          >
            “A robot is only as useful as the world it can handle. We build machines
            that <span className="text-energy">understand</span>, that{" "}
            <span className="text-energy">adapt</span>, and that earn a place beside
            the people they work with.”
          </motion.blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="01" eyebrow="What we believe" lines={["Principles that", "shape the work."]} />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group bg-abyss p-7 transition-colors hover:bg-carbon"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/30">
                  <v.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-xl text-ice">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{v.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story image + numbers */}
      <section className="relative bg-void py-24 md:py-32">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ParallaxImage src={img.culture} alt="Inside Forge" className="aspect-[4/3] w-full rounded-2xl" amount={0.12} />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading index="02" eyebrow="By the numbers" lines={["A company built", "to endure."]} />
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/[0.06]">
              {numbers.map((n) => (
                <div key={n.label} className="bg-void px-6 py-8">
                  <div className="display text-4xl text-energy">
                    <Counter value={n.value} suffix={n.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-mist">{n.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative bg-abyss py-24 md:py-32">
        <div className="container-x">
          <SectionHeading index="03" eyebrow="Our journey" lines={["From six people", "to the field."]} />
          <div className="mt-16">
            <Timeline entries={milestones} />
          </div>
          <div className="mt-16">
            <GlowButton href="/careers" cursorText="Join">Join the mission</GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}

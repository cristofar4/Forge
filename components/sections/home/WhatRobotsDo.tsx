"use client";

import { motion } from "framer-motion";
import { Factory, HeartPulse, Boxes, Shield, MessageSquare, AlertTriangle, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";

type Item = { icon: LucideIcon; title: string; copy: string; robot: string };

const items: Item[] = [
  { icon: Factory, title: "Build and assemble", copy: "Lift heavy parts and put products together on factory lines, all day, every day.", robot: "Titan Industrial" },
  { icon: HeartPulse, title: "Help in hospitals", copy: "Carry medicine, samples and supplies so nurses and doctors can stay with patients.", robot: "Medi Care" },
  { icon: Boxes, title: "Run warehouses", copy: "Move, sort and deliver stock so online orders get packed and shipped faster.", robot: "Logistics One" },
  { icon: Shield, title: "Guard and patrol", copy: "Watch over a site day and night and raise the alarm the moment something is wrong.", robot: "Guardian" },
  { icon: MessageSquare, title: "Greet and guide people", copy: "Welcome visitors, answer their questions and show them where to go.", robot: "Nova Assistant" },
  { icon: AlertTriangle, title: "Work where it is unsafe", copy: "Inspect and operate in places that are too dangerous for a person to enter.", robot: "Atlas X" },
];

export function WhatRobotsDo() {
  return (
    <section id="what-robots-do" className="relative bg-void py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading index="01" eyebrow="What we do" lines={["What our robots", "actually do."]} />
          <p className="max-w-md text-base leading-relaxed text-mist">
            In plain terms: Forge robots take on the heavy, repetitive and dangerous
            jobs across industries, so your people are free to do the work that
            really needs a human.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl glass p-7 transition-colors hover:border-cyan/40"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan/10 text-cyan ring-1 ring-cyan/30 transition-shadow group-hover:shadow-[0_0_26px_-4px_rgba(40,215,251,0.6)]">
                <it.icon className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-2xl text-ice">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{it.copy}</p>
              <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan/80">
                Robot · {it.robot}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

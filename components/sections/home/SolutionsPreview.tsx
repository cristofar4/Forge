"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { solutions } from "@/lib/solutions";
import { solutionIcons } from "@/components/icons";

export function SolutionsPreview() {
  return (
    <section className="relative bg-void py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="04" eyebrow="Where we work" lines={["One platform,", "every industry."]} />
          <Link href="/solutions" data-cursor className="group flex items-center gap-2 text-sm text-mist hover:text-cyan">
            All solutions
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => {
            const Icon = solutionIcons[s.icon];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/solutions"
                  data-cursor
                  className="group relative block overflow-hidden rounded-2xl glass p-7 transition-colors duration-500 hover:border-cyan/40"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/30">
                      {Icon && <Icon className="h-6 w-6" strokeWidth={1.5} />}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-fade transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-ice">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{s.headline}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

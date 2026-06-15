"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type Entry = { year: string; title: string; copy: string };

/** Vertical scroll progress timeline with glowing nodes. */
export function Timeline({ entries }: { entries: Entry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <div ref={ref} className="relative pl-10 md:pl-16">
      {/* rail */}
      <div className="absolute left-2 top-2 h-full w-px bg-ice/10 md:left-3" />
      <motion.div
        style={{ scaleY }}
        className="absolute left-2 top-2 h-full w-px origin-top bg-gradient-to-b from-cyan to-cyan-deep shadow-[0_0_10px_rgba(40,215,251,0.7)] md:left-3"
      />

      <div className="space-y-14">
        {entries.map((e, i) => (
          <motion.div
            key={e.year + i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="absolute -left-[2.15rem] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-void ring-1 ring-cyan/50 md:-left-[3.4rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(40,215,251,0.9)]" />
            </span>
            <span className="font-mono text-sm text-cyan">{e.year}</span>
            <h3 className="mt-2 font-display text-2xl text-ice md:text-3xl">{e.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{e.copy}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

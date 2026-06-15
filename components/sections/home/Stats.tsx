"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/interactive/Counter";

const stats = [
  { value: 1, decimals: 0, suffix: "M+", label: "Autonomous hours logged" },
  { value: 12, decimals: 0, suffix: "K", label: "Robots deployed" },
  { value: 30, decimals: 0, suffix: "+", label: "Countries operating" },
  { value: 99.98, decimals: 2, suffix: "%", label: "Fleet uptime" },
];

export function Stats() {
  return (
    <section className="relative bg-void py-20 md:py-24">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ice/10 bg-ice/[0.06] md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-void px-6 py-10 text-center"
            >
              <div className="display text-5xl text-energy md:text-6xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-mist">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

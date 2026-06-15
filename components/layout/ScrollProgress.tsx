"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A cyan energy hairline tracking reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-deep via-cyan to-cyan-bright shadow-[0_0_12px_rgba(40,215,251,0.7)]"
    />
  );
}

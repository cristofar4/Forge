"use client";

import { motion } from "framer-motion";

/**
 * Per route enter transition. Opacity only (no transform/filter) so it never
 * creates a containing block that would break fixed elements or GSAP pinning.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

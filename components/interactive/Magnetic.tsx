"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/** Wraps content so it is gently drawn toward the cursor — a premium affordance. */
export function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const x = useSpring(mvx, { stiffness: 200, damping: 18, mass: 0.3 });
  const y = useSpring(mvy, { stiffness: 200, damping: 18, mass: 0.3 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mvx.set((e.clientX - (r.left + r.width / 2)) * strength);
    mvy.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

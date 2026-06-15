"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/** A pointer-reactive 3D tilt with a travelling gold glare. */
export function TiltCard({ children, className, intensity = 9 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${gx}% ${gy}%, rgba(40,215,251,0.18), transparent 60%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * intensity);
    rx.set(-ny * intensity);
    gx.set((nx + 0.5) * 100);
    gy.set((ny + 0.5) * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn("group relative [transform-style:preserve-3d]", className)}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ background: glare }}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type Variant = "default" | "hover" | "label";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 38, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 38, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 60 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("[data-cursor]");
      if (!el) {
        setVariant("default");
        setLabel("");
        return;
      }
      const text = el.getAttribute("data-cursor-text");
      if (text) {
        setVariant("label");
        setLabel(text);
      } else {
        setVariant("hover");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = variant === "label" ? 86 : variant === "hover" ? 54 : 30;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            backgroundColor:
              variant === "label" ? "rgba(40,215,251,0.95)" : "rgba(40,215,251,0)",
            borderColor:
              variant === "label" ? "rgba(40,215,251,0)" : "rgba(40,215,251,0.6)",
            boxShadow:
              variant === "default"
                ? "0 0 0px rgba(40,215,251,0)"
                : "0 0 22px rgba(40,215,251,0.45)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border"
        >
          <AnimatePresence>
            {variant === "label" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-void"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ opacity: variant === "default" ? 1 : 0 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgba(40,215,251,0.9)]"
        />
      </motion.div>
    </div>
  );
}

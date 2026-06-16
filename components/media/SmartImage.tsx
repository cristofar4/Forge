"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  reveal?: boolean;
  position?: string;
};

function seedFrom(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

/**
 * Loads real artwork directly in the browser. The image is shown immediately
 * (no load gating, which previously left cached images stuck invisible). If a
 * source fails it swaps to a reliable photo, then a branded panel as a last resort.
 */
export function SmartImage({ src, alt, className, imgClassName, reveal = true, position = "center" }: Props) {
  const fallback = `https://picsum.photos/seed/${seedFrom(src)}/1200/900`;
  const [stage, setStage] = useState(0); // 0 source, 1 fallback, 2 panel
  useEffect(() => setStage(0), [src]);
  const current = stage === 0 ? src : stage === 1 ? fallback : null;

  return (
    <motion.div
      initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative isolate overflow-hidden bg-carbon", className)}
    >
      <div aria-hidden className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,#11151d_0%,#0a0c12_55%,#06070a_100%)]">
        <span className="font-display text-3xl font-semibold tracking-[0.3em] text-cyan/10 select-none">FORGE</span>
        <div className="absolute inset-0 bg-dots opacity-[0.5] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {current && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={current}
          src={current}
          alt={alt}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setStage((s) => s + 1)}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
          style={{ objectPosition: position }}
        />
      )}
    </motion.div>
  );
}

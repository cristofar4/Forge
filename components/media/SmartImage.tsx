"use client";

import { useState } from "react";
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

/**
 * Loads real remote photography directly in the browser. While loading, or if a
 * URL is ever unreachable, it shows a branded carbon/cyan panel so the layout
 * always reads as intentional, never as a broken image.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  reveal = true,
  position = "center",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      initial={reveal ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative isolate overflow-hidden bg-carbon", className)}
    >
      {/* Branded fallback / poster */}
      <div
        aria-hidden
        className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,#11151d_0%,#0a0c12_55%,#06070a_100%)]"
      >
        <span className="font-display text-3xl font-semibold tracking-[0.3em] text-cyan/10 select-none">
          FORGE
        </span>
        <div className="absolute inset-0 bg-dots opacity-[0.5] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.08] opacity-0 blur-md",
            imgClassName,
          )}
          style={{ objectPosition: position }}
        />
      )}
    </motion.div>
  );
}

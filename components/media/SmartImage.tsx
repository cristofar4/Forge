"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Sizing / shape classes for the container. */
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Clip-reveal when scrolled into view. */
  reveal?: boolean;
  /** Subtle parallax-friendly object position. */
  position?: string;
};

/**
 * Loads real remote photography directly in the browser. While loading — or if
 * a URL is ever unreachable — it shows a branded obsidian/gold panel so the
 * layout always reads as intentional, never as a broken image.
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
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative isolate overflow-hidden bg-charcoal",
        className,
      )}
    >
      {/* Branded fallback / poster */}
      <div
        aria-hidden
        className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,#1b1b20_0%,#0b0b0d_60%,#070708_100%)]"
      >
        <span className="font-display text-5xl tracking-tight text-gold/10 select-none">
          C&amp;B
        </span>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(200,162,75,0.06)_50%,transparent_70%)]" />
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
            loaded
              ? "scale-100 opacity-100 blur-0"
              : "scale-[1.08] opacity-0 blur-md",
            imgClassName,
          )}
          style={{ objectPosition: position }}
        />
      )}
    </motion.div>
  );
}

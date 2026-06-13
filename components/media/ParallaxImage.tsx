"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Parallax travel as a fraction; higher = stronger. */
  amount?: number;
  position?: string;
};

/** A masked, scroll-parallaxed photograph. */
export function ParallaxImage({
  src,
  alt,
  className,
  amount = 0.12,
  position,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${amount * -100}%`, `${amount * 100}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <SmartImage
          src={src}
          alt={alt}
          position={position}
          className="h-full w-full"
        />
      </motion.div>
    </div>
  );
}

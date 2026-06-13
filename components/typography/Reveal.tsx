"use client";

import { createElement } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const lineChild: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE } },
};

const wordChild: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/** Line-by-line masked reveal — for cinematic display headings. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  stagger = 0.12,
  delay = 0,
  once = true,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  as?: React.ElementType;
}) {
  const inner = (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      className="block"
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            variants={lineChild}
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

  return createElement(Tag, { className }, inner);
}

/** Word-by-word reveal — for sub-heads and editorial body. */
export function SplitWords({
  text,
  className,
  stagger = 0.025,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      className={cn("inline", className)}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={wordChild}
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

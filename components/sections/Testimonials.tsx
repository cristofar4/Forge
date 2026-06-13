"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SplitWords } from "@/components/typography/Reveal";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 7000;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = testimonials.length;
  const t = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setI((p) => (p + 1) % len), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, len]);

  const go = (dir: number) => setI((p) => (p + dir + len) % len);

  return (
    <section
      id="testimonials"
      className="relative overflow-clip bg-obsidian-soft py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* oversized quotation glyph */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 font-display text-[24rem] leading-none text-gold/[0.06] md:text-[34rem]"
      >
        &rdquo;
      </span>

      <div className="container-luxe relative">
        <div className="mx-auto max-w-5xl text-center">
          <div className="eyebrow flex items-center justify-center gap-3">
            <span className="text-gold">05</span>
            <span className="h-px w-8 bg-gold/40" />
            <span>Voices</span>
          </div>

          <div className="relative mt-12 min-h-[280px] md:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-display text-2xl leading-[1.25] tracking-tight text-bone sm:text-3xl md:text-[2.6rem] md:leading-[1.2]"
              >
                <SplitWords text={t.quote} stagger={0.018} />
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mt-10"
            >
              <p className="font-serif text-xl italic text-gold">{t.author}</p>
              <p className="eyebrow mt-1">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="mt-14 flex items-center justify-center gap-8">
            <button
              onClick={() => go(-1)}
              data-cursor
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  data-cursor
                  aria-label={`Voice ${idx + 1}`}
                  className="relative h-1 w-10 overflow-hidden rounded-full bg-bone/15"
                >
                  {idx === i && (
                    <motion.span
                      key={`p-${i}-${paused}`}
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: paused ? 0 : DURATION / 1000,
                        ease: "linear",
                      }}
                      className="absolute inset-0 origin-left bg-gold"
                    />
                  )}
                  {idx < i && (
                    <span className="absolute inset-0 bg-gold/40" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => go(1)}
              data-cursor
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-8 font-mono text-xs text-bone-dim">
            <span className={cn("text-gold")}>{String(i + 1).padStart(2, "0")}</span>{" "}
            / {String(len).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

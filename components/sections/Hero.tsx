"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { LuxeButton } from "@/components/interactive/LuxeButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { site } from "@/lib/site";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const lineUp: Variants = {
  hidden: { y: "118%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 1.1, ease: EASE, delay: 0.35 + i * 0.12 },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.9 + i * 0.12 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(8px)"]);

  const { scrollTo } = useSmoothScroll();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section ref={ref} id="hero" className="relative h-[170vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_18%,#15151b_0%,#0a0a0d_45%,#050506_100%)]" />

        {/* 3D centerpiece */}
        {!reduced && (
          <motion.div style={{ opacity }} className="absolute inset-0">
            <HeroCanvas progress={scrollYProgress} />
          </motion.div>
        )}

        {/* Legibility scrim focused on the type */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_52%,rgba(5,5,6,0.66)_0%,transparent_70%)]" />

        {/* Foreground */}
        <motion.div
          style={{ y: yTitle, opacity, filter: blur }}
          className="container-luxe relative flex h-full flex-col justify-between py-24 md:py-28"
        >
          {/* Top meta */}
          <div className="flex items-start justify-between">
            <motion.div variants={fade} custom={0} initial="hidden" animate="visible" className="eyebrow">
              Mayfair · London
            </motion.div>
            <motion.div
              variants={fade}
              custom={1}
              initial="hidden"
              animate="visible"
              className="eyebrow text-right"
            >
              Est. {site.established}
              <span className="mt-1 block text-gold/80">N 51.50° · W 0.15°</span>
            </motion.div>
          </div>

          {/* Wordmark */}
          <div className="pointer-events-none -mt-6 select-none text-center">
            <motion.p
              variants={fade}
              custom={0}
              initial="hidden"
              animate="visible"
              className="font-serif text-lg italic text-bone-soft md:text-2xl"
            >
              The art of the modern gentleman
            </motion.p>

            <h1 className="display mt-2 text-[clamp(3.4rem,17vw,15rem)] leading-[0.82] tracking-[-0.02em] text-shadow-luxe">
              <span className="block overflow-hidden">
                <motion.span variants={lineUp} custom={0} initial="hidden" animate="visible" className="block text-bone">
                  CROWN
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={lineUp}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  className="block text-gold-foil text-gold-foil-anim"
                >
                  &amp; BLADE
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <motion.div
              variants={fade}
              custom={2}
              initial="hidden"
              animate="visible"
              className="pointer-events-auto max-w-sm"
            >
              <p className="text-sm leading-relaxed text-bone-soft">
                A grooming atelier where steel meets ceremony. Master barbers,
                hot-towel rituals and the pursuit of the perfect cut.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <LuxeButton onClick={() => scrollTo("#booking")} cursorText="Reserve">
                  Reserve a Chair
                </LuxeButton>
                <button
                  onClick={() => scrollTo("#services")}
                  data-cursor
                  className="pointer-events-auto text-xs uppercase tracking-[0.2em] text-bone-soft underline-offset-8 transition hover:text-gold hover:underline"
                >
                  Explore the craft
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={fade}
              custom={3}
              initial="hidden"
              animate="visible"
              onClick={() => scrollTo("#about")}
              data-cursor
              className="pointer-events-auto flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone-dim"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15">
                <ArrowDown className="h-4 w-4 animate-bounce text-gold" strokeWidth={1.5} />
              </span>
              Scroll to begin
            </motion.button>
          </div>
        </motion.div>

        {/* hide native scroll cue once moving */}
        <motion.div
          style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
          className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-px w-24 bg-gold/30"
        />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GlowButton } from "@/components/interactive/GlowButton";
import { SmartImage } from "@/components/media/SmartImage";
import { img } from "@/lib/media";

const RobotScene = dynamic(() => import("@/components/three/RobotScene"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const lineUp: Variants = {
  hidden: { y: "120%" },
  visible: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease: EASE, delay: 0.3 + i * 0.12 } }),
};
const fade: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.7 + i * 0.12 } }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} id="hero" className="relative h-[180vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* atmosphere — transparent toward the top so the global particle field shows behind the robot */}
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_-5%,transparent_0%,rgba(7,10,15,0.5)_45%,#050609_92%)]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_40%,black,transparent)]" />

        {/* 3D robot or static fallback */}
        {!reduced ? (
          <motion.div style={{ opacity }} className="absolute inset-0">
            <RobotScene mx={mx} my={my} progress={scrollYProgress} />
          </motion.div>
        ) : (
          <div className="absolute inset-0 mx-auto flex max-w-md items-center justify-center opacity-70">
            <SmartImage src={img.humanoid} alt="Forge humanoid robot" className="h-full w-full" reveal={false} />
          </div>
        )}

        {/* glow core behind */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px]" />

        {/* Holographic HUD */}
        {!reduced && (
          <>
            <motion.div
              variants={fade} custom={3} initial="hidden" animate="visible"
              className="animate-float-y absolute left-6 top-28 hidden glass rounded-xl px-4 py-3 md:block lg:left-16"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan">System // Online</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[0.65rem] text-mist">Cortex v4 · nominal</span>
              </div>
            </motion.div>

            <motion.div
              variants={fade} custom={4} initial="hidden" animate="visible"
              className="animate-float-y absolute right-6 top-1/3 hidden glass rounded-xl px-4 py-3 lg:block"
              style={{ animationDelay: "1.5s" }}
            >
              {[
                { k: "Balance", v: "100%" },
                { k: "Vision", v: "120 fps" },
                { k: "Gait", v: "Stable" },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-6 py-0.5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-fade">{r.k}</span>
                  <span className="font-mono text-[0.65rem] text-cyan">{r.v}</span>
                </div>
              ))}
            </motion.div>
          </>
        )}

        {/* Foreground copy */}
        <motion.div style={{ y: yText, opacity }} className="container-x relative flex h-full flex-col justify-end pb-24 md:pb-28">
          <motion.p variants={fade} custom={0} initial="hidden" animate="visible" className="eyebrow">
            Forge Robotics · Founded 2019
          </motion.p>

          <h1 className="display mt-5 max-w-4xl text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.92] tracking-tight text-glow">
            <span className="block overflow-hidden">
              <motion.span variants={lineUp} custom={0} initial="hidden" animate="visible" className="block text-ice">
                Machines that
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={lineUp} custom={1} initial="hidden" animate="visible" className="block text-energy">
                move the world.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade} custom={1} initial="hidden" animate="visible"
            className="mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg"
          >
            Forge builds intelligent robots for industry, healthcare, logistics and beyond,
            uniting advanced hardware with a reasoning core that understands the physical world.
          </motion.p>

          <motion.div variants={fade} custom={2} initial="hidden" animate="visible" className="mt-9 flex flex-wrap items-center gap-4">
            <GlowButton href="/robots" cursorText="View">Explore the robots</GlowButton>
            <GlowButton href="/contact" variant="ghost" cursorText="Demo" withArrow={false}>Book a demo</GlowButton>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-fade">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-cyan" strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}

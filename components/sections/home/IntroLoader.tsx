"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** A one time GSAP cinematic intro: counts up, reveals the wordmark, wipes away. */
export function IntroLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("forge-intro")) {
      setDone(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("forge-intro", "1");
          setDone(true);
        },
      });

      if (reduced) {
        tl.to(rootRef.current, { autoAlpha: 0, duration: 0.3 });
        return;
      }

      gsap.set(".intro-word span", { yPercent: 120 });
      tl.to(".intro-word span", {
        yPercent: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
              if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
            },
          },
          "<",
        )
        .to(".intro-word span", { yPercent: -120, stagger: 0.04, duration: 0.6, ease: "power3.in" }, "+=0.2")
        .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
    >
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      <div className="intro-word relative flex overflow-hidden">
        {"FORGE".split("").map((c, i) => (
          <span key={i} className="display inline-block text-7xl font-semibold tracking-[0.1em] text-ice md:text-8xl">
            {c}
          </span>
        ))}
      </div>
      <div className="relative mt-8 h-px w-56 overflow-hidden bg-ice/10">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-cyan shadow-[0_0_12px_rgba(40,215,251,0.8)]" />
      </div>
      <span ref={countRef} className="relative mt-4 font-mono text-xs tracking-[0.3em] text-mist">
        000
      </span>
    </div>
  );
}

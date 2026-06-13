"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

type LenisCtx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<LenisCtx>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    registerGsap();

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Honour reduced-motion: native scroll, no smoothing, refresh triggers.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    force((n) => n + 1);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Let ScrollTrigger drive Lenis-aware measurements after layout settles.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 350);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const ctx: LenisCtx = {
    lenis: lenisRef.current,
    scrollTo: (target, offset = 0) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as never, {
          offset,
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else if (typeof target === "string") {
        document
          .querySelector(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <SmoothScrollContext.Provider value={ctx}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

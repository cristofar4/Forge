import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, client-side. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };

/** Signature timing curve shared across GSAP + CSS. */
export const LUXE_EASE = "power3.out";
export const EXPO_EASE = "expo.out";

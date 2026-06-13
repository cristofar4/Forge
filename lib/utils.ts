import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between a min and max. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Zero-padded index, e.g. 1 -> "01". */
export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

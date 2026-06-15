import { cn } from "@/lib/utils";

const WORDS = [
  "Autonomy",
  "Perception",
  "Locomotion",
  "Intelligence",
  "Precision",
  "Scale",
];

/** A slow technical marquee used as a transition between sections. */
export function Marquee({ className }: { className?: string }) {
  const Group = () => (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-10">
          <span className="display text-4xl text-ice/70 md:text-5xl">{w}</span>
          <span className="text-cyan text-glow">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden border-y border-ice/10 bg-abyss py-6", className)}
    >
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-abyss to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-abyss to-transparent" />
    </div>
  );
}

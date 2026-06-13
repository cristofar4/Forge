import { cn } from "@/lib/utils";

const WORDS = [
  "Precision",
  "Ritual",
  "Craftsmanship",
  "Transformation",
  "Heritage",
  "Mayfair",
];

/** A slow editorial marquee used as a palate-cleanser between acts. */
export function Marquee({ className }: { className?: string }) {
  const Group = () => (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-12">
          <span className="display text-4xl text-bone/80 md:text-6xl">{w}</span>
          <span className="text-gold">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden border-y border-bone/10 bg-obsidian py-7",
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        <Group />
        <Group />
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
}

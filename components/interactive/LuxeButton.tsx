"use client";

import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  cursorText?: string;
  withArrow?: boolean;
};

/** The signature CTA — magnetic, with a vertical fill sweep on hover. */
export function LuxeButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  cursorText = "Reserve",
  withArrow = true,
}: Props) {
  const solid = variant === "solid";

  const inner = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[0.82rem] font-medium uppercase tracking-[0.18em]",
        solid
          ? "bg-gold text-obsidian"
          : "border border-bone/25 text-bone",
        className,
      )}
    >
      {/* fill sweep */}
      <span
        className={cn(
          "absolute inset-0 -z-0 translate-y-full transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
          solid ? "bg-obsidian" : "bg-gold",
        )}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          solid ? "group-hover:text-bone" : "group-hover:text-obsidian",
        )}
      >
        {children}
      </span>
      {withArrow && (
        <ArrowUpRight
          className={cn(
            "relative z-10 h-4 w-4 transition-all duration-300 group-hover:rotate-45",
            solid ? "group-hover:text-bone" : "group-hover:text-obsidian",
          )}
          strokeWidth={1.5}
        />
      )}
    </span>
  );

  return (
    <Magnetic strength={0.4} className="inline-block">
      {href ? (
        <a
          href={href}
          data-cursor
          data-cursor-text={cursorText}
          className="inline-block"
        >
          {inner}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          data-cursor
          data-cursor-text={cursorText}
          className="inline-block"
        >
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

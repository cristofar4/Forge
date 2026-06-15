"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/interactive/Magnetic";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  cursorText?: string;
  withArrow?: boolean;
};

/** Signature CTA: magnetic, glass, with a cyan energy fill and glow on hover. */
export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  cursorText = "Enter",
  withArrow = true,
}: Props) {
  const primary = variant === "primary";

  const inner = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-shadow duration-300",
        primary
          ? "bg-cyan text-void hover:shadow-[0_0_30px_-4px_rgba(40,215,251,0.7)]"
          : "glass text-ice hover:text-cyan",
        className,
      )}
    >
      {!primary && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-cyan/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.6}
        />
      )}
    </span>
  );

  const shared = "inline-block";
  const cursorProps = { "data-cursor": true, "data-cursor-text": cursorText };

  return (
    <Magnetic strength={0.4} className="inline-block">
      {href ? (
        href.startsWith("/") ? (
          <Link href={href} className={shared} {...cursorProps}>
            {inner}
          </Link>
        ) : (
          <a href={href} className={shared} {...cursorProps}>
            {inner}
          </a>
        )
      ) : (
        <button type="button" onClick={onClick} className={shared} {...cursorProps}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

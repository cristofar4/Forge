"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { LuxeButton } from "@/components/interactive/LuxeButton";
import { Magnetic } from "@/components/interactive/Magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollTo, stop, start } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const go = (href: string) => {
    setOpen(false);
    start();
    setTimeout(() => scrollTo(href, -10), 60);
  };

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      next ? stop() : start();
      return next;
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-bone/10 py-3"
            : "border-b border-transparent py-5",
        )}
      >
        <nav className="container-luxe flex items-center justify-between">
          {/* Wordmark */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => go("#top")}
              data-cursor
              className="flex items-baseline gap-2"
            >
              <span className="font-display text-xl tracking-tight text-bone">
                Crown
              </span>
              <span className="text-gold">&amp;</span>
              <span className="font-display text-xl tracking-tight text-bone">
                Blade
              </span>
            </button>
          </Magnetic>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => go(item.href)}
                  data-cursor
                  className="group relative flex items-center gap-1.5 py-1 text-sm text-bone-soft transition-colors hover:text-bone"
                >
                  <span className="font-mono text-[0.6rem] text-gold/70">
                    {item.index}
                  </span>
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LuxeButton
                onClick={() => go("#booking")}
                cursorText="Reserve"
                className="px-6 py-3 text-[0.7rem]"
              >
                Book a Chair
              </LuxeButton>
            </div>
            <button
              onClick={toggle}
              data-cursor
              aria-label="Menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-bone lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian px-8 lg:hidden"
          >
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 0.2 + i * 0.07,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => go(item.href)}
                    className="flex items-baseline gap-4 text-bone"
                  >
                    <span className="font-mono text-xs text-gold">
                      {item.index}
                    </span>
                    <span className="display text-5xl sm:text-6xl">
                      {item.label}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.2em] text-bone-dim">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-gold">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

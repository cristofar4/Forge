"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { GlowButton } from "@/components/interactive/GlowButton";
import { Magnetic } from "@/components/interactive/Magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { stop, start, scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // When the Home link or logo is tapped while already on the home page,
  // scroll back to the top instead of doing nothing.
  const handleHome = (href: string) => (e: React.MouseEvent) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      scrollTo("#top", 0);
    }
  };

  const close = () => {
    setOpen(false);
    start();
  };
  const toggle = () =>
    setOpen((o) => {
      const next = !o;
      next ? stop() : start();
      return next;
    });

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong py-3" : "border-b border-transparent py-5",
        )}
      >
        <nav className="container-x flex items-center justify-between">
          <Magnetic strength={0.25}>
            <Link href="/" onClick={handleHome("/")} data-cursor className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-cyan/15 ring-1 ring-cyan/40">
                <span className="h-2.5 w-2.5 rounded-sm bg-cyan shadow-[0_0_10px_rgba(40,215,251,0.9)]" />
              </span>
              <span className="font-display text-lg font-semibold tracking-[0.22em] text-ice">
                {site.wordmark}
              </span>
            </Link>
          </Magnetic>

          <ul className="hidden items-center gap-5 xl:flex">
            {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleHome(item.href)}
                    data-cursor
                    className={cn(
                      "group relative py-1 text-[0.82rem] transition-colors",
                      isActive(item.href) ? "text-cyan" : "text-mist hover:text-ice",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-cyan transition-all duration-500",
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <GlowButton href="/contact" variant="ghost" cursorText="Demo" className="px-5 py-3 text-[0.7rem]">
                Book a demo
              </GlowButton>
            </div>
            <button
              onClick={toggle}
              data-cursor
              aria-label="Menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-ice/15 text-ice xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-xl xl:hidden"
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => { handleHome(item.href)(e); close(); }}
                      className={cn(
                        "flex items-baseline gap-4",
                        isActive(item.href) ? "text-cyan" : "text-ice",
                      )}
                    >
                      <span className="font-mono text-xs text-cyan">{item.index}</span>
                      <span className="display text-4xl sm:text-5xl">{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-fade">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-cyan">
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

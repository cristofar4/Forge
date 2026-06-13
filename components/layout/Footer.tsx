"use client";

import { ArrowUp } from "lucide-react";
import { RevealLines } from "@/components/typography/Reveal";
import { LuxeButton } from "@/components/interactive/LuxeButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { navItems, site } from "@/lib/site";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-clip border-t border-bone/10 bg-obsidian">
      {/* Closing CTA band */}
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(200,162,75,0.10),transparent_60%)]" />
        <div className="container-luxe relative flex flex-col items-center py-28 text-center md:py-36">
          <span className="eyebrow">Your chair is waiting</span>
          <RevealLines
            lines={["Reserve", "your chair."]}
            as="h2"
            className="display mt-6 text-6xl text-bone sm:text-7xl md:text-8xl"
          />
          <div className="mt-10">
            <LuxeButton onClick={() => scrollTo("#booking")} cursorText="Reserve">
              Begin the experience
            </LuxeButton>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container-luxe grid grid-cols-2 gap-10 border-t border-bone/10 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl text-bone">Crown</span>
            <span className="text-gold">&amp;</span>
            <span className="font-display text-2xl text-bone">Blade</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
            {site.tagline}. An atelier of grooming craftsmanship in the heart of
            Mayfair.
          </p>
          <p className="eyebrow mt-6">Est. {site.established}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3">
            {navItems.map((n) => (
              <li key={n.href}>
                <button
                  onClick={() => scrollTo(n.href, -10)}
                  data-cursor
                  className="text-sm text-bone-soft transition-colors hover:text-gold"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <address className="mt-5 space-y-1 text-sm not-italic text-bone-soft">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <a href={site.phoneHref} className="mt-3 block hover:text-gold">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block break-all hover:text-gold">
              {site.email}
            </a>
          </address>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="eyebrow">Follow</p>
            <ul className="mt-5 space-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="text-sm text-bone-soft transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => scrollTo("#top")}
            data-cursor
            className="mt-8 flex items-center gap-2 self-start text-xs uppercase tracking-[0.18em] text-bone-dim hover:text-gold"
          >
            <ArrowUp className="h-4 w-4" /> Back to top
          </button>
        </div>
      </div>

      {/* Legal */}
      <div className="container-luxe flex flex-col items-center justify-between gap-2 border-t border-bone/10 py-6 text-xs text-bone-dim sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>Crafted in Mayfair · By appointment & walk-in</p>
      </div>

      {/* Oversized signature wordmark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <p className="display -mb-[0.18em] translate-y-[0.12em] text-center text-[20vw] leading-none text-bone/[0.035]">
          CROWN &amp; BLADE
        </p>
      </div>
    </footer>
  );
}

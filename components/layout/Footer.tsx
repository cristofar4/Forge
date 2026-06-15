import Link from "next/link";
import { RevealLines } from "@/components/typography/Reveal";
import { GlowButton } from "@/components/interactive/GlowButton";
import { nav, offices, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-clip border-t border-ice/10 bg-abyss">
      {/* Closing CTA */}
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_0%,rgba(40,215,251,0.12),transparent_60%)]" />
        <div className="container-x relative flex flex-col items-center py-24 text-center md:py-32">
          <span className="eyebrow">Build the future</span>
          <RevealLines
            lines={["Let us build", "what comes next."]}
            as="h2"
            className="display mt-6 text-5xl text-ice sm:text-6xl md:text-7xl"
          />
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <GlowButton href="/contact" cursorText="Talk">
              Talk to our team
            </GlowButton>
            <GlowButton href="/robots" variant="ghost" cursorText="View" withArrow={false}>
              Explore the robots
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="container-x grid grid-cols-2 gap-10 border-t border-ice/10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-cyan/15 ring-1 ring-cyan/40">
              <span className="h-2.5 w-2.5 rounded-sm bg-cyan" />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.22em] text-ice">
              {site.wordmark}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fade">
            {site.tagline}. Engineered for the world people live in.
          </p>
          <p className="eyebrow mt-6">Founded {site.founded}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} data-cursor className="text-sm text-mist transition-colors hover:text-cyan">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Offices</p>
          <ul className="mt-5 space-y-2.5 text-sm text-mist">
            {offices.map((o) => (
              <li key={o.city}>
                {o.city}
                <span className="text-fade">, {o.country}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-5 space-y-2.5">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor className="text-sm text-mist transition-colors hover:text-cyan">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-cyan hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-ice/10 py-6 text-xs text-fade sm:flex-row">
        <p>© {year} {site.name} Robotics. All rights reserved.</p>
        <p>Designed and built for the physical world.</p>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="display -mb-[0.16em] translate-y-[0.12em] text-center text-[22vw] font-semibold leading-none tracking-[0.04em] text-ice/[0.03]">
          FORGE
        </p>
      </div>
    </footer>
  );
}

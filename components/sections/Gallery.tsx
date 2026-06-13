"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { SmartImage } from "@/components/media/SmartImage";
import { RevealLines } from "@/components/typography/Reveal";
import { galleryShots } from "@/lib/media";
import { cn } from "@/lib/utils";

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    registerGsap();
    setPinned(true);

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current)
              gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={cn(
        "relative bg-obsidian",
        pinned ? "h-screen overflow-hidden" : "py-20",
      )}
    >
      {/* persistent label */}
      <div className="pointer-events-none absolute left-6 top-8 z-20 md:left-12">
        <span className="eyebrow">03 — Gallery</span>
      </div>

      <div
        ref={trackRef}
        className={cn(
          "flex items-center gap-6 md:gap-10",
          pinned
            ? "h-full px-[6vw] will-change-transform"
            : "snap-x snap-mandatory overflow-x-auto px-6 pb-6",
        )}
      >
        {/* Intro panel */}
        <div className="flex h-[70vh] w-[86vw] shrink-0 snap-center flex-col justify-center sm:w-[60vw] lg:w-[40vw]">
          <RevealLines
            lines={["A campaign", "of the cut."]}
            as="h2"
            className="display text-5xl text-bone sm:text-6xl lg:text-7xl"
          />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-bone-soft">
            Not before-and-afters. A lookbook. Every frame is lit, styled and shot
            like the fashion houses we admire — because your portrait deserves
            nothing less.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-bone-dim">
            <span className="h-px w-10 bg-gold" /> Scroll to explore →
          </div>
        </div>

        {/* Campaign frames */}
        {galleryShots.map((shot, i) => (
          <figure
            key={shot.id}
            data-cursor
            data-cursor-text="View"
            className={cn(
              "group relative shrink-0 snap-center overflow-hidden rounded-[2px]",
              shot.tall
                ? "h-[78vh] w-[78vw] sm:w-[46vw] lg:w-[30vw]"
                : "h-[58vh] w-[80vw] sm:w-[52vw] lg:w-[36vw]",
            )}
          >
            <SmartImage
              src={shot.src}
              alt={shot.title}
              reveal={false}
              className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/10" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <span className="font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-2xl text-bone md:text-3xl">
                  {shot.title}
                </h3>
              </div>
              <span className="font-serif text-sm italic text-bone-soft">
                {shot.meta}
              </span>
            </figcaption>
          </figure>
        ))}

        {/* Outro panel */}
        <div className="flex h-[58vh] w-[70vw] shrink-0 snap-center flex-col justify-center sm:w-[40vw] lg:w-[24vw]">
          <p className="font-serif text-2xl italic text-bone">
            “The chair is the studio.”
          </p>
          <span className="mt-4 eyebrow text-gold">Crown &amp; Blade</span>
        </div>
      </div>

      {/* progress rail */}
      {pinned && (
        <div className="absolute inset-x-[6vw] bottom-8 z-20 h-px bg-bone/10">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-deep to-gold-light"
          />
        </div>
      )}
    </section>
  );
}

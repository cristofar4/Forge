"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { SmartImage } from "@/components/media/SmartImage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { galleryItems, img, type GalleryItem } from "@/lib/media";
import { cn } from "@/lib/utils";

const categories = ["All", "Humanoid", "Industrial", "Research", "Field"] as const;
type Cat = (typeof categories)[number];

export function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [active, setActive] = useState<number | null>(null);
  const { stop, start } = useSmoothScroll();

  const items = cat === "All" ? galleryItems : galleryItems.filter((i) => i.category === cat);

  const open = (i: number) => {
    setActive(i);
    stop();
  };
  const close = () => {
    setActive(null);
    start();
  };
  const step = (dir: number) =>
    setActive((a) => (a === null ? a : (a + dir + items.length) % items.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items.length]);

  return (
    <>
      <PageHero
        index="06"
        eyebrow="Gallery"
        titleLines={["The machines,", "in the field."]}
        subtitle="A look at our robots across the lab, the line and the world. Shot the way we see them, as the leading edge of what machines can do."
        image={img.city}
      />

      <section className="bg-void py-14 md:py-20">
        <div className="container-x">
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                data-cursor
                className={cn(
                  "rounded-full border px-5 py-2 text-xs uppercase tracking-[0.14em] transition-colors",
                  cat === c
                    ? "border-cyan bg-cyan text-void"
                    : "border-ice/15 text-mist hover:border-cyan/50 hover:text-cyan",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry */}
          <motion.div
            key={cat}
            className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3"
          >
            {items.map((item, i) => (
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => open(i)}
                data-cursor
                data-cursor-text="View"
                className="group relative mb-4 block w-full cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
              >
                <SmartImage
                  src={item.src}
                  alt={item.title}
                  reveal={false}
                  className={cn(
                    "w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]",
                    item.tall ? "aspect-[3/4]" : item.wide ? "aspect-[4/3]" : "aspect-square",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan">{item.category}</span>
                  <p className="mt-1 font-display text-xl text-ice">{item.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[85] flex items-center justify-center bg-void/90 p-4 backdrop-blur-xl md:p-12"
          >
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-ice/20 text-ice hover:border-cyan hover:text-cyan">
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ice/20 text-ice hover:border-cyan hover:text-cyan md:left-8"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-ice/20 text-ice hover:border-cyan hover:text-cyan md:right-8"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <motion.div
              key={items[active].id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <SmartImage src={items[active].src} alt={items[active].title} reveal={false} className="aspect-[16/10] w-full rounded-2xl" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan">{items[active].category}</span>
                  <p className="mt-1 font-display text-2xl text-ice">{items[active].title}</p>
                </div>
                <span className="font-mono text-xs text-fade">
                  {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export type { GalleryItem };

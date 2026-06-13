"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { SectionHeading } from "@/components/typography/SectionHeading";
import { ParallaxImage } from "@/components/media/ParallaxImage";
import { LuxeButton } from "@/components/interactive/LuxeButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { site } from "@/lib/site";
import { images } from "@/lib/media";

export function Contact() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="contact" className="relative bg-obsidian py-28 md:py-40">
      <div className="container-luxe">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <SectionHeading
              index="06"
              eyebrow="Visit"
              lines={["Come sit", "in the chair."]}
            />

            <div className="mt-12 space-y-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="eyebrow">The Atelier</p>
                  <p className="mt-2 text-bone">{site.address.line1}</p>
                  <p className="text-bone-soft">{site.address.line2}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <a href={site.phoneHref} data-cursor className="flex gap-4 group">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="eyebrow">Call</p>
                    <p className="mt-2 text-bone transition-colors group-hover:text-gold">
                      {site.phone}
                    </p>
                  </div>
                </a>
                <a href={`mailto:${site.email}`} data-cursor className="flex gap-4 group">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="eyebrow">Email</p>
                    <p className="mt-2 break-all text-bone transition-colors group-hover:text-gold">
                      {site.email}
                    </p>
                  </div>
                </a>
              </div>

              <div>
                <p className="eyebrow">Opening Hours</p>
                <ul className="mt-3 divide-y divide-bone/10">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between py-2.5">
                      <span className="text-bone-soft">{h.day}</span>
                      <span className="font-mono text-sm text-bone">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <LuxeButton onClick={() => scrollTo("#booking")} cursorText="Reserve">
                Reserve a Chair
              </LuxeButton>
            </div>
          </div>

          {/* Visual + location card */}
          <div className="lg:col-span-7">
            <div className="relative">
              <ParallaxImage
                src={images.shopInterior}
                alt="Inside the Crown & Blade atelier in Mayfair"
                className="aspect-[4/3] w-full rounded-[2px]"
                amount={0.1}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-[2px] border border-bone/10 bg-obsidian/70 p-5 backdrop-blur-md">
                <div>
                  <p className="font-display text-2xl text-bone">Mayfair Flagship</p>
                  <p className="mt-1 font-mono text-xs text-gold">N 51.50° · W 0.15°</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Mayfair+London"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-text="Open"
                  className="rounded-full border border-bone/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-bone transition-colors hover:border-gold hover:text-gold"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

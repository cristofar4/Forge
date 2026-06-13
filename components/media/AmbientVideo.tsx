"use client";

import { useState } from "react";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  reveal?: boolean;
};

/**
 * Plays a real ambient video over a real poster image. If the video can't be
 * fetched, the poster carries the frame — never a blank box.
 */
export function AmbientVideo({ src, poster, alt, className, reveal = true }: Props) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      <SmartImage
        src={poster}
        alt={alt}
        reveal={reveal}
        className="absolute inset-0 h-full w-full"
      />
      {!failed && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/20" />
    </div>
  );
}

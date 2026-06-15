"use client";

import { motion } from "framer-motion";
import { RevealLines, SplitWords } from "@/components/typography/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  eyebrow: string;
  titleLines: string[];
  subtitle: string;
  image?: string;
  className?: string;
};

/** Shared cinematic hero for inner pages, with a robot image behind the text. */
export function PageHero({ index, eyebrow, titleLines, subtitle, image, className }: Props) {
  return (
    <header className={cn("relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_0%,#0c1119_0%,#070a0f_50%,#050609_100%)]" />
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />

      {image && (
        <div className="absolute inset-0 opacity-45">
          <SmartImage src={image} alt="" reveal={false} className="h-full w-full" position="center 35%" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/55 to-void/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/30" />
        </div>
      )}

      <div className="container-x relative">
        <div className="eyebrow flex items-center gap-3">
          <span className="text-cyan">{index}</span>
          <span className="h-px w-8 bg-cyan/40" />
          <span>{eyebrow}</span>
        </div>
        <RevealLines
          lines={titleLines}
          as="h1"
          className="display mt-6 max-w-5xl text-[clamp(2.6rem,8vw,6rem)] leading-[0.94] tracking-tight text-glow"
        />
        <motion.p className="mt-8 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
          <SplitWords text={subtitle} delay={0.3} />
        </motion.p>
      </div>
    </header>
  );
}

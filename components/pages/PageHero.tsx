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

/** Shared cinematic hero for inner pages, with a robot image beside the text. */
export function PageHero({ index, eyebrow, titleLines, subtitle, image, className }: Props) {
  return (
    <header className={cn("relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_30%_0%,#0c1119_0%,#070a0f_50%,#050609_100%)]" />
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(80%_60%_at_40%_20%,black,transparent)]" />

      {image && (
        <>
          {/* mobile faint backdrop */}
          <div className="absolute inset-0 opacity-25 lg:hidden">
            <SmartImage src={image} alt="" reveal={false} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/40" />
          </div>
          {/* desktop visible side image */}
          <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block">
            <SmartImage src={image} alt="" reveal={false} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
          </div>
        </>
      )}

      <div className="container-x relative">
        <div className="lg:max-w-[54%]">
          <div className="eyebrow flex items-center gap-3">
            <span className="text-cyan">{index}</span>
            <span className="h-px w-8 bg-cyan/40" />
            <span>{eyebrow}</span>
          </div>
          <RevealLines
            lines={titleLines}
            as="h1"
            className="display mt-6 text-[clamp(2.6rem,8vw,6rem)] leading-[0.94] tracking-tight text-glow"
          />
          <motion.p className="mt-8 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
            <SplitWords text={subtitle} delay={0.3} />
          </motion.p>
        </div>
      </div>
    </header>
  );
}

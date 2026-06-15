import { RevealLines } from "@/components/typography/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  lines: string[];
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

/** Shared section header: eyebrow + index rule + display title. */
export function SectionHeading({
  index,
  eyebrow,
  lines,
  align = "left",
  className,
  titleClassName,
}: Props) {
  return (
    <div
      className={cn(
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      <div className="eyebrow flex items-center gap-3">
        {index && <span className="text-cyan">{index}</span>}
        <span className="h-px w-8 bg-cyan/40" />
        <span>{eyebrow}</span>
      </div>
      <RevealLines
        lines={lines}
        as="h2"
        className={cn(
          "display mt-6 text-balance text-4xl text-ice sm:text-5xl md:text-6xl",
          titleClassName,
        )}
      />
    </div>
  );
}

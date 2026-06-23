import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * Antet de secțiune cu numerotare premium (01 — Titlu).
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {(index || eyebrow) && (
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-4",
              align === "center" && "justify-center"
            )}
          >
            {index && <span className="section-index">{index}</span>}
            {index && eyebrow && (
              <span className="h-px w-8 bg-accent/40" aria-hidden />
            )}
            {eyebrow && (
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-bone/50">
                {eyebrow}
              </span>
            )}
          </div>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl font-sans text-base leading-relaxed text-bone/60",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

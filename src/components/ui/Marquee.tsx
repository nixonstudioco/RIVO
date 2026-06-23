"use client";

import { cn } from "@/lib/utils";

/**
 * Marquee infinit subtil pentru un element de brand.
 * Dublăm conținutul și animăm cu CSS (-50%) pentru o buclă continuă.
 */
export default function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  const content = (
    <div
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10 animate-marquee",
        reverse && "[animation-direction:reverse]"
      )}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-serif text-2xl text-bone/40 sm:text-3xl">
            {item}
          </span>
          <span className="text-accent" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "group relative flex w-full select-none overflow-hidden",
        className
      )}
      aria-hidden
    >
      {content}
      {content}
    </div>
  );
}

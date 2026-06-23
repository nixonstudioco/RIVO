"use client";

import Counter from "@/components/ui/Counter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { StatItem } from "@/lib/types";

export default function Stats({ stats }: { stats: StatItem[] }) {
  const STATS = stats;
  return (
    <section className="relative overflow-hidden border-y border-bone/10 bg-ink-soft py-20 lg:py-28">
      <div className="container-rivo">
        <RevealGroup
          className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4"
          stagger={0.12}
        >
          {STATS.map((stat) => (
            <RevealItem key={stat.label} className="group">
              <div className="flex flex-col">
                <span className="font-serif text-5xl font-semibold tracking-tightest text-bone sm:text-6xl lg:text-7xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-4 h-px w-10 bg-accent transition-all duration-500 group-hover:w-20" />
                <span className="mt-4 font-sans text-sm uppercase tracking-[0.12em] text-bone/50">
                  {stat.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

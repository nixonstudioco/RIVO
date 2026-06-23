"use client";

import { motion } from "framer-motion";

/**
 * Bară de progres animată pentru stadiul lucrărilor.
 */
export default function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="font-sans text-sm uppercase tracking-[0.18em] text-bone/50">
          Stadiu lucrări
        </span>
        <span className="font-serif text-3xl text-accent">{value}%</span>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-bone/10">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="h-full origin-left rounded-full bg-gradient-to-r from-accent-deep to-accent-soft"
        />
      </div>
    </div>
  );
}

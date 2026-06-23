"use client";

import { motion } from "framer-motion";

/**
 * Antet generos pentru paginile interioare (Proiecte, Despre, Contact).
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="container-rivo pb-12 pt-40 lg:pb-16 lg:pt-52">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4"
      >
        <span className="h-px w-12 bg-accent" />
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </span>
      </motion.div>

      <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tightest">
        {title}
      </h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-bone/60"
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}

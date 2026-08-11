"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectStage } from "@/lib/projects";
import { stageLabel } from "@/lib/projects";

/**
 * Galerie animată cu lightbox pentru pagina de proiect.
 *
 * Dacă proiectul are etape de dezvoltare, apar filtre („Toate" + câte una pe
 * etapă) care restrâng grila la imaginile etapei. Fără etape, se comportă ca o
 * galerie simplă.
 */
export default function ProjectGallery({
  images,
  stages = [],
  name,
}: {
  images: string[];
  stages?: ProjectStage[];
  name: string;
}) {
  const withImages = useMemo(
    () => stages.filter((s) => s.images.length > 0),
    [stages]
  );

  // `null` = „Toate"; altfel indexul etapei din `withImages`.
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => {
    if (active !== null) return withImages[active]?.images ?? [];
    // „Toate": galeria generală + imaginile din etape, fără duplicate.
    return Array.from(
      new Set([...images, ...withImages.flatMap((s) => s.images)])
    );
  }, [active, images, withImages]);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
  );
  const prev = useCallback(
    () =>
      setOpen((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length
      ),
    [visible.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  const selectFilter = (value: number | null) => {
    setActive(value);
    setOpen(null); // indexul din lightbox nu mai e valid după filtrare
  };

  if (visible.length === 0) return null;

  const chipCls = (on: boolean) =>
    `rounded-full border px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] transition-colors ${
      on
        ? "border-accent bg-accent text-ink"
        : "border-bone/15 text-bone/60 hover:border-accent/50 hover:text-accent"
    }`;

  return (
    <>
      {withImages.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => selectFilter(null)}
            className={chipCls(active === null)}
          >
            Toate
          </button>
          {withImages.map((stage, i) => (
            <button
              key={`${stage.label}-${stage.date}-${i}`}
              type="button"
              onClick={() => selectFilter(i)}
              className={chipCls(active === i)}
            >
              {stageLabel(stage)}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
        {visible.map((src, i) => (
          <motion.button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="Mărește"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-xl bg-ink-muted ${
              i === 0
                ? "col-span-2 aspect-[16/10] lg:col-span-8 lg:row-span-2"
                : "aspect-[4/3] lg:col-span-4"
            }`}
          >
            <Image
              src={src}
              alt={`${name} — imagine ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-rivo group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-xl"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Închide galeria"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imaginea anterioară"
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent sm:left-8"
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={visible[open]}
                alt={`${name} — imagine ${open + 1}`}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Imaginea următoare"
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:border-accent hover:text-accent sm:right-8"
            >
              <ChevronRight size={22} />
            </button>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-bone/60">
              {open + 1} / {visible.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

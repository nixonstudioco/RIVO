"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// TODO: înlocuiește cu testimoniale reale.
const TESTIMONIALS = [
  {
    quote:
      "Ne-am cumpărat apartamentul în RIVO Green Court și a fost cea mai bună decizie. Predarea la timp, finisaje impecabile și o echipă care chiar răspunde.",
    name: "Andreea M.",
    role: "Proprietar, RIVO Green Court",
  },
  {
    quote:
      "Ca investitor, apreciez transparența RIVO. Contracte clare, raportări de progres reale și un randament peste așteptări. Recomand fără ezitare.",
    name: "Cristian P.",
    role: "Investitor",
  },
  {
    quote:
      "Am vizitat zeci de ansambluri în Satu Mare. La RIVO se simte altă atenție la detaliu — de la lobby până la spațiile verzi. Calitate adevărată.",
    name: "Familia Pop",
    role: "Proprietari, RIVO Villas Noua",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIndex((prev) => (prev + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[index];

  return (
    <section className="relative border-t border-bone/10 py-28 lg:py-40">
      <div className="container-rivo">
        <SectionHeading index="05" eyebrow="Testimoniale" title="Ce spun cei care au ales RIVO" />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-9">
            <Quote
              size={56}
              className="text-accent/30"
              strokeWidth={1}
              aria-hidden
            />
            <div className="relative mt-4 min-h-[200px] sm:min-h-[180px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, y: 30 * dir }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 * dir }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-serif text-2xl leading-snug text-bone sm:text-3xl lg:text-4xl lg:leading-[1.25]">
                    „{t.quote}”
                  </p>
                  <footer className="mt-8">
                    <p className="font-sans text-base text-bone">{t.name}</p>
                    <p className="font-sans text-sm text-bone/50">{t.role}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:col-span-3 lg:flex-col lg:items-end">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Testimonialul anterior"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Testimonialul următor"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <span className="font-sans text-sm text-bone/50">
              {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Concept & teren",
    text: "Identificăm locații cu potențial real și conturăm conceptul arhitectural alături de echipe premiate.",
  },
  {
    n: "02",
    title: "Proiectare & avize",
    text: "Dezvoltăm proiectul tehnic, obținem autorizațiile și optimizăm fiecare detaliu pentru confort și eficiență.",
  },
  {
    n: "03",
    title: "Construcție",
    text: "Construim cu parteneri verificați, control de calitate constant și raportări transparente de progres.",
  },
  {
    n: "04",
    title: "Finisaje & detalii",
    text: "Montăm finisaje premium, amenajăm spațiile comune și verificăm fiecare apartament înainte de predare.",
  },
  {
    n: "05",
    title: "Predarea cheilor",
    text: "Îți înmânăm cheile, documentația completă și rămânem alături de tine cu suport post-vânzare.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden border-t border-bone/10 bg-ink-soft py-28 lg:py-40">
      <div className="container-rivo">
        <SectionHeading
          index="04"
          eyebrow="Proces"
          title={
            <>
              De la concept la{" "}
              <span className="italic text-accent">cheile tale</span>
            </>
          }
          description="Un proces clar, în cinci etape, gândit ca să știi mereu unde se află proiectul tău."
        />

        <div ref={ref} className="relative mt-20">
          {/* Linie verticală cu progres animat */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-bone/10 md:left-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent/30"
            />
          </div>

          <ol className="space-y-12 md:space-y-0">
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={step.n}
                  className="relative md:grid md:grid-cols-2 md:gap-16 md:py-10"
                >
                  {/* Punct pe linie */}
                  <span className="absolute left-[14px] top-1.5 z-10 -translate-x-1/2 md:left-1/2">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="block h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink"
                    />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`pl-10 md:pl-0 ${
                      left
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <span className="font-serif text-5xl text-accent/30">
                      {step.n}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl text-bone">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-sm font-sans text-sm leading-relaxed text-bone/55 ${
                        left ? "md:ml-auto" : ""
                      }`}
                    >
                      {step.text}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

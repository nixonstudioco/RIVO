"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

export default function CtaContact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Imagine parallax de fundal */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Arhitectură premium RIVO"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />
      </motion.div>

      <div className="container-rivo py-28 lg:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
              Hai să construim împreună
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tightest">
              Găsește-ți locul în{" "}
              <span className="italic text-accent">noul Satu Mare</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-bone/65">
              Programează o vizionare sau cere o ofertă personalizată. Echipa
              RIVO îți răspunde rapid și transparent.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact" cursorLabel="Scrie-ne">
                Programează o vizionare
              </MagneticButton>
              <MagneticButton href="/proiecte" variant="outline">
                Explorează proiectele
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

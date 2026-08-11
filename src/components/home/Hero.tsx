"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import type { SiteSettings } from "@/lib/types";

const HERO_VIDEO = "/video/hero-drona.mp4";
const HERO_POSTER = "/video/hero-drona-poster.jpg";

const lineVariants = {
  hidden: { y: "120%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1,
      delay: 0.4 + i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero({ hero }: { hero: SiteSettings["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* Fundal video (dronă) + gradiente cinematice */}
      <motion.div
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Cu „reduce motion" nu rulăm video — rămâne cadrul static. */}
        {reduceMotion ? (
          <Image
            src={HERO_POSTER}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
        )}

        {/* Filmarea e de zi, foarte luminoasă — straturile de mai jos sunt
            necesare ca textul crem să rămână lizibil peste ea. */}
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/15 to-transparent" />
        {/* Navbar peste cer deschis. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-rivo pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-accent" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
            {hero.eyebrow}
          </span>
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.8rem,9vw,8.5rem)] font-semibold leading-[0.95] tracking-tightest">
          {[hero.titleTop, hero.titleAccent].map((line, i) => (
            <span key={i} className="line-mask">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {i === 1 ? (
                  <span className="italic text-accent">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-bone/65"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/proiecte" cursorLabel="Explorează">
            Vezi proiectele
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            Contact
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Indicator scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Derulează
        </span>
        <ArrowDown size={16} className="animate-scroll-hint text-accent" />
      </motion.div>
    </section>
  );
}

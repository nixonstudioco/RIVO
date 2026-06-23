"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";

/**
 * Secțiune manifest cu reveal word-by-word la scroll, folosind GSAP ScrollTrigger.
 */
export default function Intro({ manifest }: { manifest: string }) {
  const MANIFEST = manifest;
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const words = ref.current.querySelectorAll<HTMLElement>(".word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-t border-bone/10 py-28 lg:py-40">
      <div className="container-rivo">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="section-index">01</span>
                <span className="h-px w-8 bg-accent/40" />
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-bone/50">
                  Viziune
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <p
              ref={ref}
              className="font-serif text-3xl leading-[1.3] tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.28]"
            >
              {MANIFEST.split(" ").map((word, i) => (
                <span key={i} className="word inline-block">
                  {word}
                  {" "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scrolling global cu Lenis, sincronizat cu GSAP ScrollTrigger.
 * Respectă `prefers-reduced-motion`: dacă utilizatorul preferă mișcare redusă,
 * nu activăm smooth scroll-ul (rămâne scroll nativ).
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      gsap.registerPlugin(ScrollTrigger);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Conectează Lenis la ticker-ul GSAP pentru sincronizare perfectă.
    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);

  // La schimbarea de pagină, derulează sus și reîmprospătează ScrollTrigger.
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}

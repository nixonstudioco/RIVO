"use client";

import { useEffect, useRef } from "react";
import { useInView, animate as fmAnimate } from "framer-motion";

/**
 * Contor animat care numără până la `value` când intră în viewport.
 * Respectă prefers-reduced-motion (afișează direct valoarea finală).
 */
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const node = ref.current;
    const format = (v: number) =>
      `${prefix}${v
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${suffix}`;

    if (reduced) {
      node.textContent = format(value);
      return;
    }

    const controls = fmAnimate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = format(v);
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, prefix, duration, decimals]);

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}

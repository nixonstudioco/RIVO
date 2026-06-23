"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor personalizat subtil pentru desktop.
 * - Urmărește mouse-ul cu un spring fin.
 * - Se mărește și afișează o etichetă peste elementele interactive
 *   marcate cu `data-cursor` (ex: data-cursor="Vezi").
 * Se dezactivează pe touch / prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string>("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor], input, textarea, select, label"
      ) as HTMLElement | null;

      if (target) {
        setHovering(true);
        setLabel(target.getAttribute("data-cursor") ?? "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full bg-bone text-ink"
        animate={{
          width: hovering ? (label ? 76 : 44) : 12,
          height: hovering ? (label ? 76 : 44) : 12,
          x: hovering ? (label ? -38 : -22) : -6,
          y: hovering ? (label ? -38 : -22) : -6,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        {label ? (
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-ink">
            {label}
          </span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

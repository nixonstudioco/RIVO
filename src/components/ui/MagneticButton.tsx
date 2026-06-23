"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
  strength?: number;
}

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-accent text-ink hover:bg-accent-soft border border-accent hover:border-accent-soft",
  outline:
    "bg-transparent text-bone border border-bone/25 hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-bone/80 hover:text-bone border border-transparent",
};

/**
 * Buton „magnetic": atrage subtil conținutul spre cursor la hover.
 * Folosit ca <Link> dacă primește `href`, altfel ca <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  type,
  variant = "solid",
  className,
  cursorLabel,
  strength = 0.4,
  ...rest
}: BaseProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const inner = (
    <motion.span
      className="relative inline-flex items-center justify-center gap-2"
      animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.span>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-500 ease-rivo",
    variantClasses[variant],
    className
  );

  const motionProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 },
    "data-cursor": cursorLabel,
  };

  if (href) {
    return (
      <motion.div
        {...motionProps}
        className="inline-block"
      >
        <Link href={href} className={classes} onClick={onClick} {...rest}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps} className="inline-block">
      <button
        type={type ?? "button"}
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {inner}
      </button>
    </motion.div>
  );
}

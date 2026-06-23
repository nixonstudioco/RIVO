"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Tranziție de pagină elegantă: un wipe vertical + fade pe conținut.
 * Folosește pathname ca cheie pentru a re-monta la fiecare navigare.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Overlay wipe */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-[100] origin-bottom bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

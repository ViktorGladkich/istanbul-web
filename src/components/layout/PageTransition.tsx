"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.9;

/**
 * On route change a dark slab sweeps from below the viewport, across, and
 * off the top — revealing the new page underneath as its trailing edge passes.
 * Reduced motion: render nothing.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: DURATION, ease: EASE }}
        className="pointer-events-none fixed inset-0 z-[60] bg-[#1a1410]"
        aria-hidden
      />
    </AnimatePresence>
  );
}

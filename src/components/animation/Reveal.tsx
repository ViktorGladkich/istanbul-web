"use client";

import { useInView } from "react-intersection-observer";
import type { CSSProperties, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SUBTLE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Props = {
  children: ReactNode;
  /** Stagger delay in milliseconds */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** translate distance in px (default 30) */
  distance?: number;
  /**
   * "fade"  — translateY + opacity (default, for text/blocks).
   * "clip"  — curtain reveal via clip-path inset, for large images.
   */
  mode?: "fade" | "clip";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  distance = 30,
  mode = "fade",
}: Props) {
  // Fire only when the element is meaningfully inside the viewport.
  // rootMargin shrinks the bottom edge of the observer so the trigger
  // happens after the top of the element has crossed ~12% into view —
  // the user is looking at the section when the animation plays.
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px -12% 0px",
    triggerOnce: true,
  });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  if (mode === "clip") {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          clipPath: inView ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          WebkitClipPath: inView ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: `clip-path 1.4s ${SUBTLE_EASE} ${delay}ms, -webkit-clip-path 1.4s ${SUBTLE_EASE} ${delay}ms`,
          willChange: "clip-path",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s ${SUBTLE_EASE} ${delay}ms, opacity 0.9s ${SUBTLE_EASE} ${delay}ms`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

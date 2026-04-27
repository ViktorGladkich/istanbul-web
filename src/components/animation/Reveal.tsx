"use client";

import { useInView } from "react-intersection-observer";
import type { CSSProperties, ReactNode } from "react";

const SUBTLE_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Props = {
  children: ReactNode;
  /** Stagger delay in milliseconds */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  /** translate distance in px (default 30) */
  distance?: number;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  distance = 30,
}: Props) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

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

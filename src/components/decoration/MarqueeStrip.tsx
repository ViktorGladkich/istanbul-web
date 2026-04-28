"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

const DEFAULT_WORDS = [
  "İstanbul",
  "Adana",
  "1987",
  "Dresden",
  "Mezeler",
  "Künefe",
  "Pul biber",
  "Ocakbaşı",
  "Elbe",
];

const SEPARATOR = "·";

type Props = {
  words?: ReadonlyArray<string>;
  /** Animation duration in seconds. Higher = slower. */
  durationSeconds?: number;
  className?: string;
};

export function MarqueeStrip({
  words = DEFAULT_WORDS,
  durationSeconds = 80,
  className = "",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Velocity-reactive: on scroll, modulate the marquee animation duration so
  // the lane speeds up while the user is actively scrolling and decays back
  // to base when they pause. Subtle but ties the page to the user's tempo.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!lenis) return;

    const baseDuration = durationSeconds;
    let raf = 0;
    let smoothed = 0;

    const onScroll = (l: Lenis) => {
      // l.velocity is in pixels-per-frame-ish; cap to avoid wild speedups.
      smoothed = Math.min(Math.abs(l.velocity) * 0.5, 8);
    };

    const tick = () => {
      // Decay smoothed velocity each frame so the effect lingers briefly
      // after the user stops scrolling, rather than snapping.
      smoothed *= 0.92;
      const factor = 1 + smoothed;
      const next = (baseDuration / factor).toFixed(2);
      track.style.setProperty("--marquee-duration", `${next}s`);
      raf = requestAnimationFrame(tick);
    };

    lenis.on("scroll", onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      lenis.off("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [durationSeconds]);

  // Build one half of the loop, then duplicate it via inline so the track can
  // translate -50% and seamlessly repeat.
  const renderRow = (key: string) => (
    <span
      key={key}
      className="flex shrink-0 items-center gap-10 px-10 font-accent italic text-base text-[var(--brand-gold)] md:gap-16 md:px-16 md:text-lg"
    >
      {words.map((w, i) => (
        <span key={`${key}-${i}`} className="flex items-center gap-10 md:gap-16">
          <span>{w}</span>
          <span aria-hidden className="text-[var(--brand-gold)]/60">
            {SEPARATOR}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-hidden
      className={`relative overflow-hidden border-y border-[var(--brand-neutral)] bg-[var(--brand-bg)] py-5 md:py-6 ${className}`}
    >
      <div
        ref={trackRef}
        className="marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        {renderRow("a")}
        {renderRow("b")}
      </div>
    </section>
  );
}

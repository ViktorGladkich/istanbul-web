"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { BlurImage as Image } from "@/components/media/BlurImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Panel = {
  key: "p1" | "p2" | "p3" | "p4";
  src: string;
  /** Image side on desktop. Alternates for visual rhythm. */
  imageSide: "left" | "right";
};

const PANELS: ReadonlyArray<Panel> = [
  { key: "p1", src: "/images/grunder.jpeg", imageSide: "right" },
  { key: "p2", src: "/images/about.jpeg", imageSide: "left" },
  { key: "p3", src: "/images/auberginensalat.jpeg", imageSide: "right" },
  { key: "p4", src: "/images/haus.jpeg", imageSide: "left" },
];

export function JourneySection() {
  const t = useTranslations("journey");
  const trackWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      if (!trackWrapperRef.current || !trackRef.current) return;

      const ctx = gsap.context(() => {
        const track = trackRef.current!;

        // Pin only the horizontal track wrapper — not the section header.
        // On narrow screens panels stack vertically with no scroll-jacking.
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          const totalShift = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -totalShift(),
            ease: "none",
            scrollTrigger: {
              trigger: trackWrapperRef.current,
              start: "top top",
              end: () => `+=${totalShift()}`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });

        return () => mm.kill();
      });

      return () => ctx.revert();
    },
    { dependencies: [reduced] },
  );

  return (
    <section
      aria-labelledby="journey-title"
      className="relative bg-[var(--brand-bg)]"
    >
      {/* HEADER — flows naturally; not inside the pinned area */}
      <div className="mx-auto max-w-[1600px] px-6 pb-12 pt-24 md:px-12 md:pb-16 md:pt-32">
        <div className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("eyebrow")}
            </span>
          </div>
          <h2
            id="journey-title"
            className="col-span-12 whitespace-pre-line font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.25rem,4.5vw,4.5rem)] md:col-span-9"
          >
            {t("title")}
          </h2>
        </div>
      </div>

      {/* HORIZONTAL TRACK — desktop pinned scroll, mobile vertical stack */}
      <div ref={trackWrapperRef} className="overflow-hidden lg:h-screen">
        <div
          ref={trackRef}
          className="flex flex-col lg:h-full lg:w-max lg:flex-row lg:will-change-transform"
        >
          {PANELS.map((panel, i) => (
            <PanelView
              key={panel.key}
              panel={panel}
              index={i}
              eyebrow={t(`panels.${panel.key}.eyebrow`)}
              title={t(`panels.${panel.key}.title`)}
              body={t(`panels.${panel.key}.body`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelView({
  panel,
  index,
  eyebrow,
  title,
  body,
}: {
  panel: Panel;
  index: number;
  eyebrow: string;
  title: string;
  body: string;
}) {
  const isImageRight = panel.imageSide === "right";

  return (
    <article
      aria-labelledby={`journey-${panel.key}-title`}
      className="relative w-full shrink-0 lg:h-full lg:w-screen"
    >
      <div className="grid h-full grid-cols-12 items-center gap-x-8 gap-y-12 px-6 py-20 md:px-12 md:py-28 lg:px-16 lg:py-12">
        {/* TEXT */}
        <div
          className={[
            "col-span-12 flex flex-col gap-7 lg:col-span-5",
            isImageRight ? "lg:order-1" : "lg:order-2 lg:col-start-7",
          ].join(" ")}
        >
          <div className="flex items-center gap-4">
            <span aria-hidden className="font-accent italic text-[var(--brand-gold)]">
              ·{" "}
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {eyebrow}
            </span>
          </div>

          <h3
            id={`journey-${panel.key}-title`}
            className="whitespace-pre-line font-display font-normal leading-[1.05] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(1.875rem,4vw,4rem)]"
          >
            {title}
          </h3>

          <p className="max-w-md font-body text-base font-light leading-[1.8] text-[var(--brand-text)]/80 md:text-[1.05rem]">
            {body}
          </p>

          <span aria-hidden className="block h-px w-12 bg-[var(--brand-gold)]" />
        </div>

        {/* IMAGE — fills available height on desktop, no gap above/below */}
        <figure
          className={[
            "relative col-span-12 aspect-[4/5] overflow-hidden bg-[var(--brand-card)] lg:col-span-6 lg:aspect-auto lg:h-full",
            isImageRight ? "lg:order-2 lg:col-start-7" : "lg:order-1",
          ].join(" ")}
        >
          <Image
            src={panel.src}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ filter: "saturate(0.78) brightness(0.92)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,20,16,0) 60%, rgba(26,20,16,0.30) 100%)",
            }}
          />
        </figure>
      </div>
    </article>
  );
}


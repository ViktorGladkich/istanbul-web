"use client";

import { useRef } from "react";
import { BlurImage as Image } from "@/components/media/BlurImage";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/animation/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cinematic full-bleed photo of the dining room. The text sits in the
 * lower-left corner with a soft warm gradient pulling it out from the
 * image. Image and overlay text scroll at different rates to create depth.
 */
export function AtmosphereSection() {
  const t = useTranslations("atmosphere");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      if (!sectionRef.current || !imageRef.current || !textRef.current) return;

      const ctx = gsap.context(() => {
        // Image moves slower than scroll (translateY downward less than the
        // section), text moves faster — creating a 3-layer depth effect.
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(textRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { dependencies: [reduced], scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="atmosphere-title"
      className="relative w-full bg-[var(--brand-bg)] py-20 md:py-32"
    >
      <Reveal mode="clip">
        <figure className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-[var(--brand-card)] md:h-[80vh] md:min-h-[560px]">
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: "scale(1.15)" }}
          >
            <Image
              src="/images/haus.jpeg"
              alt={t("eyebrow")}
              fill
              priority={false}
              sizes="100vw"
              className="object-cover"
              style={{ filter: "saturate(0.75) brightness(0.85)" }}
            />
          </div>

          {/* Bottom gradient anchor for text */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,20,16,0.65) 0%, rgba(26,20,16,0.15) 38%, rgba(26,20,16,0) 70%)",
            }}
          />

          <figcaption
            ref={textRef}
            className="absolute inset-x-0 bottom-0 px-6 pb-12 will-change-transform md:px-12 md:pb-20"
          >
            <div className="mx-auto max-w-[1600px]">
              <div className="grid grid-cols-12 gap-x-8">
                <div className="col-span-12 md:col-span-7 lg:col-span-6">
                  <Reveal>
                    <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[#f4efe6]/85">
                      {t("eyebrow")}
                    </span>
                  </Reveal>
                  <Reveal delay={120}>
                    <h2
                      id="atmosphere-title"
                      className="mt-5 whitespace-pre-line font-display font-normal leading-[1.05] tracking-[-0.005em] text-[#f4efe6] text-[clamp(2rem,4.5vw,4.5rem)]"
                    >
                      {t("title")}
                    </h2>
                  </Reveal>
                  <Reveal delay={240}>
                    <p className="mt-6 max-w-md font-body text-sm font-light leading-relaxed text-[#f4efe6]/80 md:text-base">
                      {t("lede")}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

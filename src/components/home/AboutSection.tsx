import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative bg-[var(--brand-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Hairline divider */}
        <Reveal>
          <div
            className="h-px w-full bg-[var(--brand-neutral)]"
            aria-hidden
          />
        </Reveal>

        <div className="grid grid-cols-12 gap-x-8 gap-y-20 py-32 md:py-44 lg:py-56">
          <Reveal
            delay={0}
            className="col-span-12 md:col-span-3 md:pt-3"
          >
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal
            delay={120}
            className="col-span-12 md:col-span-9"
          >
            <h2
              id="about-title"
              className="whitespace-pre-line font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.75rem,6vw,6.25rem)]"
            >
              {t("title")}
            </h2>
          </Reveal>

          <div className="col-span-12 md:col-span-3" aria-hidden />

          <Reveal
            delay={260}
            className="col-span-12 md:col-span-7 lg:col-span-6"
          >
            <p className="font-body text-base font-light leading-[1.85] text-[var(--brand-text)]/80 md:text-lg">
              {t("body")}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="h-px w-full bg-[var(--brand-neutral)]"
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  );
}

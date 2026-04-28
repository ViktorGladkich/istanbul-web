"use client";

import { useTranslations } from "next-intl";
import { Bike } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";

const LIEFERANDO_URL = "https://lieferando.de";

export function LieferandoSection() {
  const t = useTranslations("lieferando");

  return (
    <section className="relative bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 border-t border-[var(--brand-neutral)] pt-16 md:pt-24">
          <Reveal className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("eyebrow")}
            </span>
          </Reveal>

          <div className="col-span-12 md:col-span-9 lg:col-span-8 flex flex-col gap-10">
            <Reveal delay={120}>
              <h2 className="whitespace-pre-line font-display font-normal leading-[1.05] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.25rem,5vw,5rem)]">
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="max-w-xl font-body text-base font-light leading-[1.85] text-[var(--brand-text)]/80 md:text-lg">
                {t("body")}
              </p>
            </Reveal>

            <Reveal delay={360}>
              <a
                href={LIEFERANDO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 self-start border border-[var(--brand-text)] px-9 py-5 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
              >
                <Bike
                  size={18}
                  strokeWidth={1.2}
                  className="transition-transform duration-700 group-hover:translate-x-0.5"
                />
                <span>{t("cta")}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

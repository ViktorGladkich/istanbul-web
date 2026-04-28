import { BlurImage as Image } from "@/components/media/BlurImage";
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
        <Reveal>
          <div
            className="h-px w-full bg-[var(--brand-neutral)]"
            aria-hidden
          />
        </Reveal>

        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-16 py-32 md:py-44 lg:py-52">
          {/* LEFT — quote */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                {t("eyebrow")}
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h2
                id="about-title"
                className="mt-8 whitespace-pre-line font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.5rem,5vw,5.5rem)]"
              >
                {t("title")}
              </h2>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-10 max-w-xl font-body text-base font-light leading-[1.85] text-[var(--brand-text)]/80 md:text-lg">
                {t("body")}
              </p>
            </Reveal>
          </div>

          {/* RIGHT — atmospheric photo */}
          <Reveal mode="clip" delay={200} className="col-span-12 lg:col-span-5">
            <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--brand-card)]">
              <Image
                src="/images/hommage.jpeg"
                alt={t("eyebrow")}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.02]"
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

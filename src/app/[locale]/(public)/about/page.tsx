import type { Metadata } from "next";
import { BlurImage as Image } from "@/components/media/BlurImage";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animation/Reveal";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("eyebrow"),
    description: t("lede"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      {/* HEADER */}
      <header className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <Reveal className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-brand-muted">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-9">
            <h1 className="whitespace-pre-line font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.75rem,6vw,6.25rem)]">
              {t("page_title")}
            </h1>
          </Reveal>
          <div className="col-span-12 md:col-span-3" aria-hidden />
          <Reveal delay={240} className="col-span-12 md:col-span-9 lg:col-span-7">
            <p className="font-body text-base font-light leading-[1.85] text-[var(--brand-text)]/80 md:text-lg">
              {t("lede")}
            </p>
          </Reveal>
        </div>
      </header>

      {/* STORY */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-36">
        <div className="border-t border-[var(--brand-neutral)] pt-16 md:pt-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-12">
            <Reveal className="col-span-12 md:col-span-3 md:pt-3">
              <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                {t("story.eyebrow")}
              </span>
            </Reveal>
            <Reveal delay={120} className="col-span-12 md:col-span-9">
              <h2 className="whitespace-pre-line font-display font-normal leading-[1.05] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2rem,4.5vw,4rem)]">
                {t("story.title")}
              </h2>
            </Reveal>
          </div>

          {/* WIDE STORY IMAGE — between heading and paragraphs */}
          <Reveal mode="clip" delay={200}>
            <figure className="relative mt-16 aspect-[16/9] w-full overflow-hidden bg-[var(--brand-card)] md:mt-20 md:aspect-[21/9]">
              <Image
                src="/images/about-story.jpg"
                alt={t("story.title")}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
                style={{ filter: "saturate(0.78) brightness(0.9)" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(26,20,16,0) 70%, rgba(26,20,16,0.25) 100%)",
                }}
              />
            </figure>
          </Reveal>

          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12 md:mt-24">
            <div className="col-span-12 md:col-span-3" aria-hidden />
            <div className="col-span-12 space-y-10 md:col-span-9 lg:col-span-7">
              <Reveal delay={120}>
                <p className="font-body text-base font-light leading-[1.9] text-[var(--brand-text)]/85 md:text-lg">
                  {t("story.p1")}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="font-body text-base font-light leading-[1.9] text-[var(--brand-text)]/85 md:text-lg">
                  {t("story.p2")}
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p className="font-body text-base font-light leading-[1.9] text-[var(--brand-text)]/85 md:text-lg">
                  {t("story.p3")}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE — founder photo left, quote right */}
      <section className="bg-[var(--brand-card)]/40 py-24 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-12 items-center gap-x-12 gap-y-12">
            <Reveal mode="clip" className="col-span-12 md:col-span-5">
              <figure className="relative aspect-[4/5] w-full overflow-hidden bg-(--brand-bg)">
                <Image
                  src="/images/grunder.jpeg"
                  alt={t("quote.author")}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.7) brightness(0.92) contrast(0.95)" }}
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

            <div className="col-span-12 md:col-span-7">
              <Reveal delay={120}>
                <p className="font-accent italic font-normal leading-[1.25] text-[var(--brand-text)] text-[clamp(1.75rem,3.4vw,3rem)]">
                  &ldquo;{t("quote.text")}&rdquo;
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-10 flex flex-col gap-2">
                  <span className="block h-px w-12 bg-[var(--brand-gold)]" aria-hidden />
                  <p className="mt-4 font-body text-sm font-light tracking-[0.18em] text-[var(--brand-text)]">
                    {t("quote.author")}
                  </p>
                  <p className="font-body text-[10px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                    {t("quote.role")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-44">
        <div className="border-t border-[var(--brand-neutral)] pt-16 md:pt-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <Reveal className="col-span-12 md:col-span-3 md:pt-3">
              <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                {t("values.eyebrow")}
              </span>
            </Reveal>
            <Reveal delay={120} className="col-span-12 md:col-span-9">
              <h2 className="whitespace-pre-line font-display font-normal leading-[1.05] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2rem,4.5vw,4rem)]">
                {t("values.title")}
              </h2>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
            {(["hand", "patience", "place"] as const).map((key, i) => (
              <Reveal key={key} delay={120 + i * 120}>
                <article className="border-t border-[var(--brand-neutral)] pt-8">
                  <span className="font-accent italic text-base text-[var(--brand-gold)]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-2xl tracking-[-0.005em] text-[var(--brand-text)] md:text-3xl">
                    {t(`values.items.${key}.title`)}
                  </h3>
                  <p className="mt-5 font-body text-sm font-light leading-[1.8] text-[var(--brand-text)]/80 md:text-base">
                    {t(`values.items.${key}.body`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-6 pb-40 md:px-12">
        <Reveal>
          <div className="flex justify-center border-t border-[var(--brand-neutral)] pt-16">
            <Link
              href="/menu"
              className="border border-[var(--brand-text)] px-12 py-5 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

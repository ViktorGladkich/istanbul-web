import "server-only";
import { BlurImage as Image } from "@/components/media/BlurImage";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/animation/Reveal";
import type { Locale } from "@/lib/menu";

function pickName(
  i: { nameDE: string; nameTR: string; nameEN: string },
  l: Locale,
) {
  return l === "tr" ? i.nameTR : l === "en" ? i.nameEN : i.nameDE;
}

function pickDesc(
  i: { descDE: string | null; descTR: string | null; descEN: string | null },
  l: Locale,
) {
  return l === "tr" ? i.descTR : l === "en" ? i.descEN : i.descDE;
}

function formatEUR(value: number, locale: Locale) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
    { style: "currency", currency: "EUR", minimumFractionDigits: 0 },
  ).format(value);
}

export async function TonightsTable({ locale }: { locale: Locale }) {
  const item = await prisma.menuItem.findFirst({
    where: { isFeaturedToday: true, isAvailable: true },
  });
  if (!item) return null;

  const t = await getTranslations({ locale, namespace: "tonight" });
  const name = pickName(item, locale);
  const desc = pickDesc(item, locale);

  return (
    <section
      aria-labelledby="tonight-title"
      className="relative bg-[var(--brand-card)]/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36">
        <div className="grid grid-cols-12 items-center gap-x-12 gap-y-10">
          {/* Photo */}
          <Reveal mode="clip" className="col-span-12 md:col-span-5">
            <figure className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--brand-bg)]">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={name}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: "saturate(0.78) brightness(0.92)" }}
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 50% 30%, #6b4a18 0%, #2a1810 70%, #14090a 100%)",
                  }}
                />
              )}
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

          {/* Copy */}
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="text-[var(--brand-gold)]">
                  ★
                </span>
                <span
                  id="tonight-title"
                  className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]"
                >
                  {t("eyebrow")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-6 font-display font-normal leading-[1.05] tracking-[-0.005em] text-[var(--brand-text)] text-[clamp(2.25rem,4.5vw,4rem)]">
                {name}
              </h2>
            </Reveal>

            {desc && (
              <Reveal delay={200}>
                <p className="mt-6 max-w-md font-body text-base font-light leading-[1.85] text-[var(--brand-text)]/80 md:text-lg">
                  {desc}
                </p>
              </Reveal>
            )}

            <Reveal delay={280}>
              <p className="mt-10 font-accent italic text-[var(--brand-gold)] text-2xl md:text-3xl">
                {formatEUR(item.price, locale)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

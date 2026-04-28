import { BlurImage as Image } from "@/components/media/BlurImage";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";

/**
 * Six dish photos pulled from /public/images/. Square aspect, hover lifts
 * the saturation and pushes a 1.02 scale — Instagram-style mosaic without
 * UI chrome. Captions only read by screen readers.
 */
const TILES: ReadonlyArray<{ src: string; key: string }> = [
  { src: "/images/adana_kebap.jpeg", key: "adana" },
  { src: "/images/imam_bayildi.jpeg", key: "imam" },
  { src: "/images/kunefe.jpeg", key: "kunefe" },
  { src: "/images/baklava.jpeg", key: "baklava" },
  { src: "/images/iskender.jpeg", key: "iskender" },
  { src: "/images/manti.jpeg", key: "manti" },
];

export function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section
      aria-labelledby="gallery-title"
      className="relative bg-[var(--brand-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-6 pb-32 pt-20 md:px-12 md:pb-44 md:pt-32">
        <div className="mb-12 flex items-baseline justify-between md:mb-20">
          <Reveal>
            <span
              id="gallery-title"
              className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]"
            >
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <span className="font-accent italic text-base text-[var(--brand-gold)]">
              · {TILES.length}
            </span>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:gap-2 lg:grid-cols-6">
          {TILES.map((tile, i) => (
            <li key={tile.src}>
              <Reveal mode="clip" delay={(i % 6) * 90}>
                <figure className="group relative aspect-square w-full overflow-hidden bg-[var(--brand-card)]">
                  <Image
                    src={tile.src}
                    alt={t(`alt.${tile.key}`)}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-all duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    style={{ filter: "saturate(0.72) brightness(0.9)" }}
                  />
                  {/* Warm overlay that fades on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[rgba(26,20,16,0.18)] transition-opacity duration-[1200ms] ease-out group-hover:opacity-0"
                  />
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

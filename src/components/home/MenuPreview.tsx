import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";
import { Link } from "@/i18n/navigation";

type DishKey = "adana" | "imam" | "kunefe";

const DISHES: ReadonlyArray<{
  key: DishKey;
  imageSrc?: string;
  /** Background gradient used when no photo is available yet */
  placeholder: string;
}> = [
  {
    key: "adana",
    imageSrc: "/images/adana_kebap.jpeg",
    placeholder:
      "radial-gradient(120% 90% at 30% 25%, #4a2618 0%, #2a1810 55%, #14090a 100%)",
  },
  {
    key: "imam",
    imageSrc: "/images/imam_bayildi.jpeg",
    placeholder:
      "radial-gradient(120% 90% at 70% 30%, #3d3522 0%, #2a2418 55%, #14110a 100%)",
  },
  {
    key: "kunefe",
    imageSrc: "/images/kunefe.jpeg",
    placeholder:
      "radial-gradient(120% 90% at 50% 30%, #6b4a18 0%, #3a2810 55%, #1a1208 100%)",
  },
];

export function MenuPreview() {
  const t = useTranslations("menu_preview");

  return (
    <section
      id="menu-preview"
      aria-labelledby="menu-preview-title"
      className="relative bg-[var(--brand-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 pb-20 pt-24 md:pb-28 md:pt-32">
          <Reveal className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("eyebrow")}
            </span>
          </Reveal>

          <div className="col-span-12 md:col-span-9 flex flex-col gap-6">
            <Reveal delay={120}>
              <h2
                id="menu-preview-title"
                className="font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.5rem,5vw,5rem)]"
              >
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="max-w-md font-body text-sm font-light uppercase tracking-[0.22em] text-[var(--brand-muted)]">
                {t("lede")}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-12 pb-32 md:grid-cols-3 md:gap-x-10 md:gap-y-16 md:pb-44">
          {DISHES.map((dish, i) => (
            <li key={dish.key}>
              <Reveal delay={i * 140}>
                <DishCard
                  name={t(`dishes.${dish.key}.name`)}
                  desc={t(`dishes.${dish.key}.desc`)}
                  price={t(`dishes.${dish.key}.price`)}
                  imageSrc={dish.imageSrc}
                  placeholder={dish.placeholder}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="flex justify-center pb-32 md:pb-44">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center border border-[var(--brand-text)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-700 ease-out hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DishCard({
  name,
  desc,
  price,
  imageSrc,
  placeholder,
}: {
  name: string;
  desc: string;
  price: string;
  imageSrc?: string;
  placeholder: string;
}) {
  return (
    <article className="group flex flex-col gap-7">
      <DishMedia name={name} imageSrc={imageSrc} placeholder={placeholder} />

      <div className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between gap-6">
          <h3 className="font-display font-normal leading-[1.05] tracking-[-0.005em] text-[var(--brand-text)] text-2xl md:text-[1.75rem]">
            {name}
          </h3>
          <span className="font-accent italic leading-none text-[var(--brand-gold)] text-lg md:text-xl">
            {price}
          </span>
        </header>

        <p className="font-body text-sm font-light leading-relaxed text-[var(--brand-muted)] md:text-[0.95rem]">
          {desc}
        </p>
      </div>
    </article>
  );
}

function DishMedia({
  name,
  imageSrc,
  placeholder,
}: {
  name: string;
  imageSrc?: string;
  placeholder: string;
}) {
  return (
    <figure
      className="relative aspect-[4/5] overflow-hidden bg-[var(--brand-card)]"
      aria-label={name}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
          style={{ filter: "saturate(0.78) brightness(0.92)" }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
            style={{ background: placeholder }}
            aria-hidden
          />
          {/* faint plate ornament — neutral pictorial cue while photo is pending */}
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="absolute inset-0 m-auto h-2/5 w-2/5 opacity-20"
          >
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#f4efe6"
              strokeWidth="0.6"
            />
            <circle
              cx="100"
              cy="100"
              r="62"
              fill="none"
              stroke="#f4efe6"
              strokeWidth="0.4"
            />
          </svg>
        </>
      )}
      {/* warm overlay — reads consistent with hero treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,20,16,0) 55%, rgba(26,20,16,0.35) 100%)",
        }}
      />
    </figure>
  );
}

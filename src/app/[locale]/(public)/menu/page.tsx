import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/animation/Reveal";
import { MenuView } from "@/components/menu/MenuView";
import { TableTracker } from "@/components/menu/TableTracker";
import { MenuStructuredData } from "@/components/seo/MenuStructuredData";
import { getMenuItems } from "@/lib/menu-server";
import type { Locale } from "@/lib/menu";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });
  return {
    title: t("eyebrow"),
    description: t("lede"),
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "menu" });
  const items = await getMenuItems(locale as Locale);

  return (
    <>
      <MenuStructuredData locale={locale as Locale} />
      <TableTracker />
      <header className="mx-auto max-w-[1600px] px-6 pb-12 pt-44 md:px-12 md:pb-20 md:pt-56">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <Reveal className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-9">
            <h1 className="whitespace-pre-line font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.75rem,6vw,6.25rem)]">
              {t("title")}
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

      <MenuView items={items} locale={locale} />

      <div className="h-32 md:h-44" aria-hidden />
    </>
  );
}

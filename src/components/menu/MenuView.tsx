"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/animation/Reveal";
import { MENU_CATEGORIES, type MenuCategory, type LocalizedMenuItem } from "@/lib/menu";
import { CategoryFilter, type SelectedCategory } from "./CategoryFilter";
import { MenuCard } from "./MenuCard";

export function MenuView({
  items,
  locale,
}: {
  items: LocalizedMenuItem[];
  locale: string;
}) {
  const t = useTranslations("menu");
  const [selected, setSelected] = useState<SelectedCategory>("all");

  const available = useMemo(
    () => new Set(items.map((i) => i.category)),
    [items],
  );

  const grouped = useMemo(() => {
    const m = new Map<MenuCategory, LocalizedMenuItem[]>();
    for (const c of MENU_CATEGORIES) m.set(c, []);
    for (const i of items) m.get(i.category)?.push(i);
    return m;
  }, [items]);

  const visibleCategories =
    selected === "all"
      ? MENU_CATEGORIES.filter((c) => (grouped.get(c)?.length ?? 0) > 0)
      : [selected];

  return (
    <>
      <CategoryFilter
        value={selected}
        onChange={setSelected}
        available={available}
      />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        {visibleCategories.length === 0 && (
          <p className="py-32 text-center font-body text-sm font-light uppercase tracking-[0.22em] text-[var(--brand-muted)]">
            {t("empty")}
          </p>
        )}

        {visibleCategories.map((category) => {
          const categoryItems = grouped.get(category) ?? [];
          if (categoryItems.length === 0) return null;
          return (
            <section
              key={category}
              id={`category-${category}`}
              aria-labelledby={`category-${category}-title`}
              className="pt-20 pb-16 md:pt-28 md:pb-20"
            >
              <Reveal>
                <header className="mb-14 grid grid-cols-12 gap-x-8 md:mb-20">
                  <span className="col-span-12 mb-4 font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)] md:col-span-3 md:mb-0 md:pt-3">
                    {String(categoryItems.length).padStart(2, "0")}
                  </span>
                  <h2
                    id={`category-${category}-title`}
                    className="col-span-12 font-display font-normal leading-[1.02] tracking-[-0.01em] text-[var(--brand-text)] text-[clamp(2.25rem,4.5vw,4.5rem)] md:col-span-9"
                  >
                    {t(`categories.${category}`)}
                  </h2>
                </header>
              </Reveal>

              <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-x-10 md:gap-y-16 lg:grid-cols-3 xl:grid-cols-4">
                {categoryItems.map((item, i) => (
                  <li key={item.id} className="h-full">
                    <Reveal delay={(i % 4) * 120} className="h-full">
                      <MenuCard item={item} locale={locale} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

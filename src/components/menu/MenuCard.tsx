"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCart } from "@/hooks/useCart";
import type { LocalizedMenuItem } from "@/lib/menu";
import { MenuItemMedia } from "./MenuItemMedia";

const PRICE_FORMATTERS: Record<string, Intl.NumberFormat> = {};
function formatPrice(value: number, locale: string) {
  if (!PRICE_FORMATTERS[locale]) {
    PRICE_FORMATTERS[locale] = new Intl.NumberFormat(
      locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
      { style: "currency", currency: "EUR", minimumFractionDigits: 2 },
    );
  }
  return PRICE_FORMATTERS[locale].format(value);
}

export function MenuCard({
  item,
  locale,
}: {
  item: LocalizedMenuItem;
  locale: string;
}) {
  const t = useTranslations("menu");
  const tCart = useTranslations("cart");
  const add = useCart((s) => s.add);

  const onAdd = () => {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      category: item.category,
    });
    toast(tCart("added_toast", { name: item.name }));
  };

  return (
    <article className="group flex h-full flex-col gap-7">
      <MenuItemMedia
        name={item.name}
        imageUrl={item.imageUrl}
        category={item.category}
      />

      <div className="flex flex-1 flex-col gap-3">
        <header className="flex items-baseline justify-between gap-6">
          <h3 className="font-display font-normal leading-[1.05] tracking-[-0.005em] text-[var(--brand-text)] text-2xl md:text-[1.75rem]">
            {item.name}
          </h3>
          <span className="font-accent italic leading-none text-[var(--brand-gold)] text-lg md:text-xl">
            {formatPrice(item.price, locale)}
          </span>
        </header>

        {item.description && (
          <p className="font-body text-sm font-light leading-relaxed text-[var(--brand-muted)] md:text-[0.95rem]">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between gap-4">
          <ul className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--brand-muted)]">
            {item.isVegetarian && <li>{t("tags.vegetarian")}</li>}
            {item.isSpicy && <li>{t("tags.spicy")}</li>}
          </ul>
          <button
            type="button"
            onClick={onAdd}
            className="border border-[var(--brand-text)] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-700 ease-out hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
          >
            {t("add")}
          </button>
        </div>
      </div>
    </article>
  );
}

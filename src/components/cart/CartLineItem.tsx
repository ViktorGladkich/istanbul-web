"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCart, type CartItem } from "@/hooks/useCart";
import { MenuItemMedia } from "@/components/menu/MenuItemMedia";
import type { MenuCategory } from "@/lib/menu";

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
    { style: "currency", currency: "EUR", minimumFractionDigits: 2 },
  ).format(value);
}

export function CartLineItem({ item }: { item: CartItem }) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { increment, decrement, remove } = useCart((s) => ({
    increment: s.increment,
    decrement: s.decrement,
    remove: s.remove,
  }));

  return (
    <li className="flex gap-5 border-b border-[var(--brand-neutral)] py-6 last:border-b-0">
      <div className="w-20 shrink-0">
        <MenuItemMedia
          name={item.name}
          imageUrl={item.imageUrl}
          category={item.category as MenuCategory}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-tight tracking-[-0.005em] text-[var(--brand-text)]">
            {item.name}
          </h3>
          <span className="font-accent italic text-[var(--brand-gold)]">
            {formatPrice(item.price * item.quantity, locale)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div
            role="group"
            aria-label="Quantity"
            className="flex items-center border border-[var(--brand-neutral)]"
          >
            <button
              type="button"
              onClick={() => decrement(item.id)}
              aria-label={t("qty_decrease")}
              className="flex h-8 w-8 items-center justify-center text-[var(--brand-text)] transition-colors duration-300 hover:text-[var(--brand-terra)]"
            >
              −
            </button>
            <span
              aria-live="polite"
              className="min-w-[2ch] px-2 text-center font-body text-sm tabular-nums"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increment(item.id)}
              aria-label={t("qty_increase")}
              className="flex h-8 w-8 items-center justify-center text-[var(--brand-text)] transition-colors duration-300 hover:text-[var(--brand-terra)]"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => remove(item.id)}
            className="font-body text-[10px] uppercase tracking-[0.22em] text-[var(--brand-muted)] transition-colors duration-500 hover:text-[var(--brand-terra)]"
          >
            {t("remove")}
          </button>
        </div>
      </div>
    </li>
  );
}

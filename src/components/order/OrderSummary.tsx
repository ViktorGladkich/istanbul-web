"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  useCart,
  selectItemCount,
  selectSubtotal,
} from "@/hooks/useCart";

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
    { style: "currency", currency: "EUR", minimumFractionDigits: 2 },
  ).format(value);
}

export function OrderSummary() {
  const t = useTranslations("order.summary");
  const locale = useLocale();
  const items = useCart((s) => s.items);
  const count = useCart(selectItemCount);
  const subtotal = useCart(selectSubtotal);

  return (
    <div className="lg:sticky lg:top-32">
      <div className="border-t border-[var(--brand-neutral)] pt-8">
        <div className="mb-10 flex items-baseline justify-between">
          <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
            {t("eyebrow")}
          </span>
          <span className="font-body text-[11px] font-light tracking-[0.18em] text-[var(--brand-muted)]">
            {t("items", { count })}
          </span>
        </div>

        <ul className="divide-y divide-[var(--brand-neutral)]/70">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-6 py-6">
              <span className="mt-1 inline-flex min-w-[2.5rem] font-accent italic text-base text-[var(--brand-gold)]">
                ×{item.quantity}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg leading-snug tracking-[-0.005em] text-[var(--brand-text)]">
                  {item.name}
                </h3>
                <p className="mt-1 font-body text-[11px] font-light uppercase tracking-[0.22em] text-[var(--brand-muted)]">
                  {formatPrice(item.price, locale)}
                </p>
              </div>
              <span className="font-accent italic text-base text-[var(--brand-text)]">
                {formatPrice(item.price * item.quantity, locale)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-[var(--brand-neutral)] pt-8">
          <div className="flex items-baseline justify-between">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
              {t("total")}
            </span>
            <span className="font-accent italic text-3xl text-[var(--brand-gold)]">
              {formatPrice(subtotal, locale)}
            </span>
          </div>
          <p className="mt-4 font-body text-xs font-light leading-relaxed text-[var(--brand-muted)]">
            {t("note")}
          </p>
        </div>
      </div>
    </div>
  );
}

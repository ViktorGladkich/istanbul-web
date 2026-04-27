"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  useCart,
  useCartHydrated,
  selectItemCount,
  selectSubtotal,
} from "@/hooks/useCart";
import { CartLineItem } from "./CartLineItem";

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
    { style: "currency", currency: "EUR", minimumFractionDigits: 2 },
  ).format(value);
}

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const hydrated = useCartHydrated();
  const items = useCart((s) => s.items);
  const count = useCart(selectItemCount);
  const subtotal = useCart(selectSubtotal);
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button
          type="button"
          aria-label={t("open")}
          className="relative flex items-center gap-3 border border-current px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-current transition-opacity duration-500 hover:opacity-70"
        >
          <BagIcon className="h-3.5 w-3.5" />
          <span aria-hidden>{t("title")}</span>
          {hydrated && count > 0 && (
            <span
              aria-label={`${count} items`}
              className="ml-1 inline-flex min-w-[1.25rem] items-center justify-center font-accent italic text-[var(--brand-gold)]"
            >
              {count}
            </span>
          )}
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-[rgba(12,8,5,0.55)] backdrop-blur-sm" />
        <Drawer.Content
          className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-[var(--brand-neutral)] bg-[var(--brand-bg)] outline-none"
          aria-describedby={undefined}
        >
          <header className="flex items-center justify-between border-b border-[var(--brand-neutral)] px-7 py-6">
            <Drawer.Title className="font-display text-2xl tracking-[-0.005em] text-[var(--brand-text)]">
              {t("title")}
            </Drawer.Title>
            <Drawer.Close
              aria-label={t("close")}
              className="font-body text-[10px] uppercase tracking-[0.28em] text-[var(--brand-muted)] transition-colors duration-500 hover:text-[var(--brand-terra)]"
            >
              {t("close")}
            </Drawer.Close>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-7 text-center">
              <h3 className="font-display text-2xl text-[var(--brand-text)]">
                {t("empty_title")}
              </h3>
              <p className="max-w-xs font-body text-sm font-light leading-relaxed text-[var(--brand-muted)]">
                {t("empty_lede")}
              </p>
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="mt-4 border border-[var(--brand-text)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
              >
                {t("view_menu")}
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto px-7" data-lenis-prevent>
                {items.map((item) => (
                  <CartLineItem key={item.id} item={item} />
                ))}
              </ul>

              <footer className="border-t border-[var(--brand-neutral)] px-7 py-6">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="font-body text-[11px] uppercase tracking-[0.28em] text-[var(--brand-muted)]">
                    {t("total")}
                  </span>
                  <span className="font-accent italic text-2xl text-[var(--brand-gold)]">
                    {formatPrice(subtotal, locale)}
                  </span>
                </div>
                <Link
                  href="/order"
                  onClick={() => setOpen(false)}
                  className="block w-full border border-[var(--brand-text)] py-4 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
                >
                  {t("checkout")}
                </Link>
              </footer>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
      className={className}
    >
      <path d="M3 5h10l-.7 9H3.7L3 5Z" />
      <path d="M6 5V3.5a2 2 0 0 1 4 0V5" strokeLinecap="round" />
    </svg>
  );
}

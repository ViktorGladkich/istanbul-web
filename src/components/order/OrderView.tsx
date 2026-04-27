"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart, useCartHydrated } from "@/hooks/useCart";
import { Reveal } from "@/components/animation/Reveal";
import { OrderSummary } from "./OrderSummary";
import { CheckoutForm } from "./CheckoutForm";

export function OrderView({
  canceled = false,
  prefilledTable = "",
}: {
  canceled?: boolean;
  prefilledTable?: string;
}) {
  const t = useTranslations("order");
  const hydrated = useCartHydrated();
  const itemCount = useCart((s) => s.items.length);

  if (!hydrated) {
    return (
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="border-t border-[var(--brand-neutral)] pt-10">
          <span className="font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-muted)]">
            …
          </span>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="flex flex-col items-start gap-10 border-t border-[var(--brand-neutral)] pt-16 md:items-center md:pt-24 md:text-center">
          <h2 className="font-display text-3xl tracking-[-0.005em] text-[var(--brand-text)] md:text-5xl">
            {t("empty.title")}
          </h2>
          <p className="max-w-md font-body text-base font-light leading-relaxed text-[var(--brand-muted)]">
            {t("empty.lede")}
          </p>
          <Link
            href="/menu"
            className="border border-[var(--brand-text)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
          >
            {t("empty.cta")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
      {canceled && (
        <Reveal>
          <div className="mb-12 border-t border-b border-[var(--brand-terra)]/40 py-6">
            <p className="font-body text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brand-terra)]">
              {t("canceled.title")}
            </p>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[var(--brand-text)]/85">
              {t("canceled.body")}
            </p>
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-12 gap-x-12 gap-y-20">
        <Reveal className="col-span-12 lg:col-span-5">
          <OrderSummary />
        </Reveal>
        <Reveal delay={120} className="col-span-12 lg:col-span-7">
          <CheckoutForm prefilledTable={prefilledTable} />
        </Reveal>
      </div>
    </section>
  );
}

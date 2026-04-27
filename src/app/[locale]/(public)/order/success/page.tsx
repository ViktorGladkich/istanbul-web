import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animation/Reveal";
import { SuccessClient } from "@/components/order/SuccessClient";
import { prisma } from "@/lib/prisma";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

type PageParams = { locale: string };
type SearchParams = { session_id?: string };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "order.success" });
  return {
    title: t("eyebrow"),
    description: t("lede"),
    robots: { index: false, follow: false },
  };
}

function formatPrice(value: number, locale: string) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : locale === "en" ? "en-IE" : "de-DE",
    { style: "currency", currency: "EUR", minimumFractionDigits: 2 },
  ).format(value);
}

function asKnownStatus(status: string): OrderStatus {
  return (ORDER_STATUSES as readonly string[]).includes(status)
    ? (status as OrderStatus)
    : "pending_payment";
}

export default async function OrderSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "order.success" });
  const tStatus = await getTranslations({ locale, namespace: "order.status" });

  const sessionId = sp.session_id?.trim() || null;

  const order = sessionId
    ? await prisma.order.findFirst({ where: { stripeSessionId: sessionId } })
    : null;

  return (
    <>
      <SuccessClient orderId={order?.id ?? null} />

      <header className="mx-auto max-w-[1600px] px-6 pb-12 pt-44 md:px-12 md:pb-20 md:pt-56">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <Reveal className="col-span-12 md:col-span-3 md:pt-3">
            <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-gold)]">
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

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12">
        <div className="border-t border-[var(--brand-neutral)] pt-12">
          {order ? (
            <Reveal>
              <dl className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-12">
                <div>
                  <dt className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                    {t("order_no")}
                  </dt>
                  <dd className="mt-3 font-accent italic text-2xl text-[var(--brand-text)]">
                    {order.id.slice(-8).toUpperCase()}
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                    {t("status_label")}
                  </dt>
                  <dd className="mt-3 font-accent italic text-2xl text-[var(--brand-text)]">
                    {tStatus(asKnownStatus(order.status))}
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                    {t("total")}
                  </dt>
                  <dd className="mt-3 font-accent italic text-2xl text-[var(--brand-gold)]">
                    {formatPrice(order.totalAmount, locale)}
                  </dd>
                </div>
              </dl>
            </Reveal>
          ) : (
            <Reveal>
              <p className="font-body text-base font-light leading-relaxed text-[var(--brand-text)]/80">
                {t("missing_session")}
              </p>
            </Reveal>
          )}

          <Reveal delay={180}>
            <div className="mt-16 flex flex-wrap gap-5">
              <Link
                href="/"
                className="border border-[var(--brand-text)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
              >
                {t("back_home")}
              </Link>
              <Link
                href="/menu"
                className="border border-[var(--brand-neutral)] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-muted)] transition-colors duration-700 hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
              >
                {t("view_menu")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

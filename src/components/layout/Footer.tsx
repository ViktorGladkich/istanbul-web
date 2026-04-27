import { getTranslations } from "next-intl/server";
import { Bike } from "lucide-react";
import { Logo } from "./Logo";

const LIEFERANDO_URL = "https://lieferando.de";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();
  const address =
    process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS ?? "Musterstraße 1, 01069 Dresden";
  const phone = process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? "+49 351 000 0000";
  const email =
    process.env.NEXT_PUBLIC_RESTAURANT_EMAIL ?? "info@istanbul-dresden.de";

  return (
    <footer className="border-t border-[var(--brand-neutral)] bg-[var(--brand-card)]/40">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          <div className="col-span-12 md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-[var(--brand-muted)]">
              {t("tagline")}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <FooterHeading>{t("address")}</FooterHeading>
            <address className="mt-5 not-italic">
              <p className="font-body text-sm font-light leading-relaxed text-[var(--brand-text)]/80 whitespace-pre-line">
                {address}
              </p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-3 inline-block font-body text-sm font-light text-[var(--brand-text)]/80 transition-colors duration-500 hover:text-[var(--brand-terra)]"
              >
                {phone}
              </a>
              <br />
              <a
                href={`mailto:${email}`}
                className="font-body text-sm font-light text-[var(--brand-text)]/80 transition-colors duration-500 hover:text-[var(--brand-terra)]"
              >
                {email}
              </a>
            </address>
          </div>

          <div className="col-span-6 md:col-span-2">
            <FooterHeading>{t("hours")}</FooterHeading>
            <p className="mt-5 font-body text-sm font-light leading-relaxed text-[var(--brand-text)]/80 whitespace-pre-line">
              {t("hours_value")}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <FooterHeading>{t("delivery_label")}</FooterHeading>
            <a
              href={LIEFERANDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 border border-[var(--brand-text)] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
            >
              <Bike size={16} strokeWidth={1.2} />
              <span>{t("delivery")}</span>
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-[var(--brand-neutral)] pt-8 md:flex-row md:items-center">
          <p className="font-body text-xs font-light tracking-[0.18em] text-[var(--brand-muted)]">
            {t("rights", { year })}
          </p>
          <div className="flex gap-6 font-body text-xs font-light tracking-[0.18em] text-[var(--brand-muted)]">
            <a
              href="/imprint"
              className="transition-colors duration-500 hover:text-[var(--brand-text)]"
            >
              {t("imprint")}
            </a>
            <a
              href="/privacy"
              className="transition-colors duration-500 hover:text-[var(--brand-text)]"
            >
              {t("privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
      {children}
    </h3>
  );
}

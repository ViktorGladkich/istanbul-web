import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone, MapPin, Mail } from "lucide-react";
import { Reveal } from "@/components/animation/Reveal";
import { MapEmbed } from "@/components/contact/MapEmbed";

type PageParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("eyebrow"),
    description: t("lede"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const address =
    process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS ??
    "Musterstraße 1, 01069 Dresden";
  const phone =
    process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? "+49 351 000 0000";
  const email =
    process.env.NEXT_PUBLIC_RESTAURANT_EMAIL ?? "info@istanbul-dresden.de";

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      {/* HEADER */}
      <header className="mx-auto max-w-[1600px] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-56">
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

      {/* DETAILS + MAP */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-12 md:pb-44">
        <div className="border-t border-[var(--brand-neutral)] pt-16">
          <div className="grid grid-cols-12 gap-x-12 gap-y-20">
            {/* INFO COLUMN */}
            <div className="col-span-12 lg:col-span-5">
              <dl className="space-y-12">
                <Reveal>
                  <ContactRow label={t("labels.address")}>
                    <p className="whitespace-pre-line font-display text-2xl leading-snug tracking-[-0.005em] text-[var(--brand-text)] md:text-3xl">
                      {address}
                    </p>
                  </ContactRow>
                </Reveal>

                <Reveal delay={120}>
                  <ContactRow label={t("labels.phone")}>
                    <a
                      href={telHref}
                      className="font-accent italic text-2xl text-[var(--brand-text)] transition-colors duration-500 hover:text-[var(--brand-terra)] md:text-3xl"
                    >
                      {phone}
                    </a>
                  </ContactRow>
                </Reveal>

                <Reveal delay={200}>
                  <ContactRow label={t("labels.email")}>
                    <a
                      href={`mailto:${email}`}
                      className="font-body text-base font-light text-[var(--brand-text)]/85 transition-colors duration-500 hover:text-[var(--brand-terra)] md:text-lg"
                    >
                      {email}
                    </a>
                  </ContactRow>
                </Reveal>

                <Reveal delay={280}>
                  <ContactRow label={t("labels.hours")}>
                    <p className="whitespace-pre-line font-body text-base font-light leading-[1.9] text-[var(--brand-text)]/85 md:text-lg">
                      {t("hours_value")}
                    </p>
                  </ContactRow>
                </Reveal>

                <Reveal delay={360}>
                  <div className="border-t border-[var(--brand-neutral)] pt-10">
                    <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                      {t("reservation.eyebrow")}
                    </span>
                    <p className="mt-4 font-body text-sm font-light leading-[1.8] text-[var(--brand-text)]/85">
                      {t("reservation.body")}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={440}>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-3 border border-[var(--brand-text)] px-7 py-4 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] transition-colors duration-700 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)]"
                    >
                      <Phone size={16} strokeWidth={1.2} />
                      {t("cta_call")}
                    </a>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border border-[var(--brand-neutral)] px-7 py-4 font-body text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--brand-muted)] transition-colors duration-700 hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
                    >
                      <MapPin size={16} strokeWidth={1.2} />
                      {t("cta_directions")}
                    </a>
                  </div>
                </Reveal>
              </dl>
            </div>

            {/* MAP COLUMN */}
            <Reveal delay={200} className="col-span-12 lg:col-span-7">
              <div className="space-y-4">
                <span className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
                  {t("labels.map")}
                </span>
                <MapEmbed address={address} label={t("labels.map")} />
                <p className="font-body text-xs font-light text-[var(--brand-muted)]">
                  <Mail size={11} strokeWidth={1.4} className="-mt-0.5 mr-1 inline-block align-middle" />
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors duration-500 hover:text-[var(--brand-text)]"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[var(--brand-muted)]">
        {label}
      </dt>
      <dd className="mt-3">{children}</dd>
    </div>
  );
}

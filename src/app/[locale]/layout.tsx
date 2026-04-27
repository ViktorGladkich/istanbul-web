import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { melodrama, boska, satoshi } from "@/lib/fonts";
import { BrandToaster } from "@/components/providers/BrandToaster";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Istanbul — Restaurant Dresden",
    template: "%s — Istanbul Dresden",
  },
  description:
    "Türkische Küche in Dresden. Mezeler, Kebab und seltene Spezialitäten — von Hand zubereitet, am Tisch und zum Mitnehmen.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${melodrama.variable} ${boska.variable} ${satoshi.variable}`}
    >
      <body className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] font-body antialiased">
        <NextIntlClientProvider>
          {children}
          <BrandToaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

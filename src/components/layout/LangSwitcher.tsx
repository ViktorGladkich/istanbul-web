"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = { de: "DE", tr: "TR", en: "EN" };

export function LangSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl typed `params` for typed pathnames; loose pass-through
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <ul
      className={`flex items-center gap-3 ${className}`}
      aria-label="Language"
    >
      {routing.locales.map((locale, i) => {
        const isActive = locale === current;
        return (
          <li key={locale} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => switchTo(locale)}
              aria-current={isActive ? "true" : undefined}
              className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ${
                isActive ? "text-current" : "text-current/60 hover:text-current"
              }`}
            >
              {LABELS[locale]}
            </button>
            {i < routing.locales.length - 1 && (
              <span
                className="h-3 w-px bg-current/30"
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

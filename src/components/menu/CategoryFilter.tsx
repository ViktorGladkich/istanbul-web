"use client";

import { useTranslations } from "next-intl";
import { MENU_CATEGORIES, type MenuCategory } from "@/lib/menu";

export type SelectedCategory = MenuCategory | "all";

export function CategoryFilter({
  value,
  onChange,
  available,
}: {
  value: SelectedCategory;
  onChange: (next: SelectedCategory) => void;
  /** categories that have at least one item; others are dimmed */
  available: ReadonlySet<MenuCategory>;
}) {
  const t = useTranslations("menu");

  const buttons: ReadonlyArray<{ key: SelectedCategory; label: string; enabled: boolean }> = [
    { key: "all", label: t("all"), enabled: true },
    ...MENU_CATEGORIES.map((c) => ({
      key: c,
      label: t(`categories.${c}`),
      enabled: available.has(c),
    })),
  ];

  return (
    <nav
      aria-label={t("filter_label")}
      className="sticky top-20 z-30 -mx-6 border-y border-[var(--brand-neutral)] bg-[color-mix(in_srgb,var(--brand-bg)_92%,transparent)] backdrop-blur-md md:-mx-12"
    >
      <ul className="mx-auto flex max-w-[1600px] gap-x-8 overflow-x-auto px-6 py-5 md:px-12">
        {buttons.map((b) => {
          const active = b.key === value;
          return (
            <li key={b.key}>
              <button
                type="button"
                onClick={() => b.enabled && onChange(b.key)}
                disabled={!b.enabled}
                aria-pressed={active}
                className={`whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-500 ${
                  active
                    ? "text-[var(--brand-text)]"
                    : b.enabled
                      ? "text-[var(--brand-muted)] hover:text-[var(--brand-text)]"
                      : "cursor-not-allowed text-[var(--brand-muted)]/40"
                }`}
              >
                <span className="relative inline-block py-1">
                  {b.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 right-0 h-px origin-left transition-transform duration-700 ease-out ${
                      active ? "scale-x-100" : "scale-x-0"
                    } bg-[var(--brand-text)]`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

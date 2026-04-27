import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "tr", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

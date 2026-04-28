import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const PUBLIC_PATHS = ["", "/menu", "/about", "/contact", "/order"] as const;

function baseUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const now = new Date();

  return PUBLIC_PATHS.flatMap((path) =>
    routing.locales.map((locale) => {
      const prefix =
        locale === routing.defaultLocale ? "" : `/${locale}`;
      const url = `${base}${prefix}${path}` || base;
      return {
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/menu" ? 0.9 : 0.6,
      };
    }),
  );
}

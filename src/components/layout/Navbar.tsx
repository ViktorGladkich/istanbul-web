"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LangSwitcher } from "./LangSwitcher";
import { CartDrawer } from "@/components/cart/CartDrawer";

const NAV_LINKS = [
  { href: "/menu", key: "menu" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Tone is "light" while a `[data-hero]` element is in view (over a dark hero),
 * otherwise "dark". This keeps the navbar legible on every page without
 * per-page wiring.
 */
function useNavTone(): "light" | "dark" {
  const [tone, setTone] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const target = document.querySelector<HTMLElement>("[data-hero]");
    if (!target) {
      setTone("dark");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setTone(entry.isIntersecting ? "light" : "dark"),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return tone;
}

export function Navbar() {
  const t = useTranslations("nav");
  const tone = useNavTone();
  const isLight = tone === "light";

  return (
    <header
      data-tone={tone}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-700"
      style={{
        color: isLight ? "#f4efe6" : "var(--brand-text)",
        backgroundColor: isLight ? "transparent" : "rgba(244,239,230,0.85)",
        backdropFilter: isLight ? "none" : "blur(12px)",
        borderBottom: isLight
          ? "1px solid transparent"
          : "1px solid rgba(212,201,184,0.6)",
      }}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-medium uppercase tracking-[0.22em] text-current transition-opacity duration-500 hover:opacity-60"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <LangSwitcher className="hidden sm:flex" />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SHOW_AFTER_PX = 600;

export function StickyReserve() {
  const t = useTranslations("common");
  const reduced = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("[data-site-footer]");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = pastHero && !footerVisible;

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: reduced
          ? "none"
          : "opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <Link
        href="/contact#reservation"
        tabIndex={visible ? 0 : -1}
        className="pointer-events-auto inline-block border border-[var(--brand-text)] bg-[var(--brand-bg)]/85 px-7 py-4 font-body text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--brand-text)] backdrop-blur-sm transition-colors duration-500 hover:border-[var(--brand-terra)] hover:text-[var(--brand-terra)] md:text-[11px]"
      >
        {t("reserve")}
      </Link>
    </div>
  );
}

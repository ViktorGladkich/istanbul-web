"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SUBTLE_EASE = [0.22, 1, 0.36, 1] as const;

const titleContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const charReveal: Variants = {
  hidden: { y: 48, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: SUBTLE_EASE },
  },
};

const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: (delay: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1.1, ease: SUBTLE_EASE, delay },
  }),
};

export function HeroSection() {
  const t = useTranslations("hero");
  const title = t("title");

  return (
    <section
      aria-label="Hero"
      data-hero
      className="relative isolate flex min-h-screen w-full items-end overflow-hidden"
    >
      <VideoBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48">
        <motion.span
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="show"
          className="font-body text-[11px] font-light uppercase tracking-[0.32em] text-[#f4efe6]/70"
        >
          Istanbul · Dresden
        </motion.span>

        <AnimatedTitle text={title} />

        <motion.p
          variants={fadeUp}
          custom={1.1}
          initial="hidden"
          animate="show"
          className="max-w-xl font-body text-sm font-light uppercase leading-relaxed tracking-[0.22em] text-[#f4efe6]/70"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={1.4}
          initial="hidden"
          animate="show"
          className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <HeroButton href="/menu">{t("cta_menu")}</HeroButton>
          <HeroButton href="/order" variant="quiet">
            {t("cta_order")}
          </HeroButton>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      aria-label={text}
      variants={titleContainer}
      initial="hidden"
      animate="show"
      className="font-display font-normal leading-[0.94] text-[#f4efe6] text-[clamp(3.25rem,11vw,11.5rem)]"
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap pr-[0.18em] last:pr-0"
        >
          {Array.from(word).map((char, ci) => (
            <motion.span
              key={ci}
              variants={charReveal}
              className="inline-block will-change-transform"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

function HeroButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "quiet";
}) {
  const tone =
    variant === "primary"
      ? "border-[#f4efe6]/65 text-[#f4efe6] hover:border-[#f4efe6] hover:bg-[#f4efe6]/5"
      : "border-[#f4efe6]/30 text-[#f4efe6]/80 hover:border-[#f4efe6]/70 hover:text-[#f4efe6]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center border px-9 py-4 text-[11px] font-medium uppercase tracking-[0.28em] transition-all duration-700 ease-out ${tone}`}
    >
      {children}
    </Link>
  );
}

function VideoBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 bg-[#0c0805]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
      >
        <source src="/video/hero_deckstop.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      >
        <source src="/video/hero_mobile.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,20,16,0.4) 0%, rgba(26,20,16,0.55) 60%, rgba(12,8,5,0.85) 100%)",
        }}
      />
      {/* faint warm glow bottom-left, evokes candlelight */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(40% 30% at 15% 95%, rgba(139,105,20,0.25) 0%, rgba(139,105,20,0) 70%)",
        }}
      />
    </div>
  );
}

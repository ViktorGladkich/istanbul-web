import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { AtmosphereSection } from "@/components/home/AtmosphereSection";
import { GallerySection } from "@/components/home/GallerySection";
import { JourneySection } from "@/components/home/JourneySection";
import { LieferandoSection } from "@/components/home/LieferandoSection";
import { MarqueeStrip } from "@/components/decoration/MarqueeStrip";
import { TonightsTable } from "@/components/home/TonightsTable";
import type { Locale } from "@/lib/menu";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <MarqueeStrip />
      <TonightsTable locale={locale as Locale} />
      <MenuPreview />
      <AtmosphereSection />
      <JourneySection />
      <MarqueeStrip
        words={[
          "Mezeler",
          "Künefe",
          "Lahmacun",
          "Mantı",
          "Adana",
          "İskender",
          "Baklava",
        ]}
        durationSeconds={70}
      />
      <GallerySection />
      <LieferandoSection />
    </>
  );
}

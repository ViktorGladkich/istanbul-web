import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { MenuPreview } from "@/components/home/MenuPreview";
import { LieferandoSection } from "@/components/home/LieferandoSection";

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
      <MenuPreview />
      <LieferandoSection />
    </>
  );
}

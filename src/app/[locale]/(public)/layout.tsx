import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyReserve } from "@/components/layout/StickyReserve";
import { PageTransition } from "@/components/layout/PageTransition";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <SmoothScroll>
      <PageTransition />
      <Navbar />
      <main>{children}</main>
      <Footer locale={locale} />
      <StickyReserve />
    </SmoothScroll>
  );
}

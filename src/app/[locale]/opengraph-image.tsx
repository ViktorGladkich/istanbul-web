import { ImageResponse } from "next/og";
import { restaurant } from "@/lib/restaurant";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<
  "de" | "tr" | "en",
  { eyebrow: string; title: string; lede: string }
> = {
  de: {
    eyebrow: "DRESDEN · SEIT 1987",
    title: "Türkische Küche.\nVon Hand. Ohne Spektakel.",
    lede: "Mezeler · Kebap · Tatlı",
  },
  tr: {
    eyebrow: "DRESDEN · 1987'DEN BERİ",
    title: "Türk mutfağı.\nElde. Gösterişsiz.",
    lede: "Mezeler · Kebap · Tatlı",
  },
  en: {
    eyebrow: "DRESDEN · SINCE 1987",
    title: "Turkish kitchen.\nBy hand. Without spectacle.",
    lede: "Mezeler · Kebap · Tatlı",
  },
};

export default async function OpenGraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (
    ["de", "tr", "en"].includes(params.locale) ? params.locale : "de"
  ) as "de" | "tr" | "en";
  const t = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#F4EFE6",
          color: "#1A1410",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 18,
            letterSpacing: "0.32em",
            color: "#7A6A58",
            textTransform: "uppercase",
          }}
        >
          <span>{t.eyebrow}</span>
          <span>{restaurant.name}</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div
            style={{
              fontSize: 86,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              fontWeight: 400,
              whiteSpace: "pre-line",
            }}
          >
            {t.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 24,
              color: "#8B6914",
              fontStyle: "italic",
            }}
          >
            <span style={{ width: 64, height: 1, background: "#8B6914" }} />
            <span>{t.lede}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

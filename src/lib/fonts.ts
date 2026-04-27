import localFont from "next/font/local";

export const melodrama = localFont({
  variable: "--font-melodrama",
  display: "swap",
  src: [
    { path: "../../public/fonts/melodrama/Melodrama-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/melodrama/Melodrama-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/melodrama/Melodrama-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const boska = localFont({
  variable: "--font-boska",
  display: "swap",
  src: [
    { path: "../../public/fonts/boska/Boska-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/boska/Boska-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/boska/Boska-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/boska/Boska-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
});

export const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  src: [
    { path: "../../public/fonts/satoshi/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
});

import { BlurImage as Image } from "@/components/media/BlurImage";
import type { MenuCategory } from "@/lib/menu";

const CATEGORY_GRADIENTS: Record<MenuCategory, string> = {
  meze: "radial-gradient(120% 90% at 30% 25%, #3d3522 0%, #2a2418 55%, #14110a 100%)",
  ana_yemek:
    "radial-gradient(120% 90% at 50% 30%, #3a2618 0%, #261810 55%, #14090a 100%)",
  kebab:
    "radial-gradient(120% 90% at 30% 25%, #4a2618 0%, #2a1810 55%, #14090a 100%)",
  tatli:
    "radial-gradient(120% 90% at 50% 30%, #6b4a18 0%, #3a2810 55%, #1a1208 100%)",
  icecek:
    "radial-gradient(120% 90% at 50% 30%, #2a3a36 0%, #1a2422 55%, #0a1410 100%)",
};

export function MenuItemMedia({
  name,
  imageUrl,
  category,
  className = "",
}: {
  name: string;
  imageUrl: string | null;
  category: MenuCategory;
  className?: string;
}) {
  return (
    <figure
      className={`relative aspect-[4/5] overflow-hidden bg-[var(--brand-card)] ${className}`}
      aria-label={name}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
          style={{ filter: "saturate(0.78) brightness(0.92)" }}
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.015]"
            style={{ background: CATEGORY_GRADIENTS[category] }}
          />
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="absolute inset-0 m-auto h-2/5 w-2/5 opacity-20"
          >
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="#f4efe6"
              strokeWidth="0.6"
            />
            <circle
              cx="100"
              cy="100"
              r="62"
              fill="none"
              stroke="#f4efe6"
              strokeWidth="0.4"
            />
          </svg>
        </>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,20,16,0) 55%, rgba(26,20,16,0.35) 100%)",
        }}
      />
    </figure>
  );
}

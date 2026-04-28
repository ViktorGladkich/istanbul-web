/**
 * Google Maps embed without an API key — uses the public `&output=embed`
 * URL, which Google supports for the simple "search by address" use case.
 * For a styled / interactive map, swap to the Maps JavaScript API later.
 */
export function MapEmbed({
  address,
  label,
}: {
  address: string;
  label: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--brand-neutral)] bg-[var(--brand-card)]/50 md:aspect-[5/4]">
      <iframe
        src={src}
        title={label}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full grayscale-[0.4] saturate-[0.85] contrast-[0.95]"
        style={{ border: 0 }}
        allowFullScreen
      />
    </div>
  );
}

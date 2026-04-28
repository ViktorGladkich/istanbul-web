/**
 * Single source of truth for the restaurant's canonical metadata.
 * All consumers (footer, contact page, JSON-LD, OG images) read from here
 * so changes propagate everywhere via env vars.
 */
export const restaurant = {
  name: process.env.NEXT_PUBLIC_RESTAURANT_NAME ?? "Istanbul Restaurant Dresden",
  address: {
    street:
      process.env.NEXT_PUBLIC_RESTAURANT_STREET ?? "Musterstraße 1",
    postalCode:
      process.env.NEXT_PUBLIC_RESTAURANT_POSTAL ?? "01069",
    locality:
      process.env.NEXT_PUBLIC_RESTAURANT_CITY ?? "Dresden",
    countryCode: "DE",
  },
  phone: process.env.NEXT_PUBLIC_RESTAURANT_PHONE ?? "+49 351 000 0000",
  email:
    process.env.NEXT_PUBLIC_RESTAURANT_EMAIL ?? "info@istanbul-dresden.de",
  priceRange: "€€",
  servesCuisine: ["Turkish", "Mediterranean"],
  openingHours: [
    // Mon–Sat 12:00–23:00
    { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "12:00", closes: "23:00" },
    // Sun 13:00–22:00
    { days: ["Su"], opens: "13:00", closes: "22:00" },
  ],
  geo: {
    // Approximate Dresden center fallback. Override via env after exact location is set.
    latitude: Number(process.env.NEXT_PUBLIC_RESTAURANT_LAT ?? "51.0504"),
    longitude: Number(process.env.NEXT_PUBLIC_RESTAURANT_LNG ?? "13.7373"),
  },
} as const;

export function fullAddress() {
  const a = restaurant.address;
  return `${a.street}, ${a.postalCode} ${a.locality}`;
}

export function appUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}

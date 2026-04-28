import { restaurant, appUrl } from "@/lib/restaurant";

type AnyJsonLd = Record<string, unknown>;

function jsonLdScript(data: AnyJsonLd) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function openingHoursSpec() {
  return restaurant.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days.map((d) => {
      const map: Record<string, string> = {
        Mo: "Monday",
        Tu: "Tuesday",
        We: "Wednesday",
        Th: "Thursday",
        Fr: "Friday",
        Sa: "Saturday",
        Su: "Sunday",
      };
      return map[d];
    }),
    opens: slot.opens,
    closes: slot.closes,
  }));
}

export function RestaurantJsonLd() {
  const url = appUrl();
  const data: AnyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}#restaurant`,
    name: restaurant.name,
    url,
    telephone: restaurant.phone,
    email: restaurant.email,
    image: `${url}/logo.png`,
    priceRange: restaurant.priceRange,
    servesCuisine: [...restaurant.servesCuisine],
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      postalCode: restaurant.address.postalCode,
      addressLocality: restaurant.address.locality,
      addressCountry: restaurant.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.geo.latitude,
      longitude: restaurant.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpec(),
    acceptsReservations: true,
    hasMenu: `${url}/menu`,
  };
  return jsonLdScript(data);
}

export function LocalBusinessJsonLd() {
  const url = appUrl();
  const data: AnyJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: restaurant.name,
    url,
    telephone: restaurant.phone,
    email: restaurant.email,
    image: `${url}/logo.png`,
    priceRange: restaurant.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      postalCode: restaurant.address.postalCode,
      addressLocality: restaurant.address.locality,
      addressCountry: restaurant.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.geo.latitude,
      longitude: restaurant.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpec(),
  };
  return jsonLdScript(data);
}

type MenuItem = {
  id: string;
  nameDE: string;
  nameTR: string;
  nameEN: string;
  descDE: string | null;
  descTR: string | null;
  descEN: string | null;
  price: number;
  category: string;
};

export function MenuJsonLd({
  items,
  locale,
}: {
  items: MenuItem[];
  locale: "de" | "tr" | "en";
}) {
  const url = appUrl();
  const pickName = (i: MenuItem) =>
    locale === "tr" ? i.nameTR : locale === "en" ? i.nameEN : i.nameDE;
  const pickDesc = (i: MenuItem) =>
    locale === "tr" ? i.descTR : locale === "en" ? i.descEN : i.descDE;

  const sectionsByCategory = new Map<string, MenuItem[]>();
  for (const item of items) {
    const arr = sectionsByCategory.get(item.category) ?? [];
    arr.push(item);
    sectionsByCategory.set(item.category, arr);
  }

  const data: AnyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}/menu#menu`,
    name: restaurant.name,
    inLanguage: locale,
    hasMenuSection: Array.from(sectionsByCategory.entries()).map(
      ([category, list]) => ({
        "@type": "MenuSection",
        name: category,
        hasMenuItem: list.map((item) => ({
          "@type": "MenuItem",
          name: pickName(item),
          description: pickDesc(item) ?? undefined,
          offers: {
            "@type": "Offer",
            price: item.price.toFixed(2),
            priceCurrency: "EUR",
          },
        })),
      }),
    ),
  };
  return jsonLdScript(data);
}

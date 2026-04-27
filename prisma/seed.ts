import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL / DIRECT_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

type SeedItem = {
  nameDE: string;
  nameTR: string;
  nameEN: string;
  descDE: string;
  descTR: string;
  descEN: string;
  price: number;
  category: "meze" | "ana_yemek" | "kebab" | "tatli" | "icecek";
  isSpicy?: boolean;
  isVegetarian?: boolean;
  sortOrder: number;
  imageUrl?: string;
};

const items: SeedItem[] = [
  // ─── MEZE ──────────────────────────────────────────────
  {
    nameDE: "Humus",
    nameTR: "Humus",
    nameEN: "Hummus",
    descDE: "Kichererbsenpüree, Tahin, Olivenöl, geröstete Pinienkerne.",
    descTR: "Nohut püresi, tahin, zeytinyağı, kavrulmuş çam fıstığı.",
    descEN: "Chickpea purée, tahini, olive oil, toasted pine nuts.",
    price: 7.5,
    category: "meze",
    isVegetarian: true,
    sortOrder: 1,
    imageUrl: "/images/hummus.jpeg",
  },
  {
    nameDE: "Auberginensalat",
    nameTR: "Patlıcan Salatası",
    nameEN: "Smoked Aubergine",
    descDE: "Über offener Flamme geröstete Aubergine, Joghurt, Knoblauch.",
    descTR: "Açık ateşte közlenmiş patlıcan, yoğurt, sarımsak.",
    descEN: "Open-flame charred aubergine, yogurt, garlic.",
    price: 8.0,
    category: "meze",
    isVegetarian: true,
    sortOrder: 2,
    imageUrl: "/images/auberginensalat.jpeg",
  },
  {
    nameDE: "Cacık",
    nameTR: "Cacık",
    nameEN: "Cacık",
    descDE: "Joghurt, Gurke, Minze, ein Tropfen Olivenöl.",
    descTR: "Yoğurt, salatalık, nane, bir damla zeytinyağı.",
    descEN: "Yogurt, cucumber, mint, a drop of olive oil.",
    price: 6.5,
    category: "meze",
    isVegetarian: true,
    sortOrder: 3,
    imageUrl: "/images/cacik.png",
  },
  {
    nameDE: "Linsensuppe",
    nameTR: "Mercimek Çorbası",
    nameEN: "Lentil Soup",
    descDE: "Rote Linsensuppe mit Minze und Zitrone.",
    descTR: "Nane ve limonlu kırmızı mercimek çorbası.",
    descEN: "Red lentil soup with mint and lemon.",
    price: 6.0,
    category: "meze",
    isVegetarian: true,
    sortOrder: 4,
    imageUrl: "/images/corba.jpeg",
  },

  // ─── ANA YEMEK ─────────────────────────────────────────
  {
    nameDE: "İmam Bayıldı",
    nameTR: "İmam Bayıldı",
    nameEN: "İmam Bayıldı",
    descDE: "Geschmorte Aubergine, Tomate aus dem Garten, Olivenöl.",
    descTR: "Yavaş pişmiş patlıcan, bahçe domatesi, zeytinyağı.",
    descEN: "Slow-braised aubergine, garden tomato, olive oil.",
    price: 14.0,
    category: "ana_yemek",
    isVegetarian: true,
    sortOrder: 1,
    imageUrl: "/images/imam_bayildi.jpeg",
  },
  {
    nameDE: "Karnıyarık",
    nameTR: "Karnıyarık",
    nameEN: "Karnıyarık",
    descDE: "Aubergine gefüllt mit Lamm, Petersilie, Tomatenfond.",
    descTR: "Kuzu ile doldurulmuş patlıcan, maydanoz, domates suyu.",
    descEN: "Aubergine stuffed with lamb, parsley, tomato jus.",
    price: 17.0,
    category: "ana_yemek",
    sortOrder: 2,
    imageUrl: "/images/karniyarik.jpeg",
  },
  {
    nameDE: "Mantı",
    nameTR: "Mantı",
    nameEN: "Mantı",
    descDE: "Hand­gefaltete Lammtaschen, Knoblauchjoghurt, Sumach­butter.",
    descTR: "Elde kapatılmış kuzulu mantı, sarımsaklı yoğurt, sumaklı tereyağı.",
    descEN: "Hand-folded lamb dumplings, garlic yogurt, sumac butter.",
    price: 16.0,
    category: "ana_yemek",
    sortOrder: 3,
    imageUrl: "/images/manti.jpeg",
  },
  {
    nameDE: "Lahmacun",
    nameTR: "Lahmacun",
    nameEN: "Lahmacun",
    descDE: "Dünner Teigfladen mit Hackfleisch, Tomaten und Kräutern.",
    descTR: "Kıyma, domates ve otlar ile ince hamur.",
    descEN: "Thin dough flatbread with minced meat, tomatoes, and herbs.",
    price: 7.0,
    category: "ana_yemek",
    sortOrder: 4,
    imageUrl: "/images/lahmacun.jpeg",
  },

  // ─── KEBAB ─────────────────────────────────────────────
  {
    nameDE: "Adana Kebap",
    nameTR: "Adana Kebap",
    nameEN: "Adana Kebap",
    descDE: "Handgehacktes Lammfleisch, pul biber, auf Holzkohle.",
    descTR: "Elde kıyılmış kuzu, pul biber, kömür ateşinde.",
    descEN: "Hand-cut lamb, pul biber, over charcoal.",
    price: 24.0,
    category: "kebab",
    isSpicy: true,
    sortOrder: 1,
    imageUrl: "/images/adana_kebap.jpeg",
  },
  {
    nameDE: "İskender",
    nameTR: "İskender",
    nameEN: "İskender",
    descDE: "Dünn geschnittenes Lamm, Yufka, Tomatenfond, brauner Butter, Joghurt.",
    descTR: "İnce dilimlenmiş kuzu, yufka, domates sosu, tereyağı, yoğurt.",
    descEN: "Thin-sliced lamb, yufka, tomato jus, brown butter, yogurt.",
    price: 22.0,
    category: "kebab",
    sortOrder: 2,
    imageUrl: "/images/iskender.jpeg",
  },
  {
    nameDE: "Şiş Kebap",
    nameTR: "Şiş Kebap",
    nameEN: "Şiş Kebap",
    descDE: "In Salz gereiftes Lamm, am Spieß, geröstete Tomate, Petersilie.",
    descTR: "Tuzda dinlendirilmiş kuzu, şişte, közlenmiş domates, maydanoz.",
    descEN: "Salt-cured lamb, on the skewer, charred tomato, parsley.",
    price: 26.0,
    category: "kebab",
    sortOrder: 3,
    imageUrl: "/images/sis_kebap.png",
  },
  {
    nameDE: "Döner",
    nameTR: "Döner Kebap",
    nameEN: "Döner Kebab",
    descDE: "Dünn geschnittenes Kalbfleisch vom Drehspieß.",
    descTR: "Döner şişinden ince dilimlenmiş dana eti.",
    descEN: "Thinly sliced veal from the rotisserie.",
    price: 15.0,
    category: "kebab",
    sortOrder: 4,
    imageUrl: "/images/doner.jpeg",
  },
  {
    nameDE: "Dürüm",
    nameTR: "Dürüm",
    nameEN: "Dürüm Wrap",
    descDE: "Dönerfleisch eingerollt in dünnem Fladenbrot.",
    descTR: "İnce yufkaya sarılmış döner eti.",
    descEN: "Döner meat wrapped in thin flatbread.",
    price: 10.0,
    category: "kebab",
    sortOrder: 5,
    imageUrl: "/images/durum.jpeg",
  },

  // ─── TATLI ─────────────────────────────────────────────
  {
    nameDE: "Künefe",
    nameTR: "Künefe",
    nameEN: "Künefe",
    descDE: "Kadayıf, frischer Käse, warmer Sirup, Pistazien.",
    descTR: "Kadayıf, taze peynir, sıcak şerbet, antep fıstığı.",
    descEN: "Kadayıf, fresh cheese, warm syrup, pistachios.",
    price: 11.0,
    category: "tatli",
    sortOrder: 1,
    imageUrl: "/images/kunefe.jpeg",
  },
  {
    nameDE: "Baklava",
    nameTR: "Baklava",
    nameEN: "Baklava",
    descDE: "Vierzig Schichten Yufka, gehackte Pistazien, geklärte Butter.",
    descTR: "Kırk kat yufka, çekilmiş antep fıstığı, sade yağ.",
    descEN: "Forty layers of yufka, crushed pistachios, clarified butter.",
    price: 9.5,
    category: "tatli",
    isVegetarian: true,
    sortOrder: 2,
    imageUrl: "/images/baklava.jpeg",
  },
  {
    nameDE: "Sütlaç",
    nameTR: "Sütlaç",
    nameEN: "Sütlaç",
    descDE: "Langsam gegarter Milchreis, gebrannte Oberfläche, Vanille.",
    descTR: "Yavaş pişen sütlaç, üzeri közlenmiş, vanilya.",
    descEN: "Slow-cooked rice pudding, brûléed top, vanilla.",
    price: 8.0,
    category: "tatli",
    isVegetarian: true,
    sortOrder: 3,
    imageUrl: "/images/sutlac.jpeg",
  },

  // ─── İÇECEK ────────────────────────────────────────────
  {
    nameDE: "Ayran",
    nameTR: "Ayran",
    nameEN: "Ayran",
    descDE: "Geschlagener Joghurt, Bergsalz, eiskalt.",
    descTR: "Çırpılmış yoğurt, dağ tuzu, buz gibi.",
    descEN: "Whipped yogurt, mountain salt, ice cold.",
    price: 4.5,
    category: "icecek",
    isVegetarian: true,
    sortOrder: 1,
    imageUrl: "/images/ayran.jpeg",
  },
  {
    nameDE: "Türk Kahvesi",
    nameTR: "Türk Kahvesi",
    nameEN: "Turkish Coffee",
    descDE: "Frisch gemahlen, in Kupfer­kanne aufgegossen, lokum dazu.",
    descTR: "Taze çekilmiş, bakır cezvede pişer, yanında lokum.",
    descEN: "Freshly ground, brewed in a copper cezve, served with lokum.",
    price: 4.0,
    category: "icecek",
    isVegetarian: true,
    sortOrder: 2,
    imageUrl: "/images/turk_kahvesi.jpeg",
  },
  {
    nameDE: "Çay",
    nameTR: "Çay",
    nameEN: "Çay",
    descDE: "Schwarzer Tee aus Rize, im Tulpenglas, ein Stück Zucker.",
    descTR: "Rize kara çayı, ince belli bardakta, kesme şeker.",
    descEN: "Rize black tea, in the tulip glass, one cube of sugar.",
    price: 3.0,
    category: "icecek",
    isVegetarian: true,
    sortOrder: 3,
    imageUrl: "/images/cay.jpeg",
  },
];

async function main() {
  console.log("🍽️  Seeding menu items...");

  // Clear old menu items + dependent order items so we can reseed cleanly
  // (orderItems has FK to menuItem with no cascade — clear them first if any)
  const orderItemCount = await prisma.orderItem.count();
  if (orderItemCount > 0) {
    console.log(
      `   skipping wipe — ${orderItemCount} orderItems exist; using upsert by sortOrder+category`,
    );
    // Idempotent upsert path: keep refs to existing items
    for (const item of items) {
      const existing = await prisma.menuItem.findFirst({
        where: { category: item.category, sortOrder: item.sortOrder },
      });
      if (existing) {
        await prisma.menuItem.update({
          where: { id: existing.id },
          data: item,
        });
      } else {
        await prisma.menuItem.create({ data: item });
      }
    }
  } else {
    await prisma.menuItem.deleteMany();
    await prisma.menuItem.createMany({ data: items });
  }

  const total = await prisma.menuItem.count();
  console.log(`✓ Seeded. Total menu items: ${total}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

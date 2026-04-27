# 🍽️ Istanbul Restaurant — Dresden | Project Memory File

> Claude Code читает этот файл АВТОМАТИЧЕСКИ при каждой сессии.
> Никогда не удаляй и не переименовывай этот файл.

---

## 📌 ПРОЕКТ: Ресторанный сайт Istanbul Dresden

**Клиент:** Владелец ресторана турецкой кухни  
**Бизнес:** Ресторан «Istanbul» + Кебабная (рядом)  
**Город:** Dresden, Германия  
**Логотип:** Красный тюльпан + надпись «Istanbul» синим курсивом  
**Цвета бренда:** `#C8102E` (красный), `#003087` (синий), `#FFFFFF` (белый)

---

## 🎯 ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ

### 1. 🌍 Многоязычность
- **Немецкий (DE)** — основной язык (Германия)
- **Турецкий (TR)** — для турецкой общины
- **Английский (EN)** — для туристов
- Автоопределение языка браузера, переключатель в навигации

### 2. 📱 QR-коды для меню
- Каждый стол → уникальный QR-код (table_01, table_02, ...)
- URL: `/menu?table=01` — клиент сканирует и сразу видит меню
- Admin-панель: генерация и печать QR-кодов для всех столов
- QR-код ведёт на актуальное меню (обновляется в реальном времени)

### 3. 🛒 Онлайн-заказы + Оплата
- Клиент: выбрать блюда → оформить заказ → оплатить онлайн
- **Stripe** как платёжная система (PCI DSS compliant)
- После успешной оплаты → уведомление владельцу (email + звук в браузере)
- Статусы заказа: `pending_payment` → `paid` → `preparing` → `ready` → `delivered`
- Заказ возможен как из ресторана (по QR), так и с главной страницы (доставка/самовывоз)

### 4. 🔐 Admin-панель (`/admin`)
- Защищена логином (NextAuth или Supabase Auth)
- Управление меню: добавить/удалить/изменить блюда, цены, фото, категории
- Управление заказами: список входящих, изменение статусов
- Генератор QR-кодов для столов
- Базовая аналитика: заказы за день/неделю, популярные блюда

### 5. 🎨 Дизайн (Awwwards уровень)
- НЕ шаблонный — уникальный, живой, анимированный
- Вдохновение: восточная роскошь + современный минимализм
- Анимации: Framer Motion (page transitions, scroll animations, hover effects)
- Custom cursor
- Smooth scroll
- Parallax секции
- Hero: видео-фон или animated background с турецкими паттернами
- Секции: Hero → About → Menu Preview → Online Order → Location → Contact

### 6. 🔒 Безопасность
- HTTPS (обязательно для оплаты)
- Stripe Webhooks + signature verification
- Rate limiting на API endpoints
- CSRF protection
- Input sanitization
- env variables для всех секретов (НИКОГДА не в коде)
- Content Security Policy headers

### 7. 📊 SEO
- Next.js App Router с Server Components
- Metadata API (title, description, OG tags) для каждой страницы
- Structured Data (JSON-LD): Restaurant, Menu, LocalBusiness
- Sitemap.xml автогенерация
- robots.txt
- Performance: Core Web Vitals зелёные
- Local SEO: Google My Business разметка

---

## 🛠 ТЕХНИЧЕСКИЙ СТЕК — ПОЛНЫЙ (ВСЁ УСТАНОВЛЕНО)

### Установлено через setup.sh
```
next                          # Next.js 14 App Router
typescript                    # Type safety
tailwindcss + tailwind-animate # Styling + CSS animations
framer-motion                 # Base animations
next-intl                     # i18n DE/TR/EN
@supabase/supabase-js         # Database + Auth + Realtime
@prisma/client + prisma       # ORM
stripe + @stripe/stripe-js + @stripe/react-stripe-js  # Payments
zustand                       # Cart state management
zod + react-hook-form + @hookform/resolvers  # Forms & validation
qrcode + react-qr-code        # QR code generation
next-auth + bcryptjs          # Admin authentication
sharp                         # Image optimization
date-fns                      # Date utilities
shadcn/ui + radix-ui/*        # UI component library
class-variance-authority + clsx + tailwind-merge  # Styling utils
lucide-react                  # Icons
```

### Установлено вручную ✅
```
lenis                         # Smooth scroll с momentum (Awwwards стандарт)
gsap + @gsap/react            # GreenSock анимации + ScrollTrigger
aceternity-ui                 # Wow-компоненты: spotlight, floating nav, cards
vaul                          # Мобильный Drawer (корзина, меню)
sonner                        # Toast уведомления (заказ принят, оплата)
embla-carousel + embla-carousel-react  # Слайдер блюд, галерея
motion-primitives             # Text reveal, animated компоненты
react-intersection-observer   # Анимации при скролле (trigger)
@vercel/analytics             # Аналитика Vercel
```

### Использование ключевых библиотек

**Lenis (smooth scroll) — подключать в layout.tsx:**
```tsx
import Lenis from 'lenis'
// Оборачивать весь контент, интегрировать с GSAP ScrollTrigger
```

**GSAP + ScrollTrigger:**
```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger)
```

**Aceternity UI компоненты:**
```tsx
// Использовать: SpotlightCard, FloatingNav, TextReveal,
// BackgroundBeams, MovingCards, ParallaxScroll
```

**react-intersection-observer (анимации при скролле):**
```tsx
import { useInView } from 'react-intersection-observer'
const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
```

**Vaul (мобильная корзина/меню):**
```tsx
import { Drawer } from 'vaul'
// Использовать для Cart на мобильных, мобильной навигации
```

**Sonner (уведомления):**
```tsx
import { toast } from 'sonner'
toast.success('Заказ принят!')
toast.error('Ошибка оплаты')
```

**Embla Carousel (слайдер блюд):**
```tsx
import useEmblaCarousel from 'embla-carousel-react'
```

### Deployment
```
Vercel      # Hosting + SSL + Edge + Analytics
Supabase    # PostgreSQL + Auth + Realtime
```

---

## 📁 СТРУКТУРА ПРОЕКТА

```
istanbul-restaurant/
├── CLAUDE.md                       # ← ТЫ ЗДЕСЬ (этот файл)
├── .env.local                      # Секреты (не в git!)
├── .env.example                    # Пример env (в git)
├── next.config.js
├── tailwind.config.ts
├── prisma/
│   └── schema.prisma               # DB schema
├── messages/                       # i18n переводы
│   ├── de.json                     # Немецкий
│   ├── tr.json                     # Турецкий
│   └── en.json                     # Английский
├── public/
│   ├── logo.png                    # Логотип Istanbul
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── [locale]/               # Dynamic locale routing
│   │   │   ├── page.tsx            # Главная страница
│   │   │   ├── menu/
│   │   │   │   └── page.tsx        # Меню (+ QR landing)
│   │   │   ├── order/
│   │   │   │   ├── page.tsx        # Оформление заказа
│   │   │   │   └── success/page.tsx
│   │   │   └── admin/              # Защищённая admin зона
│   │   │       ├── page.tsx
│   │   │       ├── menu/page.tsx
│   │   │       ├── orders/page.tsx
│   │   │       └── qrcodes/page.tsx
│   │   ├── api/
│   │   │   ├── orders/route.ts     # CRUD заказов
│   │   │   ├── menu/route.ts       # CRUD меню
│   │   │   └── webhooks/
│   │   │       └── stripe/route.ts # Stripe webhook
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                     # Shadcn components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx     # Animated hero
│   │   │   ├── MenuPreview.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── LocationSection.tsx
│   │   ├── menu/
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuCard.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── order/
│   │   │   ├── OrderCart.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── PaymentForm.tsx
│   │   └── admin/
│   │       ├── OrdersBoard.tsx     # Kanban-стиль для заказов
│   │       ├── MenuEditor.tsx
│   │       └── QRGenerator.tsx
│   ├── lib/
│   │   ├── stripe.ts               # Stripe config
│   │   ├── supabase.ts             # Supabase client
│   │   ├── prisma.ts               # Prisma client
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useCart.ts              # Cart state (Zustand)
│   │   └── useOrders.ts            # Realtime orders
│   └── types/
│       └── index.ts                # TypeScript types
```

---

## 🗄 DATABASE SCHEMA (Prisma)

```prisma
model MenuItem {
  id          String   @id @default(cuid())
  nameDE      String
  nameTR      String
  nameEN      String
  descDE      String?
  descTR      String?
  descEN      String?
  price       Float
  category    String   # "meze" | "ana_yemek" | "kebab" | "icecek" | "tatli"
  imageUrl    String?
  isAvailable Boolean  @default(true)
  isSpicy     Boolean  @default(false)
  isVegetarian Boolean @default(false)
  createdAt   DateTime @default(now())
  orderItems  OrderItem[]
}

model Order {
  id          String      @id @default(cuid())
  tableNumber String?     # null = delivery/takeaway
  orderType   String      # "dine_in" | "takeaway" | "delivery"
  status      String      # "pending_payment" | "paid" | "preparing" | "ready" | "delivered"
  totalAmount Float
  stripePaymentId String?
  customerName String?
  customerPhone String?
  customerAddress String?
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  menuItemId String
  quantity   Int
  price      Float    # price at time of order
  order      Order    @relation(fields: [orderId], references: [id])
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
}
```

---

## 🔑 ENV VARIABLES NEEDED

```bash
# .env.local (создай локально, НЕ коммить)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=          # генерировать: openssl rand -base64 32

# Admin
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=      # bcrypt hash

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_RESTAURANT_NAME="Istanbul Restaurant Dresden"
```

---

## 📋 СТАТУС ЗАДАЧ

> Обновляй этот раздел после каждой рабочей сессии!

### ✅ Выполнено
- [ ] Инициализация проекта (Next.js + TypeScript + Tailwind)
- [ ] Установка зависимостей
- [ ] Конфигурация i18n (next-intl)
- [ ] Prisma schema
- [ ] Подключение Supabase
- [ ] Stripe конфигурация
- [ ] Navbar + Footer
- [ ] Hero Section (анимированный)
- [ ] Menu страница
- [ ] Cart / Checkout
- [ ] Stripe payment flow
- [ ] Admin панель
- [ ] QR Code генератор
- [ ] SEO metadata
- [ ] Деплой на Vercel

### 🔄 В процессе
- [ ] (текущая задача)

### 📌 Следующий шаг
- Инициализация проекта с помощью setup команды

---

## 🚀 КОМАНДЫ

```bash
# Разработка
npm run dev          # Запуск dev сервера (localhost:3000)

# Database
npx prisma studio    # GUI для БД
npx prisma db push   # Push schema изменений
npx prisma generate  # Регенерация клиента

# Stripe (тестовый webhook)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Deploy
vercel --prod        # Деплой на Vercel
```

---

## 📐 ДИЗАЙН-СИСТЕМА

### 🎯 КОНЦЕПЦИЯ — Michelin Star уровень
```
Вдохновение:  Noma, Eleven Madison Park, Geranium, Core by Clare Smyth
Настроение:   Тихая роскошь. Минимализм. Воздух. Пространство.
НЕ делать:    Яркие цвета, громкое золото, busy layouts, много текста
ДЕЛАТЬ:       Огромная типографика, негативное пространство, subtle движения
Референсы:    https://noma.dk / https://elevenmadisonpark.com
```

### Цвета — Michelin палитра (ФИНАЛЬНАЯ)
```css
--color-bg:          #F4EFE6   /* Состаренный пергамент — основной фон */
--color-bg-card:     #EDE6D8   /* Карточки, секции */
--color-neutral:     #D4C9B8   /* Разделители, тонкие бордеры */
--color-text:        #1A1410   /* Глубокий тёплый чёрный */
--color-text-muted:  #7A6A58   /* Второстепенный текст, подписи */
--color-gold:        #8B6914   /* Состаренное золото — только цены и иконки */
--color-terra:       #6B3A2A   /* Терракота — hover эффекты, акценты */
--color-logo-red:    #C8102E   /* ТОЛЬКО для логотипа — нигде больше */
--color-logo-blue:   #003087   /* ТОЛЬКО для логотипа — нигде больше */
```

### Принципы дизайна (СТРОГО СОБЛЮДАТЬ)
```
1. ПРОСТРАНСТВО  — много воздуха, padding больше чем кажется нужным
2. ТИПОГРАФИКА   — Melodrama в Hero минимум 8vw, заголовки секций 4-6vw
3. АНИМАЦИИ      — медленные (duration: 0.9-1.4s), ease-out, почти незаметные
4. ФОТО          — desaturated, film grain, тёплый оверлей, никакой яркости
5. КНОПКИ        — только border 1px, прозрачный фон, никаких filled кнопок
6. HOVER          — colour shift на --color-terra, никаких резких движений
7. ЦВЕТ          — 95% нейтральные тона, золото и терракота только точечно
8. ЛОГОТИП       — сохраняет оригинальные цвета, остальной сайт нейтральный
```

### Hero секция
```
Фон:       Видео из Whisk (cinematic, muted, seamless loop)
Оверлей:   linear-gradient(to bottom, rgba(26,20,16,0.4), rgba(26,20,16,0.6))
Заголовок: Melodrama, очень крупно, цвет #F4EFE6
Подзаг:    Satoshi Light, letter-spacing: 0.2em, uppercase, мутный белый
Анимация:  Буквы появляются снизу с stagger, очень медленно (1.2s)
```

### Анимации (Framer Motion + GSAP)
```
Page transition:    fade 0.6s ease
Hero text reveal:   stagger 0.08s per char, translateY(40px) → 0, duration 1.2s
Section reveal:     IntersectionObserver, translateY(30px) → 0, opacity 0→1, 0.9s
Smooth scroll:      Lenis, lerp: 0.08 (медленнее стандартного)
Parallax:           GSAP ScrollTrigger, scrub: 1.5
Menu cards hover:   scale(1.01), duration 0.4s — едва заметно
Custom cursor:      маленький круг, mix-blend-mode: difference
```

### Типографика — ФИНАЛЬНЫЙ ВЫБОР
```
Source:   Fontshare (fontshare.com) — НЕ Google Fonts
Hosting:  Self-hosted via next/font/local (/public/fonts/)
Setup:    node scripts/download-fonts.mjs  ← запустить один раз

Display:  Melodrama  — var(--font-melodrama) — заголовки Hero, секций
          Высококонтрастный editorial serif, атмосфера восточной роскоши
          Weights: 400, 500, 700

Accent:   Boska      — var(--font-boska)     — цены, цитаты, акценты
          Элегантный serif с характером, italic для цен выглядит как золотая табличка
          Weights: 400, 400i, 500, 500i

Body:     Satoshi    — var(--font-satoshi)   — весь UI, кнопки, описания
          Нейтральный современный sans, не конкурирует с Melodrama
          Weights: 300, 400, 500, 700
```

**Tailwind классы:**
```
font-display → Melodrama  (class: font-display)
font-accent  → Boska      (class: font-accent)
font-body    → Satoshi    (class: font-body, default)
```

**CSS переменные (автоматически через next/font):**
```css
--font-melodrama   /* подключается в layout.tsx */
--font-boska
--font-satoshi
```

**Конфиг:** `src/lib/fonts.ts`  
**Скачать шрифты:** `node scripts/download-fonts.mjs`

### Tailwind — цвета в tailwind.config.ts
```typescript
colors: {
  brand: {
    bg:      '#F4EFE6',  // основной фон
    card:    '#EDE6D8',  // карточки
    neutral: '#D4C9B8',  // бордеры
    text:    '#1A1410',  // основной текст
    muted:   '#7A6A58',  // второстепенный текст
    gold:    '#8B6914',  // цены и иконки
    terra:   '#6B3A2A',  // hover и акценты
    red:     '#C8102E',  // ТОЛЬКО логотип
    blue:    '#003087',  // ТОЛЬКО логотип
  }
}
```

---

## ⚠️ ВАЖНЫЕ ПРАВИЛА

1. **Никогда** не хардкодить секреты в коде — только через env variables
2. **Всегда** проверять Stripe webhook signature
3. **Всегда** санировать пользовательский ввод (Zod schemas)
4. **Всегда** обновлять раздел "СТАТУС ЗАДАЧ" в этом файле
5. Stripe тестовые карты: `4242 4242 4242 4242` (успех), `4000 0000 0000 0002` (отказ)
6. QR-коды тестировать на мобильном устройстве реально
7. Все тексты в i18n файлах, никаких хардкодированных строк

---

## 🗺️ АРХИТЕКТУРА ОПЛАТЫ

```
Клиент выбирает блюда
        ↓
POST /api/orders (создать заказ, status: pending_payment)
        ↓
Stripe Checkout Session создаётся
        ↓
Клиент оплачивает (Stripe hosted page или Elements)
        ↓
Stripe Webhook → POST /api/webhooks/stripe
        ↓
Webhook verifies signature → обновить статус заказа на "paid"
        ↓
Realtime уведомление владельцу (Supabase Realtime)
        ↓
Владелец видит заказ в Admin панели → начинает готовить
```

---

*Последнее обновление: Сессия инициализации проекта*  
*Следующий шаг: Запустить `setup.sh` для инициализации проекта*

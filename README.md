# AndreasLaust Boilerplate

Next.js starter sites - fast two-page builds on Vercel, domain email via Zoho, optional Stripe Checkout for simple offers. No WordPress, no shop backend, built to expand later.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** + **Lucide**
- **Space Grotesk** typography
- **Resend** contact form
- **Vercel** deployment

## What's included

- Home + contact pages (mobile-first)
- Central config in `config/` - site data, theme tokens, page copy, legal templates
- SEO: metadata, Open Graph, Twitter cards, sitemap, robots, JSON-LD
- Security headers + contact form rate limiting
- Minimal legal pages (privacy + cookie policy)

## Optional modules

Enable via environment variables (see `.env.example`):

| Module | Env flags |
|--------|-----------|
| **Pricing cards** | On by default - `NEXT_PUBLIC_SHOW_PRICING=false` to hide |
| **Stripe Checkout** | `NEXT_PUBLIC_ENABLE_STRIPE=true` + Stripe keys |
| **Cookie consent + GTM** | On by default - `NEXT_PUBLIC_ENABLE_COOKIE_CONSENT=false` to disable |
| **Full legal suite** | `NEXT_PUBLIC_ENABLE_FULL_LEGAL=true` |

## Quick start

```bash
npm install
cp .env.example .env.local
# Add RESEND_API_KEY and edit config/site.ts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Per-client setup checklist

1. **`config/site.ts`** - business name, contact, opening hours, service area, social, nav, legal entity
2. **`config/theme.ts`** - brand colours and radius
3. **`config/content/home.ts`** - home page copy
4. **`config/content/images.ts`** - hero, about, service, and OG image paths
5. **`.env.local`** - `NEXT_PUBLIC_SITE_URL`, Resend keys, optional modules
6. Replace **`public/images/*.svg`** with real photography (or update paths in `images.ts`)
7. Enable Stripe / full legal as needed

## Project structure

```
config/
  site.ts              # Central company data - feeds footer, contact, SEO, legal
  theme.ts             # Design tokens
  modules.ts           # Feature flags from env
  content/home.ts      # Home page copy
  stripe-products.ts   # Optional hardcoded Stripe offers
  legal-pages.ts       # Legal page registry
  legal-content.ts     # Templated policy copy

app/
  page.tsx             # Home
  contact/page.tsx     # Contact
  privacy/ cookies/    # Minimal legal (always available)
  legal/[slug]/        # Full legal suite (optional)
  api/contact/         # Resend + rate limit
  api/stripe/          # Checkout + webhook (optional)

components/
  layout/              # Header, footer, shell
  home/ contact/ seo/
  optional/            # Stripe pricing, cookies, GTM
```

## Contact form

Requires `RESEND_API_KEY`. Set `CONTACT_TO_EMAIL` and verify your sending domain in Resend before production.

Rate limiting: 5 requests/minute per IP. Configure Upstash Redis for production (`UPSTASH_REDIS_REST_*`); falls back to in-memory in development.

## Stripe (optional)

1. Create Products/Prices in Stripe Dashboard
2. Add price IDs to `config/stripe-products.ts` or env vars
3. Set `NEXT_PUBLIC_ENABLE_STRIPE=true`
4. Configure webhook: `POST /api/stripe/webhook` for `checkout.session.completed`

Uses Checkout Sessions (hosted checkout) - no shop backend.

## Deploy on Vercel

1. Import repo
2. Add environment variables from `.env.example`
3. Set `NEXT_PUBLIC_SITE_URL` to production domain
4. Deploy

## Positioning

Built for **starter website** clients: smaller businesses who need a proper two-page presence - home, contact, domain email, fast turnaround. Optional Stripe for a few hardcoded offers, not a full ecommerce platform.

---

Crafted by [Andreas Laust](https://andreaslaust.com) for repeatable client launches.

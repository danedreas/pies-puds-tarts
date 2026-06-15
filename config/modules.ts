/**
 * Feature flags - enable optional modules per client build.
 * Set env vars in .env.local or Vercel project settings.
 */

export const modules = {
  /**
   * Show pricing / product cards on the home page.
   * On by default - set NEXT_PUBLIC_SHOW_PRICING=false to hide.
   */
  pricing: process.env.NEXT_PUBLIC_SHOW_PRICING !== "false",

  /** Stripe Checkout - requires keys; pricing cards still show without it */
  stripe:
    process.env.NEXT_PUBLIC_ENABLE_STRIPE === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY),

  /**
   * Cookie consent banner + preference storage.
   * On by default - set NEXT_PUBLIC_ENABLE_COOKIE_CONSENT=false to disable.
   */
  cookieConsent: process.env.NEXT_PUBLIC_ENABLE_COOKIE_CONSENT !== "false",

  /** Google Tag Manager - loads only after analytics consent when cookieConsent is on */
  gtm:
    process.env.NEXT_PUBLIC_ENABLE_GTM === "true" &&
    Boolean(process.env.NEXT_PUBLIC_GTM_ID),

  /** Full legal page suite beyond minimal privacy/cookie */
  fullLegalSuite: process.env.NEXT_PUBLIC_ENABLE_FULL_LEGAL === "true",
} as const;

export type Modules = typeof modules;

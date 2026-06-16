/**
 * Central site data - edit this file for each client build.
 * Feeds navigation, footer, contact, SEO, legal pages, and JSON-LD.
 */

export const siteConfig = {
  name: "Pies, Puds & Tarts",
  legalName: "Pies, Puds & Tarts",
  tagline: "Pies, puds and tarts from Paul's stall at Norfolk farmers markets.",
  description:
    "Paul Stretton bakes pies, puds and tarts for farmers markets across Norfolk. Pre-order online and collect from the stall on market day.",

  /** Production URL - set NEXT_PUBLIC_SITE_URL in env for deploys */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en-GB" as const,

  logo: {
    src: "/images/logo.png",
    alt: "Pies, Puds & Tarts logo",
    width: 200,
    height: 72,
  },

  owner: {
    name: "Paul Stretton",
    role: "Baker",
    /** Helps search engines associate Paul with this venture, not previous businesses */
    bio: "Paul Stretton bakes pies, puds and tarts for farmers markets across Norfolk.",
  },

  contact: {
    email: "hello@piespudstarts.co.uk",
    phone: "",
    whatsapp: "",
    /** Human-readable - shown on contact page and footer */
    openingHours: {
      prefix: "Market days vary -",
      link: { label: "see our events schedule", href: "/events" },
    },
    /** Human-readable - helps local customers and SEO */
    serviceArea: "Farmers markets around Norfolk",
    address: {
      line1: "",
      city: "",
      region: "Norfolk",
      postcode: "",
      country: "United Kingdom",
    },
  },

  social: {
    instagram: {
      handle: "@stretton_paul",
      url: "https://www.instagram.com/stretton_paul/",
    },
    facebook: {
      label: "Great Walsingham Barns Cafe",
      url: "https://www.facebook.com/GreatWalsinghamBarnsCafe/",
    },
  },

  /** Primary navigation */
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Order", href: "/order" },
    { label: "Contact", href: "/contact" },
  ] as const,

  footer: {
    /** Agency credit - shown in footer on every client build */
    agencyCredit: {
      prefix: "Website by",
      name: "Andreas Laust",
      url: "https://www.andreaslaust.com",
    },
    copyrightHolder: "Pies, Puds & Tarts",
  },

  /** Legal entity details for policy templates */
  legal: {
    registeredOffice: "Norfolk, United Kingdom",
    companyNumber: "",
    dataController: "Pies, Puds & Tarts",
    dpoEmail: "hello@piespudstarts.co.uk",
    lastUpdated: "2026-06-15",
  },

  seo: {
    defaultTitle: "Pies, Puds & Tarts - Paul's market bakery in Norfolk",
    titleTemplate: "%s | Pies, Puds & Tarts",
    keywords: [
      "Pies Puds and Tarts",
      "Paul Stretton",
      "Norfolk farmers market",
      "handmade pies Norfolk",
      "farmers market bakery",
      "pre-order pies collection",
      "Norfolk bakery",
      "artisan pies",
      "market stall Norfolk",
    ],
    ogImage: "/images/og.jpg",
  },

  /** Contact form enquiry types */
  projectTypes: [
    "General question",
    "Pre-order help",
    "Wholesale or catering",
    "Something else",
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
export type ProjectType = (typeof siteConfig.projectTypes)[number];

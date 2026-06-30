/**
 * Central site data - edit this file for each client build.
 * Feeds navigation, footer, contact, SEO, legal pages, and JSON-LD.
 */

export const siteConfig = {
  name: "Pies, Puds & Tarts",
  legalName: "Pies, Puds & Tarts",
  tagline: "Award-winning pies, savoury bakes, sweet tarts and more.",
  description:
    "Award-winning pies, savoury bakes, sweet tarts and more from Norfolk farmers markets. Pre-order online for collection, or contact us about pickup.",

  /** Production URL - set NEXT_PUBLIC_SITE_URL in env for deploys */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en-GB" as const,

  logo: {
    src: "/images/brand-logo.png",
    alt: "Pies, Puds & Tarts logo",
    width: 578,
    height: 300,
  },

  owner: {
    name: "Paul Stretton",
    role: "Baker",
    /** Structured data only  -  kept minimal on public pages */
    bio: "Pies, Puds & Tarts  -  award-winning bakery at Norfolk farmers markets.",
  },

  contact: {
    email: "hello@piespudstarts.co.uk",
    phone: "07595 953542",
    whatsapp: "",
    /** Human-readable - shown on contact page and footer */
    openingHours: {
      prefix: "Pickup available  - ",
      link: { label: "contact us for details", href: "/contact" },
    },
    /** Human-readable - helps local customers and SEO */
    serviceArea: "Farmers markets around Norfolk",
    address: {
      line1: "Unit 2B, Orchard Park, Dereham Road",
      city: "Colkirk",
      region: "Norfolk",
      postcode: "NR21 7JQ",
      country: "United Kingdom",
    },
  },

  social: {
    instagram: {
      handle: "@stretton_paul",
      url: "https://www.instagram.com/stretton_paul/",
    },
    facebook: {
      label: "Pies, Puds & Tarts",
      url: "https://www.facebook.com/GreatWalsinghamBarnsCafe",
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
    registeredOffice: "Colkirk, Norfolk, United Kingdom",
    companyNumber: "",
    dataController: "Pies, Puds & Tarts",
    dpoEmail: "hello@piespudstarts.co.uk",
    lastUpdated: "2026-06-15",
  },

  seo: {
    defaultTitle: "Pies, Puds & Tarts - Award-winning bakery in Norfolk",
    titleTemplate: "%s | Pies, Puds & Tarts",
    keywords: [
      "Pies Puds and Tarts",
      "Norfolk farmers market",
      "handmade pies Norfolk",
      "farmers market bakery",
      "pre-order pies collection",
      "Norfolk bakery",
      "artisan pies",
      "market stall Norfolk",
      "savoury bakes Norfolk",
      "sweet tarts Norfolk",
    ],
    ogImage: "/images/og.jpg",
  },

  /** Contact form enquiry types */
  projectTypes: [
    "General question",
    "Pre-order help",
    "Pickup enquiry",
    "Wholesale or catering",
    "Something else",
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
export type ProjectType = (typeof siteConfig.projectTypes)[number];

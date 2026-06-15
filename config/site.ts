/**
 * Central site data - edit this file for each client build.
 * Feeds navigation, footer, contact, SEO, legal pages, and JSON-LD.
 */

export const siteConfig = {
  name: "Example Business",
  legalName: "Example Business Ltd",
  tagline: "Professional services for local businesses.",
  description:
    "A clean, fast website built on Next.js - mobile-friendly, search-ready, and easy to expand.",

  /** Production URL - set NEXT_PUBLIC_SITE_URL in env for deploys */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en-GB" as const,

  contact: {
    email: "hello@example.com",
    phone: "+44 7700 900000",
    whatsapp: "+44 7700 900000",
    /** Human-readable - shown on contact page and footer */
    openingHours: "Mon-Fri 8am-5pm · Sat by appointment",
    /** Human-readable - helps local customers and SEO */
    serviceArea: "Norwich, Norfolk and surrounding areas",
    address: {
      line1: "",
      city: "Norwich",
      region: "Norfolk",
      postcode: "",
      country: "United Kingdom",
    },
  },

  social: {
    instagram: { handle: "@example", url: "https://instagram.com/example" },
    linkedin: { label: "Example Business", url: "https://linkedin.com/company/example" },
  },

  /** Primary navigation */
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,

  footer: {
    /** Agency credit - shown in footer on every client build */
    agencyCredit: {
      prefix: "Website by",
      name: "Andreas Laust",
      url: "https://www.andreaslaust.com",
    },
    copyrightHolder: "Example Business",
  },

  /** Legal entity details for policy templates */
  legal: {
    registeredOffice: "Norwich, Norfolk, United Kingdom",
    companyNumber: "",
    dataController: "Example Business Ltd",
    dpoEmail: "hello@example.com",
    lastUpdated: "2026-01-01",
  },

  seo: {
    defaultTitle: "Example Business - Professional services",
    titleTemplate: "%s | Example Business",
    keywords: ["local business", "professional services"],
    ogImage: "/images/og.svg",
  },

  /** Contact form project types - customise per client */
  projectTypes: [
    "General enquiry",
    "New website",
    "Website update",
    "Other",
  ] as const,
} as const;

export type SiteConfig = typeof siteConfig;
export type ProjectType = (typeof siteConfig.projectTypes)[number];

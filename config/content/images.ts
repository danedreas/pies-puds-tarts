/**
 * Placeholder images - swap paths per client build.
 * SVGs ship with the boilerplate; replace with real photography when ready.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Optional caption shown below image in some layouts */
  caption?: string;
};

export const siteImages = {
  hero: {
    src: "/images/hero.svg",
    alt: "Professional service in a welcoming workspace",
    caption: "Replace with your own photography",
  },

  about: {
    src: "/images/about.svg",
    alt: "Team member providing friendly, reliable service",
  },

  services: [
    {
      src: "/images/service-1.svg",
      alt: "Quality craftsmanship and attention to detail",
    },
    {
      src: "/images/service-2.svg",
      alt: "Clear communication and reliable scheduling",
    },
    {
      src: "/images/service-3.svg",
      alt: "Long-term support you can count on",
    },
  ] satisfies SiteImage[],

  /** Open Graph / social share - replace with 1200×630 PNG for production */
  og: {
    src: "/images/og.svg",
    alt: "Example Business - professional local services",
  },
} as const;

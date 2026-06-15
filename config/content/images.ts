/**
 * Site images - swap paths per client build.
 *
 * Photos are optimised JPEGs in public/images/ (resized on import).
 * Next.js Image serves modern formats (WebP/AVIF) automatically in production.
 */

export type SiteImage = {
  src: string;
  alt: string;
  /** Optional caption shown below image in some layouts */
  caption?: string;
};

export const siteImages = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Gourmet savoury tart topped with smoked salmon, dill and fresh salad",
  },

  /** Home page - proper baking section */
  homeAbout: {
    src: "/images/proper-baking-star-pies.jpg",
    alt: "Wooden crate of golden star-topped savoury pies lined with parchment",
  },

  /** About Paul page */
  about: {
    src: "/images/about-paul-catering.jpg",
    alt: "Three-tier pork pie display for a Norfolk catering event",
  },

  services: [
    {
      src: "/images/market-catering-crates.jpg",
      alt: "Crates of pasties, mini quiches and sausage rolls ready for a market day",
    },
    {
      src: "/images/seasonal-mini-tarts.jpg",
      alt: "Mini savoury tarts with herb glaze and fresh parsley",
    },
    {
      src: "/images/preorder-pie-crates.jpg",
      alt: "Stacked wooden crates of individual savoury pies ready to collect",
    },
  ] satisfies SiteImage[],

  og: {
    src: "/images/og.jpg",
    alt: "Pies, Puds & Tarts - handmade savoury baking in Norfolk",
  },
} as const;

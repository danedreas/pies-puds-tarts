/**
 * Optional catalog products - individual items customers can buy or enquire about.
 * Each product gets a page at /products/[id] driven by this config.
 */

export type CatalogProduct = {
  id: string;
  name: string;
  /** Short teaser - shown on home product cards */
  description: string;
  displayPrice: string;
  /** Stripe Price ID - price_xxx. Omit or leave placeholder for contact-only. */
  priceId?: string;
  /** Path under public/ - swap per client */
  image: string;
  /** Extended copy for the product detail page */
  details: {
    intro: string;
    paragraphs: string[];
    highlights: string[];
  };
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "gift-voucher",
    name: "Gift voucher",
    description: "A fixed-value voucher redeemable against any service. Ideal for referrals and gifts.",
    displayPrice: "£50",
    priceId: process.env.STRIPE_PRICE_GIFT_VOUCHER ?? "price_REPLACE_ME",
    image: "/images/product-1.svg",
    details: {
      intro: "Give someone a practical gift they will actually use - credit towards any service you offer.",
      paragraphs: [
        "Vouchers are delivered digitally after purchase. The recipient can redeem against any eligible service - ideal for birthdays, thank-yous, or referrals.",
        "Set your own terms in this copy: expiry, minimum spend, or whether vouchers are transferable.",
      ],
      highlights: [
        "Fixed value - easy to understand",
        "Digital delivery",
        "Redeemable against any service",
      ],
    },
  },
  {
    id: "starter-kit",
    name: "Starter kit",
    description: "A ready-made bundle for new customers - clear scope, simple to understand.",
    displayPrice: "£89",
    image: "/images/product-2.svg",
    details: {
      intro: "A bundled offer for first-time customers - everything they need to get started in one clear package.",
      paragraphs: [
        "Describe exactly what is included: materials, time on site, follow-up, or whatever makes up the kit.",
        "Bundles work well when you want a simple entry offer without custom quoting every time.",
      ],
      highlights: [
        "Clear fixed scope",
        "Ideal for new customers",
        "No lengthy quote process",
      ],
    },
  },
  {
    id: "add-on",
    name: "Add-on service",
    description: "An extra service existing customers can book without a full consultation.",
    displayPrice: "£35",
    priceId: process.env.STRIPE_PRICE_ADDON ?? "price_REPLACE_ME",
    image: "/images/product-3.svg",
    details: {
      intro: "An optional extra for existing customers - quick to book and easy to explain.",
      paragraphs: [
        "Use this for upsells: extended warranty, priority slot, extra room, additional hour, or a maintenance visit.",
        "Keep the scope tight so customers know what they are buying without a phone call first.",
      ],
      highlights: [
        "Book without a full consultation",
        "Fixed price",
        "Ideal for repeat customers",
      ],
    },
  },
];

export function getProductById(id: string): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.id === id);
}

export function getProductPath(id: string): string {
  return `/products/${id}`;
}

export function getAllProductIds(): string[] {
  return catalogProducts.map((product) => product.id);
}

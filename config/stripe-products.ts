/**
 * Example products for the optional pricing module.
 * Replace names, prices, and features per client. Add Stripe price IDs when checkout is live.
 */

export type StripeProduct = {
  id: string;
  name: string;
  description: string;
  /** Stripe Price ID - price_xxx. Leave as placeholder until Stripe is configured. */
  priceId: string;
  /** Display price for the site (actual charge comes from Stripe) */
  displayPrice: string;
  features: string[];
  highlighted?: boolean;
};

export const stripeProducts: StripeProduct[] = [
  {
    id: "standard",
    name: "Standard service",
    description: "A single clear offer - ideal for consultations, call-outs, or fixed packages.",
    priceId: process.env.STRIPE_PRICE_STANDARD ?? "price_REPLACE_ME",
    displayPrice: "£149",
    features: [
      "One focused service or package",
      "Clear scope and turnaround",
      "Easy for customers to book or buy",
    ],
  },
  {
    id: "premium",
    name: "Premium package",
    description: "A higher-value offer with more included - perfect as your recommended option.",
    priceId: process.env.STRIPE_PRICE_PREMIUM ?? "price_REPLACE_ME",
    displayPrice: "£349",
    features: [
      "Everything in Standard",
      "Extended scope or add-ons",
      "Priority scheduling where applicable",
    ],
    highlighted: true,
  },
];

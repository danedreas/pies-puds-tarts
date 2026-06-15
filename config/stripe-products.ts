/**
 * Default mixed-box offers for pre-order. Live content is edited in /admin and stored in Vercel Blob.
 */

export type PreorderBoxDefaults = {
  id: string;
  name: string;
  description: string;
  displayPrice: string;
  features: string[];
  highlighted?: boolean;
};

export const stripeProducts: PreorderBoxDefaults[] = [
  {
    id: "savoury-box",
    name: "Savoury pie box",
    description: "Four mixed savoury pies - good for lunch or taking home to share.",
    displayPrice: "£20",
    features: [
      "Four assorted savoury pies",
      "Collect from your chosen market",
      "Order at least 48 hours ahead",
    ],
  },
  {
    id: "mixed-box",
    name: "Mixed box",
    description: "A pie, a pud and a tart - a bit of everything from the stall.",
    displayPrice: "£18",
    features: [
      "Two savoury pies, one pud and one tart",
      "A good way to try the stall",
      "Collect from your chosen market",
    ],
    highlighted: true,
  },
];

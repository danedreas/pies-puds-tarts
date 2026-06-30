/**
 * Default mixed-box offers for pre-order. Edit here while admin is disabled.
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
    id: "savoury-pie-box",
    name: "Savoury pie box",
    description: "Four mixed savoury pies.",
    displayPrice: "20.00",
    features: [
      "Four mixed savoury pies",
      "Collect from your chosen market",
      "Order at least 48 hours ahead",
    ],
  },
  {
    id: "mixed-box",
    name: "Mixed box",
    description:
      "Two savoury pies, the Plough Pudding, and a tart - a proper sample of the stall.",
    displayPrice: "18.00",
    features: [
      "Two savoury pies, Norfolk Plough Pudding, and a tart",
      "Collect from your chosen market",
      "Order at least 48 hours ahead",
    ],
    highlighted: true,
  },
];

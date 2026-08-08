/**
 * Default mixed-box offers for pre-order. Edit here while admin is disabled.
 * Empty while the stall sells individual line items only.
 */

export type PreorderBoxDefaults = {
  id: string;
  name: string;
  description: string;
  displayPrice: string;
  features: string[];
  highlighted?: boolean;
};

export const stripeProducts: PreorderBoxDefaults[] = [];

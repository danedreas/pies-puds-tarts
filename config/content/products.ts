/**
 * Default menu items for pre-order. Edit here while admin is disabled.
 */

export type MenuCategoryId = "pies" | "puds" | "tarts";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  displayPrice: string;
  allergens?: string;
};

/** Stored in admin/Blob as a plain GBP amount, e.g. "5.50" (no £ symbol). */

export const menuCategories: { id: MenuCategoryId; label: string }[] = [
  { id: "pies", label: "Pies" },
  { id: "puds", label: "Puds" },
  { id: "tarts", label: "Tarts" },
];

export const menuItems: MenuItem[] = [
  {
    id: "hog-roast-pie",
    category: "pies",
    name: "Hog Roast Pie",
    description: "Roast pork, apple & sage onion stuffing.",
    displayPrice: "5.00",
  },
  {
    id: "venison-blackcurrant-port-pie",
    category: "pies",
    name: "Venison Blackcurrant & Port Pie",
    description: "",
    displayPrice: "5.00",
  },
  {
    id: "beef-brisket-smoked-cheddar-dauphinoise-pie",
    category: "pies",
    name: "Beef Brisket Smoked Cheddar & Dauphinoise Potato Pie",
    description: "",
    displayPrice: "5.00",
  },
  {
    id: "beef-steak-ale-kidney-pie",
    category: "pies",
    name: "Beef Steak Ale & Kidney Pie",
    description: "",
    displayPrice: "5.00",
  },
  {
    id: "sausage-roll",
    category: "pies",
    name: "Sausage Roll",
    description: "",
    displayPrice: "4.50",
  },
  {
    id: "feta-mozzarella-olive-spinach-tart",
    category: "tarts",
    name: "Feta, Mozzarella, Olive, Red Onion, Tomato & Spinach Tart",
    description: "",
    displayPrice: "5.00",
  },
  {
    id: "pear-walnut-stilton-tomato-chutney-tart",
    category: "tarts",
    name: "Pear, Walnut, Stilton & Tomato Chutney Tart",
    description: "",
    displayPrice: "5.00",
  },
  {
    id: "goats-cheese-tomato-onion-marmalade-pesto-tart",
    category: "tarts",
    name: "Goats Cheese, Tomato, Onion Marmalade & Pesto Tart",
    description: "",
    displayPrice: "5.00",
  },
];

/** @deprecated Use menuItems - kept for checkout lookup compatibility */
export type CatalogProduct = MenuItem & {
  image?: string;
  details?: {
    intro: string;
    paragraphs: string[];
    highlights: string[];
  };
};

export const catalogProducts = menuItems;

export function parseDisplayPrice(displayPrice: string): number {
  return Number.parseFloat(displayPrice.replace(/[^\d.]/g, "")) || 0;
}

/** Normalize admin input or legacy "£5.50" values to a plain decimal string. */
export function normalizeStoredPrice(displayPrice: string): string {
  const amount = parseDisplayPrice(displayPrice);
  if (!Number.isFinite(amount) || amount <= 0) {
    return "";
  }

  return amount.toFixed(2);
}

/** Format a stored price for display on the shop. */
export function formatDisplayPrice(displayPrice: string): string {
  const amount = parseDisplayPrice(displayPrice);
  if (amount <= 0) {
    return "";
  }

  return formatGbp(amount);
}

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

export function getMenuItemsByCategory(category: MenuCategoryId): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getProductById(id: string): MenuItem | undefined {
  return getMenuItemById(id);
}

export function getAllProductIds(): string[] {
  return menuItems.map((item) => item.id);
}

/**
 * Default menu items for pre-order. Live content is edited in /admin and stored in Vercel Blob.
 */

export type MenuCategoryId = "pies" | "puds" | "tarts";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  displayPrice: string;
};

/** Stored in admin/Blob as a plain GBP amount, e.g. "5.50" (no £ symbol). */

export const menuCategories: { id: MenuCategoryId; label: string }[] = [
  { id: "pies", label: "Pies" },
  { id: "puds", label: "Puds" },
  { id: "tarts", label: "Tarts" },
];

export const menuItems: MenuItem[] = [
  {
    id: "steak-kidney-pie",
    category: "pies",
    name: "Steak & kidney pie",
    description: "Slow-cooked filling, deep shortcrust, baked until golden.",
    displayPrice: "5.50",
  },
  {
    id: "chicken-mushroom-pie",
    category: "pies",
    name: "Chicken & mushroom pie",
    description: "Creamy chicken and mushrooms in buttery pastry.",
    displayPrice: "5.50",
  },
  {
    id: "cheese-onion-pie",
    category: "pies",
    name: "Cheese & onion pie",
    description: "Cheddar and slow-cooked onions. Vegetarian.",
    displayPrice: "5.00",
  },
  {
    id: "sticky-toffee-pud",
    category: "puds",
    name: "Sticky toffee pud",
    description: "Date sponge with plenty of toffee sauce.",
    displayPrice: "4.50",
  },
  {
    id: "apple-crumble-pud",
    category: "puds",
    name: "Apple crumble pud",
    description: "Bramley apples, crumble topping, custard.",
    displayPrice: "4.50",
  },
  {
    id: "seasonal-fruit-tart",
    category: "tarts",
    name: "Seasonal fruit tart",
    description: "Whatever fruit is good that week, on pastry and custard.",
    displayPrice: "4.00",
  },
  {
    id: "lemon-tart",
    category: "tarts",
    name: "Lemon tart",
    description: "Sharp lemon curd in a sweet, crisp case.",
    displayPrice: "4.00",
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

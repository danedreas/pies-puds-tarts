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
};

/** Stored in admin/Blob as a plain GBP amount, e.g. "5.50" (no £ symbol). */

export const menuCategories: { id: MenuCategoryId; label: string }[] = [
  { id: "pies", label: "Pies" },
  { id: "puds", label: "Puds" },
  { id: "tarts", label: "Tarts" },
];

export const menuItems: MenuItem[] = [
  {
    id: "pear-walnut-stilton-honey-pie",
    category: "pies",
    name: "Pear, Walnut, Stilton & Honey pie",
    description:
      "Sweet pear and toasted walnut against sharp Stilton, finished with honey. Vegetarian.",
    displayPrice: "6.00",
  },
  {
    id: "goats-cheese-onion-marmalade-pie",
    category: "pies",
    name: "Goat's Cheese, Onion & Marmalade pie",
    description:
      "Soft goat's cheese, slow-cooked onion, a streak of marmalade through buttery shortcrust. Vegetarian.",
    displayPrice: "5.00",
  },
  {
    id: "chicken-chorizo-chilli-pie",
    category: "pies",
    name: "Chicken, Chorizo & Chilli pie",
    description: "Chicken and chorizo with a chilli kick, topped with crushed nachos.",
    displayPrice: "5.50",
  },
  {
    id: "game-pie",
    category: "pies",
    name: "Game pie",
    description: "A proper hunter's mix - ask on the day what's gone in.",
    displayPrice: "5.50",
  },
  {
    id: "norfolk-plough-pudding",
    category: "puds",
    name: "Norfolk Plough Pudding",
    description:
      "Suet pastry wrapped round a savoury filling - our award-winning original. British Pie Awards Class Champion, 2017.",
    displayPrice: "5.00",
  },
  {
    id: "seasonal-fruit-tart",
    category: "tarts",
    name: "Seasonal fruit tart",
    description: "Whatever's good that week, on pastry and custard.",
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

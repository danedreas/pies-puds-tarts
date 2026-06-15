import type { MarketEvent } from "@/config/content/events";
import type { MenuItem } from "@/config/content/products";
import { parseDisplayPrice } from "@/config/content/products";
import { readSiteContent } from "@/lib/site-content";
import { getUpcomingEventsFromList, type PreorderBox } from "@/lib/site-content-shared";

export async function getSiteContent() {
  return readSiteContent();
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const { menuItems } = await readSiteContent();
  return menuItems;
}

export async function getPreorderBoxes(): Promise<PreorderBox[]> {
  const { boxes } = await readSiteContent();
  return boxes;
}

export async function getMarketEvents(): Promise<MarketEvent[]> {
  const { events } = await readSiteContent();
  return events;
}

export async function getUpcomingMarketEvents(from = new Date()): Promise<MarketEvent[]> {
  const events = await getMarketEvents();
  return getUpcomingEventsFromList(events, from);
}

export async function getMarketEventById(id: string): Promise<MarketEvent | undefined> {
  const events = await getMarketEvents();
  return events.find((event) => event.id === id);
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  const menuItems = await getMenuItems();
  return menuItems.find((item) => item.id === id);
}

export async function getPreorderBoxById(id: string): Promise<PreorderBox | undefined> {
  const boxes = await getPreorderBoxes();
  return boxes.find((box) => box.id === id);
}

export function displayPriceToPence(displayPrice: string): number {
  return Math.round(parseDisplayPrice(displayPrice) * 100);
}

export type CheckoutLineItem = {
  id: string;
  name: string;
  quantity: number;
  unitAmountPence: number;
};

export async function resolveCheckoutProduct(
  productId: string,
): Promise<Omit<CheckoutLineItem, "quantity"> | null> {
  const menuItem = await getMenuItemById(productId);
  if (menuItem) {
    const unitAmountPence = displayPriceToPence(menuItem.displayPrice);
    if (unitAmountPence <= 0) {
      return null;
    }

    return {
      id: menuItem.id,
      name: menuItem.name,
      unitAmountPence,
    };
  }

  const box = await getPreorderBoxById(productId);
  if (box) {
    const unitAmountPence = displayPriceToPence(box.displayPrice);
    if (unitAmountPence <= 0) {
      return null;
    }

    return {
      id: box.id,
      name: box.name,
      unitAmountPence,
    };
  }

  return null;
}

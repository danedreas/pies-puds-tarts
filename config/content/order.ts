/**
 * Order page copy - edit per client build.
 */

import type { MarketEvent } from "@/config/content/events";

/** Synthetic collection option id — not a market event */
export const unitCollectionId = "unit-pickup" as const;

export const unitCollection = {
  id: unitCollectionId,
  label: "Our unit - Colkirk (NR21)",
  location: "Unit 2B, Orchard Park, Dereham Road, Colkirk, NR21 7JQ",
  notice:
    "Collection from our unit needs to be arranged in advance. Add your items below, then get in touch and we'll confirm a time.",
  contactButtonLabel: "Get in touch to arrange collection",
  collectionNote: "Include your chosen items in your message. We'll confirm collection by email or phone.",
} as const;

export const orderContent = {
  eyebrow: "Pre-order",
  title: "What would you like?",
  description:
    "Add your items from the menu, choose a [market](/events) or unit pickup at Colkirk, then [get in touch](/contact) so we can confirm your order.",
  collectionMarketTitle: "Collect from",
  collectionMarketDescription:
    "Pre-orders are open for markets in the next month, with at least 48 hours' notice so we have time to pack. Choose where you're collecting - you can add items first.",
  collectionRequiredMessage: "Please choose where you're collecting from.",
  noEventsMessage:
    "No market dates open for pre-orders right now. You can still arrange collection from our Colkirk unit, or check the events page for updates.",
  collectionNote:
    "Orders need at least 48 hours before the market so we have time to pack. Ask if you need allergen info. We'll confirm payment and collection when you get in touch.",
  summaryTitle: "Your order",
  /** Shared CTA for market pre-orders and unit pickup (contact redirect). */
  contactButtonLabel: "Get in touch to arrange your order",
  emptyCartMessage: "Add something from the menu to continue.",
  boxesTitle: "Mixed boxes",
  boxesDescription:
    "Not sure what to pick? These ready-made boxes are a good place to start.",
} as const;

export function isUnitCollection(collectionId: string): boolean {
  return collectionId === unitCollectionId;
}

type PreorderContactLine = { name: string; quantity: number };

type BuildPreorderContactHrefOptions = {
  /** Unit pickup at Colkirk */
  unit?: boolean;
  /** Selected market event (ignored when unit is true) */
  event?: Pick<MarketEvent, "name" | "dateDisplay">;
};

/**
 * Contact form href with prefilled enquiry type and basket summary.
 * Used for both market pre-orders and unit collection while online checkout is paused.
 */
export function buildPreorderContactHref(
  lineItems: PreorderContactLine[],
  options: BuildPreorderContactHrefOptions = {},
): string {
  const items = lineItems.map((line) => `${line.quantity}x ${line.name}`).join(", ");
  const isUnit = Boolean(options.unit) || !options.event;

  let message: string;
  let type: "Pickup enquiry" | "Pre-order help";

  if (isUnit) {
    type = "Pickup enquiry";
    message = items
      ? `I'd like to collect from your Colkirk unit:\n\n${items}\n\nPlease let me know when I can collect.`
      : "I'd like to arrange collection from your Colkirk unit.";
  } else {
    type = "Pre-order help";
    const event = options.event!;
    message = items
      ? `I'd like to pre-order for ${event.name} on ${event.dateDisplay}:\n\n${items}\n\nPlease confirm availability and how to pay.`
      : `I'd like to pre-order for ${event.name} on ${event.dateDisplay}.`;
  }

  const params = new URLSearchParams({ type, message });
  return `/contact?${params.toString()}`;
}

/** @deprecated Prefer buildPreorderContactHref — kept for callers that only handle unit pickup */
export function buildUnitCollectionContactHref(lineItems: PreorderContactLine[]): string {
  return buildPreorderContactHref(lineItems, { unit: true });
}

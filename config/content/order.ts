/**
 * Order page copy - edit per client build.
 */

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
    "Add your items from the menu, then choose a [market](/events) for pre-order and online payment, or select unit pickup at Colkirk and [get in touch](/contact) to arrange collection.",
  collectionMarketTitle: "Collect from",
  collectionMarketDescription: "Choose where you're collecting - you can add items first.",
  collectionRequiredMessage: "Please choose where you're collecting from.",
  noEventsMessage:
    "No market dates open for pre-orders right now. You can still arrange collection from our Colkirk unit, or check the events page for updates.",
  collectionNote:
    "Please order at least 48 hours before the market. Ask if you need allergen info.",
  summaryTitle: "Your order",
  checkoutLabel: "Pay and pre-order",
  emptyCartMessage: "Add something from the menu to continue.",
  boxesTitle: "Mixed boxes",
  boxesDescription:
    "Not sure what to pick? These ready-made boxes are a good place to start.",
} as const;

export function isUnitCollection(collectionId: string): boolean {
  return collectionId === unitCollectionId;
}

export function buildUnitCollectionContactHref(
  lineItems: { name: string; quantity: number }[],
): string {
  const items = lineItems.map((line) => `${line.quantity}x ${line.name}`).join(", ");
  const message = items
    ? `I'd like to collect from your Colkirk unit:\n\n${items}\n\nPlease let me know when I can collect.`
    : "I'd like to arrange collection from your Colkirk unit.";

  const params = new URLSearchParams({
    type: "Pickup enquiry",
    message,
  });

  return `/contact?${params.toString()}`;
}

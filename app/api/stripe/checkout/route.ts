import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getMarketEventById,
  getUpcomingMarketEvents,
  resolveCheckoutProduct,
  type CheckoutLineItem,
} from "@/lib/content-data";
import { modules } from "@/config/modules";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getStripe } from "@/lib/stripe";

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(20),
});

const checkoutSchema = z.union([
  z.object({
    eventId: z.string().min(1),
    productId: z.string().min(1),
  }),
  z.object({
    eventId: z.string().min(1),
    items: z.array(cartItemSchema).min(1).max(50),
  }),
]);

async function resolveLineItems(
  body: z.infer<typeof checkoutSchema>,
): Promise<CheckoutLineItem[] | null> {
  if ("productId" in body) {
    const product = await resolveCheckoutProduct(body.productId);
    return product ? [{ ...product, quantity: 1 }] : null;
  }

  const resolved: CheckoutLineItem[] = [];

  for (const item of body.items) {
    const product = await resolveCheckoutProduct(item.productId);
    if (!product) {
      return null;
    }

    resolved.push({ ...product, quantity: item.quantity });
  }

  return resolved;
}

async function validateCollectionEvent(eventId: string) {
  const event = await getMarketEventById(eventId);
  if (!event) {
    return null;
  }

  const isUpcoming = (await getUpcomingMarketEvents()).some((item) => item.id === eventId);
  if (!isUpcoming) {
    return null;
  }

  return event;
}

export async function POST(request: Request) {
  if (!modules.stripe) {
    return NextResponse.json({ error: "Stripe is not enabled." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const event = await validateCollectionEvent(parsed.data.eventId);
    if (!event) {
      return NextResponse.json(
        { error: "Please choose a valid upcoming collection market." },
        { status: 400 },
      );
    }

    const lineItems = await resolveLineItems(parsed.data);

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json({ error: "One or more items are not available." }, { status: 400 });
    }

    const stripe = getStripe();
    const orderSummary = lineItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");
    const collectionSummary = `${event.name} on ${event.dateDisplay} (${event.time})`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: item.unitAmountPence,
          product_data: {
            name: item.name,
          },
        },
      })),
      success_url: absoluteUrl(`/checkout/success?session_id={CHECKOUT_SESSION_ID}`),
      cancel_url: absoluteUrl("/order"),
      metadata: {
        eventId: event.id,
        eventName: event.name,
        eventDate: event.dateDisplay,
        eventLocation: event.location,
        collectionSummary: collectionSummary.slice(0, 500),
        productIds: lineItems.map((item) => item.id).join(","),
        orderSummary: orderSummary.slice(0, 500),
        siteName: siteConfig.name,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 400 });
  }
}

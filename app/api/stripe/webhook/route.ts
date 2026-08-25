import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { modules } from "@/config/modules";
import { COLLECTION_CODE_METADATA_KEY } from "@/lib/collection-code";
import { sendPreorderConfirmationEmails, isEmailConfigured } from "@/lib/email";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!modules.stripe) {
    return NextResponse.json({ error: "Stripe is not enabled." }, { status: 404 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, getStripeWebhookSecret());
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const collectionCode = session.metadata?.[COLLECTION_CODE_METADATA_KEY];

    if (isEmailConfigured() && session.customer_details?.email && collectionCode) {
      try {
        await sendPreorderConfirmationEmails({
          customerEmail: session.customer_details.email,
          customerName: session.customer_details.name ?? undefined,
          orderSummary: session.metadata?.orderSummary ?? "Order details unavailable",
          collectionSummary:
            session.metadata?.collectionSummary ??
            session.metadata?.eventName ??
            "Collection market not recorded",
          collectionCode,
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "gbp",
        });
      } catch (error) {
        console.error("Pre-order confirmation email failed:", error);
      }
    } else if (!collectionCode) {
      console.error("Checkout session completed without collection code metadata:", session.id);
    }
  }

  return NextResponse.json({ received: true });
}

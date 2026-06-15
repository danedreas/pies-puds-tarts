import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { modules } from "@/config/modules";
import { sendPaymentNotificationEmail } from "@/lib/resend";
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

    if (process.env.RESEND_API_KEY && session.customer_details?.email) {
      try {
        await sendPaymentNotificationEmail({
          customerEmail: session.customer_details.email,
          customerName: session.customer_details.name ?? undefined,
          orderSummary: session.metadata?.orderSummary ?? "Order details unavailable",
          collectionSummary:
            session.metadata?.collectionSummary ??
            session.metadata?.eventName ??
            "Collection market not recorded",
          amountTotal: session.amount_total ?? 0,
          currency: session.currency ?? "gbp",
        });
      } catch (error) {
        console.error("Payment notification email failed:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}

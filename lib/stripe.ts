import Stripe from "stripe";
import { modules } from "@/config/modules";
import { COLLECTION_CODE_METADATA_KEY } from "@/lib/collection-code";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!modules.stripe) {
    throw new Error("Stripe module is not enabled");
  }

  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2026-06-24.dahlia",
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return secret;
}

export type PaidCheckoutSummary = {
  sessionId: string;
  paymentStatus: Stripe.Checkout.Session["payment_status"];
  collectionCode: string | null;
  collectionSummary: string | null;
  orderSummary: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
};

/**
 * Loads a completed Checkout Session for the confirmation page.
 * Collection code is read from session metadata set at checkout create.
 */
export async function getPaidCheckoutSummary(
  sessionId: string,
): Promise<PaidCheckoutSummary | null> {
  if (!modules.stripe || !sessionId.startsWith("cs_")) {
    return null;
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid" && session.status !== "complete") {
    return null;
  }

  return {
    sessionId: session.id,
    paymentStatus: session.payment_status,
    collectionCode: session.metadata?.[COLLECTION_CODE_METADATA_KEY] ?? null,
    collectionSummary: session.metadata?.collectionSummary ?? null,
    orderSummary: session.metadata?.orderSummary ?? null,
    customerEmail: session.customer_details?.email ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
  };
}

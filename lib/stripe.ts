import Stripe from "stripe";
import { modules } from "@/config/modules";

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
      apiVersion: "2026-05-27.dahlia",
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

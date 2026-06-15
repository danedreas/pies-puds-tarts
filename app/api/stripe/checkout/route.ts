import { NextResponse } from "next/server";
import { z } from "zod";
import { catalogProducts } from "@/config/content/products";
import { modules } from "@/config/modules";
import { stripeProducts } from "@/config/stripe-products";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  productId: z.string().min(1),
});

function findCheckoutProduct(productId: string) {
  const offer = stripeProducts.find((item) => item.id === productId);
  if (offer) {
    return { id: offer.id, name: offer.name, priceId: offer.priceId };
  }

  const product = catalogProducts.find((item) => item.id === productId);
  if (product?.priceId) {
    return { id: product.id, name: product.name, priceId: product.priceId };
  }

  return null;
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

    const product = findCheckoutProduct(parsed.data.productId);

    if (!product || product.priceId.startsWith("price_REPLACE")) {
      return NextResponse.json(
        { error: "Product is not configured. Add Stripe price IDs in config." },
        { status: 400 },
      );
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: product.priceId, quantity: 1 }],
      success_url: absoluteUrl(`/checkout/success?session_id={CHECKOUT_SESSION_ID}`),
      cancel_url: absoluteUrl("/checkout/cancel"),
      metadata: {
        productId: product.id,
        productName: product.name,
        siteName: siteConfig.name,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 500 });
  }
}

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Order confirmed",
  description: "Your pre-order payment went through. Your bakes will be ready at the market.",
  path: "/checkout/success",
  noIndex: true,
});

/**
 * Confirmation UI that surfaces the collection code will follow.
 * `?session_id=` is already passed from Stripe; use getPaidCheckoutSummary()
 * in lib/stripe.ts to load collectionCode from session metadata.
 */
export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="size-12 text-primary" aria-hidden />
      <h1 className="font-heading mt-6 text-3xl font-bold">You&apos;re all set</h1>
      <p className="mt-4 text-muted-foreground">
        Thanks for your order. Check your email for your collection code - quote it at the stall
        when you pick up. If anything&apos;s unclear, we&apos;ll be in touch.
      </p>
      <Button asChild className="mt-8">
        <Link href="/events">See market dates</Link>
      </Button>
    </div>
  );
}

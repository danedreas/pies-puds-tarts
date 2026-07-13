import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClearPendingPreorder } from "@/components/order/clear-pending-preorder";
import { formatGbp } from "@/config/content/products";
import { createMetadata } from "@/lib/seo";
import { getPaidCheckoutSummary } from "@/lib/stripe";

export const metadata = createMetadata({
  title: "Order confirmed",
  description: "Your pre-order payment went through. Your bakes will be ready at the market.",
  path: "/checkout/success",
  noIndex: true,
});

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const summary = sessionId ? await getPaidCheckoutSummary(sessionId) : null;

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <ClearPendingPreorder />
      <CheckCircle2 className="size-12 text-primary" aria-hidden />
      <h1 className="font-heading mt-6 text-3xl font-bold">You&apos;re all set</h1>

      {summary?.collectionCode ? (
        <div className="mt-6 w-full space-y-4">
          <p className="text-muted-foreground">
            Thanks for your order. Quote this collection code at the stall when you pick up:
          </p>
          <p className="font-heading rounded-xl border border-border bg-muted/30 px-4 py-5 text-3xl font-bold tracking-[0.2em]">
            {summary.collectionCode}
          </p>
          {summary.collectionSummary && (
            <p className="text-sm text-muted-foreground">{summary.collectionSummary}</p>
          )}
          {summary.orderSummary && (
            <p className="text-sm text-muted-foreground">{summary.orderSummary}</p>
          )}
          {summary.amountTotal != null && summary.currency && (
            <p className="text-sm font-medium">Paid {formatGbp(summary.amountTotal / 100)}</p>
          )}
          <p className="text-sm text-muted-foreground">
            We&apos;ve also emailed this code to
            {summary.customerEmail ? ` ${summary.customerEmail}` : " you"} so you have a copy.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">
          Thanks for your order. Check your email for your collection code - quote it at the stall
          when you pick up. If anything&apos;s unclear, we&apos;ll be in touch.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/events">See market dates</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/order">Order again</Link>
        </Button>
      </div>
    </div>
  );
}

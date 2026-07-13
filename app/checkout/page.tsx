import { Suspense } from "react";
import { modules } from "@/config/modules";
import { EmbeddedCheckoutPanel } from "@/components/order/embedded-checkout";
import { SectionHeading, SectionShell } from "@/components/ui/section-shell";
import { createMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = createMetadata({
  title: "Checkout",
  description: "Pay securely for your market pre-order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  if (!modules.stripe) {
    redirect("/order");
  }

  return (
    <>
      <SectionShell tone="accent">
        <SectionHeading
          as="h1"
          eyebrow="Checkout"
          title="Pay for your pre-order"
          description="Card details are handled by Stripe on this page. After payment you'll get a collection code by email. See our [payments & refunds](/payments) policy."
        />
      </SectionShell>

      <SectionShell tone="muted" className="pt-4">
        <Suspense
          fallback={
            <p className="text-center text-sm text-muted-foreground">Loading checkout…</p>
          }
        >
          <EmbeddedCheckoutPanel />
        </Suspense>
      </SectionShell>
    </>
  );
}

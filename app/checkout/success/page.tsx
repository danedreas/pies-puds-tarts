import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Payment successful",
  description: "Your payment was successful.",
  path: "/checkout/success",
  noIndex: true,
});

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <CheckCircle2 className="size-12 text-primary" aria-hidden />
      <h1 className="font-heading mt-6 text-3xl font-bold">Payment successful</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you for your purchase. {siteConfig.name} will be in touch within one business day
        to schedule your kickoff call.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}

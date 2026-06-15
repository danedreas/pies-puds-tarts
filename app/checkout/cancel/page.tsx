import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Checkout cancelled",
  description: "Your checkout was cancelled.",
  path: "/checkout/cancel",
  noIndex: true,
});

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-heading text-3xl font-bold">Checkout cancelled</h1>
      <p className="mt-4 text-muted-foreground">
        No payment was taken. Your basket is still there if you want to try again, or drop Paul a
        line if you got stuck.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/order">Back to menu</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Message Paul</Link>
        </Button>
      </div>
    </div>
  );
}

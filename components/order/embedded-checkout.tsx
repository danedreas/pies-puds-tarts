"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStripeJs } from "@/lib/stripe-client";
import { readPendingPreorder, type PendingPreorder } from "@/lib/pending-preorder";

type CheckoutState =
  | { status: "loading" }
  | { status: "ready"; order: PendingPreorder }
  | { status: "missing" }
  | { status: "error"; message: string };

export function EmbeddedCheckoutPanel() {
  const [state, setState] = useState<CheckoutState>({ status: "loading" });

  useEffect(() => {
    const order = readPendingPreorder();
    if (!order) {
      setState({ status: "missing" });
      return;
    }
    setState({ status: "ready", order });
  }, []);

  const fetchClientSecret = useCallback(async () => {
    const order = readPendingPreorder();
    if (!order) {
      throw new Error("Your basket expired. Please rebuild your order.");
    }

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    const data = (await response.json()) as { clientSecret?: string; error?: string };

    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error ?? "Unable to start checkout");
    }

    return data.clientSecret;
  }, []);

  if (state.status === "loading") {
    return (
      <div className="flex min-h-[20rem] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" aria-hidden />
        <span>Preparing checkout…</span>
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h2 className="font-heading text-2xl font-semibold">Nothing to pay for yet</h2>
        <p className="text-muted-foreground">
          Your basket was empty or expired. Head back to the menu to choose your bakes and market.
        </p>
        <Button asChild className="rounded-full">
          <Link href="/order">Back to menu</Link>
        </Button>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h2 className="font-heading text-2xl font-semibold">Checkout unavailable</h2>
        <p className="text-muted-foreground">{state.message}</p>
        <Button asChild className="rounded-full">
          <Link href="/order">Back to menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Pay securely on this page. Declined cards stay here so you can try again.
        </p>
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href="/order">Cancel and edit order</Link>
        </Button>
      </div>

      <div id="checkout" className="overflow-hidden rounded-xl border border-border/60 bg-background">
        <EmbeddedCheckoutProvider stripe={getStripeJs()} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}

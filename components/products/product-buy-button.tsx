"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { modules } from "@/config/modules";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductBuyButtonProps = {
  productId: string;
  productName: string;
  priceId?: string;
  className?: string;
  variant?: "default" | "outline";
  fullWidth?: boolean;
};

export function ProductBuyButton({
  productId,
  productName,
  priceId,
  className,
  variant = "default",
  fullWidth = true,
}: ProductBuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const checkoutEnabled =
    modules.stripe && Boolean(priceId) && !priceId!.startsWith("price_REPLACE");

  async function handleBuy() {
    if (!checkoutEnabled) {
      toast.warning("Checkout is not set up yet.", {
        description: `Online payment for ${productName} is not available. Configure Stripe to enable buying on the site.`,
        duration: 4000,
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout");
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        onClick={handleBuy}
        disabled={loading}
        variant={variant}
        className={cn(fullWidth && "w-full", "rounded-full")}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Redirecting…
          </>
        ) : (
          "Buy"
        )}
      </Button>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { CatalogProduct } from "@/config/content/products";
import { getProductPath } from "@/config/content/products";
import type { StripeProduct } from "@/config/stripe-products";
import { homeContent } from "@/config/content/home";
import { modules } from "@/config/modules";
import { ProductBuyButton } from "@/components/products/product-buy-button";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type CommerceSectionProps = {
  offers: StripeProduct[];
  products: CatalogProduct[];
};

export function CommerceSection({ offers, products }: CommerceSectionProps) {
  const { pricingIntro, productsIntro } = homeContent;

  return (
    <SectionShell tone="muted">
      <div id="offers" className="scroll-mt-24">
        <SectionHeading
          title={pricingIntro.title}
          description={pricingIntro.description}
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {offers.map((product) => (
            <OfferCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div id="products" className="scroll-mt-24">
        <SectionHeading
          title={productsIntro.title}
          description={productsIntro.description}
          align="center"
          className="mx-auto mt-20"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {!modules.stripe && (
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Demo mode - connect Stripe in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs">.env.local</code> to enable
          checkout.
        </p>
      )}
    </SectionShell>
  );
}

function useOfferCheckout(productId: string, productName: string, priceId?: string) {
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

  return { loading, error, handleBuy };
}

function OfferCard({ product }: { product: StripeProduct }) {
  const { loading, error, handleBuy } = useOfferCheckout(
    product.id,
    product.name,
    product.priceId,
  );

  return (
    <SoftPanel highlighted={product.highlighted} className="relative flex flex-col">
      {product.highlighted && (
        <p className="absolute right-6 top-6 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:right-7 sm:top-7">
          Popular
        </p>
      )}
      <div className="space-y-2">
        <h3
          className={cn(
            "font-heading text-2xl font-semibold",
            product.highlighted && "pr-24",
          )}
        >
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <p className="font-heading pt-2 text-4xl font-bold tracking-tight">{product.displayPrice}</p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <OfferBuyButton className="mt-8" loading={loading} error={error} onBuy={handleBuy} />
    </SoftPanel>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="surface-soft flex h-full flex-col overflow-hidden p-0">
      <Link href={getProductPath(product.id)} className="relative block aspect-[4/3] bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold">
          <Link href={getProductPath(product.id)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="font-heading mt-4 text-2xl font-bold">{product.displayPrice}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link href={getProductPath(product.id)}>Learn more</Link>
          </Button>
          <ProductBuyButton
            productId={product.id}
            productName={product.name}
            priceId={product.priceId}
            variant="default"
          />
        </div>
      </div>
    </article>
  );
}

function OfferBuyButton({
  loading,
  error,
  onBuy,
  className,
}: {
  loading: boolean;
  error: string | null;
  onBuy: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button onClick={onBuy} disabled={loading} className="w-full rounded-full">
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

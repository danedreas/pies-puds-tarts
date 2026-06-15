import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import {
  catalogProducts,
  getProductById,
  getProductPath,
} from "@/config/content/products";
import { ProductBuyButton } from "@/components/products/product-buy-button";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { breadcrumbJsonLd, productJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    return {};
  }

  return createMetadata({
    title: product.name,
    description: product.details.intro,
    path: getProductPath(product.id),
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  const path = getProductPath(product.id);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: product.name,
            description: product.details.intro,
            path,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: product.name, path },
          ]),
          productJsonLd(product),
        ]}
      />

      <SectionShell tone="accent">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="-ml-2 rounded-full">
            <Link href="/#products">
              <ArrowLeft className="size-4" aria-hidden />
              View all products
            </Link>
          </Button>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {product.displayPrice}
            </p>
            <h1 className="font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
              {product.details.intro}
            </p>

            <ProductBuyButton
              productId={product.id}
              productName={product.name}
              priceId={product.priceId}
              className="mt-8 max-w-xs"
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4 text-muted-foreground">
            {product.details.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="surface-soft p-6 sm:p-7">
            <h2 className="font-heading text-xl font-semibold">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {product.details.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ProductBuyButton
              productId={product.id}
              productName={product.name}
              priceId={product.priceId}
              className="sm:max-w-xs"
            />
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/contact">Questions? Contact us</Link>
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}

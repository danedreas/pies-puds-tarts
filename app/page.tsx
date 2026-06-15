import { modules } from "@/config/modules";
import { catalogProducts } from "@/config/content/products";
import { stripeProducts } from "@/config/stripe-products";
import { siteConfig } from "@/config/site";
import {
  AboutSection,
  CtaSection,
  HeroSection,
  ServicesSection,
} from "@/components/home/sections";
import { CommerceSection } from "@/components/optional/commerce-section";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: siteConfig.seo.defaultTitle,
          description: siteConfig.description,
          path: "/",
        })}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {modules.pricing && (
        <CommerceSection offers={stripeProducts} products={catalogProducts} />
      )}
      <CtaSection />
    </>
  );
}

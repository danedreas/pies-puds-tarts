import { siteConfig } from "@/config/site";
import {
  AboutSection,
  EventsTeaserSection,
  HeroSection,
  ServicesSection,
} from "@/components/home/sections";
import { OrderCta } from "@/components/layout/order-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/json-ld";
import { getUpcomingMarketEvents } from "@/lib/content-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const events = await getUpcomingMarketEvents();

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
      <EventsTeaserSection events={events} />
      <OrderCta />
    </>
  );
}

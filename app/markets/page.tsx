import { EventsPageIntro, EventsPageList } from "@/components/events/events-list";
import { OrderCta } from "@/components/layout/order-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, eventsPageJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getUpcomingMarketEvents } from "@/lib/content-data";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Market dates",
  description: `See where Pies, Puds & Tarts is trading at farmers markets across East Anglia.`,
  path: "/markets",
});

export default async function EventsPage() {
  const events = await getUpcomingMarketEvents();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Market dates",
            description: `Where ${siteConfig.name} is trading across East Anglia`,
            path: "/markets",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Markets", path: "/markets" },
          ]),
          ...eventsPageJsonLd(events),
        ]}
      />

      <EventsPageIntro />
      <EventsPageList events={events} />
      <OrderCta />
    </>
  );
}

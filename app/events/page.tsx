import { EventsPageIntro, EventsPageList } from "@/components/events/events-list";
import { OrderCta } from "@/components/layout/order-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, eventsPageJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { getUpcomingMarketEvents } from "@/lib/content-data";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Market dates",
  description: `See where Paul Stretton is trading with Pies, Puds & Tarts at farmers markets across Norfolk.`,
  path: "/events",
});

export default async function EventsPage() {
  const events = await getUpcomingMarketEvents();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Market dates",
            description: `Where Paul Stretton is trading with ${siteConfig.name} in Norfolk`,
            path: "/events",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
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

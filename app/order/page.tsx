import { Suspense } from "react";
import { orderContent } from "@/config/content/order";
import { modules } from "@/config/modules";
import { OrderPageClient } from "@/components/order/menu-order-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, menuJsonLd, webPageJsonLd } from "@/lib/json-ld";
import {
  getMenuItems,
  getPreorderBoxes,
  getUpcomingMarketEvents,
} from "@/lib/content-data";
import { SectionHeading, SectionShell } from "@/components/ui/section-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pre-order menu",
  description: `Order pies, puds and tarts from Paul Stretton for collection at a Norfolk farmers market.`,
  path: "/order",
});

export default async function OrderPage() {
  const [events, menuItems, boxes] = await Promise.all([
    getUpcomingMarketEvents(),
    getMenuItems(),
    getPreorderBoxes(),
  ]);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Pre-order menu",
            description: orderContent.description,
            path: "/order",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Order", path: "/order" },
          ]),
          menuJsonLd(menuItems),
        ]}
      />

      <SectionShell tone="accent">
        <SectionHeading
          eyebrow={orderContent.eyebrow}
          title={orderContent.title}
          description={orderContent.description}
        />
      </SectionShell>

      <Suspense fallback={null}>
        <OrderPageClient
          events={events}
          menuItems={menuItems}
          boxes={boxes}
          showBoxes={modules.pricing}
        />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { InlineText } from "@/components/content/inline-text";
import { OrderCta } from "@/components/layout/order-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionShell } from "@/components/ui/section-shell";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch about pre-orders, market collection, pickup, wholesale or anything else.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Contact",
            description: `Contact ${siteConfig.name}`,
            path: "/contact",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <SectionShell tone="accent">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-4 lg:col-start-1 lg:row-start-1">
            <p className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Contact
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Get in touch
            </h1>
          </div>

          <InlineText
            text="Not sure which [market to collect from](/events)? Need something for a [big order](/order), or want to ask about pickup? Send a message and we'll get back to you as soon as we can."
            className="text-lg leading-relaxed text-muted-foreground text-pretty lg:col-start-1 lg:row-start-2"
          />

          <div className="lg:col-start-1 lg:row-start-3">
            <ContactDetails showWhatsAppButton />
          </div>

          <Suspense fallback={null}>
            <ContactForm className="lg:col-start-2 lg:row-start-2 lg:row-span-2 lg:self-start" />
          </Suspense>
        </div>
      </SectionShell>

      <OrderCta />
    </>
  );
}

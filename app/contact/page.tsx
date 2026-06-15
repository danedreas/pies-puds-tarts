import { siteConfig } from "@/config/site";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Send a message and we will respond as soon as we can.`,
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

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
              Contact
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Get in touch
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Have a question, want a quote, or ready to book? Send a message, call, or chat on
              WhatsApp - we will get back to you as soon as we can.
            </p>

            <ContactDetails showWhatsAppButton />
          </div>

          <ContactForm />
        </div>
      </div>
    </>
  );
}

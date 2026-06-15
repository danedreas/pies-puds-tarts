import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/contact";
import { Button } from "@/components/ui/button";

function OpeningHoursText() {
  const { openingHours } = siteConfig.contact;

  return (
    <>
      {openingHours.prefix}{" "}
      <Link href={openingHours.link.href} className="text-foreground underline-offset-4 hover:underline">
        {openingHours.link.label}
      </Link>
    </>
  );
}

export function ContactDetails({ showWhatsAppButton = false }: { showWhatsAppButton?: boolean }) {
  const { contact } = siteConfig;
  const hasPhone = Boolean(contact.phone);
  const hasWhatsApp = Boolean(contact.whatsapp);

  return (
    <div className="space-y-5">
      <dl className="surface-soft grid gap-4 p-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <Mail className="size-3.5" aria-hidden />
            Email
          </dt>
          <dd className="text-muted-foreground">
            <a href={`mailto:${contact.email}`} className="hover:text-foreground">
              {contact.email}
            </a>
          </dd>
        </div>
        {hasPhone && (
          <div>
            <dt className="inline-flex items-center gap-1.5 font-medium">
              <Phone className="size-3.5" aria-hidden />
              Phone
            </dt>
            <dd className="text-muted-foreground">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                {contact.phone}
              </a>
            </dd>
          </div>
        )}
        <div>
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="size-3.5" aria-hidden />
            Based in
          </dt>
          <dd className="text-muted-foreground">{contact.address.region}, {contact.address.country}</dd>
        </div>
        <div>
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="size-3.5" aria-hidden />
            Markets
          </dt>
          <dd className="text-muted-foreground">{contact.serviceArea}</dd>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="size-3.5" aria-hidden />
            Opening hours
          </dt>
          <dd className="text-muted-foreground">
            <OpeningHoursText />
          </dd>
        </div>
      </dl>

      {showWhatsAppButton && hasWhatsApp && (
        <Button asChild variant="outline" className="w-full rounded-full sm:w-auto">
          <Link href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden />
            Message on WhatsApp
          </Link>
        </Button>
      )}
    </div>
  );
}

export function FooterContactList() {
  const { contact, social } = siteConfig;
  const hasPhone = Boolean(contact.phone);
  const hasWhatsApp = Boolean(contact.whatsapp);

  return (
    <ul className="space-y-2 text-sm text-muted-foreground">
      <li>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 hover:text-foreground"
        >
          <Mail className="size-4 shrink-0" aria-hidden />
          {contact.email}
        </a>
      </li>
      {hasPhone && (
        <li>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {contact.phone}
          </a>
        </li>
      )}
      {hasWhatsApp && (
        <li>
          <a
            href={whatsappUrl()}
            className="inline-flex items-center gap-2 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            WhatsApp
          </a>
        </li>
      )}
      <li className="inline-flex items-start gap-2">
        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          <OpeningHoursText />
        </span>
      </li>
      <li>
        <span className="font-medium text-foreground/80">Markets: </span>
        {contact.serviceArea}
      </li>
      {social.instagram.url && (
        <li>
          <a
            href={social.instagram.url}
            className="hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram{social.instagram.handle ? `: ${social.instagram.handle}` : ""}
          </a>
        </li>
      )}
      {social.facebook.url && (
        <li>
          <a
            href={social.facebook.url}
            className="hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook: {social.facebook.label}
          </a>
        </li>
      )}
    </ul>
  );
}

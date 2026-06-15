import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatAddress, whatsappUrl } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export function ContactDetails({ showWhatsAppButton = false }: { showWhatsAppButton?: boolean }) {
  const { contact } = siteConfig;

  return (
    <div className="space-y-5">
      <dl className="surface-soft grid gap-4 p-5 text-sm sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <dt className="font-medium">Email</dt>
          <dd className="text-muted-foreground">
            <a href={`mailto:${contact.email}`} className="hover:text-foreground">
              {contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-medium">Phone</dt>
          <dd className="text-muted-foreground">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
              {contact.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="size-3.5" aria-hidden />
            Location
          </dt>
          <dd className="text-muted-foreground">{formatAddress()}</dd>
        </div>
        <div>
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <MapPin className="size-3.5" aria-hidden />
            Service area
          </dt>
          <dd className="text-muted-foreground">{contact.serviceArea}</dd>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <dt className="inline-flex items-center gap-1.5 font-medium">
            <Clock className="size-3.5" aria-hidden />
            Opening hours
          </dt>
          <dd className="text-muted-foreground">{contact.openingHours}</dd>
        </div>
      </dl>

      {showWhatsAppButton && (
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
      <li>
        <a
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 hover:text-foreground"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {contact.phone}
        </a>
      </li>
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
      <li className="inline-flex items-start gap-2">
        <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>{formatAddress()}</span>
      </li>
      <li className="inline-flex items-start gap-2">
        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>{contact.openingHours}</span>
      </li>
      <li>
        <span className="font-medium text-foreground/80">Service area: </span>
        {contact.serviceArea}
      </li>
      <li>
        <a
          href={social.instagram.url}
          className="hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram: {social.instagram.handle}
        </a>
      </li>
      <li>
        <a
          href={social.linkedin.url}
          className="hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn: {social.linkedin.label}
        </a>
      </li>
    </ul>
  );
}

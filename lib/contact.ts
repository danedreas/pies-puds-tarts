/**
 * Shared contact helpers - used on contact page, footer, and JSON-LD.
 */

import { siteConfig } from "@/config/site";

export function whatsappUrl(phone = siteConfig.contact.whatsapp): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function formatAddress(): string {
  const { line1, city, region, postcode, country } = siteConfig.contact.address;
  return [line1, city, region, postcode, country].filter(Boolean).join(", ");
}

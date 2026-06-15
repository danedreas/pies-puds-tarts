import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import type { MarketEvent } from "@/config/content/events";
import type { MenuItem } from "@/config/content/products";

function socialUrls(): string[] {
  const { social } = siteConfig;
  return Object.values(social)
    .map((entry) => ("url" in entry ? entry.url : ""))
    .filter(Boolean);
}

export function organizationJsonLd() {
  const { contact, legal, owner, logo } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Bakery", "FoodEstablishment"],
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    email: contact.email,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    image: absoluteUrl(logo.src),
    logo: absoluteUrl(logo.src),
    founder: personJsonLd(owner.name, owner.bio),
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.city || contact.address.region,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
      ...(contact.address.line1 ? { streetAddress: contact.address.line1 } : {}),
      ...(contact.address.postcode ? { postalCode: contact.address.postcode } : {}),
    },
    sameAs: socialUrls(),
    areaServed: contact.serviceArea,
    servesCuisine: "British",
    ...(legal.companyNumber ? { taxID: legal.companyNumber } : {}),
  };
}

export function personJsonLd(name: string, description: string) {
  return {
    "@type": "Person",
    name,
    description,
    jobTitle: siteConfig.owner.role,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: absoluteUrl("/about"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name },
    inLanguage: siteConfig.locale,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  displayPrice: string;
  image: string;
  id: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    url: absoluteUrl(`/products/${product.id}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.displayPrice.replace(/[^\d.]/g, "") || product.displayPrice,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${product.id}`),
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

export function eventJsonLd(event: MarketEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${siteConfig.name} at ${event.name}`,
    description: event.notes ?? `Find ${siteConfig.name} at ${event.name}, ${event.location}.`,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressRegion: "Norfolk",
        addressCountry: "GB",
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    performer: personJsonLd(siteConfig.owner.name, siteConfig.owner.bio),
    url: absoluteUrl("/events"),
  };
}

export function eventsPageJsonLd(events: MarketEvent[]) {
  return events.map(eventJsonLd);
}

export function aboutPageJsonLd(description: string) {
  return [
    webPageJsonLd({ title: "About", description, path: "/about" }),
    personJsonLd(siteConfig.owner.name, siteConfig.owner.bio),
  ];
}

export function menuJsonLd(items: MenuItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} menu`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: productJsonLd({
        id: item.id,
        name: item.name,
        description: item.description,
        displayPrice: item.displayPrice,
        image: siteConfig.logo.src,
      }),
    })),
  };
}

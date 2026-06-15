import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export function organizationJsonLd() {
  const { contact, social, legal } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: contact.address.country,
      ...(contact.address.line1 ? { streetAddress: contact.address.line1 } : {}),
      ...(contact.address.postcode ? { postalCode: contact.address.postcode } : {}),
    },
    sameAs: [social.instagram.url, social.linkedin.url].filter(Boolean),
    areaServed: contact.serviceArea,
    ...(legal.companyNumber ? { taxID: legal.companyNumber } : {}),
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
    },
  };
}

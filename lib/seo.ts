import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageSeo = {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
  ogImage = siteConfig.seo.ogImage,
}: PageSeo): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    keywords: [...siteConfig.seo.keywords],
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale.replace("-", "_"),
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

import type { MetadataRoute } from "next";
import { catalogProducts, getProductPath } from "@/config/content/products";
import { getVisibleLegalPages } from "@/config/legal-pages";
import { modules } from "@/config/modules";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  for (const page of getVisibleLegalPages()) {
    routes.push({
      url: `${base}${page.href}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  if (modules.pricing) {
    for (const product of catalogProducts) {
      routes.push({
        url: `${base}${getProductPath(product.id)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  if (modules.stripe) {
    routes.push(
      { url: `${base}/checkout/success`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
      { url: `${base}/checkout/cancel`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    );
  }

  return routes;
}

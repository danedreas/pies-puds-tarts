import type { MetadataRoute } from "next";
import { getVisibleLegalPages } from "@/config/legal-pages";
import { modules } from "@/config/modules";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/order`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  for (const page of getVisibleLegalPages()) {
    routes.push({
      url: `${base}${page.href}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  if (modules.stripe) {
    routes.push(
      { url: `${base}/checkout/success`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
      { url: `${base}/checkout/cancel`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    );
  }

  return routes;
}

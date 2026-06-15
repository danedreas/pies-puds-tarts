import { head, put } from "@vercel/blob";
import { marketEvents } from "@/config/content/events";
import { menuItems as defaultMenuItems } from "@/config/content/products";
import { stripeProducts as defaultBoxes } from "@/config/stripe-products";
import {
  isBlobConfigured,
  SITE_CONTENT_BLOB_PATH,
  SITE_CONTENT_CACHE_TAG,
  siteContentSchema,
  type SiteContent,
} from "@/lib/site-content-shared";

export {
  SITE_CONTENT_BLOB_PATH,
  SITE_CONTENT_CACHE_TAG,
  siteContentSchema,
  isBlobConfigured,
  type PreorderBox,
  type SiteContent,
  getUpcomingEventsFromList,
  formatMarketDateDisplay,
  slugifyId,
} from "@/lib/site-content-shared";

export function getDefaultSiteContent(): SiteContent {
  return {
    updatedAt: undefined,
    events: marketEvents,
    menuItems: defaultMenuItems.map(({ id, category, name, description, displayPrice }) => ({
      id,
      category,
      name,
      description,
      displayPrice,
    })),
    boxes: defaultBoxes.map(({ id, name, description, displayPrice, features, highlighted }) => ({
      id,
      name,
      description,
      displayPrice,
      features,
      highlighted,
    })),
  };
}

function getBlobCommandOptions() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return token ? { token } : {};
}

export async function readSiteContent(): Promise<SiteContent> {
  if (!isBlobConfigured()) {
    return getDefaultSiteContent();
  }

  try {
    const blob = await head(SITE_CONTENT_BLOB_PATH, getBlobCommandOptions());
    const response = await fetch(blob.url, {
      next: { tags: [SITE_CONTENT_CACHE_TAG] },
    });

    if (!response.ok) {
      return getDefaultSiteContent();
    }

    const json: unknown = await response.json();
    return siteContentSchema.parse(json);
  } catch {
    return getDefaultSiteContent();
  }
}

export async function writeSiteContent(content: SiteContent): Promise<SiteContent> {
  if (!isBlobConfigured()) {
    throw new Error("Blob storage is not configured.");
  }

  const payload = siteContentSchema.parse({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await put(SITE_CONTENT_BLOB_PATH, JSON.stringify(payload, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...getBlobCommandOptions(),
  });

  return payload;
}

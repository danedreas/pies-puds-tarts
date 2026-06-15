import { get, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
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

async function readSiteContentFromBlob(): Promise<SiteContent> {
  try {
    const result = await get(SITE_CONTENT_BLOB_PATH, {
      access: "private",
      ...getBlobCommandOptions(),
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return getDefaultSiteContent();
    }

    const text = await new Response(result.stream).text();
    const json: unknown = JSON.parse(text);
    return siteContentSchema.parse(json);
  } catch {
    return getDefaultSiteContent();
  }
}

const getCachedSiteContent = unstable_cache(
  readSiteContentFromBlob,
  [SITE_CONTENT_CACHE_TAG],
  { tags: [SITE_CONTENT_CACHE_TAG] },
);

export async function readSiteContent(): Promise<SiteContent> {
  if (!isBlobConfigured()) {
    return getDefaultSiteContent();
  }

  return getCachedSiteContent();
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
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...getBlobCommandOptions(),
  });

  return payload;
}

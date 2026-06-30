import { get, put } from "@vercel/blob";
import { marketEvents } from "@/config/content/events";
import { menuItems as defaultMenuItems } from "@/config/content/products";
import { stripeProducts as defaultBoxes } from "@/config/stripe-products";
import {
  isBlobConfigured,
  SITE_CONTENT_BLOB_PATH,
  siteContentSchema,
  type SiteContent,
} from "@/lib/site-content-shared";
import { normalizeStoredPrice } from "@/config/content/products";

export {
  SITE_CONTENT_BLOB_PATH,
  SITE_CONTENT_CACHE_TAG,
  siteContentSchema,
  isBlobConfigured,
  normalizeSiteContent,
  validateSiteContent,
  formatSiteContentValidationError,
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

function normalizeLoadedPrices(content: SiteContent): SiteContent {
  return {
    ...content,
    menuItems: content.menuItems.map((item) => ({
      ...item,
      displayPrice: normalizeStoredPrice(item.displayPrice) || item.displayPrice,
    })),
    boxes: content.boxes.map((box) => ({
      ...box,
      displayPrice: normalizeStoredPrice(box.displayPrice) || box.displayPrice,
    })),
  };
}

export async function readSiteContent(): Promise<SiteContent> {
  // Content is maintained in config/content/* while admin is disabled.
  if (!process.env.NEXT_PUBLIC_ENABLE_ADMIN) {
    return getDefaultSiteContent();
  }

  if (!isBlobConfigured()) {
    return getDefaultSiteContent();
  }

  try {
    const result = await get(SITE_CONTENT_BLOB_PATH, {
      access: "private",
      useCache: false,
      ...getBlobCommandOptions(),
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return getDefaultSiteContent();
    }

    const text = await new Response(result.stream).text();
    const json: unknown = JSON.parse(text);
    return normalizeLoadedPrices(siteContentSchema.parse(json));
  } catch (error) {
    console.error("Failed to read site content from blob:", error);
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
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    ...getBlobCommandOptions(),
  });

  return payload;
}

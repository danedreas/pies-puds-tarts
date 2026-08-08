import { z } from "zod";
import type { MarketEvent } from "@/config/content/events";
import { normalizeStoredPrice, parseDisplayPrice } from "@/config/content/products";

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export const SITE_CONTENT_BLOB_PATH = "site-content.json";
export const SITE_CONTENT_CACHE_TAG = "site-content";

const menuCategorySchema = z.enum(["pies", "puds", "tarts", "sausage-rolls"]);

const storedPriceSchema = z
  .string()
  .min(1)
  .refine((value) => parseDisplayPrice(value) > 0, "Enter a valid price greater than 0");

const menuItemSchema = z.object({
  id: z.string().min(1),
  category: menuCategorySchema,
  name: z.string().min(1),
  description: z.string(),
  displayPrice: storedPriceSchema,
  allergens: z.string().optional(),
});

const marketEventSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  dateDisplay: z.string().min(1),
  time: z.string(),
  notes: z.string().optional(),
});

const preorderBoxSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  displayPrice: storedPriceSchema,
  features: z
    .preprocess(
      (value) =>
        Array.isArray(value)
          ? value.map(String).map((feature) => feature.trim()).filter(Boolean)
          : value,
      z.array(z.string().min(1)).min(1),
    ),
  highlighted: z.preprocess(
    (value) => (value === null || value === false ? undefined : value),
    z.boolean().optional(),
  ),
});

export const siteContentSchema = z.object({
  updatedAt: z.string().optional(),
  events: z.array(marketEventSchema).default([]),
  menuItems: z.array(menuItemSchema).default([]),
  boxes: z.array(preorderBoxSchema).default([]),
});

export type PreorderBox = z.infer<typeof preorderBoxSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Minimum notice before a market day so there is time to bake and pack. */
export const PREORDER_MIN_LEAD_MS = 48 * 60 * 60 * 1000;

/** Treat market days as starting at 9am UTC for the 48-hour lead check. */
function getMarketStart(isoDate: string): Date {
  return new Date(`${isoDate}T09:00:00.000Z`);
}

/** Earliest instant a market may start and still be open for pre-order. */
export function getPreorderWindowStart(from = new Date()): Date {
  return new Date(from.getTime() + PREORDER_MIN_LEAD_MS);
}

/** End of the rolling pre-order window (one calendar month from `from`). */
export function getPreorderWindowEnd(from = new Date()): Date {
  const until = new Date(from);
  until.setMonth(until.getMonth() + 1);
  return until;
}

export function isEventWithinPreorderWindow(event: Pick<MarketEvent, "date">, from = new Date()): boolean {
  const until = toIsoDate(getPreorderWindowEnd(from));
  return getMarketStart(event.date).getTime() >= getPreorderWindowStart(from).getTime() && event.date <= until;
}

export function getUpcomingEventsFromList(
  events: MarketEvent[],
  from = new Date(),
): MarketEvent[] {
  const today = toIsoDate(from);

  return events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Upcoming markets within the rolling pre-order window (48h lead + 1 month). */
export function getPreorderEventsFromList(
  events: MarketEvent[],
  from = new Date(),
): MarketEvent[] {
  return events
    .filter((event) => isEventWithinPreorderWindow(event, from))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatMarketDateDisplay(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function slugifyId(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function resolveStoredId(currentId: string, name: string): string {
  if (!currentId || currentId.startsWith("draft-")) {
    return slugifyId(name) || currentId;
  }

  return currentId;
}

function isBlankDraftEvent(event: SiteContent["events"][number]): boolean {
  return !event.name.trim() && !event.date.trim() && !event.location.trim() && !event.time.trim();
}

function isBlankDraftMenuItem(item: SiteContent["menuItems"][number]): boolean {
  return !item.name.trim() && !item.description.trim();
}

function isBlankDraftBox(box: SiteContent["boxes"][number]): boolean {
  return !box.name.trim() && !box.description.trim();
}

export function normalizeSiteContent(content: SiteContent): SiteContent {
  return {
    ...content,
    events: content.events
      .filter((event) => !isBlankDraftEvent(event))
      .map((event) => ({
        ...event,
        id: resolveStoredId(event.id, event.name),
        dateDisplay:
          event.date && !event.dateDisplay
            ? formatMarketDateDisplay(event.date)
            : event.dateDisplay,
      })),
    menuItems: content.menuItems
      .filter((item) => !isBlankDraftMenuItem(item))
      .map((item) => ({
        ...item,
        id: resolveStoredId(item.id, item.name),
        displayPrice: normalizeStoredPrice(item.displayPrice),
      })),
    boxes: (content.boxes ?? [])
      .filter((box) => !isBlankDraftBox(box))
      .map((box) => {
        const features = box.features.map((feature) => feature.trim()).filter(Boolean);

        return {
          ...box,
          id: resolveStoredId(box.id, box.name),
          displayPrice: normalizeStoredPrice(box.displayPrice),
          features:
            features.length > 0 ? features : ["Collect from your chosen market"],
          highlighted: box.highlighted ? true : undefined,
        };
      }),
  };
}

export function formatSiteContentValidationError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join(".");
      if (path.startsWith("events.")) {
        const index = Number.parseInt(issue.path[1]?.toString() ?? "", 10);
        return `Market ${Number.isFinite(index) ? index + 1 : ""}: ${issue.message}`.trim();
      }
      if (path.startsWith("menuItems.")) {
        const index = Number.parseInt(issue.path[1]?.toString() ?? "", 10);
        return `Menu item ${Number.isFinite(index) ? index + 1 : ""}: ${issue.message}`.trim();
      }
      if (path.startsWith("boxes.")) {
        const index = Number.parseInt(issue.path[1]?.toString() ?? "", 10);
        return `Mixed box ${Number.isFinite(index) ? index + 1 : ""}: ${issue.message}`.trim();
      }
      return `${path || "content"}: ${issue.message}`;
    })
    .join("; ");
}

export function validateSiteContent(content: SiteContent): SiteContent {
  return siteContentSchema.parse(normalizeSiteContent(content));
}

export type { MarketEvent };

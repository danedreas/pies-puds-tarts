import { z } from "zod";
import type { MarketEvent } from "@/config/content/events";

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export const SITE_CONTENT_BLOB_PATH = "site-content.json";
export const SITE_CONTENT_CACHE_TAG = "site-content";

const menuCategorySchema = z.enum(["pies", "puds", "tarts"]);

const menuItemSchema = z.object({
  id: z.string().min(1),
  category: menuCategorySchema,
  name: z.string().min(1),
  description: z.string(),
  displayPrice: z.string().min(1),
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
  displayPrice: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  highlighted: z.boolean().optional(),
});

export const siteContentSchema = z.object({
  updatedAt: z.string().optional(),
  events: z.array(marketEventSchema),
  menuItems: z.array(menuItemSchema),
  boxes: z.array(preorderBoxSchema),
});

export type PreorderBox = z.infer<typeof preorderBoxSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;

export function getUpcomingEventsFromList(
  events: MarketEvent[],
  from = new Date(),
): MarketEvent[] {
  const today = from.toISOString().slice(0, 10);

  return events
    .filter((event) => event.date >= today)
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

export type { MarketEvent };

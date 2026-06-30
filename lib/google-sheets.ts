/**
 * Google Sheets integration scaffold.
 *
 * Planned use: menu items and market dates maintained in a shared spreadsheet.
 * Enable with NEXT_PUBLIC_ENABLE_GOOGLE_SHEETS=true and the API credentials below.
 *
 * Products tab - columns: id, category, name, description, displayPrice, priceId
 * Events tab   - columns: id, name, location, date, dateDisplay, time, notes
 */

import type { MarketEvent } from "@/config/content/events";
import type { MenuCategoryId, MenuItem } from "@/config/content/products";
import { modules } from "@/config/modules";

type SheetRow = Record<string, string>;

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

async function fetchSheetRows(range: string): Promise<SheetRow[]> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!spreadsheetId || !apiKey) {
    return [];
  }

  const url = `${SHEETS_API}/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    console.warn(`Google Sheets fetch failed for ${range}: ${response.status}`);
    return [];
  }

  const data = (await response.json()) as { values?: string[][] };
  const [headers = [], ...rows] = data.values ?? [];

  return rows.map((row) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), row[index]?.trim() ?? ""])),
  );
}

export async function fetchMenuFromSheet(): Promise<MenuItem[] | null> {
  if (!modules.googleSheets) {
    return null;
  }

  const productsRange = process.env.GOOGLE_SHEETS_PRODUCTS_RANGE ?? "Products!A2:F";
  const rows = await fetchSheetRows(productsRange);

  if (rows.length === 0) {
    return null;
  }

  return rows
    .filter((row) => row.id && row.name && row.category)
    .map((row) => ({
      id: row.id,
      category: row.category as MenuCategoryId,
      name: row.name,
      description: row.description ?? "",
      displayPrice: row.displayPrice ?? "",
      priceId: row.priceId || undefined,
    }));
}

/** @deprecated Use fetchMenuFromSheet */
export async function fetchProductsFromSheet(): Promise<MenuItem[] | null> {
  return fetchMenuFromSheet();
}

export async function fetchEventsFromSheet(): Promise<MarketEvent[] | null> {
  if (!modules.googleSheets) {
    return null;
  }

  const eventsRange = process.env.GOOGLE_SHEETS_EVENTS_RANGE ?? "Events!A2:G";
  const rows = await fetchSheetRows(eventsRange);

  if (rows.length === 0) {
    return null;
  }

  return rows
    .filter((row) => row.id && row.name && row.date)
    .map((row) => ({
      id: row.id,
      name: row.name,
      location: row.location ?? "",
      date: row.date,
      dateDisplay: row.dateDisplay ?? row.date,
      time: row.time ?? "",
      notes: row.notes || undefined,
    }));
}

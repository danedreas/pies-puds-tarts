/**
 * Farmers market events - edit per client build.
 *
 * When Google Sheets is enabled (see lib/google-sheets.ts), this list can be
 * replaced at build time from a shared spreadsheet Paul can update himself.
 */

export type MarketEvent = {
  id: string;
  name: string;
  location: string;
  /** ISO 8601 date for sorting and structured data */
  date: string;
  /** Human-readable date for display */
  dateDisplay: string;
  time: string;
  notes?: string;
};

export const eventsContent = {
  eyebrow: "Farmers markets",
  title: "Where to find me",
  description:
    "These are the markets I'm booked in for over the coming weeks. Dates can shift, especially if the weather's awful - worth [getting in touch](/contact) before you travel.",
  emptyMessage:
    "Nothing coming up just now. Check back soon, or [send a message](/contact) if you're wondering where I'll be next.",
  cta: {
    label: "Ask Paul",
    href: "/contact",
  },
};

/** Placeholder schedule - replace with real dates or connect Google Sheets */
export const marketEvents: MarketEvent[] = [
  // {
  //   id: "norwich-market-june",
  //   name: "Norwich Market",
  //   location: "Norwich city centre, NR2",
  //   date: "2026-06-21",
  //   dateDisplay: "Saturday 21 June 2026",
  //   time: "9am - 3pm",
  //   notes: "On the market square. Pre-orders welcome.",
  // },
  // {
  //   id: "aylsham-market-june",
  //   name: "Aylsham Market",
  //   location: "Aylsham town centre, NR11",
  //   date: "2026-06-28",
  //   dateDisplay: "Saturday 28 June 2026",
  //   time: "8:30am - 1pm",
  // },
  // {
  //   id: "diss-market-july",
  //   name: "Diss Market",
  //   location: "Diss, IP22",
  //   date: "2026-07-05",
  //   dateDisplay: "Saturday 5 July 2026",
  //   time: "9am - 2pm",
  // },
];

export function getUpcomingEvents(from = new Date()): MarketEvent[] {
  const today = from.toISOString().slice(0, 10);

  return marketEvents
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getEventById(id: string): MarketEvent | undefined {
  return marketEvents.find((event) => event.id === id);
}

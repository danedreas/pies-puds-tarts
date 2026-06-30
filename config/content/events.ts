/**
 * Farmers market events - edit per client build.
 *
 * Hardcoded while admin is disabled. Set NEXT_PUBLIC_ENABLE_ADMIN=true to use Blob-backed editing.
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
  title: "Where to find us",
  description:
    "These are the markets we're booked in for over the coming weeks. Dates can shift, especially if the weather's awful - worth [getting in touch](/contact) before you travel.",
  emptyMessage:
    "Nothing coming up just now. Check back soon, or [send a message](/contact) for more information.",
  cta: {
    label: "Get in touch",
    href: "/contact",
  },
};

export const marketEvents: MarketEvent[] = [
  {
    id: "norwich-market-july",
    name: "Norwich Market",
    location: "Market Place, Norwich NR2",
    date: "2026-07-05",
    dateDisplay: "Saturday 5 July 2026",
    time: "9am - 3pm",
    notes: "On the market square. Pre-orders welcome.",
  },
  {
    id: "aylsham-market-july",
    name: "Aylsham Market",
    location: "Aylsham town centre, NR11",
    date: "2026-07-12",
    dateDisplay: "Saturday 12 July 2026",
    time: "8:30am - 1pm",
  },
  {
    id: "diss-market-july",
    name: "Diss Market",
    location: "Diss, IP22",
    date: "2026-07-19",
    dateDisplay: "Saturday 19 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "swaffham-market-july",
    name: "Swaffham Market",
    location: "Market Place, Swaffham PE37",
    date: "2026-07-26",
    dateDisplay: "Saturday 26 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "fakenham-market-july",
    name: "Fakenham Market",
    location: "Fakenham town centre, NR21",
    date: "2026-07-31",
    dateDisplay: "Thursday 31 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "holt-market-august",
    name: "Holt Market",
    location: "Holt town centre, NR25",
    date: "2026-08-02",
    dateDisplay: "Saturday 2 August 2026",
    time: "9am - 1pm",
  },
  {
    id: "wymondham-market-august",
    name: "Wymondham Market",
    location: "Market Place, Wymondham NR18",
    date: "2026-08-08",
    dateDisplay: "Friday 8 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "cromer-market-august",
    name: "Cromer Market",
    location: "Cromer town centre, NR27",
    date: "2026-08-16",
    dateDisplay: "Saturday 16 August 2026",
    time: "9am - 3pm",
    notes: "Summer market day - arrive early for the full range.",
  },
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

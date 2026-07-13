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
    id: "north-wootton-village-hall-july",
    name: "North Wootton Village Hall",
    location: "North Wootton, Norfolk",
    date: "2026-07-18",
    dateDisplay: "Saturday 18 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "norwich-foodhall-july",
    name: "Norwich Foodhall",
    location: "Norwich",
    date: "2026-07-18",
    dateDisplay: "Saturday 18 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "eve-s-hill-farm-july",
    name: "Eve's Hill Farm",
    location: "Eve's Hill Farm, Norfolk",
    date: "2026-07-19",
    dateDisplay: "Sunday 19 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "worstead-festival-2026-07-25",
    name: "Worstead Festival",
    location: "Worstead, Norfolk",
    date: "2026-07-25",
    dateDisplay: "Saturday 25 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "worstead-festival-2026-07-26",
    name: "Worstead Festival",
    location: "Worstead, Norfolk",
    date: "2026-07-26",
    dateDisplay: "Sunday 26 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-july",
    name: "North Walsham",
    location: "North Walsham, Norfolk",
    date: "2026-07-26",
    dateDisplay: "Sunday 26 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "daisy-s-milk-shed-july",
    name: "Daisy's Milk Shed",
    location: "Daisy's Milk Shed, Norfolk",
    date: "2026-07-26",
    dateDisplay: "Sunday 26 July 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-august",
    name: "Creake Abbey",
    location: "Creake Abbey, Norfolk",
    date: "2026-08-01",
    dateDisplay: "Saturday 1 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "holme-village-hall-august",
    name: "Holme Village Hall",
    location: "Holme, Norfolk",
    date: "2026-08-01",
    dateDisplay: "Saturday 1 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "wroxham-barns-august",
    name: "Wroxham Barns",
    location: "Wroxham Barns, Norfolk",
    date: "2026-08-02",
    dateDisplay: "Sunday 2 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "fakenham-august",
    name: "Fakenham",
    location: "Fakenham, Norfolk",
    date: "2026-08-08",
    dateDisplay: "Saturday 8 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-august",
    name: "Black Barn Salhouse",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-08-08",
    dateDisplay: "Saturday 8 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "snettisham-summer-fayre-august",
    name: "Snettisham Summer Fayre",
    location: "Snettisham, Norfolk",
    date: "2026-08-08",
    dateDisplay: "Saturday 8 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "bury-st-edmunds-august",
    name: "Bury St Edmunds",
    location: "Bury St Edmunds, Suffolk",
    date: "2026-08-09",
    dateDisplay: "Sunday 9 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "burnt-house-vineyard-august",
    name: "Burnt House Vineyard",
    location: "Burnt House Vineyard, Suffolk",
    date: "2026-08-09",
    dateDisplay: "Sunday 9 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-wootton-village-hall-august",
    name: "North Wootton Village Hall",
    location: "North Wootton, Norfolk",
    date: "2026-08-15",
    dateDisplay: "Saturday 15 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "cromer-country-fair-august",
    name: "Cromer Country Fair",
    location: "Cromer, Norfolk",
    date: "2026-08-15",
    dateDisplay: "Saturday 15 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-08-16",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-08-16",
    dateDisplay: "Sunday 16 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-blossom-fair-2026-08-22",
    name: "Black Barn Salhouse Blossom Fair",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-08-22",
    dateDisplay: "Saturday 22 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "pulham-patch-august",
    name: "Pulham Patch",
    location: "Pulham, Norfolk",
    date: "2026-08-22",
    dateDisplay: "Saturday 22 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-blossom-fair-2026-08-23",
    name: "Black Barn Salhouse Blossom Fair",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-08-23",
    dateDisplay: "Sunday 23 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-08-23",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-08-23",
    dateDisplay: "Sunday 23 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-gift-fair-august",
    name: "Creake Abbey Gift Fair",
    location: "Creake Abbey, Norfolk",
    date: "2026-08-29",
    dateDisplay: "Saturday 29 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-august",
    name: "North Walsham",
    location: "North Walsham, Norfolk",
    date: "2026-08-30",
    dateDisplay: "Sunday 30 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "lavenham-food-festival-august",
    name: "Lavenham Food Festival",
    location: "Lavenham, Suffolk",
    date: "2026-08-30",
    dateDisplay: "Sunday 30 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "daisy-s-milk-shed-august",
    name: "Daisy's Milk Shed",
    location: "Daisy's Milk Shed, Norfolk",
    date: "2026-08-30",
    dateDisplay: "Sunday 30 August 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-september",
    name: "Creake Abbey",
    location: "Creake Abbey, Norfolk",
    date: "2026-09-05",
    dateDisplay: "Saturday 5 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "holkham-food-and-drink-festival-2026-09-05",
    name: "Holkham Food and Drink Festival",
    location: "Holkham, Norfolk",
    date: "2026-09-05",
    dateDisplay: "Saturday 5 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "holkham-food-and-drink-festival-2026-09-06",
    name: "Holkham Food and Drink Festival",
    location: "Holkham, Norfolk",
    date: "2026-09-06",
    dateDisplay: "Sunday 6 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "wroxham-barns-september",
    name: "Wroxham Barns",
    location: "Wroxham Barns, Norfolk",
    date: "2026-09-06",
    dateDisplay: "Sunday 6 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-september",
    name: "Black Barn Salhouse",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-09-12",
    dateDisplay: "Saturday 12 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "bury-st-edmunds-september",
    name: "Bury St Edmunds",
    location: "Bury St Edmunds, Suffolk",
    date: "2026-09-13",
    dateDisplay: "Sunday 13 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-09-13",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-09-13",
    dateDisplay: "Sunday 13 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "coggeshall-barn-september",
    name: "Coggeshall Barn",
    location: "Coggeshall, Essex",
    date: "2026-09-19",
    dateDisplay: "Saturday 19 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-wootton-village-hall-september",
    name: "North Wootton Village Hall",
    location: "North Wootton, Norfolk",
    date: "2026-09-19",
    dateDisplay: "Saturday 19 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "cheveley-farmers-market-september",
    name: "Cheveley Farmers Market",
    location: "Cheveley, Cambridgeshire",
    date: "2026-09-20",
    dateDisplay: "Sunday 20 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-09-20",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-09-20",
    dateDisplay: "Sunday 20 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "goat-s-shed-farmers-market-september",
    name: "Goat's Shed Farmers Market",
    location: "Goat's Shed, Norfolk",
    date: "2026-09-26",
    dateDisplay: "Saturday 26 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "the-great-feast-suffolk-2026-09-26",
    name: "The Great Feast Suffolk",
    location: "Suffolk",
    date: "2026-09-26",
    dateDisplay: "Saturday 26 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "the-great-feast-suffolk-2026-09-27",
    name: "The Great Feast Suffolk",
    location: "Suffolk",
    date: "2026-09-27",
    dateDisplay: "Sunday 27 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "daisy-s-milk-shed-september",
    name: "Daisy's Milk Shed",
    location: "Daisy's Milk Shed, Norfolk",
    date: "2026-09-27",
    dateDisplay: "Sunday 27 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-september",
    name: "North Walsham",
    location: "North Walsham, Norfolk",
    date: "2026-09-27",
    dateDisplay: "Sunday 27 September 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-october",
    name: "Creake Abbey",
    location: "Creake Abbey, Norfolk",
    date: "2026-10-03",
    dateDisplay: "Saturday 3 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "wroxham-barns-october",
    name: "Wroxham Barns",
    location: "Wroxham Barns, Norfolk",
    date: "2026-10-04",
    dateDisplay: "Sunday 4 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-10-04",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-10-04",
    dateDisplay: "Sunday 4 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-october",
    name: "Black Barn Salhouse",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-10-10",
    dateDisplay: "Saturday 10 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "bury-st-edmunds-october",
    name: "Bury St Edmunds",
    location: "Bury St Edmunds, Suffolk",
    date: "2026-10-11",
    dateDisplay: "Sunday 11 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-10-11",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-10-11",
    dateDisplay: "Sunday 11 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-wootton-village-hall-october",
    name: "North Wootton Village Hall",
    location: "North Wootton, Norfolk",
    date: "2026-10-17",
    dateDisplay: "Saturday 17 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "eve-s-hill-farm-october",
    name: "Eve's Hill Farm",
    location: "Eve's Hill Farm, Norfolk",
    date: "2026-10-18",
    dateDisplay: "Sunday 18 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-10-18",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-10-18",
    dateDisplay: "Sunday 18 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "daisy-s-milk-shed-october",
    name: "Daisy's Milk Shed",
    location: "Daisy's Milk Shed, Norfolk",
    date: "2026-10-25",
    dateDisplay: "Sunday 25 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-october",
    name: "North Walsham",
    location: "North Walsham, Norfolk",
    date: "2026-10-25",
    dateDisplay: "Sunday 25 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "goat-s-shed-farmers-market-october",
    name: "Goat's Shed Farmers Market",
    location: "Goat's Shed, Norfolk",
    date: "2026-10-31",
    dateDisplay: "Saturday 31 October 2026",
    time: "9am - 2pm",
  },
  {
    id: "wroxham-barns-november",
    name: "Wroxham Barns",
    location: "Wroxham Barns, Norfolk",
    date: "2026-11-01",
    dateDisplay: "Sunday 1 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-11-01",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-11-01",
    dateDisplay: "Sunday 1 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-november",
    name: "Creake Abbey",
    location: "Creake Abbey, Norfolk",
    date: "2026-11-07",
    dateDisplay: "Saturday 7 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "bury-st-edmunds-november",
    name: "Bury St Edmunds",
    location: "Bury St Edmunds, Suffolk",
    date: "2026-11-08",
    dateDisplay: "Sunday 8 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-11-08",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-11-08",
    dateDisplay: "Sunday 8 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-november",
    name: "Black Barn Salhouse",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-11-14",
    dateDisplay: "Saturday 14 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-11-15",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-11-15",
    dateDisplay: "Sunday 15 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-christmas-gift-fair-november",
    name: "Creake Abbey Christmas Gift Fair",
    location: "Creake Abbey, Norfolk",
    date: "2026-11-21",
    dateDisplay: "Saturday 21 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "eve-s-hill-farm-christmas-market-november",
    name: "Eve's Hill Farm Christmas Market",
    location: "Eve's Hill Farm, Norfolk",
    date: "2026-11-22",
    dateDisplay: "Sunday 22 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "daisy-s-milk-shed-november",
    name: "Daisy's Milk Shed",
    location: "Daisy's Milk Shed, Norfolk",
    date: "2026-11-29",
    dateDisplay: "Sunday 29 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-november",
    name: "North Walsham",
    location: "North Walsham, Norfolk",
    date: "2026-11-29",
    dateDisplay: "Sunday 29 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "beccles-sunday-market-2026-11-29",
    name: "Beccles Sunday Market",
    location: "Beccles, Suffolk",
    date: "2026-11-29",
    dateDisplay: "Sunday 29 November 2026",
    time: "9am - 2pm",
  },
  {
    id: "kimberley-hall-christmas-fair-2026-12-04",
    name: "Kimberley Hall Christmas Fair",
    location: "Kimberley Hall, Norfolk",
    date: "2026-12-04",
    dateDisplay: "Friday 4 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "kimberley-hall-christmas-fair-2026-12-05",
    name: "Kimberley Hall Christmas Fair",
    location: "Kimberley Hall, Norfolk",
    date: "2026-12-05",
    dateDisplay: "Saturday 5 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "creake-abbey-december",
    name: "Creake Abbey",
    location: "Creake Abbey, Norfolk",
    date: "2026-12-05",
    dateDisplay: "Saturday 5 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "kimberley-hall-christmas-fair-2026-12-06",
    name: "Kimberley Hall Christmas Fair",
    location: "Kimberley Hall, Norfolk",
    date: "2026-12-06",
    dateDisplay: "Sunday 6 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "black-barn-salhouse-december",
    name: "Black Barn Salhouse",
    location: "Black Barn, Salhouse, Norfolk",
    date: "2026-12-12",
    dateDisplay: "Saturday 12 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "bury-st-edmunds-december",
    name: "Bury St Edmunds",
    location: "Bury St Edmunds, Suffolk",
    date: "2026-12-13",
    dateDisplay: "Sunday 13 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "cheveley-christmas-farmers-market-december",
    name: "Cheveley Christmas Farmers Market",
    location: "Cheveley, Cambridgeshire",
    date: "2026-12-13",
    dateDisplay: "Sunday 13 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-wootton-christmas-market-december",
    name: "North Wootton Christmas Market",
    location: "North Wootton, Norfolk",
    date: "2026-12-19",
    dateDisplay: "Saturday 19 December 2026",
    time: "9am - 2pm",
  },
  {
    id: "north-walsham-christmas-farmers-market-december",
    name: "North Walsham Christmas Farmers Market",
    location: "North Walsham, Norfolk",
    date: "2026-12-20",
    dateDisplay: "Sunday 20 December 2026",
    time: "9am - 2pm",
  },
];

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** End of the rolling pre-order window (one calendar month from `from`). */
export function getPreorderWindowEnd(from = new Date()): Date {
  const until = new Date(from);
  until.setMonth(until.getMonth() + 1);
  return until;
}

export function getUpcomingEvents(from = new Date()): MarketEvent[] {
  const today = toIsoDate(from);

  return marketEvents
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Markets open for online pre-order - upcoming within a rolling month. */
export function getPreorderEvents(from = new Date()): MarketEvent[] {
  const today = toIsoDate(from);
  const until = toIsoDate(getPreorderWindowEnd(from));

  return marketEvents
    .filter((event) => event.date >= today && event.date <= until)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function isEventOpenForPreorder(event: MarketEvent, from = new Date()): boolean {
  const today = toIsoDate(from);
  const until = toIsoDate(getPreorderWindowEnd(from));
  return event.date >= today && event.date <= until;
}

export function getEventById(id: string): MarketEvent | undefined {
  return marketEvents.find((event) => event.id === id);
}

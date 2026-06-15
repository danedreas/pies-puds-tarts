"use client";

import Link from "next/link";
import type { MarketEvent } from "@/config/content/events";
import { orderContent } from "@/config/content/order";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type EventSelectorProps = {
  events: MarketEvent[];
  value: string;
  onChange: (eventId: string) => void;
  invalid?: boolean;
};

function formatEventLabel(event: MarketEvent): string {
  return `${event.name} - ${event.dateDisplay}`;
}

export function EventSelector({ events, value, onChange, invalid = false }: EventSelectorProps) {
  if (events.length === 0) {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{orderContent.collectionMarketTitle}</Label>
        <p className="text-sm leading-relaxed text-muted-foreground">{orderContent.noEventsMessage}</p>
        <Link
          href="/events"
          className="inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          View market schedule
        </Link>
      </div>
    );
  }

  const selectedEvent = events.find((event) => event.id === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="collection-market" className="text-sm font-medium">
        {orderContent.collectionMarketTitle}
        <span className="text-primary" aria-hidden>
          {" "}
          *
        </span>
      </Label>
      <select
        id="collection-market"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        aria-invalid={invalid}
        className={cn(
          "h-10 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-muted-foreground",
          invalid && "border-destructive ring-3 ring-destructive/20",
        )}
      >
        <option value="" disabled>
          Choose a market date...
        </option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {formatEventLabel(event)}
          </option>
        ))}
      </select>
      {selectedEvent && (
        <p className="text-xs text-muted-foreground">
          {selectedEvent.location} · {selectedEvent.time}
        </p>
      )}
      {invalid && (
        <p className="text-sm text-destructive" role="alert">
          {orderContent.eventRequiredMessage}
        </p>
      )}
    </div>
  );
}

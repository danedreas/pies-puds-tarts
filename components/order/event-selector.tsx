"use client";

import Link from "next/link";
import type { MarketEvent } from "@/config/content/events";
import {
  isUnitCollection,
  orderContent,
  unitCollection,
} from "@/config/content/order";
import { InlineText } from "@/components/content/inline-text";
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
  const selectedEvent = events.find((event) => event.id === value);
  const unitSelected = isUnitCollection(value);

  return (
    <div className="space-y-2">
      <Label htmlFor="collection-location" className="text-sm font-medium">
        {orderContent.collectionMarketTitle}
        <span className="text-primary" aria-hidden>
          {" "}
          *
        </span>
      </Label>
      <select
        id="collection-location"
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
          Choose a collection option...
        </option>
        <option value={unitCollection.id}>{unitCollection.label}</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {formatEventLabel(event)}
          </option>
        ))}
      </select>

      {unitSelected && (
        <div className="space-y-1.5 rounded-lg border border-border/60 bg-muted/20 p-3">
          <p className="text-xs font-medium text-foreground">{unitCollection.location}</p>
          <InlineText
            text={unitCollection.notice}
            as="span"
            className="block text-xs leading-relaxed text-muted-foreground"
          />
        </div>
      )}

      {selectedEvent && (
        <p className="text-xs text-muted-foreground">
          {selectedEvent.location} · {selectedEvent.time}
        </p>
      )}

      {events.length === 0 && !unitSelected && (
        <InlineText
          text={orderContent.noEventsMessage}
          className="text-xs leading-relaxed text-muted-foreground"
        />
      )}

      {events.length === 0 && (
        <Link
          href="/events"
          className="inline-block text-xs font-medium text-foreground underline-offset-4 hover:underline"
        >
          View market schedule
        </Link>
      )}

      {invalid && (
        <p className="text-sm text-destructive" role="alert">
          {orderContent.collectionRequiredMessage}
        </p>
      )}
    </div>
  );
}

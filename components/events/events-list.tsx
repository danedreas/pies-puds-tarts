import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { MarketEvent } from "@/config/content/events";
import { eventsContent } from "@/config/content/events";
import { InlineText } from "@/components/content/inline-text";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";

type EventsListProps = {
  events: MarketEvent[];
};

export function EventsList({ events }: EventsListProps) {
  if (events.length === 0) {
    return (
      <SoftPanel>
        <InlineText text={eventsContent.emptyMessage} className="text-muted-foreground" />
        <Button asChild className="mt-6 rounded-full">
          <Link href={eventsContent.cta.href}>{eventsContent.cta.label}</Link>
        </Button>
      </SoftPanel>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <article key={event.id} className="surface-soft p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold">{event.name}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{event.location}</span>
              </p>
              {event.notes && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.notes}</p>
              )}
            </div>
            <div className="shrink-0 text-sm sm:text-right">
              <p className="flex items-center gap-2 font-medium sm:justify-end">
                <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
                {event.dateDisplay}
              </p>
              <p className="mt-1 text-muted-foreground">{event.time}</p>
              <Button asChild variant="outline" size="sm" className="mt-4 rounded-full">
                <Link href={`/order?event=${event.id}`}>
                  Order for this market
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function EventsPageIntro() {
  const { eyebrow, title, description } = eventsContent;

  return (
    <SectionShell tone="accent">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
    </SectionShell>
  );
}

export function EventsPageList({ events }: EventsListProps) {
  return (
    <SectionShell tone="muted">
      <EventsList events={events} />
      <EventsTravelNotice />
    </SectionShell>
  );
}

export function EventsTravelNotice() {
  return (
    <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
      Dates can change -{" "}
      <Link href="/contact" className="text-foreground underline-offset-4 hover:underline">
        contact Paul
      </Link>{" "}
      before travelling, especially in bad weather.
    </p>
  );
}

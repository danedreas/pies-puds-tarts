import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Check, MapPin } from "lucide-react";
import type { MarketEvent } from "@/config/content/events";
import { homeContent } from "@/config/content/home";
import { siteImages } from "@/config/content/images";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { InlineText } from "@/components/content/inline-text";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { hero } = homeContent;
  const image = siteImages.hero;

  return (
    <section className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-muted/40 via-background to-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 pt-3 pb-6 sm:gap-8 sm:pb-8 lg:grid-cols-2 lg:gap-10 lg:pt-14 lg:pb-8">
          <div className="order-2 min-w-0 lg:order-1 lg:pr-6">
            <p className="inline-flex w-fit rounded-full bg-brand-stone/25 px-3 py-1 text-xs font-medium tracking-wide text-brand-pies uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:max-w-xl lg:text-[2.75rem] lg:leading-[1.1]">
              {hero.headline}
            </h1>
            <InlineText
              text={hero.subheadline}
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty lg:max-w-lg"
            />

            <ul className="mt-5 flex flex-wrap gap-2">
              {hero.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-sm text-foreground/80"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>

          <div className="relative order-1 aspect-[5/4] w-full lg:order-2 lg:aspect-[4/5] lg:max-h-[min(42vh,380px)]">
            <div
              className="pointer-events-none absolute -left-6 top-1/2 hidden h-[115%] w-20 -translate-y-1/2 rounded-full bg-brand-puds/12 blur-2xl lg:block"
              aria-hidden
            />
            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/40 lg:rounded-l-[999px] lg:rounded-r-2xl lg:shadow-md lg:ring-border/50">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { about } = homeContent;

  return (
    <SectionShell id={about.id} className="pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-8 lg:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <PlaceholderImage image={siteImages.homeAbout} aspect="portrait" className="mx-auto w-full max-w-md lg:max-w-none" />

        <div>
          <SectionHeading title={about.title} description={about.description} />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <SoftPanel>
              <h3 className="font-heading text-lg font-semibold">{about.positivePanel.title}</h3>
              <ul className="mt-4 space-y-3">
                {about.positivePanel.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-puds/15 text-brand-pies">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>
                      <InlineText text={item} as="span" />
                    </span>
                  </li>
                ))}
              </ul>
            </SoftPanel>

            <SoftPanel className="bg-muted/20">
              <h3 className="font-heading text-lg font-semibold">{about.infoPanel.title}</h3>
              <ul className="mt-4 space-y-3">
                {about.infoPanel.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-puds/15 text-brand-pies">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>
                      <InlineText text={item} as="span" />
                    </span>
                  </li>
                ))}
              </ul>
            </SoftPanel>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function ServicesSection() {
  const { services } = homeContent;

  return (
    <SectionShell id={services.id} tone="muted">
      <SectionHeading title={services.title} description={services.description} align="center" className="mx-auto" />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.items.map((item) => {
          const image = siteImages.services[item.imageIndex];
          return (
            <Link
              key={item.title}
              href={item.href}
              className="surface-soft block overflow-hidden p-0 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <PlaceholderImage
                image={image}
                aspect="video"
                flush
                className="rounded-b-none"
              />
              <div className="space-y-2 p-6 sm:p-7">
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function EventsTeaserSection({ events }: { events: MarketEvent[] }) {
  const { eventsTeaser } = homeContent;
  const upcoming = events.slice(0, 3);

  return (
    <SectionShell id={eventsTeaser.id}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
        <SectionHeading
          title={eventsTeaser.title}
          description={eventsTeaser.description}
        />
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map((event) => (
              <article key={event.id} className="surface-soft p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{event.name}</h3>
                    <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-puds" aria-hidden />
                      <span>{event.location}</span>
                    </p>
                  </div>
                  <div className="shrink-0 text-sm sm:text-right">
                    <p className="flex items-center gap-2 font-medium sm:justify-end">
                      <CalendarDays className="size-4 shrink-0 text-brand-puds" aria-hidden />
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
            ))
          ) : (
            <SoftPanel>
              <InlineText
                text={eventsTeaser.emptyMessage}
                className="text-sm text-muted-foreground"
              />
            </SoftPanel>
          )}
          <Button asChild variant="outline" className="rounded-full">
            <Link href={eventsTeaser.cta.href}>
              {eventsTeaser.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

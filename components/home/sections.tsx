import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { homeContent } from "@/config/content/home";
import { siteImages } from "@/config/content/images";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { hero } = homeContent;

  return (
    <SectionShell tone="accent" className="pb-12 sm:pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading mt-5 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
            {hero.subheadline}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-sm text-foreground/80 backdrop-blur-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

        <div className="order-1 lg:order-2">
          <PlaceholderImage
            image={siteImages.hero}
            priority
            aspect="wide"
            showCaption
            className="lg:translate-y-1"
          />
        </div>
      </div>
    </SectionShell>
  );
}

export function AboutSection() {
  const { about } = homeContent;

  return (
    <SectionShell id={about.id}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <PlaceholderImage image={siteImages.about} aspect="portrait" className="mx-auto w-full max-w-md lg:max-w-none" />

        <div>
          <SectionHeading title={about.title} description={about.description} />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <SoftPanel>
              <h3 className="font-heading text-lg font-semibold">Great for</h3>
              <ul className="mt-4 space-y-3">
                {about.fitFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SoftPanel>

            <SoftPanel className="bg-muted/20">
              <h3 className="font-heading text-lg font-semibold">Less suited if you need</h3>
              <ul className="mt-4 space-y-3">
                {about.notFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X className="size-3" aria-hidden />
                    </span>
                    <span>{item}</span>
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
            <article key={item.title} className="surface-soft overflow-hidden p-0">
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
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function CtaSection() {
  const { cta } = homeContent;

  return (
    <SectionShell>
      <div className="surface-cta overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-4 text-primary-foreground/90 text-pretty">{cta.description}</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="mt-8 shrink-0 rounded-full px-6 lg:mt-0">
          <Link href={cta.href}>{cta.buttonLabel}</Link>
        </Button>
      </div>
    </SectionShell>
  );
}

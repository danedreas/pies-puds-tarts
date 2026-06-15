import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutContent } from "@/config/content/about";
import { siteImages } from "@/config/content/images";
import { siteConfig } from "@/config/site";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SectionHeading, SectionShell, SoftPanel } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description: `Learn more about ${siteConfig.name} - ${siteConfig.tagline}`,
  path: "/about",
});

export default function AboutPage() {
  const { eyebrow, title, intro, paragraphs, values, cta } = aboutContent;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: "About",
            description: intro,
            path: "/about",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <SectionShell tone="accent">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <SectionHeading eyebrow={eyebrow} title={title} description={intro} />
            <div className="mt-8 space-y-4 text-muted-foreground">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <Button asChild className="mt-8 rounded-full px-6">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>

          <PlaceholderImage image={siteImages.about} aspect="portrait" />
        </div>
      </SectionShell>

      <SectionShell tone="muted">
        <SectionHeading title={values.title} align="center" className="mx-auto" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.items.map((item) => (
            <SoftPanel key={item.title}>
              <h2 className="font-heading text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </SoftPanel>
          ))}
        </div>
      </SectionShell>
    </>
  );
}

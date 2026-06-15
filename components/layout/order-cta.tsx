import Image from "next/image";
import Link from "next/link";
import { orderCtaContent } from "@/config/content/order-cta";
import { siteImages } from "@/config/content/images";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

type OrderCtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
};

export function OrderCta(props: OrderCtaProps = {}) {
  const { title, description, buttonLabel, href } = { ...orderCtaContent, ...props };
  const image = siteImages.hero;

  return (
    <SectionShell>
      <div className="relative isolate overflow-hidden rounded-[1.75rem] shadow-lg shadow-primary/15">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="scale-105 object-cover object-center opacity-35"
          />
        </div>
        <div className="absolute inset-0 bg-primary/84" aria-hidden />
        <div className="relative z-10 px-6 py-10 text-primary-foreground sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-primary-foreground/90 text-pretty">{description}</p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 shrink-0 rounded-full px-6 lg:mt-0"
          >
            <Link href={href}>{buttonLabel}</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}

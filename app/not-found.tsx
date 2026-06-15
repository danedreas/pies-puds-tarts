import type { Metadata } from "next";
import Link from "next/link";
import { Home, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Page not found",
    description: `The page you requested could not be found on ${siteConfig.name}.`,
    path: "/404",
    noIndex: true,
  }),
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-heading text-7xl font-bold tracking-tight text-primary/20 sm:text-8xl">404</p>
      <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
        That link may be broken, or the page may have moved. Try heading back to the homepage, or
        get in touch if you need help.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full px-6">
          <Link href="/">
            <Home className="size-4" aria-hidden />
            Back to home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-6">
          <Link href="/contact">
            <Mail className="size-4" aria-hidden />
            Message Paul
          </Link>
        </Button>
      </div>

      <nav aria-label="Helpful links" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

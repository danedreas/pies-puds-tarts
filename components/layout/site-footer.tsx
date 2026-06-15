import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FooterContactList } from "@/components/contact/contact-details";
import { getVisibleLegalPages } from "@/config/legal-pages";
import { modules } from "@/config/modules";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  const legalLinks = getVisibleLegalPages();
  const { footer } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-muted/25">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="font-heading text-lg font-semibold">{siteConfig.name}</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Contact</p>
            <FooterContactList />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Legal &amp; resources</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {legalLinks.map((page) => (
                <li key={page.href}>
                  <Link href={page.href} className="hover:text-foreground">
                    {page.title}
                  </Link>
                </li>
              ))}
              {modules.cookieConsent && (
                <li>
                  <button
                    type="button"
                    data-cookie-preferences
                    className="hover:text-foreground"
                  >
                    Cookie preferences
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footer.agencyCredit.prefix}{" "}
            <a
              href={footer.agencyCredit.url}
              className="text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {footer.agencyCredit.name}
            </a>
          </p>
          <p>
            © {year} {footer.copyrightHolder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

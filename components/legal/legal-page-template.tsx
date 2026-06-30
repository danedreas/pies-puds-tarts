import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { LegalPageKey } from "@/config/legal-pages";
import { getLegalDocument, getLegalLastUpdated } from "@/config/legal-content";
import { getLegalPage } from "@/config/legal-pages";
import { modules } from "@/config/modules";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";

export function createLegalMetadata(pageKey: LegalPageKey): Metadata {
  const page = getLegalPage(pageKey);
  if (!page || (!page.minimal && !modules.fullLegalSuite)) {
    return {};
  }

  const document = getLegalDocument(pageKey);
  return createMetadata({
    title: document.title,
    description: page.description,
    path: page.href,
  });
}

export function LegalPageContent({ pageKey }: { pageKey: LegalPageKey }) {
  const page = getLegalPage(pageKey);
  if (!page) notFound();
  if (!page.minimal && !modules.fullLegalSuite) notFound();

  const document = getLegalDocument(pageKey);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title: document.title,
          description: page.description,
          path: page.href,
        })}
      />
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {document.title}
          </h1>
          <p className="mt-4 text-muted-foreground">{document.intro}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {getLegalLastUpdated()}
          </p>
        </header>

        <div className="space-y-8">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-semibold">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

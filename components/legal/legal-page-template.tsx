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
                {section.table && (
                  <>
                    <div className="space-y-3 sm:hidden">
                      {section.table.rows.map((row) => (
                        <dl
                          key={row.join("|")}
                          className="space-y-2 rounded-md border border-border p-4 text-sm"
                        >
                          {row.map((cell, index) => (
                            <div key={index}>
                              <dt className="font-semibold text-foreground">
                                {section.table?.columns[index]}
                              </dt>
                              <dd>{index === 0 ? <code>{cell}</code> : cell}</dd>
                            </div>
                          ))}
                        </dl>
                      ))}
                    </div>
                    <div className="hidden rounded-md border border-border sm:block">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-foreground">
                          <tr>
                            {section.table.columns.map((column) => (
                              <th key={column} scope="col" className="px-4 py-2 font-semibold">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")} className="border-t border-border">
                              {row.map((cell, index) => (
                                <td key={index} className="px-4 py-2 align-top">
                                  {index === 0 ? <code>{cell}</code> : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

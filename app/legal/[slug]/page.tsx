import Link from "next/link";
import {
  createLegalMetadata,
  LegalPageContent,
} from "@/components/legal/legal-page-template";

const pages = {
  "design-process": "design-process",
  "intellectual-property": "intellectual-property",
  "client-responsibilities": "client-responsibilities",
  "ai-ethics": "ai-ethics",
} as const;

type PageSlug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: PageSlug }>;
}) {
  const { slug } = await params;
  const pageKey = pages[slug];
  return createLegalMetadata(pageKey);
}

export default async function LegalSlugPage({
  params,
}: {
  params: Promise<{ slug: PageSlug }>;
}) {
  const { slug } = await params;
  const pageKey = pages[slug];

  if (!pageKey) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p>Page not found.</p>
        <Link href="/" className="mt-4 inline-block underline">
          Back to home
        </Link>
      </div>
    );
  }

  return <LegalPageContent pageKey={pageKey} />;
}

import {
  createLegalMetadata,
  LegalPageContent,
} from "@/components/legal/legal-page-template";

export const metadata = createLegalMetadata("cookies");

export default function CookiesPage() {
  return <LegalPageContent pageKey="cookies" />;
}

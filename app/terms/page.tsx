import {
  createLegalMetadata,
  LegalPageContent,
} from "@/components/legal/legal-page-template";

export const metadata = createLegalMetadata("terms");

export default function TermsPage() {
  return <LegalPageContent pageKey="terms" />;
}

import {
  createLegalMetadata,
  LegalPageContent,
} from "@/components/legal/legal-page-template";

export const metadata = createLegalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPageContent pageKey="privacy" />;
}

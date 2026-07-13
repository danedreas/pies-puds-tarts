import {
  createLegalMetadata,
  LegalPageContent,
} from "@/components/legal/legal-page-template";

export const metadata = createLegalMetadata("payments");

export default function PaymentsPage() {
  return <LegalPageContent pageKey="payments" />;
}

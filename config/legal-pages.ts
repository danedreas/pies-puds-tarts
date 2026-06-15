import { siteConfig } from "@/config/site";
import { modules } from "@/config/modules";

export type LegalPageKey =
  | "privacy"
  | "terms"
  | "cookies"
  | "design-process"
  | "intellectual-property"
  | "client-responsibilities"
  | "ai-ethics";

export type LegalPage = {
  key: LegalPageKey;
  title: string;
  href: string;
  description: string;
  /** Minimal pages ship with every build; full suite is optional */
  minimal: boolean;
};

export const legalPages: LegalPage[] = [
  {
    key: "privacy",
    title: "Privacy policy",
    href: "/privacy",
    description: "How we collect, use, and protect personal data.",
    minimal: true,
  },
  {
    key: "terms",
    title: "Terms of service",
    href: "/terms",
    description: "Terms governing use of this website and our services.",
    minimal: false,
  },
  {
    key: "cookies",
    title: "Cookie policy",
    href: "/cookies",
    description: "How we use cookies and similar technologies.",
    minimal: true,
  },
  {
    key: "design-process",
    title: "Design process",
    href: "/legal/design-process",
    description: "How we work together on design and delivery.",
    minimal: false,
  },
  {
    key: "intellectual-property",
    title: "Intellectual property",
    href: "/legal/intellectual-property",
    description: "Ownership and usage of creative work.",
    minimal: false,
  },
  {
    key: "client-responsibilities",
    title: "Client responsibilities",
    href: "/legal/client-responsibilities",
    description: "What we need from you for a smooth project.",
    minimal: false,
  },
  {
    key: "ai-ethics",
    title: "AI ethics & usage",
    href: "/legal/ai-ethics",
    description: "How AI tools may be used in our workflow.",
    minimal: false,
  },
];

export function getVisibleLegalPages(): LegalPage[] {
  return legalPages.filter((page) => page.minimal || modules.fullLegalSuite);
}

export function getLegalPage(key: LegalPageKey): LegalPage | undefined {
  return legalPages.find((page) => page.key === key);
}

/** Template variables available in legal copy */
export function legalVariables() {
  const { contact, legal, name, legalName, url } = siteConfig;
  return {
    siteName: name,
    legalName,
    siteUrl: url,
    contactEmail: contact.email,
    contactPhone: contact.phone,
    dataController: legal.dataController,
    dpoEmail: legal.dpoEmail,
    registeredOffice: legal.registeredOffice,
    companyNumber: legal.companyNumber,
    lastUpdated: legal.lastUpdated,
    address: [
      contact.address.line1,
      contact.address.city,
      contact.address.region,
      contact.address.postcode,
      contact.address.country,
    ]
      .filter(Boolean)
      .join(", "),
  };
}

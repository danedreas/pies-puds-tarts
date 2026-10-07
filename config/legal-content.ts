import type { LegalPageKey } from "@/config/legal-pages";
import { legalVariables } from "@/config/legal-pages";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  /** Optional table shown after the paragraphs */
  table?: { columns: string[]; rows: string[][] };
};

type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

function v() {
  return legalVariables();
}

const documents: Record<LegalPageKey, LegalDocument> = {
  privacy: {
    title: "Privacy policy",
    intro:
      "This policy explains how {siteName} ({legalName}) collects, uses, and protects personal data when you use {siteUrl} or contact us.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "The data controller is {dataController}. For privacy enquiries, contact {dpoEmail}.",
          "Address: {registeredOffice}.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "Contact form: your name, email address, and message, plus your phone number, company name, and enquiry type if you choose to give them. If you pre-order, this includes the items, market, and collection details you send us.",
          "Email and phone: anything you send us directly, such as order details or questions.",
          "Website analytics: we use Vercel Web Analytics to count page views and see which pages are popular. It does not use cookies, does not store anything on your device, and does not identify you personally.",
          "Server logs: our hosting provider keeps short-lived technical logs (such as IP address, browser type, and the page requested) to keep the site secure and working.",
          "Online card payment is currently paused. If we turn it back on, card details will be handled by our payment provider, Stripe, and never stored on our servers.",
        ],
      },
      {
        heading: "How and why we use it",
        paragraphs: [
          "To reply to enquiries and arrange pre-orders and collection. Our lawful basis is taking steps at your request before entering into a contract, and performing that contract.",
          "To keep records of orders and payments. Our lawful basis is legal obligation (for example, tax and accounting rules).",
          "To understand how the website is used and keep it secure. Our lawful basis is our legitimate interest in running a working, secure website.",
          "We do not sell your data, send marketing emails without your permission, or use your data for automated decision-making.",
        ],
      },
      {
        heading: "Who we share it with",
        paragraphs: [
          "We only share data with service providers who help us run the business and act on our instructions:",
          "Vercel (website hosting and analytics), Brevo (sends contact form messages to us by email), and our email providers (Microsoft Outlook and Zoho Mail).",
          "Our website administrator receives copies of contact form messages to check that they are being delivered correctly. They do not use this information for any other purpose.",
          "Our food hygiene rating badge is loaded from the Food Standards Agency (ratings.food.gov.uk), so your browser connects to their website to display it. The badge does not set cookies.",
          "Some of these providers are based outside the UK, including in the US and EU. Where data leaves the UK, it is protected by appropriate safeguards such as UK adequacy regulations, the UK Extension to the EU-US Data Privacy Framework, or standard contractual clauses.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "Enquiries that do not lead to an order: up to 2 years after we last hear from you.",
          "Order and payment records: 6 years, as required for tax purposes.",
          "Server logs are deleted automatically by our hosting provider, usually within a few days.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under UK GDPR, you can ask to see, correct, or delete your personal data, ask us to restrict or stop using it, or ask for a copy to take elsewhere.",
          "Email {dpoEmail} to make a request. We will reply within one month.",
          "If you are unhappy with how we have handled your data, you can complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy from time to time. The date at the top of the page shows when it was last changed.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of service",
    intro: "These terms govern your use of {siteUrl} operated by {legalName}.",
    sections: [
      {
        heading: "Use of the website",
        paragraphs: [
          "You agree to use this website lawfully and not to attempt to disrupt its operation or access restricted areas.",
        ],
      },
      {
        heading: "Services and enquiries",
        paragraphs: [
          "Information on this website is provided for general guidance. A binding agreement is formed only when both parties confirm scope, price, and delivery in writing.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, {legalName} is not liable for indirect or consequential loss arising from use of this website.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: ["These terms are governed by the laws of England and Wales."],
      },
    ],
  },
  cookies: {
    title: "Cookie policy",
    intro: "This policy explains how {siteName} uses cookies and similar technologies on {siteUrl}.",
    sections: [
      {
        heading: "Our approach",
        paragraphs: [
          "We keep things simple. We do not use advertising or tracking cookies, and we do not set any cookies for normal visitors to this website.",
        ],
      },
      {
        heading: "What we store on your device",
        paragraphs: [
          "When you choose an option in our cookie banner, we save your choice in your browser's local storage so we don't ask you again. This is strictly necessary and contains no personal information.",
        ],
        table: {
          columns: ["Name", "Type", "Purpose", "Duration"],
          rows: [
            [
              "cookie-consent",
              "Local storage (strictly necessary)",
              "Remembers whether you accepted or rejected optional cookies",
              "Until you clear your browser data",
            ],
          ],
        },
      },
      {
        heading: "Analytics",
        paragraphs: [
          "We use Vercel Web Analytics to count visits and see which pages are popular. It does not use cookies or store anything on your device, and it does not track you across other websites.",
        ],
      },
      {
        heading: "If this changes",
        paragraphs: [
          "If we ever add tools that use non-essential cookies, we will ask for your consent first through the cookie banner and update this policy. You can change your choice at any time via Cookie preferences in the footer.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can also clear or block cookies and local storage through your browser settings.",
        ],
      },
    ],
  },
  payments: {
    title: "Payments & refunds",
    intro:
      "This page explains how pre-order payments and collection work for {siteName}.",
    sections: [
      {
        heading: "How payment works",
        paragraphs: [
          "Online card checkout is paused for now. Choose a market (or unit pickup), select your items on the order page, then contact us with your selection. We'll confirm availability, payment, and collection details by email or phone.",
          "On market day you can also buy from the stall if something is still available.",
        ],
      },
      {
        heading: "Pricing and availability",
        paragraphs: [
          "Prices are shown in pounds sterling (GBP) on the order page. We bake to the pre-orders arranged for each market, so items are reserved for the market date you select.",
          "Please order at least 48 hours before the market so we have time to pack. Pre-order options only show markets inside that window.",
        ],
      },
      {
        heading: "Collection",
        paragraphs: [
          "Orders are for collection only at the market (or other location) you arrange with us. If you cannot collect as planned, contact us as soon as possible at {contactEmail}.",
        ],
      },
      {
        heading: "Cancellations and refunds",
        paragraphs: [
          "Because pre-orders are perishable food prepared for a specific market day, we generally cannot offer refunds for change of mind after payment has been taken.",
          "If we cancel a market, cannot fulfil your order, or take payment in error, we will refund you in full or offer an alternative collection where practical.",
          "For refund requests or payment problems, email {contactEmail} with your name and market date.",
        ],
      },
    ],
  },
  "design-process": {
    title: "Design process",
    intro: "How we work together on design and delivery for projects with {siteName}.",
    sections: [
      {
        heading: "Kickoff",
        paragraphs: [
          "We start with a short call to confirm goals, audience, content, and timeline.",
        ],
      },
      {
        heading: "Build and review",
        paragraphs: [
          "We build against agreed scope and share progress for focused review at key milestones.",
        ],
      },
      {
        heading: "Launch",
        paragraphs: [
          "After final approval, we deploy to production, connect your domain, and hand over essentials for ongoing use.",
        ],
      },
    ],
  },
  "intellectual-property": {
    title: "Intellectual property",
    intro: "Ownership and usage of creative work delivered by {legalName}.",
    sections: [
      {
        heading: "Client materials",
        paragraphs: [
          "You warrant that content you supply does not infringe third-party rights and that you have permission to use it.",
        ],
      },
      {
        heading: "Deliverables",
        paragraphs: [
          "Upon full payment, agreed website deliverables are assigned or licensed to you as set out in your project agreement.",
        ],
      },
      {
        heading: "Portfolio use",
        paragraphs: [
          "Unless agreed otherwise, we may showcase completed work in our portfolio and marketing materials.",
        ],
      },
    ],
  },
  "client-responsibilities": {
    title: "Client responsibilities",
    intro: "What we need from you for a smooth project with {siteName}.",
    sections: [
      {
        heading: "Content and feedback",
        paragraphs: [
          "Provide accurate content, brand assets, and timely feedback within agreed review windows.",
        ],
      },
      {
        heading: "Access",
        paragraphs: [
          "Grant access to domain, hosting, or third-party accounts when required for setup and launch.",
        ],
      },
      {
        heading: "Approvals",
        paragraphs: [
          "Sign off key milestones promptly so delivery stays on schedule.",
        ],
      },
    ],
  },
  "ai-ethics": {
    title: "AI ethics & usage",
    intro: "How AI tools may be used in our workflow at {legalName}.",
    sections: [
      {
        heading: "Assistive use",
        paragraphs: [
          "We may use AI tools to assist with research, drafting, code generation, and quality checks under human review.",
        ],
      },
      {
        heading: "Transparency",
        paragraphs: [
          "We do not present AI-generated work as human-created client testimonials or factual claims without verification.",
        ],
      },
      {
        heading: "Data handling",
        paragraphs: [
          "Client confidential information is not submitted to public AI services without explicit agreement.",
        ],
      },
    ],
  },
};

function interpolate(text: string): string {
  const vars = v();
  return text.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key as keyof typeof vars];
    return value != null ? String(value) : `{${key}}`;
  });
}

export function getLegalDocument(key: LegalPageKey): LegalDocument {
  const doc = documents[key];
  return {
    title: doc.title,
    intro: interpolate(doc.intro),
    sections: doc.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs.map(interpolate),
      table: section.table,
    })),
  };
}

export function getLegalLastUpdated(): string {
  return v().lastUpdated;
}

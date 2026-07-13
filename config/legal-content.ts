import type { LegalPageKey } from "@/config/legal-pages";
import { legalVariables } from "@/config/legal-pages";

type LegalSection = {
  heading: string;
  paragraphs: string[];
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
      "This policy explains how {siteName} ({legalName}) collects, uses, and protects personal data when you use {siteUrl}.",
    sections: [
      {
        heading: "Data controller",
        paragraphs: [
          "The data controller is {dataController}. For privacy enquiries, contact {dpoEmail}.",
          "Registered office: {registeredOffice}.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "When you contact us, we may collect your name, email address, phone number, company name, and the details you provide in your message.",
          "When you place a pre-order, we collect the order details you choose and payment confirmation from our payment provider. Card details are handled by Stripe and are not stored on our servers.",
          "We may collect technical data such as IP address and browser type for security and analytics when you consent to cookies.",
        ],
      },
      {
        heading: "How we use your data",
        paragraphs: [
          "We use contact form data to respond to enquiries and provide services you request.",
          "We use pre-order and payment data to fulfil your order, send confirmation emails (including your collection code), and verify collection at the market.",
          "We process data on the lawful bases of consent, contract, and legitimate interests where appropriate under UK GDPR.",
        ],
      },
      {
        heading: "Retention and sharing",
        paragraphs: [
          "We retain enquiry and order data only as long as needed for the purpose collected, unless a longer period is required by law.",
          "We use trusted processors such as hosting, email (Resend), and payment (Stripe) providers. Data may be processed in the UK, EEA, or other countries with appropriate safeguards.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You may request access, correction, deletion, restriction, or portability of your personal data, and object to certain processing.",
          "Contact {dpoEmail} to exercise your rights. You may also complain to the ICO if you believe your data has been handled unlawfully.",
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
        heading: "Essential cookies",
        paragraphs: [
          "Essential cookies are required for basic site functionality, such as security and remembering cookie preferences.",
        ],
      },
      {
        heading: "Analytics cookies",
        paragraphs: [
          "With your consent, we may use analytics cookies to understand how visitors use the site. You can change your preference at any time via Cookie preferences in the footer.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can also manage cookies through your browser settings. Blocking essential cookies may affect site functionality.",
        ],
      },
    ],
  },
  payments: {
    title: "Payments & refunds",
    intro:
      "This page explains how online pre-order payments work for {siteName}, including collection and refunds.",
    sections: [
      {
        heading: "How payment works",
        paragraphs: [
          "Pre-orders are paid online by card through Stripe Checkout, embedded on our website. You choose a market collection date, select your items, and pay before collection.",
          "After a successful payment you receive a confirmation email with a unique collection code. Quote that code at the stall so we can match your order. We receive the same code for verification.",
        ],
      },
      {
        heading: "Pricing and availability",
        paragraphs: [
          "Prices are shown in pounds sterling (GBP) on the order page. We bake to the pre-orders received for each market, so items are reserved for the market date you select.",
          "Please order at least 48 hours before the market so we have time to pack. Pre-order options only show markets inside that window.",
        ],
      },
      {
        heading: "Collection",
        paragraphs: [
          "Orders are for collection only at the market (or other location) you choose at checkout. Bring your collection code. If you cannot collect as planned, contact us as soon as possible at {contactEmail}.",
        ],
      },
      {
        heading: "Cancellations and refunds",
        paragraphs: [
          "Because pre-orders are perishable food prepared for a specific market day, we generally cannot offer refunds for change of mind after payment.",
          "If we cancel a market, cannot fulfil your order, or take payment in error, we will refund you in full to the original payment method or offer an alternative collection where practical.",
          "If your card payment fails or is declined, no charge is taken and you can try again from checkout.",
          "For refund requests or payment problems, email {contactEmail} with your name, collection code (if you have one), and market date.",
        ],
      },
      {
        heading: "Payment provider",
        paragraphs: [
          "Card payments are processed by Stripe. We do not store full card numbers on our servers. Stripe's terms and privacy notices also apply to the payment step.",
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
    })),
  };
}

export function getLegalLastUpdated(): string {
  return v().lastUpdated;
}

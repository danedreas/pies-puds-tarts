import { Resend } from "resend";
import { siteConfig } from "@/config/site";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  message: string;
};

export async function sendContactEmail(payload: ContactEmailPayload) {
  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Contact Form <onboarding@resend.dev>`;

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Project type: ${payload.projectType}`,
    "",
    payload.message,
  ].filter(Boolean);

  return resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `[${siteConfig.name}] New enquiry from ${payload.name}`,
    text: lines.join("\n"),
  });
}

export async function sendPaymentNotificationEmail(payload: {
  customerEmail: string;
  customerName?: string;
  orderSummary: string;
  collectionSummary: string;
  amountTotal: number;
  currency: string;
}) {
  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Payments <onboarding@resend.dev>`;

  const amount = (payload.amountTotal / 100).toFixed(2);

  return resend.emails.send({
    from,
    to,
    subject: `[${siteConfig.name}] Pre-order for ${payload.collectionSummary}`,
    text: [
      `Collection: ${payload.collectionSummary}`,
      "",
      `Order: ${payload.orderSummary}`,
      "",
      `Amount: ${payload.currency.toUpperCase()} ${amount}`,
      payload.customerName ? `Customer: ${payload.customerName}` : null,
      `Customer email: ${payload.customerEmail}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

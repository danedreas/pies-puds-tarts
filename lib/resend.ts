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

export type PreorderConfirmationEmailPayload = {
  customerEmail: string;
  customerName?: string;
  orderSummary: string;
  collectionSummary: string;
  collectionCode: string;
  amountTotal: number;
  currency: string;
};

function formatOrderAmount(amountTotal: number, currency: string): string {
  return `${currency.toUpperCase()} ${(amountTotal / 100).toFixed(2)}`;
}

async function sendOwnerPreorderEmail(payload: PreorderConfirmationEmailPayload) {
  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? `Payments <onboarding@resend.dev>`;
  const amount = formatOrderAmount(payload.amountTotal, payload.currency);

  return resend.emails.send({
    from,
    to,
    subject: `[${siteConfig.name}] Pre-order ${payload.collectionCode} · ${payload.collectionSummary}`,
    text: [
      `Collection code: ${payload.collectionCode}`,
      "",
      "Ask the customer for this code when they collect.",
      "",
      `Collection: ${payload.collectionSummary}`,
      "",
      `Order: ${payload.orderSummary}`,
      "",
      `Amount: ${amount}`,
      payload.customerName ? `Customer: ${payload.customerName}` : null,
      `Customer email: ${payload.customerEmail}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

async function sendCustomerPreorderEmail(payload: PreorderConfirmationEmailPayload) {
  const resend = getResend();
  const from = process.env.CONTACT_FROM_EMAIL ?? `Payments <onboarding@resend.dev>`;
  const amount = formatOrderAmount(payload.amountTotal, payload.currency);
  const greeting = payload.customerName ? `Hi ${payload.customerName},` : "Hi,";

  return resend.emails.send({
    from,
    to: payload.customerEmail,
    subject: `Your ${siteConfig.name} pre-order · code ${payload.collectionCode}`,
    text: [
      greeting,
      "",
      "Thanks for your pre-order. We'll have it ready for collection.",
      "",
      `Your collection code: ${payload.collectionCode}`,
      "",
      "Please quote this code at the stall when you collect your order.",
      "",
      `Collection: ${payload.collectionSummary}`,
      `Order: ${payload.orderSummary}`,
      `Amount paid: ${amount}`,
      "",
      `If you have any questions, reply to this email or contact us at ${siteConfig.contact.email}.`,
      "",
      siteConfig.name,
    ].join("\n"),
  });
}

/**
 * Sends pre-order confirmation to the customer and a matching notice to the stall owner.
 * Both emails include the same collection auth code.
 */
export async function sendPreorderConfirmationEmails(payload: PreorderConfirmationEmailPayload) {
  const results = await Promise.allSettled([
    sendCustomerPreorderEmail(payload),
    sendOwnerPreorderEmail(payload),
  ]);

  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    const messages = failures
      .map((result) => (result.status === "rejected" ? String(result.reason) : ""))
      .filter(Boolean)
      .join("; ");
    throw new Error(`Pre-order confirmation email failed: ${messages}`);
  }

  return results;
}

/** @deprecated Prefer sendPreorderConfirmationEmails */
export async function sendPaymentNotificationEmail(payload: PreorderConfirmationEmailPayload) {
  return sendPreorderConfirmationEmails(payload);
}

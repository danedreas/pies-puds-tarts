import { siteConfig } from "@/config/site";

type EmailRecipient = {
  email: string;
  name?: string;
};

type SendEmailOptions = {
  from: string;
  to: string;
  cc?: string[];
  replyTo?: string;
  subject: string;
  text: string;
};

function getBrevoApiKey(): string {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured");
  }
  return apiKey;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY);
}

function parseEmailAddress(value: string): EmailRecipient {
  const match = value.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) {
    return {
      name: match[1].trim().replace(/^"|"$/g, ""),
      email: match[2].trim(),
    };
  }

  return { email: value.trim() };
}

function toRecipients(emails: string[]): EmailRecipient[] {
  return emails.map((email) => ({ email }));
}

async function sendEmail(options: SendEmailOptions) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": getBrevoApiKey(),
    },
    body: JSON.stringify({
      sender: parseEmailAddress(options.from),
      to: toRecipients([options.to]),
      cc: options.cc?.length ? toRecipients(options.cc) : undefined,
      replyTo: options.replyTo ? { email: options.replyTo } : undefined,
      subject: options.subject,
      textContent: options.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo email failed (${response.status}): ${body}`);
  }

  return response.json();
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  message: string;
};

function getContactToEmail(): string {
  return process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
}

function getContactCcEmails(): string[] {
  const fromEnv = process.env.CONTACT_CC_EMAILS?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (fromEnv?.length) {
    return fromEnv;
  }

  return [...siteConfig.contact.formCc];
}

function getContactFromEmail(): string {
  return (
    process.env.CONTACT_FROM_EMAIL ??
    `${siteConfig.name} <noreply@andreaslaust.com>`
  );
}

/** Replies to outbound emails (pre-order confirmations, etc.) when not set per message */
function getContactReplyToEmail(): string {
  return process.env.CONTACT_REPLY_TO_EMAIL ?? siteConfig.contact.email;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const to = getContactToEmail();
  const cc = getContactCcEmails();
  const from = getContactFromEmail();

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.phone ? `Phone: ${payload.phone}` : null,
    `Project type: ${payload.projectType}`,
    "",
    payload.message,
  ].filter(Boolean);

  return sendEmail({
    from,
    to,
    cc,
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
  const to = getContactToEmail();
  const from = getContactFromEmail();
  const amount = formatOrderAmount(payload.amountTotal, payload.currency);

  return sendEmail({
    from,
    to,
    replyTo: payload.customerEmail,
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
  const from = getContactFromEmail();
  const amount = formatOrderAmount(payload.amountTotal, payload.currency);
  const greeting = payload.customerName ? `Hi ${payload.customerName},` : "Hi,";

  return sendEmail({
    from,
    to: payload.customerEmail,
    replyTo: getContactReplyToEmail(),
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

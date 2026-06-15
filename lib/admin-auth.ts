import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { isBlobConfigured } from "@/lib/site-content-shared";

const COOKIE_NAME = "admin_session";

function getExpectedSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return null;
  }

  return createHmac("sha256", password).update("pies-puds-tarts-admin").digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && isBlobConfigured());
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = getExpectedSessionToken();
  if (!expected) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(session), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getExpectedSessionToken();
  if (!expected || !password) {
    return false;
  }

  const attempt = createHmac("sha256", password).update("pies-puds-tarts-admin").digest("hex");

  try {
    return timingSafeEqual(Buffer.from(attempt), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function getAdminSessionCookieValue(): string {
  const expected = getExpectedSessionToken();
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  return expected;
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

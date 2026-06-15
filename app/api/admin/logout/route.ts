import { NextResponse } from "next/server";
import { getAdminCookieName, getAdminCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getAdminCookieName(), "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });

  return response;
}

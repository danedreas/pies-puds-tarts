import { NextResponse } from "next/server";
import { modules } from "@/config/modules";
import { getAdminCookieName, getAdminCookieOptions } from "@/lib/admin-auth";

export async function POST() {
  if (!modules.admin) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(getAdminCookieName(), "", {
    ...getAdminCookieOptions(),
    maxAge: 0,
  });

  return response;
}

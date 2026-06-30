import { NextResponse } from "next/server";
import { z } from "zod";
import { modules } from "@/config/modules";
import {
  getAdminCookieName,
  getAdminCookieOptions,
  getAdminSessionCookieValue,
  verifyAdminPassword,
} from "@/lib/admin-auth";

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!modules.admin) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const body = loginSchema.parse(await request.json());

    if (!verifyAdminPassword(body.password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      getAdminCookieName(),
      getAdminSessionCookieValue(),
      getAdminCookieOptions(),
    );

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

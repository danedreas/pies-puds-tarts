import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  readSiteContent,
  siteContentSchema,
  writeSiteContent,
} from "@/lib/site-content";
import { SITE_CONTENT_CACHE_TAG } from "@/lib/site-content-shared";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const parsed = siteContentSchema.parse(body);
    const saved = await writeSiteContent(parsed);
    revalidateTag(SITE_CONTENT_CACHE_TAG, "seconds");

    return NextResponse.json(saved);
  } catch (error) {
    console.error("Admin content save failed:", error);
    const message =
      error instanceof Error && error.message ? error.message : "Unable to save content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

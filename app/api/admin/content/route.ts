import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { modules } from "@/config/modules";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  formatSiteContentValidationError,
  SITE_CONTENT_CACHE_TAG,
  type SiteContent,
  validateSiteContent,
} from "@/lib/site-content-shared";
import { readSiteContent, writeSiteContent } from "@/lib/site-content";

const REVALIDATED_PATHS = ["/", "/events", "/order"] as const;

function revalidateSiteContent() {
  revalidateTag(SITE_CONTENT_CACHE_TAG, "seconds");

  for (const path of REVALIDATED_PATHS) {
    revalidatePath(path);
  }
}

export async function GET() {
  if (!modules.admin) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!modules.admin) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    const parsed = validateSiteContent(body as SiteContent);
    const saved = await writeSiteContent(parsed);
    revalidateSiteContent();

    return NextResponse.json(saved);
  } catch (error) {
    console.error("Admin content save failed:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: formatSiteContentValidationError(error) },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error && error.message ? error.message : "Unable to save content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

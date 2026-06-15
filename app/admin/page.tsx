import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/admin-editor";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin",
  description: "Manage market dates and menu content.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">Admin not configured</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Add <code className="rounded bg-muted px-1 py-0.5">ADMIN_PASSWORD</code> in Vercel and
          connect your Blob store to this project (you should see{" "}
          <code className="rounded bg-muted px-1 py-0.5">BLOB_STORE_ID</code>), then redeploy.
        </p>
      </div>
    );
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminEditor />;
}

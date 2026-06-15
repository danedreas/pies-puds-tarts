import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin login",
  description: "Sign in to manage site content.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-heading text-3xl font-bold">Admin login</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Manage market dates and the pre-order menu. Changes go live as soon as you save.
      </p>
      <AdminLoginForm className="mt-8" />
    </div>
  );
}

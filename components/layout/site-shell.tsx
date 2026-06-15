import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { CookieBanner } from "@/components/optional/cookie-banner";
import { GoogleTagManager } from "@/components/optional/google-tag-manager";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <GoogleTagManager />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

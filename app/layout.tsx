import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { siteConfig } from "@/config/site";
import { themeTokens, themeTokensToCssVars } from "@/config/theme";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/seo";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...createMetadata({
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
      style={themeTokensToCssVars(themeTokens)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

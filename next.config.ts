import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [{ source: "/events", destination: "/markets", permanent: true }];
  },
  /**
   * Business card QR target. Rewrite (not redirect) so the order page renders
   * at /QR and Vercel Analytics logs it as its own page view. The card prints
   * uppercase so the QR fits 25x25; both spellings are covered.
   */
  async rewrites() {
    return [
      { source: "/qr", destination: "/order" },
      { source: "/QR", destination: "/order" },
    ];
  },
  async headers() {
    const noIndex = [{ key: "X-Robots-Tag", value: "noindex" }];
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Canonical already points to /order; keep the QR alias out of search
      { source: "/qr", headers: noIndex },
      { source: "/QR", headers: noIndex },
    ];
  },
};

export default nextConfig;

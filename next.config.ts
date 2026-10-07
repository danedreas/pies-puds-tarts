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
    return [
      { source: "/events", destination: "/markets", permanent: true },
      // Short QR code target - temporary so the destination can change later.
      // Uppercase variant lets the QR use compact alphanumeric mode (25x25).
      { source: "/qr", destination: "/order", permanent: false },
      { source: "/QR", destination: "/order", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import { otherPagesEnabled } from "./src/lib/site-launch";

const pausedPages = otherPagesEnabled
  ? []
  : [
      "/about",
      "/about/:path*",
      "/our-services",
      "/our-services/:path*",
      "/packages",
      "/packages/:path*",
      "/contact",
      "/contact/:path*",
      "/tourism",
      "/tourism/:path*",
      "/hotels",
      "/hotels/:path*",
    ].map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: otherPagesEnabled ? "/our-services" : "/",
        permanent: false,
      },
      ...pausedPages,
    ];
  },
};

export default nextConfig;

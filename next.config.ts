import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      ...["services", "work", "about", "contact"].map(page => ({ source: `/${page}`, destination: `/en/${page}`, permanent: true })),
      { source: "/work/:slug", destination: "/en/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

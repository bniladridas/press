import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/press",
  assetPrefix: "/press",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isCapacitor = process.env.CAPACITOR === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isCapacitor ? "" : "/press",
  assetPrefix: isCapacitor ? "" : "/press",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isCapacitor ? "" : "/press",
  },
};

export default nextConfig;

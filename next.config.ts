import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/itzfizz-hero-scroll",
  assetPrefix: "/itzfizz-hero-scroll",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

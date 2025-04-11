import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactStrictMode: true,
  distDir: "build",
};

export default nextConfig;

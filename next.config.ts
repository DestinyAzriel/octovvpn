import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output bundles only the files needed to run the server
  // This is required for Hostinger Node.js hosting deployments
  output: "standalone",
};

export default nextConfig;

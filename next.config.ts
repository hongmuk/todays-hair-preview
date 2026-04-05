import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/todays-hair-preview",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

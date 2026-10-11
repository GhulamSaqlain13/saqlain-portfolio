import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env["NEXT_PUBLIC_BASE_PATH"] || "",
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;

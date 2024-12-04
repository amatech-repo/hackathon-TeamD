import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src", "server"],
  },
};

export default nextConfig;

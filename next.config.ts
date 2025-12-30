import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TMDB_BASE_URL: process.env.TMDB_BASE_URL ?? "",
    NEXT_PUBLIC_MY_API_KEY: process.env.NEXT_PUBLIC_MY_API_KEY ?? "",
  },
};

export default nextConfig;

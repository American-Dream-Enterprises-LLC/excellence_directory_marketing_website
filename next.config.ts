import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/article-art/**",
      },
      {
        pathname: "/design/**",
      },
      {
        pathname: "/featured-organizations/**",
      },
      {
        pathname: "/partners/**",
      },
      {
        pathname: "/platforms/**",
      },
    ],
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

import { publicSurface } from "@/content/public-surface";
import { machinePaths, getAbsoluteUrl } from "@/content/site-urls";

export default function robots(): MetadataRoute.Robots {
  const blogPaths = [machinePaths.brandBlogArchive, "/blog/", "/blogs/"];
  const publicAllows = [
    "/",
    machinePaths.articleArchive,
    "/why-excellence/",
    machinePaths.copyJson,
    machinePaths.llms,
    machinePaths.articleIndex,
    machinePaths.rss,
    "/articles/",
    machinePaths.search,
    ...(publicSurface.showBrandBlogLinks ? blogPaths : []),
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: publicAllows,
        disallow: publicSurface.showBrandBlogLinks ? undefined : blogPaths,
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "CCBot",
        ],
        allow: publicAllows,
        disallow: publicSurface.showBrandBlogLinks ? undefined : blogPaths,
      },
    ],
    sitemap: getAbsoluteUrl(machinePaths.sitemap),
  };
}

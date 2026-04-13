import type { MetadataRoute } from "next";

import { machinePaths, getAbsoluteUrl } from "@/content/site-urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          machinePaths.articleArchive,
          "/blog/",
          machinePaths.copyJson,
          machinePaths.llms,
          machinePaths.articleIndex,
          machinePaths.rss,
          "/articles/",
          machinePaths.search,
        ],
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
        allow: [
          "/",
          machinePaths.articleArchive,
          "/blog/",
          machinePaths.copyJson,
          machinePaths.llms,
          machinePaths.articleIndex,
          machinePaths.rss,
          "/articles/",
          machinePaths.search,
        ],
      },
    ],
    sitemap: getAbsoluteUrl(machinePaths.sitemap),
  };
}

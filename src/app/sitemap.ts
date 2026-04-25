import type { MetadataRoute } from "next";

import { brandBlogPosts } from "@/content/brand-blog";
import { deskNavigation, landingPageVariants } from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getArticlePath,
  getArticleJsonPath,
  getBrandBlogPath,
  getDeskPath,
  machinePaths,
} from "@/content/site-urls";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(machinePaths.copyJson),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: getAbsoluteUrl(machinePaths.articleArchive),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: getAbsoluteUrl(machinePaths.brandBlogArchive),
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: getAbsoluteUrl(machinePaths.articleIndex),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: getAbsoluteUrl(machinePaths.llms),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: getAbsoluteUrl(machinePaths.rss),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...deskNavigation.desks.map((desk) => ({
      url: getAbsoluteUrl(getDeskPath(desk.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...landingPageVariants.map((variant) => ({
      url: getAbsoluteUrl(getArticlePath(variant.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...brandBlogPosts.map((post) => ({
      url: getAbsoluteUrl(getBrandBlogPath(post.slug)),
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...landingPageVariants.map((variant) => ({
      url: getAbsoluteUrl(getArticleJsonPath(variant.slug)),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}

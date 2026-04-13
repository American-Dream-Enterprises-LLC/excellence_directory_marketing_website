const productionSiteUrl = "https://info.excellencedirectory.com";

export const machinePaths = {
  articleArchive: "/blog",
  articleIndex: "/articles/index.json",
  copyJson: "/copy.json",
  llms: "/llms.txt",
  rss: "/rss.xml",
  search: "/search",
  sitemap: "/sitemap.xml",
} as const;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl;
}

export function getAbsoluteUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getArticlePath(slug: string) {
  return `/blog/${slug}`;
}

export function getDeskPath(slug: string) {
  return `/${slug}`;
}

export function getArticleJsonPath(slug: string) {
  return `/articles/${slug}.json`;
}

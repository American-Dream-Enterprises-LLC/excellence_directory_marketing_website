import "server-only";

import { getArticleArt } from "@/content/article-art";
import { brandBlogPosts, getBrandBlogReadTimeLabel } from "@/content/brand-blog";
import {
  copyUpdatedAt,
  deskNavigation,
  getArticleReadTimeMinutes,
  getCanonicalVariant,
  getDeskForVariant,
  getInlineBlogCta,
  getRelatedVariants,
  homePageCopy,
  landingPageVariants,
  rawSiteCopy,
  siteFrame,
  type LandingPageVariant,
} from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getArticleJsonPath,
  getArticlePath,
  getBrandBlogPath,
  getDeskPath,
  getSiteUrl,
  machinePaths,
} from "@/content/site-urls";

export const machineJsonHeaders = {
  "access-control-allow-origin": "*",
  "cache-control": "public, max-age=600",
  "content-type": "application/json; charset=utf-8",
};

export const machineTextHeaders = {
  "access-control-allow-origin": "*",
  "cache-control": "public, max-age=600",
  "content-type": "text/plain; charset=utf-8",
};

function buildArticleSummary(variant: LandingPageVariant) {
  const desk = getDeskForVariant(variant);
  const art = getArticleArt(variant.slug);

  return {
    category: desk?.label ?? null,
    headline: variant.headline,
    image: art?.available
      ? {
          alt: art.alt,
          url: getAbsoluteUrl(art.publicImagePath),
        }
      : null,
    instantAnswer: variant.thoughtMatch.instantAnswer,
    jsonUrl: getAbsoluteUrl(getArticleJsonPath(variant.slug)),
    legacySlugs: variant.legacySlugs,
    queryVariants: variant.thoughtMatch.queryVariants,
    readTimeMinutes: getArticleReadTimeMinutes(variant),
    slug: variant.slug,
    subheadline: variant.subheadline,
    supportingLine: variant.supportingLine ?? null,
    updatedAt: copyUpdatedAt,
    url: getAbsoluteUrl(getArticlePath(variant.slug)),
  };
}

function buildArticleRecord(variant: LandingPageVariant) {
  const desk = getDeskForVariant(variant);

  return {
    ...buildArticleSummary(variant),
    articleBody: variant.articleBody,
    audienceLabel: variant.audienceLabel,
    ctas: {
      primary: variant.primaryCta,
      secondary: variant.secondaryCta,
    },
    faq: variant.faq,
    fitSignals: variant.fitSignals,
    inlineBlogCta: getInlineBlogCta(variant),
    scripture: variant.scripture ?? null,
    sourceHeading: variant.sourceHeading,
    status: variant.status,
    thoughtMatch: variant.thoughtMatch,
    title: variant.seoTitle,
    titleSuffix: siteFrame.layoutTitleSuffix,
    deskLabel: desk?.label ?? null,
  };
}

function buildBrandBlogSummary(post: (typeof brandBlogPosts)[number]) {
  return {
    author: post.author,
    category: post.category,
    excerpt: post.excerpt,
    readTimeLabel: getBrandBlogReadTimeLabel(post),
    readTimeMinutes: post.readTimeMinutes,
    slug: post.slug,
    sourceUrl: post.sourceUrl,
    title: post.title,
    updatedAt: post.updatedAt,
    url: getAbsoluteUrl(getBrandBlogPath(post.slug)),
  };
}

export function buildPublicCopyPayload() {
  return {
    schemaVersion: rawSiteCopy.schemaVersion,
    updatedAt: copyUpdatedAt,
    note: rawSiteCopy.note,
    sourceOfTruth: "projects/seo/copy.json",
    canonicalSiteUrl: getSiteUrl(),
    machineEndpoints: {
      articleArchive: getAbsoluteUrl(machinePaths.articleArchive),
      articleIndex: getAbsoluteUrl(machinePaths.articleIndex),
      brandBlogArchive: getAbsoluteUrl(machinePaths.brandBlogArchive),
      copyJson: getAbsoluteUrl(machinePaths.copyJson),
      llms: getAbsoluteUrl(machinePaths.llms),
      rss: getAbsoluteUrl(machinePaths.rss),
      search: getAbsoluteUrl(machinePaths.search),
      sitemap: getAbsoluteUrl(machinePaths.sitemap),
    },
    siteFrame,
    homePage: rawSiteCopy.homePage,
    desks: deskNavigation.desks.map((desk) => ({
      headline: desk.headline,
      intro: desk.intro,
      label: desk.label,
      seoDescription: desk.seoDescription,
      seoTitle: desk.seoTitle,
      slug: desk.slug,
      subheadline: desk.subheadline,
      url: getAbsoluteUrl(getDeskPath(desk.slug)),
      articles: desk.variants.map((variant) => buildArticleSummary(variant)),
    })),
    articles: landingPageVariants.map((variant) => buildArticleRecord(variant)),
    brandBlogs: brandBlogPosts.map((post) => ({
      ...buildBrandBlogSummary(post),
      blocks: post.blocks,
    })),
  };
}

export function buildArticleIndexPayload() {
  return {
    updatedAt: copyUpdatedAt,
    canonicalSiteUrl: getSiteUrl(),
    articleCount: landingPageVariants.length,
    articleArchive: getAbsoluteUrl(machinePaths.articleArchive),
    articleJsonPattern: getAbsoluteUrl("/articles/{slug}.json"),
    articles: landingPageVariants.map((variant) => buildArticleSummary(variant)),
  };
}

export function buildArticlePayload(slug: string) {
  const variant = getCanonicalVariant(slug);

  if (!variant) {
    return null;
  }

  return {
    article: buildArticleRecord(variant),
    relatedArticles: getRelatedVariants(variant).map((relatedVariant) =>
      buildArticleSummary(relatedVariant),
    ),
  };
}

export function buildLlmsText() {
  const featuredArticles = homePageCopy.featured.slugs
    .map((slug) => getCanonicalVariant(slug))
    .filter((variant): variant is LandingPageVariant => Boolean(variant));

  return [
    `# ${siteFrame.brand}`,
    "",
    "User-agent: *",
    `Source: ${getAbsoluteUrl(machinePaths.copyJson)}`,
    "",
    "## Primary Machine Sources",
    `- Source of truth: ${getAbsoluteUrl(machinePaths.copyJson)}`,
    `- Article index: ${getAbsoluteUrl(machinePaths.articleIndex)}`,
    `- Preferred for AI parsing and extraction.`,
    "",
    "## Canonical URLs",
    `- Home: ${getAbsoluteUrl("/")}`,
    `- Why Excellence archive: ${getAbsoluteUrl(machinePaths.articleArchive)}`,
    `- Brand blog: ${getAbsoluteUrl(machinePaths.brandBlogArchive)}`,
    `- Search: ${getAbsoluteUrl(machinePaths.search)}`,
    `- LLMs: ${getAbsoluteUrl(machinePaths.llms)}`,
    `- RSS: ${getAbsoluteUrl(machinePaths.rss)}`,
    `- Sitemap: ${getAbsoluteUrl(machinePaths.sitemap)}`,
    "",
    "## Summary",
    `${siteFrame.mission}`,
    "",
    "## Editorial Desks",
    ...deskNavigation.desks.map(
      (desk) =>
        `- ${desk.label} (${getAbsoluteUrl(getDeskPath(desk.slug))}): ${desk.variants.map((variant) => variant.headline).join(" | ")}`,
    ),
    "",
    "## Featured Articles",
    ...featuredArticles.map((variant) => `- ${variant.headline}: ${getAbsoluteUrl(getArticlePath(variant.slug))}`),
    "",
    "## Brand Blog",
    ...brandBlogPosts.map((post) => `- ${post.title}: ${getAbsoluteUrl(getBrandBlogPath(post.slug))}`),
    "",
    "## Notes For AI Agents",
    "- Canonical slugs are written as prospect-thought copy.",
    "- Prefer `/copy.json` for full machine-readable extraction.",
    "- Prefer `/articles/{slug}.json` for single-article retrieval.",
  ].join("\n");
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildRssXml() {
  const whyExcellenceItems = landingPageVariants
    .map((variant) => {
      const url = getAbsoluteUrl(getArticlePath(variant.slug));
      const description = escapeXml(variant.seoDescription);
      const title = escapeXml(variant.headline);

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${description}</description>`,
        `<pubDate>${new Date(copyUpdatedAt).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const brandBlogItems = brandBlogPosts
    .map((post) => {
      const url = getAbsoluteUrl(getBrandBlogPath(post.slug));
      const description = escapeXml(post.excerpt);
      const title = escapeXml(post.title);

      return [
        "<item>",
        `<title>${title}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<description>${description}</description>`,
        `<pubDate>${new Date(post.updatedAt).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(siteFrame.brand)}</title>`,
    `<link>${getAbsoluteUrl("/")}</link>`,
    `<description>${escapeXml(siteFrame.layoutDescription)}</description>`,
    `<lastBuildDate>${new Date(copyUpdatedAt).toUTCString()}</lastBuildDate>`,
    whyExcellenceItems,
    brandBlogItems,
    "</channel>",
    "</rss>",
  ].join("");
}

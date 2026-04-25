import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import { JsonLd } from "@/components/json-ld";
import { LandingPage } from "@/components/landing-page";
import {
  allLandingPageRouteSlugs,
  copyUpdatedAt,
  getArticleReadTimeMinutes,
  getDeskForVariant,
  getVariant,
  homePageCopy,
  isCanonicalVariantSlug,
  siteFrame,
} from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getArticleJsonPath,
  getArticlePath,
  machinePaths,
} from "@/content/site-urls";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allLandingPageRouteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = getVariant(slug);

  if (!variant) {
    return {};
  }

  const titleSuffix = ` | ${siteFrame.brand}`;
  const pageTitle = variant.seoTitle.endsWith(titleSuffix)
    ? variant.seoTitle.slice(0, -titleSuffix.length)
    : variant.seoTitle;
  const desk = getDeskForVariant(variant);
  const art = getArticleArt(variant.slug);
  const artUrl = getArticleArtUrl(art);
  const keywords = Array.from(
    new Set(
      [variant.slug, variant.audienceLabel, desk?.label ?? "", ...variant.thoughtMatch.queryVariants]
        .filter(Boolean),
    ),
  );
  const articlePath = getArticlePath(variant.slug);

  return {
    title: pageTitle,
    description: variant.seoDescription,
    category: desk?.label,
    keywords,
    alternates: {
      canonical: articlePath,
      types: {
        "application/json": [
          {
            title: "Excellence Directory Copy JSON",
            url: machinePaths.copyJson,
          },
          {
            title: `${variant.headline} JSON`,
            url: getArticleJsonPath(variant.slug),
          },
        ],
        "text/plain": [
          {
            title: "Excellence Directory LLMs TXT",
            url: machinePaths.llms,
          },
        ],
        "application/rss+xml": [
          {
            title: "Excellence Directory RSS",
            url: machinePaths.rss,
          },
        ],
      },
    },
    openGraph: {
      authors: [siteFrame.brand],
      description: variant.seoDescription,
      images: art?.available
        ? [
            {
              alt: art.alt,
              url: artUrl ?? art.publicImagePath,
            },
          ]
        : undefined,
      modifiedTime: copyUpdatedAt,
      publishedTime: copyUpdatedAt,
      section: desk?.label,
      tags: keywords,
      title: variant.seoTitle,
      type: "article",
      url: articlePath,
    },
    twitter: {
      card: "summary",
      description: variant.seoDescription,
      images: art?.available ? [artUrl ?? art.publicImagePath] : undefined,
      title: variant.seoTitle,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const variant = getVariant(slug);

  if (!variant) {
    notFound();
  }

  if (!isCanonicalVariantSlug(slug)) {
    permanentRedirect(getArticlePath(variant.slug));
  }

  const articleUrl = getAbsoluteUrl(getArticlePath(variant.slug));
  const desk = getDeskForVariant(variant);
  const art = getArticleArt(variant.slug);
  const artUrl = getArticleArtUrl(art);
  const readTimeMinutes = getArticleReadTimeMinutes(variant);
  const archiveUrl = getAbsoluteUrl(machinePaths.articleArchive);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          articleSection: desk?.label ?? "Why Excellence",
          author: {
            "@type": "Organization",
            name: siteFrame.brand,
          },
          dateModified: copyUpdatedAt,
          description: variant.seoDescription,
          headline: variant.headline,
          image: art?.available
            ? [getAbsoluteUrl(artUrl ?? art.publicImagePath)]
            : undefined,
          keywords: [
            variant.slug,
            variant.audienceLabel,
            desk?.label ?? "",
            ...variant.thoughtMatch.queryVariants,
          ].filter(Boolean),
          mainEntityOfPage: articleUrl,
          publisher: {
            "@type": "Organization",
            name: siteFrame.brand,
            url: getAbsoluteUrl("/"),
          },
          timeRequired: `PT${readTimeMinutes}M`,
          url: articleUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              item: getAbsoluteUrl("/"),
              name: siteFrame.shortBrand,
              position: 1,
            },
            {
              "@type": "ListItem",
              item: archiveUrl,
              name: "Why Excellence",
              position: 2,
            },
            {
              "@type": "ListItem",
              item: articleUrl,
              name: variant.headline,
              position: 3,
            },
          ],
        }}
      />
      {variant.faq.length > 0 ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: variant.faq.map((item) => ({
              "@type": "Question",
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
              name: item.question,
            })),
          }}
        />
      ) : null}
      <LandingPage variant={variant} />
    </>
  );
}

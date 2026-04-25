import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import {
  brandBlogPosts,
  formatBrandBlogPostDate,
  getBrandBlogPostByRouteSlug,
  getBrandBlogReadTimeLabel,
  getRelatedBrandBlogPosts,
  type BrandBlogBlock,
} from "@/content/brand-blog";
import { getCanonicalVariant, siteFrame } from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getArticlePath,
  getBrandBlogPath,
  machinePaths,
} from "@/content/site-urls";

type BrandBlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function BrandBlogBlockView({ block }: { block: BrandBlogBlock }) {
  if (block.type === "heading") {
    return <h2>{block.text}</h2>;
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

export function generateStaticParams() {
  return brandBlogPosts.map((post) => ({ slug: post.routeSlug }));
}

export async function generateMetadata({
  params,
}: BrandBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBrandBlogPostByRouteSlug(slug);

  if (!post) {
    return {};
  }

  const canonicalPath = getBrandBlogPath(post.routeSlug);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    authors: [{ name: post.author }],
    category: post.category,
    openGraph: {
      authors: [post.author],
      description: post.excerpt,
      modifiedTime: post.updatedAt,
      publishedTime: post.publishedAt,
      section: post.category,
      title: post.title,
      type: "article",
      url: canonicalPath,
    },
    twitter: {
      card: "summary",
      description: post.excerpt,
      title: post.title,
    },
  };
}

export default async function BrandBlogPostPage({ params }: BrandBlogPostPageProps) {
  const { slug } = await params;
  const post = getBrandBlogPostByRouteSlug(slug);

  if (!post) {
    const whyExcellenceArticle = getCanonicalVariant(slug);

    if (whyExcellenceArticle) {
      permanentRedirect(getArticlePath(whyExcellenceArticle.slug));
    }

    notFound();
  }

  if (slug !== post.routeSlug) {
    permanentRedirect(getBrandBlogPath(post.routeSlug));
  }

  const postUrl = getAbsoluteUrl(getBrandBlogPath(post.routeSlug));
  const archiveUrl = getAbsoluteUrl(machinePaths.brandBlogArchive);
  const relatedPosts = getRelatedBrandBlogPosts(post);

  return (
    <main className="content-stack article-page brand-blog-article-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          articleSection: post.category,
          author: {
            "@type": "Person",
            name: post.author,
          },
          dateModified: post.updatedAt,
          datePublished: post.publishedAt,
          description: post.excerpt,
          headline: post.title,
          mainEntityOfPage: postUrl,
          publisher: {
            "@type": "Organization",
            name: siteFrame.brand,
            url: getAbsoluteUrl("/"),
          },
          timeRequired: `PT${post.readTimeMinutes}M`,
          url: postUrl,
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
              name: "Blog",
              position: 2,
            },
            {
              "@type": "ListItem",
              item: postUrl,
              name: post.title,
              position: 3,
            },
          ],
        }}
      />

      <section className="editorial-grid">
        <article className="editorial-main">
          <section className="section-card article-header">
            <div className="hero-copy">
              <p className="article-meta-line">
                <Link href={machinePaths.brandBlogArchive} className="article-meta-link">
                  Blog
                </Link>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
                <span aria-hidden="true">/</span>
                <span>{formatBrandBlogPostDate(post.publishedAt)}</span>
                <span aria-hidden="true">/</span>
                <span>{getBrandBlogReadTimeLabel(post)}</span>
              </p>
              <h1>{post.title}</h1>
              <p className="hero-supporting">{post.excerpt}</p>
            </div>
          </section>

          <section className="section-card article-body-section">
            <div className="article-body">
              {post.blocks.map((block, index) => (
                <BrandBlogBlockView
                  key={block.type === "list" ? `${block.type}-${index}` : block.text}
                  block={block}
                />
              ))}
            </div>
          </section>
        </article>

        <aside className="editorial-rail">
          <section className="rail-note">
            <p className="section-label">Original source</p>
            <p>
              First published by {post.author} on the public Excellence Directory blog.
            </p>
            <a href={post.sourceUrl} className="brand-blog-source-link">
              View source post
            </a>
          </section>

          {relatedPosts.length > 0 ? (
            <section className="rail-note">
              <p className="section-label">More blog posts</p>
              <div className="brand-blog-related-list">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={getBrandBlogPath(relatedPost.routeSlug)}
                    className="brand-blog-related-card"
                  >
                    <span>{relatedPost.category}</span>
                    <strong>{relatedPost.title}</strong>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

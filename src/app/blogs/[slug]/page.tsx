import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import {
  brandBlogPosts,
  getBrandBlogPost,
  getBrandBlogReadTimeLabel,
  getRelatedBrandBlogPosts,
  type BrandBlogBlock,
} from "@/content/brand-blog";
import { siteFrame } from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getBrandBlogPath,
  machinePaths,
} from "@/content/site-urls";

type BrandBlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatPostDate(value: string) {
  return dateFormatter.format(new Date(value));
}

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
  return brandBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BrandBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBrandBlogPost(slug);

  if (!post) {
    return {};
  }

  const canonicalPath = getBrandBlogPath(post.slug);

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
  const post = getBrandBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = getAbsoluteUrl(getBrandBlogPath(post.slug));
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
              name: "Blogs",
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
                  Blogs
                </Link>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
                <span aria-hidden="true">/</span>
                <span>{formatPostDate(post.publishedAt)}</span>
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
              <p className="section-label">More brand essays</p>
              <div className="brand-blog-related-list">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={getBrandBlogPath(relatedPost.slug)}
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

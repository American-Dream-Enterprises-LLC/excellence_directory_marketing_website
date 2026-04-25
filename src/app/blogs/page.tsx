import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import {
  brandBlogPosts,
  getBrandBlogReadTimeLabel,
} from "@/content/brand-blog";
import { siteFrame } from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getBrandBlogPath,
  machinePaths,
} from "@/content/site-urls";

const brandBlogDescription =
  "Read the public Excellence blog on faith, business, stewardship, and Christian marketplace leadership.";

export const metadata: Metadata = {
  title: "Blog",
  description: brandBlogDescription,
  alternates: {
    canonical: machinePaths.brandBlogArchive,
  },
  openGraph: {
    description: brandBlogDescription,
    title: `Blog | ${siteFrame.brand}`,
    type: "website",
    url: machinePaths.brandBlogArchive,
  },
};

export default function BrandBlogArchivePage() {
  const [featuredPost, ...secondaryPosts] = brandBlogPosts;
  const archiveUrl = getAbsoluteUrl(machinePaths.brandBlogArchive);

  return (
    <main className="content-stack blog-archive-page brand-blog-page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          description: brandBlogDescription,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: brandBlogPosts.map((post, index) => ({
              "@type": "ListItem",
              name: post.title,
              position: index + 1,
              url: getAbsoluteUrl(getBrandBlogPath(post.slug)),
            })),
          },
          name: `${siteFrame.brand} Blog`,
          url: archiveUrl,
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
          ],
        }}
      />

      <section className="blog-feature">
        <div className="blog-feature-copy">
          <p className="section-kicker">Excellence Blog</p>
          <h1 className="brand-blog-archive-title">Insights for faith and business.</h1>
          <p className="blog-feature-dek">
            Articles from the public Excellence Directory blog on Christian work,
            business, stewardship, and marketplace trust.
          </p>
        </div>
        <div className="brand-blog-feature-card" aria-hidden="true">
          <span>Faith</span>
          <span>Business</span>
          <span>Community</span>
        </div>
      </section>

      {featuredPost ? (
        <section className="blog-feature brand-blog-featured-post">
          <div className="blog-feature-copy">
            <p className="blog-feature-meta">
              {featuredPost.category} / {getBrandBlogReadTimeLabel(featuredPost)}
            </p>
            <h2>
              <Link href={getBrandBlogPath(featuredPost.slug)}>{featuredPost.title}</Link>
            </h2>
            <p className="blog-feature-excerpt">{featuredPost.excerpt}</p>
            <div className="hero-actions">
              <Link href={getBrandBlogPath(featuredPost.slug)} className="button button-primary">
                Read post
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="blog-posts-section">
        <div className="home-section-heading">
          <p className="section-kicker">Blog archive</p>
          <h2>Read the latest Excellence blog posts.</h2>
        </div>
        <div className="blog-post-grid">
          {secondaryPosts.map((post) => (
            <Link key={post.slug} href={getBrandBlogPath(post.slug)} className="blog-post-card">
              <article>
                <p className="blog-post-card-meta">
                  {post.category} / {getBrandBlogReadTimeLabel(post)}
                </p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

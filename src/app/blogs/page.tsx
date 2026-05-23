import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import {
  brandBlogPosts,
  formatBrandBlogPostDate,
  getBrandBlogReadTimeLabel,
} from "@/content/brand-blog";
import { siteFrame } from "@/content/landing-page-data";
import { publicSurface } from "@/content/public-surface";
import {
  getAbsoluteUrl,
  getBrandBlogPath,
  machinePaths,
} from "@/content/site-urls";
import { getRequestDeviceView } from "@/lib/device-view";

const brandBlogDescription =
  "Read the public Excellence blog on faith, business, stewardship, and Christian marketplace leadership.";
const mobilePostsPerPage = 5;

type BrandBlogArchivePageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

function getMobilePage(rawPage: string | undefined, pageCount: number) {
  const parsedPage = rawPage ? Number.parseInt(rawPage, 10) : 1;

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.min(parsedPage, Math.max(pageCount, 1));
}

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
  robots: publicSurface.showBrandBlogLinks
    ? undefined
    : {
        follow: false,
        index: false,
      },
};

export default async function BrandBlogArchivePage({
  searchParams,
}: BrandBlogArchivePageProps) {
  const deviceView = await getRequestDeviceView();
  const { page } = await searchParams;
  const [featuredPost, ...secondaryPosts] = brandBlogPosts;
  const archiveUrl = getAbsoluteUrl(machinePaths.brandBlogArchive);
  const pageCount = Math.ceil(brandBlogPosts.length / mobilePostsPerPage);
  const mobilePage = getMobilePage(page, pageCount);
  const mobilePagePosts = brandBlogPosts.slice(
    (mobilePage - 1) * mobilePostsPerPage,
    mobilePage * mobilePostsPerPage,
  );
  const mobilePageHref = (pageNumber: number) =>
    pageNumber === 1
      ? machinePaths.brandBlogArchive
      : `${machinePaths.brandBlogArchive}?page=${pageNumber}`;

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
              url: getAbsoluteUrl(getBrandBlogPath(post.routeSlug)),
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

      {deviceView === "mobile" ? (
        <section className="blog-posts-section brand-blog-mobile-archive">
          <div className="home-section-heading">
            <p className="section-kicker">Blog archive</p>
            <h1 className="brand-blog-archive-title">All articles</h1>
          </div>
          <div className="brand-blog-mobile-list">
            {mobilePagePosts.map((post) => (
              <Link
                key={post.slug}
                href={getBrandBlogPath(post.routeSlug)}
                className="brand-blog-mobile-card"
              >
                <article>
                  <p className="blog-post-card-meta">
                    {post.category} / {formatBrandBlogPostDate(post.publishedAt)} /{" "}
                    {getBrandBlogReadTimeLabel(post)}
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </article>
              </Link>
            ))}
          </div>

          {pageCount > 1 ? (
            <nav
              className="brand-blog-pagination"
              aria-label="Blog archive pagination"
            >
              <Link
                href={mobilePageHref(Math.max(mobilePage - 1, 1))}
                className="brand-blog-page-link"
                aria-disabled={mobilePage === 1}
                tabIndex={mobilePage === 1 ? -1 : undefined}
              >
                Previous
              </Link>
              <span className="brand-blog-page-status">
                Page {mobilePage} of {pageCount}
              </span>
              <Link
                href={mobilePageHref(Math.min(mobilePage + 1, pageCount))}
                className="brand-blog-page-link"
                aria-disabled={mobilePage === pageCount}
                tabIndex={mobilePage === pageCount ? -1 : undefined}
              >
                Next
              </Link>
            </nav>
          ) : null}
        </section>
      ) : (
        <>
          {featuredPost ? (
            <section className="blog-feature brand-blog-featured-post">
              <div className="blog-feature-copy">
                <p className="blog-feature-meta">
                  {featuredPost.category} / {formatBrandBlogPostDate(featuredPost.publishedAt)} /{" "}
                  {getBrandBlogReadTimeLabel(featuredPost)}
                </p>
                <h2>
                  <Link href={getBrandBlogPath(featuredPost.routeSlug)}>{featuredPost.title}</Link>
                </h2>
                <p className="blog-feature-excerpt">{featuredPost.excerpt}</p>
                <div className="hero-actions">
                  <Link
                    href={getBrandBlogPath(featuredPost.routeSlug)}
                    className="button button-primary"
                  >
                    Read post
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          <section className="blog-posts-section">
            <div className="home-section-heading">
              <p className="section-kicker">Blog archive</p>
            </div>
            <div className="blog-post-grid">
              {secondaryPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={getBrandBlogPath(post.routeSlug)}
                  className="blog-post-card"
                >
                  <article>
                    <p className="blog-post-card-meta">
                      {post.category} / {formatBrandBlogPostDate(post.publishedAt)} /{" "}
                      {getBrandBlogReadTimeLabel(post)}
                    </p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import {
  deskNavigation,
  getCanonicalVariant,
  homePageCopy,
  siteFrame,
} from "@/content/landing-page-data";
import { getAbsoluteUrl, getArticlePath, machinePaths } from "@/content/site-urls";

const blogDescription =
  "Explore why Excellence exists through Christian discovery articles about trust, work, community, and faith-aligned opportunity.";

export function DesktopBlogArchivePage() {
  const archiveUrl = getAbsoluteUrl(machinePaths.articleArchive);
  const featuredStory =
    getCanonicalVariant(homePageCopy.primaryVariantSlug) ?? deskNavigation.desks[0]?.variants[0];
  const featuredArt = featuredStory ? getArticleArt(featuredStory.slug) : undefined;
  const featuredArtUrl = getArticleArtUrl(featuredArt);
  const archiveStories = deskNavigation.desks.flatMap((desk) =>
    desk.variants.map((variant) => ({ desk, variant })),
  );
  const secondaryStories = archiveStories.filter(
    ({ variant }) => variant.slug !== featuredStory?.slug,
  );

  return (
    <>
      <main className="content-stack blog-archive-page">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            description: blogDescription,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: archiveStories.map(({ variant }, index) => ({
                "@type": "ListItem",
                name: variant.headline,
                position: index + 1,
                url: getAbsoluteUrl(getArticlePath(variant.slug)),
              })),
            },
            name: `${siteFrame.brand} Why Excellence`,
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
                name: "Why Excellence",
                position: 2,
              },
            ],
          }}
        />

        {featuredStory ? (
          <section className="blog-feature">
            <div className="blog-feature-copy">
              <h2>
                <Link href={getArticlePath(featuredStory.slug)}>{featuredStory.headline}</Link>
              </h2>
              <p className="blog-feature-dek">{featuredStory.subheadline}</p>
              <p className="blog-feature-excerpt">
                {featuredStory.articleBody[0] ?? featuredStory.thoughtMatch.instantAnswer}
              </p>
              <div className="hero-actions">
                <Link href={getArticlePath(featuredStory.slug)} className="button button-primary">
                  Read post
                </Link>
              </div>
            </div>

            {featuredArt?.available ? (
              <Link href={getArticlePath(featuredStory.slug)} className="blog-feature-media">
                <Image
                  src={featuredArtUrl ?? featuredArt.publicImagePath}
                  alt={featuredArt.alt}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1100px) 42vw, 100vw"
                  className="blog-feature-image"
                />
              </Link>
            ) : null}
          </section>
        ) : null}

        <section className="blog-posts-section">
          <div className="home-section-heading">
            <p className="section-kicker">Why Excellence</p>
            <h2>Browse the full article set.</h2>
          </div>
          <div className="blog-post-grid">
            {secondaryStories.map(({ variant }) => (
              <Link key={variant.slug} href={getArticlePath(variant.slug)} className="blog-post-card">
                <article>
                  <h3>{variant.headline}</h3>
                  <p>{variant.subheadline}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

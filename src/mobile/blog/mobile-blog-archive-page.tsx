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
import { getAbsoluteUrl, getArticlePath, getDeskPath, machinePaths } from "@/content/site-urls";

import styles from "./mobile-blog-archive-page.module.css";

const blogDescription =
  "Explore why Excellence exists through Christian discovery articles about trust, work, community, and faith-aligned opportunity.";

export function MobileBlogArchivePage() {
  const archiveUrl = getAbsoluteUrl(machinePaths.articleArchive);
  const featuredStory =
    getCanonicalVariant(homePageCopy.primaryVariantSlug) ?? deskNavigation.desks[0]?.variants[0];
  const featuredDesk = featuredStory ? deskNavigation.desks.find((desk) => desk.variants.some((variant) => variant.slug === featuredStory.slug)) : undefined;
  const featuredArt = featuredStory ? getArticleArt(featuredStory.slug) : undefined;
  const featuredArtUrl = getArticleArtUrl(featuredArt);
  const archiveStories = deskNavigation.desks.flatMap((desk) =>
    desk.variants.map((variant) => ({ desk, variant })),
  );
  const secondaryStories = archiveStories.filter(
    ({ variant }) => variant.slug !== featuredStory?.slug,
  );

  return (
    <main className={styles.page}>
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

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Why Excellence</p>
        <h1 className={styles.title}>
          Articles that explain why Christian discovery needs a clearer path.
        </h1>
        <p className={styles.body}>
          Start with the question already on your mind, then follow the path that leads into a
          trusted Christian professional, church, opportunity, or audience.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Browse by path</h2>
        <div className={styles.deskChips}>
          {deskNavigation.desks.map((desk) => (
            <Link key={desk.slug} href={getDeskPath(desk.slug)} className={styles.deskChip}>
              {desk.label}
            </Link>
          ))}
        </div>
      </section>

      {featuredStory ? (
        <section className={styles.feature}>
          <p className={styles.storyMeta}>{featuredDesk?.label ?? "Featured"} story</p>
          <h2 className={styles.storyTitle}>{featuredStory.headline}</h2>
          <p className={styles.storyDek}>{featuredStory.subheadline}</p>
          {featuredArt?.available ? (
            <Link href={getArticlePath(featuredStory.slug)} className={styles.featureImageWrap}>
              <Image
                src={featuredArtUrl ?? featuredArt.publicImagePath}
                alt={featuredArt.alt}
                width={1536}
                height={1024}
                className={styles.featureImage}
              />
            </Link>
          ) : null}
          <p className={styles.storyExcerpt}>
            {featuredStory.articleBody[0] ?? featuredStory.thoughtMatch.instantAnswer}
          </p>
        </section>
      ) : null}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>All articles</h2>
        <div className={styles.storyList}>
          {secondaryStories.map(({ desk, variant }) => (
            <article key={variant.slug} className={styles.storyCard}>
              <p className={styles.storyMeta}>{desk.label}</p>
              <Link href={getArticlePath(variant.slug)} className={styles.storyLink}>
                <h3 className={styles.storyTitle}>{variant.headline}</h3>
              </Link>
              <p className={styles.storyDek}>{variant.subheadline}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

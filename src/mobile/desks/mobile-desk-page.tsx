import Link from "next/link";

import { DeviceMockup } from "@/components/device-mockup";
import { JsonLd } from "@/components/json-ld";
import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import { getDeskBySlug, siteFrame } from "@/content/landing-page-data";
import { getAbsoluteUrl, getArticlePath, getDeskPath } from "@/content/site-urls";

import styles from "./mobile-desk-page.module.css";

type MobileDeskPageProps = {
  deskSlug: string;
};

export function MobileDeskPage({ deskSlug }: MobileDeskPageProps) {
  const desk = getDeskBySlug(deskSlug);

  if (!desk) {
    return null;
  }

  const [leadStory, ...secondaryStories] = desk.variants;
  const leadArt = leadStory ? getArticleArt(leadStory.slug) : undefined;
  const leadArtUrl = getArticleArtUrl(leadArt);
  const deskUrl = getAbsoluteUrl(getDeskPath(desk.slug));
  const plans = [
    {
      name: "Starter",
      note: "Clean presence. Clear faith signal. Better first discovery.",
    },
    {
      name: "Featured",
      note: "More visibility for people already searching in your category.",
    },
    {
      name: "Founding",
      note: "Early partner positioning with stronger placement and attention.",
    },
  ];

  return (
    <main className={styles.page}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          description: desk.seoDescription,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: desk.variants.map((variant, index) => ({
              "@type": "ListItem",
              name: variant.headline,
              position: index + 1,
              url: getAbsoluteUrl(getArticlePath(variant.slug)),
            })),
          },
          name: desk.seoTitle,
          url: deskUrl,
        }}
      />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>{desk.label}</p>
        <h1 className={styles.title}>{leadStory?.headline ?? desk.headline}</h1>
        <p className={styles.body}>{leadStory?.subheadline ?? desk.subheadline}</p>
        <div className={styles.deviceWrap}>
          <DeviceMockup
            alt={leadArt?.alt ?? `${desk.label} phone preview`}
            src={leadArt?.available ? leadArtUrl ?? leadArt.publicImagePath : "/design/jobs-feed.png"}
            className={styles.device}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Choose the visibility level that fits this season.</h2>
        <div className={styles.plans}>
          {plans.map((plan) => (
            <article key={plan.name} className={styles.plan}>
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planNote}>{plan.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why this page helps the right people respond.</h2>
        <div className={styles.points}>
          <article className={styles.point}>
            <h3 className={styles.pointTitle}>Who should see this</h3>
            <p className={styles.pointBody}>{desk.intro[0]}</p>
          </article>
          <article className={styles.point}>
            <h3 className={styles.pointTitle}>Why they care</h3>
            <p className={styles.pointBody}>{desk.intro[1]}</p>
          </article>
          <article className={styles.point}>
            <h3 className={styles.pointTitle}>What moves them forward</h3>
            <p className={styles.pointBody}>
              A clear Christian signal, practical detail, and visible credibility help people trust
              what they see before they reach out, register, apply, or follow up.
            </p>
          </article>
        </div>
      </section>

      {secondaryStories.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Keep reading</h2>
          <div className={styles.stories}>
            {secondaryStories.map((story) => (
              <article key={story.slug} className={styles.story}>
                <p className={styles.storyMeta}>{siteFrame.brand}</p>
                <Link href={getArticlePath(story.slug)}>
                  <h3 className={styles.storyTitle}>{story.headline}</h3>
                </Link>
                <p className={styles.storyBody}>{story.subheadline}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

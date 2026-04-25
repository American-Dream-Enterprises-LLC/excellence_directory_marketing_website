import Image from "next/image";
import Link from "next/link";

import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import {
  getArticleReadTimeLabel,
  getDeskForVariant,
  getRelatedVariants,
  type LandingPageVariant,
  landingPageUi,
  renderCopyTemplate,
} from "@/content/landing-page-data";
import { getArticlePath, getDeskPath, machinePaths } from "@/content/site-urls";

import styles from "./mobile-landing-page.module.css";

type MobileLandingPageProps = {
  variant: LandingPageVariant;
};

export function MobileLandingPage({ variant }: MobileLandingPageProps) {
  const desk = getDeskForVariant(variant);
  const art = getArticleArt(variant.slug);
  const artUrl = getArticleArtUrl(art);
  const relatedVariants = getRelatedVariants(variant);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.meta}>
          <Link href={machinePaths.articleArchive}>Why Excellence</Link>
          {desk ? (
            <>
              {" · "}
              <Link href={getDeskPath(desk.slug)}>{desk.label}</Link>
            </>
          ) : null}
          {" · "}
          {getArticleReadTimeLabel(variant)}
        </p>
        <h1 className={styles.title}>{variant.headline}</h1>
        {variant.supportingLine ? <p className={styles.supporting}>{variant.supportingLine}</p> : null}
        {art?.available ? (
          <div className={styles.heroArt}>
            <Image
              src={artUrl ?? art.publicImagePath}
              alt={art.alt}
              width={1536}
              height={1024}
              className={styles.heroArtImage}
            />
          </div>
        ) : null}
      </section>

      <section className={styles.section}>
        <div className={styles.body}>
          {variant.articleBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {variant.valueCards.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {renderCopyTemplate(landingPageUi.corePromiseHeadingTemplate, {
              audience: variant.audienceLabel,
            })}
          </h2>
          <div className={styles.list}>
            {variant.valueCards.map((card) => (
              <article key={card.title} className={styles.listItem}>
                <h3>{card.title}</h3>
                <p className={styles.sectionBody}>{card.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {variant.scripture ? (
        <section className={styles.section}>
          <blockquote className={styles.scripture}>
            <p>{variant.scripture.text}</p>
            <cite>{variant.scripture.citation}</cite>
          </blockquote>
        </section>
      ) : null}

      {variant.fitSignals.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{landingPageUi.directLinesHeading}</h2>
          <div className={styles.chips}>
            {variant.fitSignals.map((signal) => (
              <span key={signal} className={styles.chip}>
                {signal}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {variant.closingLines.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{landingPageUi.closingSequenceHeading}</h2>
          <div className={styles.list}>
            {variant.closingLines.map((line) => (
              <article key={line} className={styles.listItem}>
                <p className={styles.sectionBody}>{line}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {variant.faq.length > 0 ? (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{landingPageUi.faqHeading}</h2>
          <div className={styles.faq}>
            {variant.faq.map((item) => (
              <article key={item.question} className={styles.faqItem}>
                <h3>{item.question}</h3>
                <p className={styles.sectionBody}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {relatedVariants.length > 0 ? (
        <section className={styles.relatedSection}>
          <h2 className={styles.sectionTitle}>Keep reading</h2>
          <div className={styles.relatedList}>
            {relatedVariants.map((relatedVariant) => (
              <article key={relatedVariant.slug} className={styles.relatedItem}>
                <Link href={getArticlePath(relatedVariant.slug)} className={styles.relatedLink}>
                  <span className={styles.relatedMeta}>
                    {desk?.label ?? "Why Excellence"} · {getArticleReadTimeLabel(relatedVariant)}
                  </span>
                  <h3 className={styles.relatedHeadline}>{relatedVariant.headline}</h3>
                  <p className={styles.relatedDek}>{relatedVariant.subheadline}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import { HomePersonalizationModal } from "@/components/home-personalization-modal";
import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import {
  getArticleReadTimeLabel,
  getInlineBlogCta,
  getDeskForVariant,
  getRelatedVariants,
  type LandingPageVariant,
  getStatusLongLabel,
  homePageCopy,
  landingPageUi,
  renderCopyTemplate,
} from "@/content/landing-page-data";
import { getArticlePath, getDeskPath, machinePaths } from "@/content/site-urls";

type DesktopLandingPageProps = {
  variant: LandingPageVariant;
};

export function DesktopLandingPage({ variant }: DesktopLandingPageProps) {
  const relatedVariants = getRelatedVariants(variant);
  const desk = getDeskForVariant(variant);
  const inlineBlogCta = getInlineBlogCta(variant);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <>
      <main className="content-stack article-page">
        <section className="editorial-grid">
          <article className="editorial-main">
            <section className="section-card article-header">
              <div className="hero-copy">
                <p className="article-meta-line">
                  <Link href={machinePaths.articleArchive} className="article-meta-link">
                    Blog
                  </Link>
                  <span aria-hidden="true">/</span>
                  {desk ? (
                    <>
                      <Link href={getDeskPath(desk.slug)} className="article-meta-link">
                        {desk.label}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : null}
                  <span>{dateLabel}</span>
                  <span aria-hidden="true">/</span>
                  <span>{getArticleReadTimeLabel(variant)}</span>
                </p>
                {variant.status !== "ready" ? (
                  <div className="status-row compact-status-row">
                    <span className={`status-badge status-${variant.status}`}>
                      {getStatusLongLabel(variant.status)}
                    </span>
                  </div>
                ) : null}
                <h1>{variant.headline}</h1>
                {variant.supportingLine ? <p className="hero-supporting">{variant.supportingLine}</p> : null}
              </div>
            </section>

            {variant.articleBody.length > 0 || inlineBlogCta ? (
              <section className="section-card article-body-section">
                <div className="article-body">
                  {variant.articleBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="article-inline-cta">
                    {inlineBlogCta.body}{" "}
                    <a
                      href={inlineBlogCta.href}
                      className="article-inline-cta-link"
                      data-home-cta="blog-inline-cta"
                    >
                      {inlineBlogCta.linkLabel}
                    </a>
                  </p>
                </div>
              </section>
            ) : null}

            {variant.valueCards.length > 0 ? (
              <section className="section-card">
                <div className="section-heading">
                  <p className="section-label">{landingPageUi.corePromiseLabel}</p>
                  <h2>
                    {renderCopyTemplate(landingPageUi.corePromiseHeadingTemplate, {
                      audience: variant.audienceLabel,
                    })}
                  </h2>
                </div>
                <div className="stacked-cards">
                  {variant.valueCards.map((card) => (
                    <article key={card.title} className="stacked-card">
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {variant.scripture ? (
              <section className="section-card">
                <blockquote className="scripture-block">
                  <p>{variant.scripture.text}</p>
                  <cite>{variant.scripture.citation}</cite>
                </blockquote>
              </section>
            ) : null}

            {variant.fitSignals.length > 0 ? (
              <section className="section-card">
                <div className="section-heading">
                  <p className="section-label">{landingPageUi.directLinesLabel}</p>
                  <h2>{landingPageUi.directLinesHeading}</h2>
                </div>
                <div className="pillar-grid">
                  {variant.fitSignals.map((signal) => (
                    <span key={signal} className="pillar-chip">
                      {signal}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {variant.closingLines.length > 0 ? (
              <section className="section-card">
                <div className="section-heading">
                  <p className="section-label">{landingPageUi.closingSequenceLabel}</p>
                  <h2>{landingPageUi.closingSequenceHeading}</h2>
                </div>
                <div className="closing-list">
                  {variant.closingLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {variant.faq.length > 0 ? (
              <section className="section-card">
                <div className="section-heading">
                  <p className="section-label">{landingPageUi.faqLabel}</p>
                  <h2>{landingPageUi.faqHeading}</h2>
                </div>
                <div className="faq-list">
                  {variant.faq.map((item) => (
                    <article key={item.question} className="stacked-card">
                      <h3>{item.question}</h3>
                      <p>{item.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <aside className="editorial-rail">
            {relatedVariants.length > 0 ? (
              <section className="section-card rail-card">
                <div className="section-heading">
                  <h2>{desk ? `More from ${desk.label}` : "Related posts"}</h2>
                </div>
                <div className="related-story-list">
                  {relatedVariants.map((relatedVariant) => {
                    const relatedArt = getArticleArt(relatedVariant.slug);
                    const relatedArtUrl = getArticleArtUrl(relatedArt);

                    return (
                      <Link
                        key={relatedVariant.slug}
                        href={getArticlePath(relatedVariant.slug)}
                        className="related-story-link"
                      >
                        <article className="related-story">
                          {relatedArt?.available ? (
                            <div className="related-story-art-frame">
                              <Image
                                src={relatedArtUrl ?? relatedArt.publicImagePath}
                                alt={relatedArt.alt}
                                width={1536}
                                height={1024}
                                sizes="(min-width: 1100px) 20vw, 100vw"
                                className="related-story-art-image"
                              />
                            </div>
                          ) : null}
                          <h3 className="related-story-headline">{relatedVariant.headline}</h3>
                          <p className="related-story-dek">{relatedVariant.subheadline}</p>
                          <p className="related-story-read-time">
                            {getArticleReadTimeLabel(relatedVariant)}
                          </p>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </aside>
        </section>
      </main>
      <HomePersonalizationModal personalization={homePageCopy.personalization} />
    </>
  );
}


import type { Metadata } from "next";
import Link from "next/link";

import { DeviceMockup } from "@/components/device-mockup";
import { JsonLd } from "@/components/json-ld";
import { getArticleArt, getArticleArtUrl } from "@/content/article-art";
import {
  getArticleReadTimeLabel,
  getDeskBySlug,
  siteFrame,
  type LandingPageVariant,
} from "@/content/landing-page-data";
import {
  getAbsoluteUrl,
  getArticlePath,
  getDeskPath,
  machinePaths,
} from "@/content/site-urls";

type DesktopDeskPageProps = {
  deskSlug: string;
};

function getDeskPageTitle(seoTitle: string) {
  const titleSuffix = ` | ${siteFrame.brand}`;

  return seoTitle.endsWith(titleSuffix) ? seoTitle.slice(0, -titleSuffix.length) : seoTitle;
}

function DeskStory({ variant }: { variant: LandingPageVariant }) {
  return (
    <Link href={getArticlePath(variant.slug)} className="subscription-story-link">
      <article className="subscription-story">
        <h3>{variant.headline}</h3>
        <p>{variant.subheadline}</p>
        <span>{getArticleReadTimeLabel(variant)}</span>
      </article>
    </Link>
  );
}

export function getDeskPageMetadata(deskSlug: string): Metadata {
  const desk = getDeskBySlug(deskSlug);

  if (!desk) {
    return {};
  }

  const keywords = Array.from(
    new Set(
      desk.variants
        .flatMap((variant) => variant.thoughtMatch.queryVariants)
        .concat([desk.label, `${desk.label} articles`, "Christian directory"])
        .filter(Boolean),
    ),
  );

  return {
    title: getDeskPageTitle(desk.seoTitle),
    description: desk.seoDescription,
    keywords,
    alternates: {
      canonical: getDeskPath(desk.slug),
      types: {
        "application/json": [
          {
            title: "Excellence Directory Copy JSON",
            url: machinePaths.copyJson,
          },
          {
            title: "Excellence Directory Article Index JSON",
            url: machinePaths.articleIndex,
          },
        ],
        "application/rss+xml": [
          {
            title: "Excellence Directory RSS",
            url: machinePaths.rss,
          },
        ],
        "text/plain": [
          {
            title: "Excellence Directory LLMs TXT",
            url: machinePaths.llms,
          },
        ],
      },
    },
    category: desk.label,
    openGraph: {
      description: desk.seoDescription,
      title: desk.seoTitle,
      type: "website",
      url: getDeskPath(desk.slug),
    },
    twitter: {
      card: "summary",
      description: desk.seoDescription,
      title: desk.seoTitle,
    },
  };
}

export function DesktopDeskPage({ deskSlug }: DesktopDeskPageProps) {
  const desk = getDeskBySlug(deskSlug);

  if (!desk) {
    return null;
  }

  const [leadStory, ...secondaryStories] = desk.variants;
  const leadArt = leadStory ? getArticleArt(leadStory.slug) : undefined;
  const leadArtUrl = getArticleArtUrl(leadArt);
  const deskUrl = getAbsoluteUrl(getDeskPath(desk.slug));
  const planHeading =
    desk.slug === "jobs"
      ? "Choose the path that helps people find the role or team faster."
      : "Choose the visibility level that fits this season.";
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
    <main className="subscription-page">
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
              item: deskUrl,
              name: desk.label,
              position: 2,
            },
          ],
        }}
      />

      <section className="subscription-hero">
        <div className="subscription-hero-copy">
          <p className="desk-page-breadcrumb">
            <Link href="/">Excellence</Link>
            <span aria-hidden="true"> / </span>
            <span>{desk.label}</span>
          </p>
          <p className="section-kicker">Subscription page</p>
          <h1>{leadStory?.headline ?? desk.headline}</h1>
          <p className="subscription-hero-dek">{leadStory?.subheadline ?? desk.subheadline}</p>
          <div className="subscription-hero-actions">
            <a
              className="home-button home-button-primary"
              href={leadStory?.primaryCta.href ?? "mailto:partner@excellencedirectory.com"}
            >
              {leadStory?.primaryCta.label ?? "Start the conversation"}
            </a>
            <a
              className="home-button home-button-secondary"
              href="https://linktr.ee/excellencebusinessdirectory"
              data-home-cta="desk-live-preview"
            >
              See It Live
            </a>
          </div>
        </div>

        <div className="subscription-hero-visual">
          <div className="subscription-hero-device-stack">
            <DeviceMockup
              alt="Excellence Directory onboarding screen"
              src="/design/mobile-onboarding-v2.png"
              className="subscription-hero-phone subscription-hero-phone-back"
            />
            <DeviceMockup
              alt={leadArt?.alt ?? "Excellence Directory product view"}
              src={leadArt?.available ? leadArtUrl ?? leadArt.publicImagePath : "/design/jobs-feed.png"}
              className="subscription-hero-phone subscription-hero-phone-front"
            />
          </div>
        </div>
      </section>

      <section className="subscription-plans">
        <div className="home-section-heading">
          <p className="section-kicker">Simple choices</p>
          <h2>{planHeading}</h2>
        </div>
        <div className="subscription-plan-list">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`subscription-plan${index === 1 ? " subscription-plan-featured" : ""}`}
            >
              <span className="subscription-plan-name">{plan.name}</span>
              <p>{plan.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="subscription-points">
        <div className="subscription-point">
          <h2>Who this is for</h2>
          <p>{desk.intro[0]}</p>
        </div>
        <div className="subscription-point">
          <h2>Why it matters</h2>
          <p>{desk.intro[1]}</p>
        </div>
        <div className="subscription-point">
          <h2>What happens next</h2>
          <p>
            Start with a conversation, choose the right listing level, and move toward a page that
            makes trust visible earlier.
          </p>
        </div>
      </section>

      {secondaryStories.length > 0 ? (
        <section className="subscription-reading">
          <div className="home-section-heading">
            <p className="section-kicker">Supporting reading</p>
            <h2>Keep the deeper article set, but push it below the conversion moment.</h2>
          </div>
          <div className="subscription-story-grid">
            {secondaryStories.map((story) => (
              <DeskStory key={story.slug} variant={story} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

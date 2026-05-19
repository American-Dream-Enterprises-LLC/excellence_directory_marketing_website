import Image from "next/image";

import { DeviceMockup } from "@/components/device-mockup";
import { YouTubeVideoPreview } from "@/components/youtube-video-preview";
import { campaignOne } from "@/content/campaign-one";
import { credibilityPartners } from "@/content/credibility-partners";
import { homeVideo } from "@/content/home-video";
import { siteFrame } from "@/content/landing-page-data";

const credibilityPartnersTopRow = credibilityPartners.slice(0, 3);
const credibilityPartnersBottomRow = credibilityPartners.slice(3);

function CampaignOfferCta({ className = "" }: { className?: string }) {
  return (
    <a
      className={`home-founders-cta campaign-one-founders-cta ${className}`.trim()}
      href={campaignOne.offer.href}
    >
      <small>{campaignOne.offer.detail}</small>
      <strong>{campaignOne.offer.label}</strong>
    </a>
  );
}

export function DesktopCampaignOnePage() {
  return (
    <main className="home-page campaign-one-page">
      <section className="home-hero">
        <div className="home-hero-visual">
          <Image
            src="/design/hero-atmosphere.png"
            alt="Atmospheric city backdrop for Excellence Directory"
            fill
            priority
            sizes="100vw"
            className="home-hero-image"
          />
          <div className="home-hero-scrim" />
        </div>
        <div className="home-hero-overlay">
          <div className="home-hero-content home-reveal">
            <CampaignOfferCta />
            <p className="home-brand-label">{campaignOne.hero.badgeLine}</p>
            <h1>{campaignOne.hero.heading}</h1>
            <p className="home-hero-body">{campaignOne.hero.dek}</p>
          </div>
          <div className="home-hero-device-column" aria-hidden="true">
            <div className="home-hero-device-cluster">
              <DeviceMockup
                alt="Excellence Directory sign in screen"
                src="/design/mobile-signin.png"
                className="home-hero-phone home-hero-phone-back"
              />
              <DeviceMockup
                alt={campaignOne.hero.imageAlt}
                src="/design/mobile-onboarding-v2.png"
                className="home-hero-phone home-hero-phone-front"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-proof-band campaign-one-benefits">
        <div className="home-proof-copy home-reveal">
          <p className="section-kicker">{siteFrame.brand}</p>
          <h2>{campaignOne.foundingBenefits.heading}</h2>
          <ul className="home-proof-list campaign-one-benefit-list">
            {campaignOne.foundingBenefits.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="home-proof-visuals">
          <DeviceMockup
            alt="Excellence Directory jobs feed view"
            src="/design/jobs-feed.png"
            type="browser"
            className="home-proof-desktop home-reveal-delayed"
          />
          <DeviceMockup
            alt="Excellence Directory mobile sign-in screen"
            src="/design/mobile-signin.png"
            className="home-proof-mobile home-reveal-late"
          />
        </div>
      </section>

      <section className="home-news-section campaign-one-problem-section">
        <div className="home-news-inner">
          <p className="home-news-kicker">{campaignOne.problem.eyebrow}</p>
          <div className="home-news-copy">
            <h2>{campaignOne.problem.heading}</h2>
            <p>{campaignOne.problem.body}</p>
          </div>
        </div>
      </section>

      <section className="campaign-one-visibility-section">
        <div className="campaign-one-visibility-inner">
          <p className="home-news-kicker">{campaignOne.visibility.eyebrow}</p>
          <h2>{campaignOne.visibility.heading}</h2>
          <span>{campaignOne.visibility.body}</span>
          <CampaignOfferCta className="campaign-one-visibility-cta" />
        </div>
      </section>

      <section className="home-credibility">
        <div className="credibility-supported-shell">
          <p className="credibility-supported-label">Supported by</p>
          <div
            className="credibility-partner-rail"
            aria-label="Organizations shown on the live Excellence Directory site"
          >
            {credibilityPartnersTopRow.map((partner) => (
              <a
                key={partner.alt}
                className="credibility-partner-mark"
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  sizes="(min-width: 1080px) 16vw, (min-width: 768px) 28vw, 60vw"
                  className="credibility-partner-logo"
                />
              </a>
            ))}
          </div>
          <div className="credibility-partner-rail credibility-partner-rail-secondary">
            {credibilityPartnersBottomRow.map((partner) => (
              <a
                key={partner.alt}
                className="credibility-partner-mark"
                href={partner.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  sizes="(min-width: 1080px) 18vw, (min-width: 768px) 28vw, 60vw"
                  className="credibility-partner-logo"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-video-section">
        <div className="home-section-heading home-section-heading-centered">
          <h2>{homeVideo.heading}</h2>
        </div>
        <YouTubeVideoPreview
          analyticsSurface="desktop"
          className="home-feature-video"
          title={homeVideo.title}
          videoId={homeVideo.videoId}
          startSeconds={homeVideo.startSeconds}
          posterSrc={homeVideo.posterSrc}
        />
      </section>
    </main>
  );
}

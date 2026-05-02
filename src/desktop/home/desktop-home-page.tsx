import Image from "next/image";

import { DeviceMockup } from "@/components/device-mockup";
import { HomePersonaRotator } from "@/components/home-persona-rotator";
import { YouTubeVideoPreview } from "@/components/youtube-video-preview";
import { credibilityPartners } from "@/content/credibility-partners";
import { homePageCopy, launchWaitlistModal, siteFrame } from "@/content/landing-page-data";
import { homeVideo } from "@/content/home-video";
import { homeNewsMention } from "@/content/news-mentions";

const credibilityPartnersTopRow = credibilityPartners.slice(0, 3);
const credibilityPartnersBottomRow = credibilityPartners.slice(3);
const rotatorProfiles = homePageCopy.personalization.profiles.filter(
  (profile) => profile.showInRotator !== false,
);

export function DesktopHomePage() {
  return (
    <main className="home-page">
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
            <a href={launchWaitlistModal.primaryCta.href} className="home-founders-cta">
              <span>Founders Pricing</span>
              <strong>Early access is open</strong>
            </a>
            <p className="home-brand-label">{siteFrame.brand}</p>
            <h1>Find Christian businesses, jobs, events, and more.</h1>
            <p className="home-hero-body">{homePageCopy.leadStory.dek}</p>
          </div>
          <div className="home-hero-device-column" aria-hidden="true">
            <div className="home-hero-device-cluster">
              <DeviceMockup
                alt="Excellence Directory sign in screen"
                src="/design/mobile-signin.png"
                className="home-hero-phone home-hero-phone-back"
              />
              <DeviceMockup
                alt="Excellence Directory onboarding screen"
                src="/design/mobile-onboarding-v2.png"
                className="home-hero-phone home-hero-phone-front"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-proof-band">
        <div className="home-proof-copy home-reveal">
          <h2>A Christian directory where faith, trust, and opportunity come together.</h2>
          <ul className="home-proof-list">
            <li>Find Christian businesses, churches, jobs, and events you can trust.</li>
            <li>Help your organization get discovered by the right Christian audience.</li>
            <li>Keep biblical values visible, practical, and easy to recognize.</li>
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

      <section className="home-news-section" aria-labelledby="home-news-heading">
        <div className="home-news-inner">
          <p className="home-news-kicker">In the news</p>
          <div className="home-news-copy">
            <p className="home-news-source">
              {homeNewsMention.publication} <span>{homeNewsMention.date}</span>
            </p>
            <h2 id="home-news-heading">{homeNewsMention.title}</h2>
            <p>{homeNewsMention.excerpt}</p>
          </div>
          <a
            href={homeNewsMention.href}
            className="home-news-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            {homeNewsMention.ctaLabel}
          </a>
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

      <section className="home-personalization-preview">
        <HomePersonaRotator profiles={rotatorProfiles} />
      </section>
    </main>
  );
}

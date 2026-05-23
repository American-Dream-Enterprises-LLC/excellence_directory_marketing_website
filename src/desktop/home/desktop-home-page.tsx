import Image from "next/image";

import { DeviceMockup } from "@/components/device-mockup";
import { HomePersonaRotator } from "@/components/home-persona-rotator";
import { YouTubeVideoPreview } from "@/components/youtube-video-preview";
import { credibilityPartners } from "@/content/credibility-partners";
import { homePageCopy, launchWaitlistModal, siteFrame } from "@/content/landing-page-data";
import { homeVideo } from "@/content/home-video";
import { homeNewsMention } from "@/content/news-mentions";
import { teamMembers } from "@/content/team-members";

import { DesktopHomeHero } from "./desktop-home-hero";

const credibilityPartnersTopRow = credibilityPartners.slice(0, 4);
const credibilityPartnersBottomRow = credibilityPartners.slice(4);
const rotatorProfiles = homePageCopy.personalization.profiles.filter(
  (profile) => profile.showInRotator !== false,
);

export function DesktopHomePage() {
  return (
    <main className="home-page">
      <DesktopHomeHero frontImageAlt="Excellence Directory onboarding screen">
        <a href={launchWaitlistModal.primaryCta.href} className="home-founders-cta">
          <span>Founders Pricing</span>
          <strong>Early access is open</strong>
        </a>
        {launchWaitlistModal.secondaryCta ? (
          <a href={launchWaitlistModal.secondaryCta.href} className="home-hero-waitlist-link">
            {launchWaitlistModal.secondaryCta.label}
          </a>
        ) : null}
        <p className="home-brand-label">{siteFrame.brand}</p>
        <h1 className="home-hero-title-home">Find Christian businesses, jobs, events, and more.</h1>
        <p className="home-hero-body">{homePageCopy.leadStory.dek}</p>
      </DesktopHomeHero>

      <section className="home-proof-band">
        <div className="home-proof-copy home-reveal">
          <h2>A Christian directory where faith, trust, and opportunity come together.</h2>
          <ul className="home-proof-list">
            <li>
              Search for Christian businesses, freelancers, churches, and events near you or
              anywhere in the world.
            </li>
            <li>
              Organizations, leverage our SEO and geographic targeting to connect your business
              with faith-based customers in your area.
            </li>
            <li>Explore Christian jobs, Christian employers, or find candidates to hire.</li>
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

      <section className="home-credibility">
        <div className="credibility-supported-shell">
          <p className="credibility-supported-label">Featured organizations</p>
          <div
            className="credibility-partner-rail"
            aria-label="Featured organizations"
          >
            {credibilityPartnersTopRow.map((partner) => {
              const logo = (
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  sizes="(min-width: 1080px) 16vw, (min-width: 768px) 28vw, 60vw"
                  className="credibility-partner-logo"
                />
              );

              return partner.href ? (
                <a
                  key={partner.alt}
                  className="credibility-partner-mark"
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {logo}
                </a>
              ) : (
                <div key={partner.alt} className="credibility-partner-mark">
                  {logo}
                </div>
              );
            })}
          </div>
          <div className="credibility-partner-rail credibility-partner-rail-secondary">
            {credibilityPartnersBottomRow.map((partner) => {
              const logo = (
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  sizes="(min-width: 1080px) 18vw, (min-width: 768px) 28vw, 60vw"
                  className="credibility-partner-logo"
                />
              );

              return partner.href ? (
                <a
                  key={partner.alt}
                  className="credibility-partner-mark"
                  href={partner.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {logo}
                </a>
              ) : (
                <div key={partner.alt} className="credibility-partner-mark">
                  {logo}
                </div>
              );
            })}
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

      <section id="team" className="home-team" aria-labelledby="home-team-heading">
        <div className="home-section-heading home-section-heading-centered">
          <h2 id="home-team-heading">Meet the team</h2>
        </div>
        <div className="home-team-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="home-team-card">
              <div className="home-team-portrait">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-personalization-preview">
        <HomePersonaRotator profiles={rotatorProfiles} />
      </section>
    </main>
  );
}

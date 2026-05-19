import Image from "next/image";

import { DeviceMockup } from "@/components/device-mockup";
import { YouTubeVideoPreview } from "@/components/youtube-video-preview";
import { campaignOne } from "@/content/campaign-one";
import { credibilityPartners } from "@/content/credibility-partners";
import { homeVideo } from "@/content/home-video";

import styles from "./mobile-home-page.module.css";

function CampaignOfferCta({ className = "" }: { className?: string }) {
  return (
    <a
      className={`${styles.foundersCta} ${styles.campaignFoundersCta} ${className}`.trim()}
      href={campaignOne.offer.href}
    >
      <small>{campaignOne.offer.detail}</small>
      <strong>{campaignOne.offer.label}</strong>
    </a>
  );
}

export function MobileCampaignOnePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroPanel} ${styles.campaignHeroPanel}`}>
          <div className={styles.heroCopy}>
            <CampaignOfferCta />
            <p className={styles.heroEyebrow}>{campaignOne.hero.badgeLine}</p>
            <h1 className={`${styles.heroTitle} ${styles.campaignHeroTitle}`}>
              {campaignOne.hero.heading}
            </h1>
            <p className={`${styles.heroBody} ${styles.campaignHeroBody}`}>
              {campaignOne.hero.dek}
            </p>
          </div>
          <div className={`${styles.heroVisual} ${styles.campaignHeroVisual}`}>
            <DeviceMockup
              alt={campaignOne.hero.imageAlt}
              src="/design/mobile-onboarding-v2.png"
              className={styles.heroPreview}
            />
          </div>
        </div>
      </section>

      <section className={styles.campaignBenefits}>
        <p className={styles.newsKicker}>Excellence Directory</p>
        <h2 className={styles.sectionTitle}>{campaignOne.foundingBenefits.heading}</h2>
        <ul>
          {campaignOne.foundingBenefits.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.newsSection} aria-labelledby="mobile-promotions-problem-heading">
        <p className={styles.newsKicker}>{campaignOne.problem.eyebrow}</p>
        <h2 id="mobile-promotions-problem-heading" className={styles.newsTitle}>
          {campaignOne.problem.heading}
        </h2>
        <p className={styles.newsBody}>{campaignOne.problem.body}</p>
      </section>

      <section className={styles.campaignVisibility}>
        <p className={styles.newsKicker}>{campaignOne.visibility.eyebrow}</p>
        <h2 className={styles.sectionTitle}>{campaignOne.visibility.heading}</h2>
        <p>{campaignOne.visibility.body}</p>
        <CampaignOfferCta className={styles.campaignVisibilityCta} />
      </section>

      <section className={styles.videoSection}>
        <h2 className={`${styles.sectionTitle} ${styles.videoTitle}`}>{homeVideo.heading}</h2>
        <YouTubeVideoPreview
          analyticsSurface="mobile"
          className={styles.videoShell}
          title={homeVideo.title}
          videoId={homeVideo.videoId}
          startSeconds={homeVideo.startSeconds}
          posterSrc={homeVideo.posterSrc}
        />
        <CampaignOfferCta className={styles.videoCta} />
      </section>

      <section className={styles.credibilitySection}>
        <p className={styles.sectionKicker}>Supported by</p>
        <div className={styles.partnerGrid}>
          {credibilityPartners.map((partner) => (
            <a
              key={partner.alt}
              className={styles.partner}
              href={partner.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                className={styles.partnerImage}
              />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

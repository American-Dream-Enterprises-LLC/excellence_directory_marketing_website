"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../logo.webp";
import logoSilhouette from "../../../logo_silhouette.png";

import { LaunchWaitlistModal } from "@/components/launch-waitlist-modal";
import { campaignOneOffer, campaignOnePath } from "@/content/campaign-one";
import { homePageCopy, siteFrame } from "@/content/landing-page-data";
import { launchWaitlistModal } from "@/content/landing-page-data";

import { MobileGetStartedModal } from "./mobile-get-started-modal";

import styles from "./mobile-site-chrome.module.css";

type MobileSiteChromeProps = {
  children: React.ReactNode;
};

export function MobileSiteChrome({ children }: MobileSiteChromeProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const headerVisibleRef = useRef(true);
  const pathname = usePathname();
  const isCampaignOne = pathname === campaignOnePath;

  const syncHeaderVisibility = useEffectEvent((nextVisible: boolean) => {
    if (headerVisibleRef.current === nextVisible) {
      return;
    }

    headerVisibleRef.current = nextVisible;
    setIsHeaderVisible(nextVisible);
  });

  const onScroll = useEffectEvent(() => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollYRef.current;

    if (currentScrollY <= 12) {
      syncHeaderVisibility(true);
    } else if (delta > 6) {
      syncHeaderVisibility(false);
    } else if (delta < -6) {
      syncHeaderVisibility(true);
    }

    lastScrollYRef.current = currentScrollY;
  });

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.shell}>
      <header className={`${styles.header}${isHeaderVisible ? "" : ` ${styles.headerHidden}`}`}>
        <div className={styles.masthead}>
          <Link href="/" className={styles.brand}>
            <Image src={logo} alt={siteFrame.brand} className={styles.brandImage} priority />
          </Link>
          <div className={styles.actions}>
            {isCampaignOne ? (
              <a className={styles.campaignCta} href={campaignOneOffer.href}>
                Get Started
              </a>
            ) : (
              <MobileGetStartedModal personalization={homePageCopy.personalization} />
            )}
          </div>
        </div>
      </header>

      <div className={styles.main}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.footerShell}>
          <Image
            src={logoSilhouette}
            alt="Excellence Directory logo"
            className={styles.footerLogo}
          />
          <span className={styles.footerLabel}>EXCELLENCE DIRECTORY</span>
          <p className={styles.footerStatement}>
            Christ-centered discovery should feel trustworthy before the first call, search, or
            introduction.
          </p>
          {isCampaignOne ? (
            <a className={styles.footerCta} href={campaignOneOffer.href}>
              Get Started
            </a>
          ) : (
            <MobileGetStartedModal
              personalization={homePageCopy.personalization}
              className={styles.footerCta}
              ctaSource="mobile-footer"
            />
          )}
        </div>
      </footer>
      <LaunchWaitlistModal modal={launchWaitlistModal} />
    </div>
  );
}

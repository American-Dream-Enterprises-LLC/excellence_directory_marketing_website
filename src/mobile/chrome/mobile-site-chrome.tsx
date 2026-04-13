"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../logo.webp";

import { LaunchWaitlistModal } from "@/components/launch-waitlist-modal";
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
            <MobileGetStartedModal personalization={homePageCopy.personalization} />
          </div>
        </div>
      </header>

      <div className={styles.main}>{children}</div>
      <LaunchWaitlistModal modal={launchWaitlistModal} />
    </div>
  );
}

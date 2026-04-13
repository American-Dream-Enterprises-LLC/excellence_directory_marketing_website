import Image from "next/image";
import Link from "next/link";

import logo from "../../../logo.webp";
import logoSilhouette from "../../../logo_silhouette.png";
import appStoreBadge from "../../../public/platforms/app-store.png";
import googlePlayBadge from "../../../public/platforms/google-play.png";

import { LaunchWaitlistModal } from "@/components/launch-waitlist-modal";
import { launchWaitlistModal, siteFrame } from "@/content/landing-page-data";

type DesktopSiteChromeProps = {
  children: React.ReactNode;
};

export function DesktopSiteChrome({ children }: DesktopSiteChromeProps) {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="site-masthead">
          <Link href="/" className="brand-lockup brand-lockup-left brand-lockup-header">
            <Image src={logo} alt={siteFrame.brand} className="brand-logo-image" priority />
          </Link>
          <span className="site-header-divider" aria-hidden="true" />
          <div className="site-header-actions">
            <a
              className="site-header-button"
              href="https://linktr.ee/excellencebusinessdirectory"
              data-home-cta="header-app-store"
            >
              <Image
                src={appStoreBadge}
                alt="Download on the App Store"
                className="site-header-badge site-header-badge-googleplay"
              />
            </a>
            <a
              className="site-header-button"
              href="https://linktr.ee/excellencebusinessdirectory"
              data-home-cta="header-google-play"
            >
              <Image
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="site-header-badge site-header-badge-appstore"
              />
            </a>
          </div>
        </div>
      </header>
      {children}
      <LaunchWaitlistModal modal={launchWaitlistModal} />
      <footer className="site-footer">
        <div className="footer-cta-shell">
          <Image
            src={logoSilhouette}
            alt="Excellence Directory logo"
            className="footer-cta-logo"
          />
          <span className="footer-cta-label">EXCELLENCE DIRECTORY</span>
          <p className="footer-cta-statement">
            Christ-centered discovery should feel trustworthy before the first call, search, or
            introduction.
          </p>
        </div>
      </footer>
    </div>
  );
}


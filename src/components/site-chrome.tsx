import { DesktopSiteChrome } from "@/desktop/chrome/desktop-site-chrome";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileSiteChrome } from "@/mobile/chrome/mobile-site-chrome";

type SiteChromeProps = {
  children: React.ReactNode;
};

export async function SiteChrome({ children }: SiteChromeProps) {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? (
    <MobileSiteChrome>{children}</MobileSiteChrome>
  ) : (
    <DesktopSiteChrome>{children}</DesktopSiteChrome>
  );
}

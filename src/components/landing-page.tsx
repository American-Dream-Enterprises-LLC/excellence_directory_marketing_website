import { DesktopLandingPage } from "@/desktop/blog/desktop-landing-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileLandingPage } from "@/mobile/blog/mobile-landing-page";
import type { LandingPageVariant } from "@/content/landing-page-data";

type LandingPageProps = {
  variant: LandingPageVariant;
};

export async function LandingPage({ variant }: LandingPageProps) {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? (
    <MobileLandingPage variant={variant} />
  ) : (
    <DesktopLandingPage variant={variant} />
  );
}

import type { Metadata } from "next";

import { campaignOne } from "@/content/campaign-one";
import { DesktopCampaignOnePage } from "@/desktop/home/desktop-campaign-one-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileCampaignOnePage } from "@/mobile/home/mobile-campaign-one-page";

export const metadata: Metadata = {
  title: {
    absolute: campaignOne.metadata.title,
  },
  description: campaignOne.metadata.description,
  alternates: {
    canonical: campaignOne.path,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: campaignOne.metadata.title,
    description: campaignOne.metadata.description,
    url: campaignOne.path,
    type: "website",
  },
};

export default async function PromotionsPage() {
  const deviceView = await getRequestDeviceView();

  if (deviceView === "mobile") {
    return <MobileCampaignOnePage />;
  }

  return <DesktopCampaignOnePage />;
}

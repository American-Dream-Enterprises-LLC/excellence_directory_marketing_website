import type { Metadata } from "next";
import { DesktopHomePage } from "@/desktop/home/desktop-home-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileHomePage } from "@/mobile/home/mobile-home-page";
import { siteFrame } from "@/content/landing-page-data";
import { machinePaths } from "@/content/site-urls";

export const metadata: Metadata = {
  title: { absolute: "Excellence" },
  description: siteFrame.layoutDescription,
  keywords: [
    "Christian directory",
    "Christian businesses",
    "Christian churches",
    "Christian jobs",
    "Christian events",
    "trusted Christian professionals",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/json": [
        {
          title: "Excellence Directory Copy JSON",
          url: machinePaths.copyJson,
        },
      ],
      "text/plain": [
        {
          title: "Excellence Directory LLMs TXT",
          url: machinePaths.llms,
        },
      ],
      "application/rss+xml": [
        {
          title: "Excellence Directory RSS",
          url: machinePaths.rss,
        },
      ],
    },
  },
  openGraph: {
    description: siteFrame.layoutDescription,
    images: [
      {
        alt: `${siteFrame.brand} homepage preview`,
        url: "/design/hero-atmosphere.png",
      },
    ],
    title: siteFrame.brand,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    description: siteFrame.layoutDescription,
    images: ["/design/hero-atmosphere.png"],
    title: siteFrame.brand,
  },
};

export default async function HomePage() {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? <MobileHomePage /> : <DesktopHomePage />;
}

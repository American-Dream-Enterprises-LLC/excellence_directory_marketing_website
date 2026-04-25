import type { Metadata } from "next";
import { DesktopBlogArchivePage } from "@/desktop/blog/desktop-blog-archive-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileBlogArchivePage } from "@/mobile/blog/mobile-blog-archive-page";
import { siteFrame } from "@/content/landing-page-data";
import { machinePaths } from "@/content/site-urls";

const blogDescription =
  "Explore why Excellence exists through Christian discovery articles about trust, work, community, and faith-aligned opportunity.";

export const metadata: Metadata = {
  title: "Why Excellence",
  description: blogDescription,
  alternates: {
    canonical: machinePaths.articleArchive,
    types: {
      "application/json": [
        {
          title: "Excellence Directory Article Index JSON",
          url: machinePaths.articleIndex,
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
    description: blogDescription,
    title: `Why Excellence | ${siteFrame.brand}`,
    type: "website",
    url: machinePaths.articleArchive,
  },
};

export default async function BlogArchivePage() {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? <MobileBlogArchivePage /> : <DesktopBlogArchivePage />;
}

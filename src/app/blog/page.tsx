import type { Metadata } from "next";
import { DesktopBlogArchivePage } from "@/desktop/blog/desktop-blog-archive-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileBlogArchivePage } from "@/mobile/blog/mobile-blog-archive-page";
import { siteFrame } from "@/content/landing-page-data";
import { machinePaths } from "@/content/site-urls";

const blogDescription =
  "Browse the Excellence Directory blog for Christian business, church, ministry, job, coaching, and event content.";

export const metadata: Metadata = {
  title: "Blog",
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
    title: `Blog | ${siteFrame.brand}`,
    type: "website",
    url: machinePaths.articleArchive,
  },
};

export default async function BlogArchivePage() {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? <MobileBlogArchivePage /> : <DesktopBlogArchivePage />;
}

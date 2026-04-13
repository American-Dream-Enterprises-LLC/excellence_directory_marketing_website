import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { siteFrame } from "@/content/landing-page-data";
import { getAbsoluteUrl, getSiteUrl, machinePaths } from "@/content/site-urls";
import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
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
  title: {
    default: `${siteFrame.brand} | ${siteFrame.layoutTitleSuffix}`,
    template: `%s | ${siteFrame.brand}`,
  },
  description: siteFrame.layoutDescription,
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    description: siteFrame.layoutDescription,
    title: siteFrame.brand,
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary",
    description: siteFrame.layoutDescription,
    title: siteFrame.brand,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sameAs = siteFrame.footer.links
    .map((link) => link.href)
    .filter((href) => href.startsWith("http"));

  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmSans.variable}`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                description: siteFrame.mission,
                name: siteFrame.brand,
                sameAs,
                url: getAbsoluteUrl("/"),
              },
              {
                "@type": "WebSite",
                description: siteFrame.layoutDescription,
                name: siteFrame.brand,
                potentialAction: {
                  "@type": "SearchAction",
                  "query-input": "required name=search_term_string",
                  target: getAbsoluteUrl("/search?q={search_term_string}"),
                },
                url: getAbsoluteUrl("/"),
              },
            ],
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

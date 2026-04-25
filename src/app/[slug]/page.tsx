import { notFound, permanentRedirect } from "next/navigation";

import { getBrandBlogPost } from "@/content/brand-blog";
import {
  allLandingPageRouteSlugs,
  getVariant,
} from "@/content/landing-page-data";
import { getArticlePath, getBrandBlogPath } from "@/content/site-urls";

type LegacyVariantPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return allLandingPageRouteSlugs.map((slug) => ({ slug }));
}

export default async function LegacyVariantPage({ params }: LegacyVariantPageProps) {
  const { slug } = await params;
  const variant = getVariant(slug);

  if (!variant) {
    const brandBlogPost = getBrandBlogPost(slug);

    if (brandBlogPost) {
      permanentRedirect(getBrandBlogPath(brandBlogPost.slug));
    }

    notFound();
  }

  permanentRedirect(getArticlePath(variant.slug));
}

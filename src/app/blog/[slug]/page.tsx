import { notFound, permanentRedirect } from "next/navigation";

import { getBrandBlogPostByRouteSlug } from "@/content/brand-blog";
import { getCanonicalVariant } from "@/content/landing-page-data";
import { getArticlePath, getBrandBlogPath } from "@/content/site-urls";

type LegacyBlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyBlogPostPage({ params }: LegacyBlogPostPageProps) {
  const { slug } = await params;
  const brandBlogPost = getBrandBlogPostByRouteSlug(slug);

  if (brandBlogPost) {
    permanentRedirect(getBrandBlogPath(brandBlogPost.routeSlug));
  }

  const whyExcellenceArticle = getCanonicalVariant(slug);

  if (whyExcellenceArticle) {
    permanentRedirect(getArticlePath(whyExcellenceArticle.slug));
  }

  notFound();
}

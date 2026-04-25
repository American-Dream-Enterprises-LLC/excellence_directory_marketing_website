import { notFound, permanentRedirect } from "next/navigation";

import { getBrandBlogPost } from "@/content/brand-blog";
import { getCanonicalVariant } from "@/content/landing-page-data";
import { getArticlePath, getBrandBlogPath } from "@/content/site-urls";

type LegacyBlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyBlogPostPage({ params }: LegacyBlogPostPageProps) {
  const { slug } = await params;
  const whyExcellenceArticle = getCanonicalVariant(slug);

  if (whyExcellenceArticle) {
    permanentRedirect(getArticlePath(whyExcellenceArticle.slug));
  }

  const brandBlogPost = getBrandBlogPost(slug);

  if (brandBlogPost) {
    permanentRedirect(getBrandBlogPath(brandBlogPost.slug));
  }

  notFound();
}

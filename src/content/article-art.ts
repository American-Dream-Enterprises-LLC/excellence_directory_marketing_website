import articleArtData from "./article-art.generated.json";

type PaletteColor = {
  hex: string;
  name: string;
  source: string;
};

type ArticleArtSource = {
  slug: string;
  alt: string;
  promptPath: string;
  sourceImagePath: string;
  publicImagePath: string;
  available: boolean;
  cacheKey?: string | null;
};

type ArticleArtManifest = {
  schemaVersion: number;
  updatedAt: string;
  note: string;
  paletteAnalysis: Record<string, PaletteColor>;
  styleDirection: {
    intent: string;
    visualGoals: string[];
    visualLanguage: string[];
    avoid: string[];
  };
  articles: ArticleArtSource[];
};

export type ArticleArt = ArticleArtSource;

const articleArtManifest = articleArtData as ArticleArtManifest;

export const articleArtUpdatedAt = articleArtManifest.updatedAt;
export const articleArtPalette = articleArtManifest.paletteAnalysis;
export const articleArtStyleDirection = articleArtManifest.styleDirection;
export const articleArtEntries = articleArtManifest.articles;

const articleArtBySlug = new Map(
  articleArtEntries.map((entry) => [entry.slug, entry] as const),
);

export function getArticleArt(slug: string) {
  return articleArtBySlug.get(slug);
}

export function getArticleArtUrl(articleArt: ArticleArt | undefined) {
  if (!articleArt) {
    return null;
  }

  return articleArt.cacheKey
    ? `${articleArt.publicImagePath}?v=${articleArt.cacheKey}`
    : articleArt.publicImagePath;
}

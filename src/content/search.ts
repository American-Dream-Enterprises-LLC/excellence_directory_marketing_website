import {
  landingPageVariants,
  type LandingPageVariant,
} from "@/content/landing-page-data";

export type SearchResult = {
  variant: LandingPageVariant;
  score: number;
};

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSearchTokens(value: string) {
  return normalizeSearchText(value).split(" ").filter(Boolean);
}

function isSubsequence(query: string, candidate: string) {
  let queryIndex = 0;

  for (const character of candidate) {
    if (character === query[queryIndex]) {
      queryIndex += 1;
    }

    if (queryIndex >= query.length) {
      return true;
    }
  }

  return false;
}

function getFieldScore(field: string, query: string, queryTokens: string[]) {
  const normalizedField = normalizeSearchText(field);

  if (!normalizedField) {
    return 0;
  }

  const fieldTokens = normalizedField.split(" ");
  let score = 0;

  if (normalizedField === query) {
    score += 120;
  }

  if (normalizedField.startsWith(query)) {
    score += 80;
  } else if (normalizedField.includes(query)) {
    score += 48;
  }

  for (const token of queryTokens) {
    if (fieldTokens.includes(token)) {
      score += 14;
      continue;
    }

    if (fieldTokens.some((fieldToken) => fieldToken.startsWith(token))) {
      score += 10;
      continue;
    }

    if (token.length >= 4 && fieldTokens.some((fieldToken) => isSubsequence(token, fieldToken))) {
      score += 4;
    }
  }

  return score;
}

export function getSearchResults(query: string, limit = 8) {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = getSearchTokens(query);

  if (!normalizedQuery || queryTokens.length === 0) {
    return landingPageVariants
      .filter((variant) => variant.status === "ready")
      .slice(0, Math.max(1, Math.min(limit, 4)))
      .map((variant) => ({ variant, score: 1 }));
  }

  const results: SearchResult[] = [];

  for (const variant of landingPageVariants) {
    const fields = [
      variant.slug,
      ...variant.legacySlugs,
      variant.navLabel,
      variant.audienceLabel,
      variant.eyebrow,
      variant.headline,
      variant.supportingLine ?? "",
      variant.subheadline,
      ...variant.articleBody,
      variant.thoughtMatch.primaryThought,
      variant.thoughtMatch.instantAnswer,
      ...variant.thoughtMatch.queryVariants,
    ];

    let score = variant.status === "ready" ? 12 : 4;

    for (const field of fields) {
      score += getFieldScore(field, normalizedQuery, queryTokens);
    }

    const slugText = normalizeSearchText(variant.slug);
    if (queryTokens.every((token) => slugText.includes(token))) {
      score += 18;
    }

    if (score > 12) {
      results.push({ variant, score });
    }
  }

  return results.sort((left, right) => right.score - left.score).slice(0, limit);
}

import Link from "next/link";

import {
  getArticleReadTimeLabel,
  getDeskForVariant,
  siteFrame,
} from "@/content/landing-page-data";
import { getSearchResults } from "@/content/search";
import { getArticlePath } from "@/content/site-urls";

type DesktopSearchPageProps = {
  query: string;
};

export function DesktopSearchPage({ query }: DesktopSearchPageProps) {
  const results = getSearchResults(query, 15);

  return (
    <main className="content-stack search-page">
      <section className="section-card">
        <div className="section-heading">
          <p className="section-label">{siteFrame.searchUi.modalEyebrow}</p>
          <h1>Search Excellence</h1>
        </div>
        <form action="/search" className="search-page-form">
          <label htmlFor="search-page-input" className="sr-only">
            {siteFrame.searchUi.inputLabel}
          </label>
          <div className="search-field search-page-field">
            <input
              id="search-page-input"
              name="q"
              type="search"
              defaultValue={query}
              placeholder={siteFrame.searchUi.inputPlaceholder}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </form>
        <p className="search-empty search-page-summary">
          {query
            ? `Showing ${results.length} result${results.length === 1 ? "" : "s"} for “${query}”.`
            : "Search canonical slugs, headlines, questions, and opening paragraphs."}
        </p>
      </section>

      <section className="section-card">
        {results.length > 0 ? (
          <ul className="search-result-list">
            {results.map(({ variant }) => {
              const desk = getDeskForVariant(variant);

              return (
                <li key={variant.slug}>
                  <Link href={getArticlePath(variant.slug)} className="search-result">
                    <div className="search-result-meta">
                      <span className="search-result-slug">
                        {desk?.label ?? "Blog"} · {getArticleReadTimeLabel(variant)}
                      </span>
                      <span className="search-result-slug">{getArticlePath(variant.slug)}</span>
                    </div>
                    <h3>{variant.headline}</h3>
                    <p>{variant.subheadline}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="search-empty">{siteFrame.searchUi.noResults}</p>
        )}
      </section>
    </main>
  );
}


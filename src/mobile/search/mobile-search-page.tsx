import Link from "next/link";

import {
  getArticleReadTimeLabel,
  getDeskForVariant,
  siteFrame,
} from "@/content/landing-page-data";
import { getSearchResults } from "@/content/search";
import { getArticlePath } from "@/content/site-urls";

import styles from "./mobile-search-page.module.css";

type MobileSearchPageProps = {
  query: string;
};

export function MobileSearchPage({ query }: MobileSearchPageProps) {
  const results = getSearchResults(query, 15);

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <p className={styles.eyebrow}>{siteFrame.searchUi.modalEyebrow}</p>
        <h1 className={styles.title}>Search Excellence Directory</h1>
        <form action="/search">
          <label htmlFor="mobile-search-page-input" className="sr-only">
            {siteFrame.searchUi.inputLabel}
          </label>
          <input
            id="mobile-search-page-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={siteFrame.searchUi.inputPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className={styles.field}
          />
        </form>
        <p className={styles.summary}>
          {query
            ? `Showing ${results.length} result${results.length === 1 ? "" : "s"} for “${query}”.`
            : "Search Christian professionals, churches, ministries, jobs, events, and articles by the need already on your mind."}
        </p>
      </section>

      <section className={styles.panel}>
        {results.length > 0 ? (
          <div className={styles.results}>
            {results.map(({ variant }) => {
              const desk = getDeskForVariant(variant);

              return (
                <Link key={variant.slug} href={getArticlePath(variant.slug)} className={styles.result}>
                  <span className={styles.resultMeta}>
                    {desk?.label ?? "Blog"} · {getArticleReadTimeLabel(variant)}
                  </span>
                  <h2 className={styles.resultTitle}>{variant.headline}</h2>
                  <p className={styles.resultBody}>{variant.subheadline}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className={styles.summary}>{siteFrame.searchUi.noResults}</p>
        )}
      </section>
    </main>
  );
}

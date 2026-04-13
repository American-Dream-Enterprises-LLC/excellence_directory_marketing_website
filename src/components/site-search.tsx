"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
} from "react";

import {
  getStatusShortLabel,
  siteFrame,
} from "@/content/landing-page-data";
import { getSearchResults } from "@/content/search";
import { getArticlePath } from "@/content/site-urls";

export function SiteSearch() {
  const searchUi = siteFrame.searchUi;
  const dialogTitleId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = getSearchResults(deferredQuery);

  const closeSearch = useEffectEvent(() => {
    setIsOpen(false);
    setQuery("");
  });

  const openSearch = useEffectEvent(() => {
    setIsOpen(true);
  });

  const onGlobalKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const target = event.target;
    const isTypingTarget =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable);

    if (
      !isTypingTarget &&
      ((event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"))
    ) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (event.key === "Escape") {
      closeSearch();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", onGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span>{searchUi.buttonLabel}</span>
        <kbd>{searchUi.buttonHint}</kbd>
      </button>

      {isOpen ? (
        <div
          className="search-modal-backdrop"
          role="presentation"
          onClick={() => closeSearch()}
        >
          <div
            className="search-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="search-modal-header">
              <div className="search-modal-copy">
                <p className="section-label">{searchUi.modalEyebrow}</p>
                <h2 id={dialogTitleId}>{searchUi.modalHeading}</h2>
                <p>{searchUi.modalBody}</p>
              </div>
              <button
                type="button"
                className="search-close"
                aria-label={searchUi.closeLabel}
                onClick={() => closeSearch()}
              >
                {searchUi.closeLabel}
              </button>
            </div>

            <div className="search-field">
              <label htmlFor={inputId} className="sr-only">
                {searchUi.inputLabel}
              </label>
              <input
                id={inputId}
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchUi.inputPlaceholder}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div className="search-results">
              <p className="section-label">{searchUi.resultsLabel}</p>
              {query.trim() === "" ? (
                <>
                  <p className="search-empty">{searchUi.emptyState}</p>
                  <ul className="search-result-list">
                    {results.map(({ variant }) => (
                      <li key={variant.slug}>
                        <Link
                          href={getArticlePath(variant.slug)}
                          className="search-result"
                          onClick={() => closeSearch()}
                        >
                          <div className="search-result-meta">
                            <span className="search-result-slug">
                              {searchUi.slugLabel}: {getArticlePath(variant.slug)}
                            </span>
                          </div>
                          <h3>{variant.thoughtMatch.primaryThought}</h3>
                          <p>{variant.thoughtMatch.instantAnswer}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : results.length > 0 ? (
                <ul className="search-result-list">
                  {results.map(({ variant }) => (
                    <li key={variant.slug}>
                      <Link
                        href={getArticlePath(variant.slug)}
                        className="search-result"
                        onClick={() => closeSearch()}
                      >
                        <div className="search-result-meta">
                          {variant.status === "draft" ? (
                            <span className="status-badge status-draft">
                              {getStatusShortLabel(variant.status)}
                            </span>
                          ) : null}
                        </div>
                        <h3>{variant.thoughtMatch.primaryThought}</h3>
                        <p>{variant.thoughtMatch.instantAnswer}</p>
                        <p className="search-result-slug">
                          {searchUi.slugLabel}: {getArticlePath(variant.slug)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="search-empty">{searchUi.noResults}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

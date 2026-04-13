"use client";

import { usePathname } from "next/navigation";

import { siteFrame } from "@/content/landing-page-data";

export function ToplineSubtitle() {
  const pathname = usePathname();
  const showToplineSubtitle = pathname === "/";
  const highlightPhrase = "Through Christ.";
  const [subtitleBefore, subtitleAfter] = siteFrame.brandSubtitle.split(highlightPhrase);

  return (
    <span
      className={`site-topline-center${showToplineSubtitle ? "" : " site-topline-center-empty"}`}
      aria-hidden={showToplineSubtitle ? undefined : true}
    >
      {showToplineSubtitle
        ? subtitleAfter !== undefined
          ? (
              <>
                {subtitleBefore}
                <span className="brand-subtitle-highlight">{highlightPhrase}</span>
                {subtitleAfter}
              </>
            )
          : siteFrame.brandSubtitle
        : null}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import type { HomeAudienceProfile } from "@/content/landing-page-data";

const TYPE_DELAY_MS = 56;
const TYPE_SPACE_DELAY_MS = 92;
const SUMMARY_REVEAL_DELAY_MS = 180;
const SUMMARY_HOLD_DELAY_MS = 5200;
const NEXT_PROFILE_DELAY_MS = 220;

type RotationPhase = "holding" | "transitioning" | "typing";

type HomePersonaRotatorProps = {
  profiles: HomeAudienceProfile[];
};

function splitIntoTwoLines(summary: string): [string, string] {
  const words = summary.trim().split(/\s+/);

  if (words.length < 4) {
    return [summary, ""];
  }

  let bestIndex = 1;
  let firstLineLength = words[0]?.length ?? 0;
  let bestDelta = Number.POSITIVE_INFINITY;

  for (let index = 1; index < words.length; index += 1) {
    const remainingWords = words.length - index;

    if (remainingWords === 0) {
      continue;
    }

    const secondLineLength = summary.length - firstLineLength - 1;
    const delta = Math.abs(firstLineLength - secondLineLength);

    if (delta < bestDelta) {
      bestDelta = delta;
      bestIndex = index;
    }

    firstLineLength += (words[index]?.length ?? 0) + 1;
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

export function HomePersonaRotator({ profiles }: HomePersonaRotatorProps) {
  const firstProfile = profiles[0] ?? null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<RotationPhase>("holding");
  const [charIndex, setCharIndex] = useState(firstProfile?.prompt.length ?? 0);
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProfile = profiles[activeIndex] ?? null;
  const typedLabel =
    activeProfile === null ? "" : activeProfile.prompt.slice(0, Math.max(0, charIndex));
  const [typedLineOne = "", typedLineTwo = ""] = typedLabel.split("\n");
  const isSecondLineActive = typedLabel.includes("\n");
  const [summaryLineOne, summaryLineTwo] =
    activeProfile === null ? ["", ""] : splitIntoTwoLines(activeProfile.summary);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);

      return () => {
        mediaQuery.removeEventListener("change", updatePreference);
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!activeProfile) {
      return;
    }

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (prefersReducedMotion || profiles.length < 2) {
      setPhase("holding");
      setCharIndex(activeProfile.prompt.length);
      setIsSummaryVisible(true);
      return;
    }

    if (phase === "holding") {
      setCharIndex(activeProfile.prompt.length);
      setIsSummaryVisible(true);

      timerRef.current = setTimeout(() => {
        setIsSummaryVisible(false);
        setPhase("transitioning");
      }, SUMMARY_HOLD_DELAY_MS);

      return;
    }

    if (phase === "transitioning") {
      timerRef.current = setTimeout(() => {
        setActiveIndex((current) => (current + 1) % profiles.length);
        setCharIndex(0);
        setPhase("typing");
      }, NEXT_PROFILE_DELAY_MS);

      return;
    }

    if (charIndex < activeProfile.prompt.length) {
      const nextCharacter = activeProfile.prompt[charIndex] ?? "";
      const delay =
        nextCharacter === " " || nextCharacter === "\n" ? TYPE_SPACE_DELAY_MS : TYPE_DELAY_MS;

      timerRef.current = setTimeout(() => {
        setCharIndex((current) => current + 1);
      }, delay);

      return;
    }

    timerRef.current = setTimeout(() => {
      setIsSummaryVisible(true);
      setPhase("holding");
    }, SUMMARY_REVEAL_DELAY_MS);
  }, [activeProfile, activeIndex, charIndex, phase, prefersReducedMotion, profiles.length]);

  if (!activeProfile) {
    return null;
  }

  return (
    <div className="home-persona-rotator">
      <div className="home-persona-stage">
        <p className="sr-only" aria-live="polite">
          {activeProfile.label}. {activeProfile.summary}
        </p>
        <h3 className="home-persona-typed-line" aria-hidden="true">
          <span className="home-persona-typed-copy">
            <span
              className={`home-persona-typed-row${
                !isSecondLineActive ? " home-persona-typed-row-active" : ""
              }`}
            >
              {typedLineOne || "\u00A0"}
            </span>
            <span
              className={`home-persona-typed-row${
                isSecondLineActive ? " home-persona-typed-row-active" : ""
              }`}
            >
              {typedLineTwo || "\u00A0"}
            </span>
          </span>
        </h3>
        <div
          className={`home-persona-detail${
            isSummaryVisible ? " home-persona-detail-visible" : ""
          }`}
        >
          <p className="home-persona-summary">
            <span className="home-persona-summary-line">{summaryLineOne}</span>
            {summaryLineTwo ? (
              <span className="home-persona-summary-line">{summaryLineTwo}</span>
            ) : null}
          </p>
          <a
            className="home-button home-button-primary home-persona-cta"
            href="https://linktr.ee/excellencebusinessdirectory"
            data-home-cta="home-final-start"
          >
            GET EXCELLENCE NOW
          </a>
        </div>
      </div>
    </div>
  );
}

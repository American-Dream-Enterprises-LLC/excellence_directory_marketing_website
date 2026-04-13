"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

import type { HomePagePersonalization } from "@/content/landing-page-data";

type HomePersonalizationModalProps = {
  personalization: HomePagePersonalization;
};

export function HomePersonalizationModal({
  personalization,
}: HomePersonalizationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const selectedProfile =
    personalization.profiles.find((profile) => profile.id === selectedProfileId) ?? null;
  const descriptionId = selectedProfile ? "home-personalization-summary" : undefined;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 7000);

    const handleDocumentClick = (event: MouseEvent) => {
      const ctaTarget =
        event.target instanceof Element ? event.target.closest("[data-home-cta]") : null;

      if (!ctaTarget) {
        return;
      }

      window.clearTimeout(timer);
      closeModal();
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeModal() {
    setSelectedProfileId(null);
    setIsOpen(false);
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    closeModal();
  }

  function handleSelectedPanelClick(event: ReactMouseEvent<HTMLElement>) {
    const target = event.target;

    if (!(target instanceof Element)) {
      closeModal();
      return;
    }

    if (target.closest("[data-home-cta]")) {
      return;
    }

    closeModal();
  }

  function handleProfileSelect(profileId: string) {
    setSelectedProfileId(profileId);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="home-personalization-modal" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-personalization-title"
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="home-personalization-dialog"
      >
        <div className="home-personalization-shell">
          <section
            className="home-personalization-panel"
            onClick={selectedProfile ? handleSelectedPanelClick : undefined}
          >
            {selectedProfile ? (
              <>
                <h2 id="home-personalization-title">Excellence can help you:</h2>
                <ul id="home-personalization-summary" className="home-personalization-checkpoints">
                  {selectedProfile.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="home-personalization-actions">
                  <a
                    href={personalization.primaryCta.href}
                    className="home-personalization-primary"
                    data-home-cta="personalization-modal"
                  >
                    {personalization.primaryCta.label}
                  </a>
                </div>
              </>
            ) : (
              <>
                {personalization.modalEyebrow ? (
                  <p className="mini-kicker">{personalization.modalEyebrow}</p>
                ) : null}
                <h2 id="home-personalization-title">{personalization.modalHeading}</h2>
                {personalization.promptLabel ? (
                  <div className="home-personalization-prompt">
                    <p className="home-personalization-prompt-label">
                      {personalization.promptLabel}
                    </p>
                  </div>
                ) : null}
                <div
                  className="home-personalization-checklist"
                  role="radiogroup"
                  aria-label={personalization.promptLabel}
                >
                  {personalization.profiles.map((profile) => (
                    <label
                      key={profile.id}
                      className={`home-personalization-checkbox-row${
                        selectedProfileId === profile.id
                          ? " home-personalization-checkbox-row-active"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="home-personalization-profile"
                        className="home-personalization-checkbox-input"
                        checked={selectedProfileId === profile.id}
                        onChange={() => handleProfileSelect(profile.id)}
                      />
                      <span className="home-personalization-checkbox-label">{profile.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

          </section>
        </div>
      </div>
    </div>
  );
}

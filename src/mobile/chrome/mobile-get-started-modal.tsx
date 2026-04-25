"use client";

import { useEffectEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { HomePagePersonalization } from "@/content/landing-page-data";
import { trackEvent } from "@/lib/analytics";

import styles from "./mobile-get-started-modal.module.css";

type MobileGetStartedModalProps = {
  personalization: HomePagePersonalization;
  className?: string;
  ctaSource?: string;
};

function getMailtoEmail(href: string) {
  if (!href.startsWith("mailto:")) {
    return null;
  }

  return decodeURIComponent(href.replace(/^mailto:/, "").split("?")[0] ?? "");
}

export function MobileGetStartedModal({
  personalization,
  className,
  ctaSource = "mobile-start-selection",
}: MobileGetStartedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const waitlistTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const selectedProfile =
    personalization.profiles.find((profile) => profile.id === selectedProfileId) ?? null;
  const selectedProfileCta = selectedProfile?.cta ?? personalization.primaryCta;
  const selectedProfileEmail = getMailtoEmail(selectedProfileCta.href);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSelectedProfileId(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProfileId(null);
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openWaitlistModal = useEffectEvent(() => {
    setSelectedProfileId(null);
    setIsOpen(false);
    window.setTimeout(() => {
      waitlistTriggerRef.current?.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    }, 0);
  });

  const handleProfileSelect = useEffectEvent((profileId: string) => {
    trackEvent("persona_selected", {
      profile_id: profileId,
      source: ctaSource,
      surface: "mobile",
    });

    const profile = personalization.profiles.find((item) => item.id === profileId);

    if (profile?.cta || profile?.detailHeading || profile?.detailBody) {
      setSelectedProfileId(profileId);
      return;
    }

    openWaitlistModal();
  });

  return (
    <>
      <button
        type="button"
        className={[styles.trigger, styles.triggerPrimary, className].filter(Boolean).join(" ")}
        onClick={() => {
          trackEvent("get_started_modal_open", {
            source: ctaSource,
            surface: "mobile",
          });
          setIsOpen(true);
        }}
      >
        {personalization.primaryCta.label}
      </button>
      <a
        ref={waitlistTriggerRef}
        href={personalization.primaryCta.href}
        data-home-cta={ctaSource}
        className={styles.waitlistTrigger}
        aria-hidden="true"
        tabIndex={-1}
      >
        Open waitlist
      </a>

      {isOpen && isMounted
        ? createPortal(
            <div
              className={styles.overlay}
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedProfileId(null);
                  setIsOpen(false);
                }
              }}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-start-title"
                tabIndex={-1}
                className={styles.dialog}
              >
                <div className={styles.topbar}>
                  {selectedProfile ? (
                    <button
                      type="button"
                      className={styles.back}
                      onClick={() => {
                        setSelectedProfileId(null);
                      }}
                    >
                      Back
                    </button>
                  ) : (
                    <span className={styles.topbarSpacer} aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="Close"
                    onClick={() => {
                      setSelectedProfileId(null);
                      setIsOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>

                <div className={styles.headingBlock}>
                  <h2 id="mobile-start-title" className={styles.title}>
                    {selectedProfile
                      ? selectedProfile.detailHeading ?? selectedProfile.headline
                      : personalization.modalHeading}
                  </h2>
                </div>

                {selectedProfile ? (
                  <div className={styles.detail}>
                    {selectedProfile.detailBody ? (
                      <p className={styles.detailBody}>{selectedProfile.detailBody}</p>
                    ) : null}
                    {selectedProfileEmail ? (
                      <div className={styles.detailContact}>
                        <p className={styles.detailContactLabel}>Email us at</p>
                        <a
                          href={selectedProfileCta.href}
                          className={styles.detailContactLink}
                          onClick={() => {
                            trackEvent("partnership_contact_click", {
                              destination: selectedProfileCta.href,
                              profile_id: selectedProfile.id,
                              source: ctaSource,
                              surface: "mobile",
                            });
                          }}
                        >
                          {selectedProfileEmail}
                        </a>
                      </div>
                    ) : null}
                    <ul className={styles.detailBullets}>
                      {selectedProfile.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className={styles.detailActions}>
                      {selectedProfile.cta ? (
                        <a
                          href={selectedProfile.cta.href}
                          className={styles.detailAction}
                          onClick={() => {
                            trackEvent("partnership_contact_click", {
                              destination: selectedProfile.cta?.href,
                              profile_id: selectedProfile.id,
                              source: ctaSource,
                              surface: "mobile",
                            });
                            setSelectedProfileId(null);
                            setIsOpen(false);
                          }}
                        >
                          {selectedProfile.cta.label}
                        </a>
                      ) : (
                        <button type="button" className={styles.detailAction} onClick={openWaitlistModal}>
                          {personalization.primaryCta.label}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.options}
                    role="group"
                    aria-label={personalization.modalHeading}
                  >
                    {personalization.profiles.map((profile) => (
                      <button
                        key={profile.id}
                        type="button"
                        className={styles.option}
                        onClick={() => handleProfileSelect(profile.id)}
                      >
                        <span className={styles.optionLabel}>{profile.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

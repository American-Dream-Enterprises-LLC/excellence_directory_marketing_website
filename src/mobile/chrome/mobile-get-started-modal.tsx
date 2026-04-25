"use client";

import { useEffectEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { HomePagePersonalization } from "@/content/landing-page-data";
import { trackEvent } from "@/lib/analytics";
import { copyTextToClipboard } from "@/lib/clipboard";

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
  const [isEmailCopied, setIsEmailCopied] = useState(false);
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
      setIsEmailCopied(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProfileId(null);
        setIsEmailCopied(false);
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
    setIsEmailCopied(false);
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
    setIsEmailCopied(false);

    if (profile?.cta || profile?.detailHeading || profile?.detailBody) {
      setSelectedProfileId(profileId);
      return;
    }

    openWaitlistModal();
  });

  const handleCopyEmail = useEffectEvent(async (copySource: string) => {
    if (!selectedProfileEmail) {
      return;
    }

    try {
      const didCopy = await copyTextToClipboard(selectedProfileEmail);
      setIsEmailCopied(didCopy);

      if (didCopy) {
        trackEvent("partnership_email_copy", {
          copy_source: copySource,
          email: selectedProfileEmail,
          profile_id: selectedProfile?.id,
          source: ctaSource,
          surface: "mobile",
        });
      }
    } catch {
      setIsEmailCopied(false);
    }
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
                  setIsEmailCopied(false);
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
                        setIsEmailCopied(false);
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
                      setIsEmailCopied(false);
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
                      <button
                        type="button"
                        className={styles.detailContact}
                        onClick={() => {
                          void handleCopyEmail("contact_email");
                        }}
                      >
                        <p className={styles.detailContactLabel} aria-live="polite">
                          {isEmailCopied ? "Copied to clipboard" : "Email us at"}
                        </p>
                        <span className={styles.detailContactLink}>
                          {selectedProfileEmail}
                        </span>
                      </button>
                    ) : null}
                    <ul className={styles.detailBullets}>
                      {selectedProfile.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className={styles.detailActions}>
                      {selectedProfileEmail ? (
                        <button
                          type="button"
                          className={styles.detailAction}
                          onClick={() => {
                            void handleCopyEmail("write_to_us_cta");
                          }}
                        >
                          {isEmailCopied ? "Email Copied" : selectedProfileCta.label}
                        </button>
                      ) : selectedProfile.cta ? (
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
                            setIsEmailCopied(false);
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

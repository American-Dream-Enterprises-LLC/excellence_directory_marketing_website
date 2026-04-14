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

export function MobileGetStartedModal({
  personalization,
  className,
  ctaSource = "mobile-start-selection",
}: MobileGetStartedModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const waitlistTriggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
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
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleProfileSelect = useEffectEvent((profileId: string) => {
    trackEvent("persona_selected", {
      profile_id: profileId,
      source: ctaSource,
      surface: "mobile",
    });
    setIsOpen(false);
    window.setTimeout(() => {
      waitlistTriggerRef.current?.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    }, 0);
  });

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${styles.triggerPrimary}${className ? ` ${className}` : ""}`}
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
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="Close"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>

                <div className={styles.headingBlock}>
                  <h2 id="mobile-start-title" className={styles.title}>
                    {personalization.modalHeading}
                  </h2>
                </div>

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
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

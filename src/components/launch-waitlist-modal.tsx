"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

import type { LaunchWaitlistModal as LaunchWaitlistModalCopy } from "@/content/landing-page-data";
import { trackEvent } from "@/lib/analytics";

type LaunchWaitlistModalProps = {
  modal: LaunchWaitlistModalCopy;
};

export function LaunchWaitlistModal({ modal }: LaunchWaitlistModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerSource, setTriggerSource] = useState("unknown");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const waitlistCta = modal.secondaryCta;

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const ctaTarget =
        event.target instanceof Element ? event.target.closest("[data-home-cta]") : null;

      if (!(ctaTarget instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();
      const source = ctaTarget.dataset.homeCta ?? "unknown";
      setTriggerSource(source);
      trackEvent("waitlist_modal_open", {
        source,
      });
      setIsOpen(true);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
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

      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return;
    }

    setIsOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="launch-waitlist-modal" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-waitlist-title"
        aria-describedby="launch-waitlist-body"
        tabIndex={-1}
        className="launch-waitlist-dialog"
      >
        <section className="launch-waitlist-panel">
          <p className="mini-kicker">{modal.eyebrow}</p>
          <h2 id="launch-waitlist-title">{modal.heading}</h2>
          <p id="launch-waitlist-body">{modal.body}</p>
          <div className="launch-waitlist-actions">
            <a
              href={modal.primaryCta.href}
              className="home-button home-button-primary"
              onClick={() => {
                trackEvent("early_access_pricing_click", {
                  destination: modal.primaryCta.href,
                  source: triggerSource,
                });
              }}
            >
              {modal.primaryCta.label}
            </a>
            {waitlistCta ? (
              <>
                <div className="launch-waitlist-divider" aria-hidden="true">
                  <span>or</span>
                </div>
                <a
                  href={waitlistCta.href}
                  className="home-button launch-waitlist-secondary"
                  onClick={() => {
                    trackEvent("waitlist_continue_click", {
                      cta: "waitlist",
                      destination: waitlistCta.href,
                      source: triggerSource,
                    });
                  }}
                >
                  {waitlistCta.label}
                </a>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import { trackEvent } from "@/lib/analytics";

import { OPEN_PARTNERSHIP_MODAL_EVENT } from "./partnership-modal-events";

export function PartnershipFooterCta() {
  return (
    <button
      type="button"
      className="footer-partnership-cta"
      onClick={() => {
        trackEvent("partnership_footer_cta_click", {
          source: "desktop_footer",
          surface: "desktop",
        });
        window.dispatchEvent(new CustomEvent(OPEN_PARTNERSHIP_MODAL_EVENT));
      }}
    >
      Partner with Us
    </button>
  );
}

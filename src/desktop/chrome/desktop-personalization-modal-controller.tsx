"use client";

import { usePathname } from "next/navigation";

import { HomePersonalizationModal } from "@/components/home-personalization-modal";
import {
  OPEN_PARTNERSHIP_MODAL_EVENT,
  PARTNERSHIP_PROFILE_ID,
} from "@/components/partnership-modal-events";
import type { HomePagePersonalization } from "@/content/landing-page-data";

type DesktopPersonalizationModalControllerProps = {
  personalization: HomePagePersonalization;
};

function shouldAutoOpenPersonalizationModal(pathname: string | null) {
  return (
    pathname === "/" ||
    pathname === "/why-excellence" ||
    pathname?.startsWith("/why-excellence/")
  );
}

export function DesktopPersonalizationModalController({
  personalization,
}: DesktopPersonalizationModalControllerProps) {
  const pathname = usePathname();

  return (
    <HomePersonalizationModal
      autoOpenDelayMs={shouldAutoOpenPersonalizationModal(pathname) ? 7000 : null}
      openEventName={OPEN_PARTNERSHIP_MODAL_EVENT}
      openEventProfileId={PARTNERSHIP_PROFILE_ID}
      personalization={personalization}
    />
  );
}

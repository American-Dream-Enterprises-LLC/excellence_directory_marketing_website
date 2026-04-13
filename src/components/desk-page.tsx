import type { Metadata } from "next";

import {
  DesktopDeskPage,
  getDeskPageMetadata,
} from "@/desktop/desks/desktop-desk-page";
import { getRequestDeviceView } from "@/lib/device-view";
import { MobileDeskPage } from "@/mobile/desks/mobile-desk-page";

type DeskPageProps = {
  deskSlug: string;
};

export { getDeskPageMetadata };

export async function DeskPage({ deskSlug }: DeskPageProps) {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? (
    <MobileDeskPage deskSlug={deskSlug} />
  ) : (
    <DesktopDeskPage deskSlug={deskSlug} />
  );
}

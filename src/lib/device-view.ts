import { headers } from "next/headers";
import { cache } from "react";

export type DeviceView = "desktop" | "mobile";

const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|bingpreview|facebookexternalhit|linkedinbot|slurp|duckduckbot|whatsapp/i;
const TABLET_USER_AGENT_PATTERN =
  /ipad|tablet|kindle|silk|playbook|sm-t|nexus 7|nexus 9|android(?!.*mobile)/i;
const MOBILE_USER_AGENT_PATTERN =
  /iphone|ipod|android.+mobile|windows phone|blackberry|bb10|iemobile|opera mini|mobile/i;

function detectDeviceViewFromHeaders(
  userAgent: string | null,
  mobileClientHint: string | null,
): DeviceView {
  const normalizedUserAgent = userAgent ?? "";

  if (BOT_USER_AGENT_PATTERN.test(normalizedUserAgent)) {
    return "desktop";
  }

  if (TABLET_USER_AGENT_PATTERN.test(normalizedUserAgent)) {
    return "desktop";
  }

  if (mobileClientHint === "?1") {
    return "mobile";
  }

  return MOBILE_USER_AGENT_PATTERN.test(normalizedUserAgent) ? "mobile" : "desktop";
}

export const getRequestDeviceView = cache(async (): Promise<DeviceView> => {
  const requestHeaders = await headers();

  return detectDeviceViewFromHeaders(
    requestHeaders.get("user-agent"),
    requestHeaders.get("sec-ch-ua-mobile"),
  );
});


"use client";

import { track } from "@vercel/analytics";

type AnalyticsPrimitive = boolean | null | number | string | undefined;

export function trackEvent(
  name: string,
  properties?: Record<string, AnalyticsPrimitive>,
) {
  track(name, properties);
}

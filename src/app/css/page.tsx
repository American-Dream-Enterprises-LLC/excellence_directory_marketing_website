import type { Metadata } from "next";

import { CssTuningPanel } from "@/components/css-tuning-panel";

export const metadata: Metadata = {
  title: {
    absolute: "CSS Tuner | Excellence",
  },
  robots: {
    follow: false,
    index: false,
  },
};

export default function CssTuningPage() {
  return <CssTuningPanel />;
}

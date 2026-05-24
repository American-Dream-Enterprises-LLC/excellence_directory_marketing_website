"use client";

import { useEffect } from "react";

import {
  cssTuningBroadcastChannel,
  cssTuningControls,
  cssTuningStorageKey,
  cssTuningUpdateEvent,
  getDefaultCssTuningValues,
  normalizeCssTuningValues,
  type CssTuningValues,
} from "@/lib/css-tuning";

function readStoredValues(): CssTuningValues {
  try {
    const raw = window.localStorage.getItem(cssTuningStorageKey);

    return raw ? normalizeCssTuningValues(JSON.parse(raw) as CssTuningValues) : getDefaultCssTuningValues();
  } catch {
    return getDefaultCssTuningValues();
  }
}

function applyCssTuning(values: CssTuningValues) {
  for (const control of cssTuningControls) {
    const value = values[control.id] || control.defaultValue;

    document.querySelectorAll<HTMLElement>(control.selector).forEach((element) => {
      element.style.setProperty(control.property, value);
    });
  }
}

export function CssTuningRuntime() {
  useEffect(() => {
    let currentValues = readStoredValues();
    applyCssTuning(currentValues);

    const channel =
      typeof BroadcastChannel === "undefined"
        ? null
        : new BroadcastChannel(cssTuningBroadcastChannel);

    const handleMessage = (event: MessageEvent<CssTuningValues>) => {
      currentValues = normalizeCssTuningValues(event.data);
      applyCssTuning(currentValues);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== cssTuningStorageKey) {
        return;
      }

      currentValues = readStoredValues();
      applyCssTuning(currentValues);
    };

    const handleLocalUpdate = (event: Event) => {
      currentValues = normalizeCssTuningValues(
        (event as CustomEvent<CssTuningValues>).detail ?? readStoredValues(),
      );
      applyCssTuning(currentValues);
    };

    const observer = new MutationObserver(() => applyCssTuning(currentValues));
    observer.observe(document.body, { childList: true, subtree: true });
    channel?.addEventListener("message", handleMessage);
    window.addEventListener(cssTuningUpdateEvent, handleLocalUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      channel?.removeEventListener("message", handleMessage);
      channel?.close();
      window.removeEventListener(cssTuningUpdateEvent, handleLocalUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
}

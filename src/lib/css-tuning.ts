export const cssTuningStorageKey = "excellence-css-tuning-v2";
export const cssTuningBroadcastChannel = "excellence-css-tuning";
export const cssTuningUpdateEvent = "excellence-css-tuning:update";

export type CssTuningControl = {
  id: string;
  label: string;
  selector: string;
  property: `--${string}`;
  defaultValue: string;
  placeholder: string;
  group: string;
};

export type CssTuningValues = Record<string, string>;

export const cssTuningControls = [
  {
    id: "home-hero-overlay-top-padding",
    label: "Hero overlay top padding",
    selector: ".home-hero",
    property: "--home-hero-inner-padding-top",
    defaultValue: "0",
    placeholder: "0",
    group: "Hero overlay",
  },
  {
    id: "home-hero-overlay-bottom-padding",
    label: "Hero overlay bottom padding",
    selector: ".home-hero",
    property: "--home-hero-inner-padding-bottom",
    defaultValue: "0",
    placeholder: "0",
    group: "Hero overlay",
  },
  {
    id: "home-hero-max-height",
    label: "Hero max height",
    selector: ".home-hero",
    property: "--home-hero-max-height",
    defaultValue: "70svh",
    placeholder: "70svh",
    group: "Hero frame",
  },
  {
    id: "home-hero-content-max-height",
    label: "Hero content max height",
    selector: ".home-hero",
    property: "--home-hero-desktop-content-max-height",
    defaultValue: "400px",
    placeholder: "400px",
    group: "Hero content",
  },
  {
    id: "home-hero-content-size",
    label: "Hero content font size",
    selector: ".home-hero",
    property: "--home-hero-desktop-content-font-size",
    defaultValue: "0.88rem",
    placeholder: "0.88rem",
    group: "Hero content",
  },
  {
    id: "home-hero-heading-size",
    label: "Hero heading size",
    selector: ".home-hero",
    property: "--home-hero-desktop-heading-size-fluid",
    defaultValue: "3.52vw",
    placeholder: "3.52vw",
    group: "Hero content",
  },
  {
    id: "home-hero-content-width",
    label: "Hero content width",
    selector: ".home-hero",
    property: "--home-hero-desktop-content-width",
    defaultValue: "min(29.92vw, 26.4rem)",
    placeholder: "min(29.92vw, 26.4rem)",
    group: "Hero content",
  },
  {
    id: "home-hero-device-max-width",
    label: "Device max width",
    selector: ".home-hero",
    property: "--home-hero-desktop-device-max-width",
    defaultValue: "173.355px",
    placeholder: "173.355px",
    group: "Hero devices",
  },
  {
    id: "home-hero-device-width",
    label: "Device width",
    selector: ".home-hero",
    property: "--home-hero-desktop-device-width",
    defaultValue: "min(20.124vw, 13.158rem)",
    placeholder: "min(20.124vw, 13.158rem)",
    group: "Hero devices",
  },
  {
    id: "home-hero-device-offset",
    label: "Device column offset",
    selector: ".home-hero",
    property: "--home-hero-desktop-device-offset-y",
    defaultValue: "-0.85rem",
    placeholder: "-0.85rem",
    group: "Hero devices",
  },
] as const satisfies readonly CssTuningControl[];

export function getDefaultCssTuningValues(): CssTuningValues {
  return Object.fromEntries(
    cssTuningControls.map((control) => [control.id, control.defaultValue]),
  );
}

export function normalizeCssTuningValues(values: CssTuningValues): CssTuningValues {
  const defaults = getDefaultCssTuningValues();

  return Object.fromEntries(
    cssTuningControls.map((control) => {
      const value = values[control.id]?.trim();

      return [control.id, value || defaults[control.id]];
    }),
  );
}

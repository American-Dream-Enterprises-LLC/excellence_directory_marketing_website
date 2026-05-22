import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

import { DeviceMockup } from "@/components/device-mockup";

type HeroSpacingValue =
  | `${number}%`
  | `-${number}%`
  | `${number}rem`
  | `-${number}rem`
  | `${number}px`
  | `-${number}px`
  | `calc(${string})`;
type HeroSizeValue =
  | `${number}svh`
  | `${number}vh`
  | `${number}rem`
  | `${number}px`
  | `calc(${string})`;

export type DesktopHomeHeroLayout = {
  heightScale: number;
  maxHeight: HeroSizeValue;
  innerPaddingTop: HeroSpacingValue;
  innerPaddingBottom: HeroSpacingValue;
  contentMaxHeightPx: number;
  contentScale: number;
  deviceMaxHeightPx: number;
  deviceScale: number;
  deviceOffsetY: HeroSpacingValue;
};

type DesktopHomeHeroStyle = CSSProperties & {
  "--home-hero-min-height": string;
  "--home-hero-max-height": HeroSizeValue;
  "--home-hero-inner-padding-top": HeroSpacingValue;
  "--home-hero-inner-padding-bottom": HeroSpacingValue;
  "--home-hero-desktop-content-max-height": string;
  "--home-hero-desktop-content-font-size": string;
  "--home-hero-desktop-content-width": string;
  "--home-hero-desktop-content-width-narrow": string;
  "--home-hero-desktop-device-max-width": string;
  "--home-hero-desktop-device-width": string;
  "--home-hero-desktop-device-width-narrow": string;
  "--home-hero-desktop-device-offset-y": HeroSpacingValue;
  "--home-hero-desktop-heading-size-fluid": string;
};

const PHONE_ASPECT_WIDTH = 9;
const PHONE_ASPECT_HEIGHT = 19.5;
const PHONE_BACK_ROTATION_DEGREES = 10;
const PHONE_FRONT_ROTATION_DEGREES = 7;

export const desktopHomeHeroLayout = {
  heightScale: 1.04,
  maxHeight: "70svh",
  innerPaddingTop: "5%",
  innerPaddingBottom: "calc(8% + 10px)",
  contentMaxHeightPx: 400,
  contentScale: 0.88,
  deviceMaxHeightPx: 400,
  deviceScale: 0.86,
  deviceOffsetY: "-0.85rem",
} satisfies DesktopHomeHeroLayout;

type DesktopHomeHeroProps = {
  children: ReactNode;
  backImageSrc?: string;
  frontImageSrc?: string;
  frontImageAlt: string;
  layout?: DesktopHomeHeroLayout;
};

function formatScaledCssValue(value: number): string {
  return Number(value.toFixed(3)).toString();
}

function scaledRem(value: number, scale: number): string {
  return `${formatScaledCssValue(value * scale)}rem`;
}

function scaledVw(value: number, scale: number): string {
  return `${formatScaledCssValue(value * scale)}vw`;
}

function phoneMaxWidthFromHeight(maxHeightPx: number): string {
  const heightRatio = PHONE_ASPECT_HEIGHT / PHONE_ASPECT_WIDTH;
  const rotatedHeightToWidthRatios = [PHONE_BACK_ROTATION_DEGREES, PHONE_FRONT_ROTATION_DEGREES].map(
    (degrees) => {
      const radians = (degrees * Math.PI) / 180;

      return heightRatio * Math.cos(radians) + Math.sin(radians);
    },
  );
  const visualHeightToWidthRatio = Math.max(...rotatedHeightToWidthRatios);

  return `${formatScaledCssValue(maxHeightPx / visualHeightToWidthRatio)}px`;
}

function getDesktopHomeHeroStyle(layout: DesktopHomeHeroLayout): DesktopHomeHeroStyle {
  return {
    "--home-hero-min-height": `calc((100svh - var(--home-hero-header-offset)) * ${layout.heightScale})`,
    "--home-hero-max-height": layout.maxHeight,
    "--home-hero-inner-padding-top": layout.innerPaddingTop,
    "--home-hero-inner-padding-bottom": layout.innerPaddingBottom,
    "--home-hero-desktop-content-max-height": `${layout.contentMaxHeightPx}px`,
    "--home-hero-desktop-content-font-size": scaledRem(1, layout.contentScale),
    "--home-hero-desktop-content-width": `min(${scaledVw(34, layout.contentScale)}, ${scaledRem(30, layout.contentScale)})`,
    "--home-hero-desktop-content-width-narrow": `min(${scaledVw(44, layout.contentScale)}, ${scaledRem(24, layout.contentScale)})`,
    "--home-hero-desktop-device-max-width": phoneMaxWidthFromHeight(layout.deviceMaxHeightPx),
    "--home-hero-desktop-device-width": `min(${scaledVw(23.4, layout.deviceScale)}, ${scaledRem(15.3, layout.deviceScale)})`,
    "--home-hero-desktop-device-width-narrow": `min(${scaledVw(27.9, layout.deviceScale)}, ${scaledRem(13.5, layout.deviceScale)})`,
    "--home-hero-desktop-device-offset-y": layout.deviceOffsetY,
    "--home-hero-desktop-heading-size-fluid": scaledVw(4, layout.contentScale),
  };
}

export function DesktopHomeHero({
  backImageSrc = "/design/mobile-signin-hero-crop.png",
  children,
  frontImageSrc = "/design/mobile-onboarding-hero-crop.png",
  frontImageAlt,
  layout = desktopHomeHeroLayout,
}: DesktopHomeHeroProps) {
  return (
    <section className="home-hero" style={getDesktopHomeHeroStyle(layout)}>
      <div className="home-hero-visual">
        <Image
          src="/design/hero-atmosphere.png"
          alt="Atmospheric city backdrop for Excellence Directory"
          fill
          priority
          sizes="100vw"
          className="home-hero-image"
        />
        <div className="home-hero-scrim" />
      </div>
      <div className="home-hero-overlay">
        <div className="home-hero-content home-reveal">{children}</div>
        <div className="home-hero-device-column" aria-hidden="true">
          <div className="home-hero-device-cluster">
            <DeviceMockup
              alt="Excellence Directory sign in screen"
              src={backImageSrc}
              className="home-hero-phone home-hero-phone-back"
            />
            <DeviceMockup
              alt={frontImageAlt}
              src={frontImageSrc}
              className="home-hero-phone home-hero-phone-front"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

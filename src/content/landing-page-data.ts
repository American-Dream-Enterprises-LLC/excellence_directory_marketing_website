import copyData from "./copy.generated.json";

export type CallToAction = {
  label: string;
  href: string;
};

export type InlineBlogCta = {
  body: string;
  href: string;
  linkLabel: string;
};

type CallToActionCopy = {
  label: string;
  href?: string;
  mailtoSubject?: string;
};

type LaunchWaitlistModalSource = {
  eyebrow: string;
  heading: string;
  body: string;
  primaryCta: CallToActionCopy;
  secondaryCta?: CallToActionCopy;
};

export type VariantStatus = "ready" | "draft";

type FooterLink = {
  label: string;
  href: string;
};

type Scripture = {
  text: string;
  citation: string;
};

type ThoughtMatch = {
  primaryThought: string;
  queryVariants: string[];
  instantAnswer: string;
  slugRationale: string;
};

type ValueCard = {
  title: string;
  body: string;
};

type NavigationDeskSource = {
  label: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subheadline: string;
  intro: string[];
  slugs: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type SiteFrame = {
  brand: string;
  shortBrand: string;
  brandMark: string;
  brandSubtitle: string;
  homepageDirection: string;
  mission: string;
  contentSourcePath: string;
  sourceNotes: string[];
  deskNavigation: {
    topicsLabel: string;
    desks: NavigationDeskSource[];
  };
  searchUi: {
    buttonLabel: string;
    buttonHint: string;
    closeLabel: string;
    modalEyebrow: string;
    modalHeading: string;
    modalBody: string;
    inputLabel: string;
    inputPlaceholder: string;
    emptyState: string;
    noResults: string;
    resultsLabel: string;
    slugLabel: string;
  };
  platformSellingPoints: string[];
  trustPillars: string[];
  layoutTitleSuffix: string;
  layoutDescription: string;
  waitlistModal: LaunchWaitlistModalSource;
  footer: {
    label: string;
    body: string;
    links: FooterLink[];
  };
};

type LandingPageUi = {
  statusLabels: {
    readyLong: string;
    draftLong: string;
    readyShort: string;
    draftShort: string;
  };
  routeLabel: string;
  legacySlugsLabel: string;
  sourceStateLabel: string;
  sourceHeadingPrefix: string;
  thoughtMatchLabel: string;
  thoughtMatchHeading: string;
  primaryThoughtLabel: string;
  instantAnswerLabel: string;
  queryVariantsLabel: string;
  corePromiseLabel: string;
  corePromiseHeadingTemplate: string;
  sharedHooksLabel: string;
  sharedHooksHeading: string;
  directLinesLabel: string;
  directLinesHeading: string;
  closingSequenceLabel: string;
  closingSequenceHeading: string;
  faqLabel: string;
  faqHeading: string;
  alternateVariantsLabel: string;
  alternateVariantsHeading: string;
  openVariantLabel: string;
};

type HomePageSection = {
  label: string;
  heading: string;
  linkLabel: string;
  slugs: string[];
};

export type HomeAudienceProfile = {
  id: string;
  label: string;
  promptLines: {
    line1: string;
    line2?: string;
  };
  prompt: string;
  summary: string;
  headline: string;
  body: string;
  detailHeading?: string;
  detailBody?: string;
  cta?: CallToAction;
  showInRotator?: boolean;
  bullets: string[];
};

type HomeAudienceProfileSource = Omit<HomeAudienceProfile, "prompt" | "cta"> & {
  prompt?: string;
  cta?: CallToActionCopy;
};

type HomePagePersonalizationSource = {
  sectionLabel: string;
  sectionHeading: string;
  sectionBody: string;
  modalEyebrow: string;
  modalHeading: string;
  modalBody: string;
  promptLabel: string;
  emptyState: string;
  dismissLabel: string;
  primaryCta: CallToActionCopy;
  profiles: HomeAudienceProfileSource[];
};

type HomePageCopySource = {
  primaryVariantSlug: string;
  leadStory: {
    eyebrow: string;
    headline: string;
    dek: string;
    body: string[];
    primaryCtaLabel: string;
    secondaryCta: CallToActionCopy;
  };
  personalization: HomePagePersonalizationSource;
  featured: HomePageSection;
  desks: HomePageSection[];
  briefing: {
    label: string;
    heading: string;
    items: ValueCard[];
  };
  rail: {
    label: string;
    heading: string;
    cards: ValueCard[];
  };
};

type NotFoundPageCopySource = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: CallToActionCopy;
};

type LandingPageVariantCopy = {
  slug: string;
  legacySlugs?: string[];
  navLabel: string;
  audienceLabel: string;
  status: VariantStatus;
  sourceHeading: string;
  statusNote: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  supportingLine?: string;
  subheadline: string;
  articleBody: string[];
  thoughtMatch: ThoughtMatch;
  scripture?: Scripture;
  promiseBullets?: string[];
  valueCards?: ValueCard[];
  fitSignals?: string[];
  faq?: FaqItem[];
  closingLines?: string[];
  primaryCta: CallToActionCopy;
  secondaryCta: CallToActionCopy;
};

export type HomePagePersonalization = Omit<
  HomePagePersonalizationSource,
  "primaryCta" | "profiles"
> & {
  primaryCta: CallToAction;
  profiles: HomeAudienceProfile[];
};

export type HomePageCopy = {
  primaryVariantSlug: string;
  leadStory: {
    eyebrow: string;
    headline: string;
    dek: string;
    body: string[];
    primaryCtaLabel: string;
    secondaryCta: CallToAction;
  };
  personalization: HomePagePersonalization;
  featured: HomePageSection;
  desks: HomePageSection[];
  briefing: HomePageCopySource["briefing"];
  rail: HomePageCopySource["rail"];
};

export type LaunchWaitlistModal = Omit<
  LaunchWaitlistModalSource,
  "primaryCta" | "secondaryCta"
> & {
  primaryCta: CallToAction;
  secondaryCta?: CallToAction;
};

export type NotFoundPageCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: CallToAction;
};

type SiteCopy = {
  schemaVersion: number;
  updatedAt: string;
  note: string;
  siteFrame: SiteFrame;
  landingPageUi: LandingPageUi;
  homePage: HomePageCopySource;
  notFoundPage: NotFoundPageCopySource;
  variants: LandingPageVariantCopy[];
};

export type LandingPageVariant = {
  slug: string;
  legacySlugs: string[];
  navLabel: string;
  audienceLabel: string;
  status: VariantStatus;
  sourceHeading: string;
  statusNote: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: string;
  supportingLine?: string;
  subheadline: string;
  articleBody: string[];
  thoughtMatch: ThoughtMatch;
  scripture?: Scripture;
  promiseBullets: string[];
  valueCards: ValueCard[];
  fitSignals: string[];
  faq: FaqItem[];
  closingLines: string[];
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
};

export type NavigationDesk = {
  label: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  subheadline: string;
  intro: string[];
  variants: LandingPageVariant[];
};

function interestMailto(subject: string) {
  return `mailto:partner@excellencedirectory.com?subject=${encodeURIComponent(subject)}`;
}

function resolveCta(cta: CallToActionCopy): CallToAction {
  if (cta.href) {
    return { label: cta.label, href: cta.href };
  }

  if (cta.mailtoSubject) {
    return {
      label: cta.label,
      href: interestMailto(cta.mailtoSubject),
    };
  }

  throw new Error(`CTA "${cta.label}" must define either href or mailtoSubject.`);
}

function normalizePromptLines(profile: HomeAudienceProfileSource) {
  if (profile.promptLines?.line1) {
    return {
      line1: profile.promptLines.line1.trim(),
      line2: profile.promptLines.line2?.trim() || undefined,
    };
  }

  if (!profile.prompt) {
    throw new Error(`Home audience profile "${profile.id}" is missing prompt copy.`);
  }

  const promptSegments = profile.prompt.split("\n");
  const line1 = promptSegments[0]?.trim() ?? "";
  const line2 = promptSegments.slice(1).join(" ").trim() || undefined;

  if (!line1) {
    throw new Error(`Home audience profile "${profile.id}" is missing prompt line 1.`);
  }

  return { line1, line2 };
}

function normalizeHomeAudienceProfile(profile: HomeAudienceProfileSource): HomeAudienceProfile {
  const { prompt: _prompt, cta, ...rest } = profile;
  const promptLines = normalizePromptLines(profile);
  const prompt = promptLines.line2
    ? `${promptLines.line1}\n${promptLines.line2}`
    : promptLines.line1;

  return {
    ...rest,
    promptLines,
    prompt,
    cta: cta ? resolveCta(cta) : undefined,
  };
}

export function renderCopyTemplate(
  template: string,
  values: Record<string, string>,
) {
  return template.replace(/\{([^}]+)\}/g, (match, key: string) => {
    return values[key] ?? match;
  });
}

const siteCopy = copyData as SiteCopy;

export const rawSiteCopy = siteCopy;
export const copyUpdatedAt = siteCopy.updatedAt;
export const siteFrame = siteCopy.siteFrame;
export const launchWaitlistModal: LaunchWaitlistModal = {
  ...siteCopy.siteFrame.waitlistModal,
  primaryCta: resolveCta(siteCopy.siteFrame.waitlistModal.primaryCta),
  secondaryCta: siteCopy.siteFrame.waitlistModal.secondaryCta
    ? resolveCta(siteCopy.siteFrame.waitlistModal.secondaryCta)
    : undefined,
};
export const landingPageUi = siteCopy.landingPageUi;
export const homePageCopy: HomePageCopy = {
  primaryVariantSlug: siteCopy.homePage.primaryVariantSlug,
  leadStory: {
    ...siteCopy.homePage.leadStory,
    secondaryCta: resolveCta(siteCopy.homePage.leadStory.secondaryCta),
  },
  personalization: {
    ...siteCopy.homePage.personalization,
    primaryCta: resolveCta(siteCopy.homePage.personalization.primaryCta),
    profiles: siteCopy.homePage.personalization.profiles.map(normalizeHomeAudienceProfile),
  },
  featured: siteCopy.homePage.featured,
  desks: siteCopy.homePage.desks,
  briefing: siteCopy.homePage.briefing,
  rail: siteCopy.homePage.rail,
};
export const notFoundPageCopy: NotFoundPageCopy = {
  ...siteCopy.notFoundPage,
  primaryCta: resolveCta(siteCopy.notFoundPage.primaryCta),
};

export const landingPageVariants: LandingPageVariant[] = siteCopy.variants.map(
  (variant) => ({
    ...variant,
    legacySlugs: variant.legacySlugs ?? [],
    articleBody: variant.articleBody ?? [],
    promiseBullets: variant.promiseBullets ?? [],
    valueCards: variant.valueCards ?? [],
    fitSignals: variant.fitSignals ?? [],
    faq: variant.faq ?? [],
    closingLines: variant.closingLines ?? [],
    primaryCta: resolveCta(variant.primaryCta),
    secondaryCta: resolveCta(variant.secondaryCta),
  }),
);

const canonicalSlugSet = new Set<string>();
const routeSlugMap = new Map<string, LandingPageVariant>();

for (const variant of landingPageVariants) {
  if (canonicalSlugSet.has(variant.slug)) {
    throw new Error(`Duplicate landing-page slug found: ${variant.slug}`);
  }

  canonicalSlugSet.add(variant.slug);

  for (const routeSlug of [variant.slug, ...variant.legacySlugs]) {
    if (routeSlugMap.has(routeSlug)) {
      throw new Error(`Duplicate route slug found: ${routeSlug}`);
    }

    routeSlugMap.set(routeSlug, variant);
  }
}

export const defaultVariantSlug = homePageCopy.primaryVariantSlug;

if (!canonicalSlugSet.has(defaultVariantSlug)) {
  throw new Error(
    `Home page default slug "${defaultVariantSlug}" is not defined in copy.generated.json.`,
  );
}

export const allLandingPageRouteSlugs = Array.from(routeSlugMap.keys());

export const readyLandingPageVariants = landingPageVariants.filter(
  (variant) => variant.status === "ready",
);

export const draftLandingPageVariants = landingPageVariants.filter(
  (variant) => variant.status === "draft",
);

const navigationDeskOrder = [
  "entrepreneurs",
  "freelancers",
  "coaches",
  "churches",
  "ministries",
  "conferences",
  "jobs",
] as const;

const navigationDeskOrderIndex: Map<string, number> = new Map(
  navigationDeskOrder.map((slug, index) => [slug, index]),
);

const inlineBlogCtaBodyByDeskSlug: Record<string, string> = {
  churches:
    "If you want newcomers, families, and local believers to find your church before they stop searching, you should not miss Excellence Directory.",
  coaches:
    "If you want better-fit coaching clients who respect biblical conviction before the first call, you should not miss Excellence Directory.",
  conferences:
    "If you want more believers to discover, share, and register for your event, you should not miss Excellence Directory.",
  entrepreneurs:
    "If you want faith-aligned customers to discover your business faster and trust it sooner, you should not miss Excellence Directory.",
  freelancers:
    "If you want better-fit Christian clients, sharper referrals, and steadier repeat work without hiding your convictions, you should not miss Excellence Directory.",
  jobs:
    "If you want Christian jobs, internships, and employers without hiding your convictions, you should not miss Excellence Directory.",
  ministries:
    "If you want people to find your mission, care, and outreach while they are still ready to respond, you should not miss Excellence Directory.",
};

export const deskNavigation: {
  topicsLabel: string;
  desks: NavigationDesk[];
} = {
  topicsLabel: siteFrame.deskNavigation.topicsLabel,
  desks: siteFrame.deskNavigation.desks
    .map((desk) => ({
      headline: desk.headline,
      intro: desk.intro,
      label: desk.label,
      seoDescription: desk.seoDescription,
      seoTitle: desk.seoTitle,
      slug: desk.slug,
      subheadline: desk.subheadline,
      variants: desk.slugs.map((slug) => {
        const variant = landingPageVariants.find((candidate) => candidate.slug === slug);

        if (!variant) {
          throw new Error(`Desk navigation slug "${slug}" is not defined in copy.generated.json.`);
        }

        return variant;
      }),
    }))
    .sort((left, right) => {
      const leftIndex = navigationDeskOrderIndex.get(left.slug) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = navigationDeskOrderIndex.get(right.slug) ?? Number.MAX_SAFE_INTEGER;

      return leftIndex - rightIndex;
    }),
};

export const allDeskSlugs = deskNavigation.desks.map((desk) => desk.slug);

for (const desk of deskNavigation.desks) {
  if (routeSlugMap.has(desk.slug)) {
    throw new Error(
      `Desk slug "${desk.slug}" conflicts with an article or legacy route slug in copy.generated.json.`,
    );
  }
}

export function getCanonicalVariant(slug: string) {
  return landingPageVariants.find((variant) => variant.slug === slug);
}

export function getDeskBySlug(slug: string) {
  return deskNavigation.desks.find((desk) => desk.slug === slug);
}

export function getDeskForVariant(variantOrSlug: LandingPageVariant | string) {
  const slug = typeof variantOrSlug === "string" ? variantOrSlug : variantOrSlug.slug;

  return deskNavigation.desks.find((desk) =>
    desk.variants.some((candidate) => candidate.slug === slug),
  );
}

export function getVariant(slug: string) {
  return routeSlugMap.get(slug);
}

export function isCanonicalVariantSlug(slug: string) {
  const variant = getVariant(slug);

  return Boolean(variant) && variant?.slug === slug;
}

export function getRelatedVariants(variant: LandingPageVariant) {
  const desk = getDeskForVariant(variant);

  return desk?.variants.filter((candidate) => candidate.slug !== variant.slug) ?? [];
}

export function getArticleReadTimeMinutes(variant: LandingPageVariant) {
  const text = [variant.subheadline, ...variant.articleBody].join(" ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function getArticleReadTimeLabel(variant: LandingPageVariant) {
  return `${getArticleReadTimeMinutes(variant)} MIN READ`;
}

export function getInlineBlogCta(variant: LandingPageVariant): InlineBlogCta {
  const desk = getDeskForVariant(variant);

  return {
    body:
      (desk ? inlineBlogCtaBodyByDeskSlug[desk.slug] : null) ??
      "If you want a clearer Christian path to trust, discovery, and connection, you should not miss Excellence Directory.",
    href: variant.secondaryCta.href,
    linkLabel: "Click here to learn more.",
  };
}

export function getStatusLongLabel(status: VariantStatus) {
  return status === "ready"
    ? landingPageUi.statusLabels.readyLong
    : landingPageUi.statusLabels.draftLong;
}

export function getStatusShortLabel(status: VariantStatus) {
  return status === "ready"
    ? landingPageUi.statusLabels.readyShort
    : landingPageUi.statusLabels.draftShort;
}

export const campaignOnePath = "/promotions";

export const campaignOneOffer = {
  href: "https://buy.stripe.com/9B65kDch05xk74q5rn53O04",
  label: "$279 Founders Pricing",
  detail: "20% off original price",
};

export const campaignOneLaunchModal = {
  eyebrow: "Launching mid-June 2026",
  heading: "Excellence Directory launches in mid-June 2026.",
  body:
    "Reserve one of the first 400 Founding Member spots for early visibility, launch recognition, and pre-launch pricing before Excellence opens to the public.",
  primaryCta: {
    label: "Reserve your badge",
    href: campaignOneOffer.href,
  },
  secondaryCta: {
    label: "Learn more",
    href: campaignOnePath,
  },
};

export const campaignOne = {
  path: campaignOnePath,
  offer: campaignOneOffer,
  metadata: {
    title: "Founding Member Early Access | Excellence Directory",
    description:
      "Join Excellence Directory as a Founding Member and receive founding pricing, launch recognition, featured visibility, and the Founding Member Badge.",
  },
  hero: {
    badgeLine: "Pre-launch offer for Christian-owned businesses.",
    heading: "Build Trust With Christian Customers Before Excellence Goes Public.",
    dek:
      "Be one of the first 400 Christian-owned businesses to receive the Founding Member Badge, featured placement, launch social introduction, and a $279/year founding rate.",
    imageAlt: "Excellence Directory onboarding screen for Christian business owners.",
  },
  foundingBenefits: {
    heading: "Your Founding Member Badge Gives You:",
    items: [
      {
        title: "Founding Member Recognition",
        body:
          "Earn premium reputation inside the directory, build more trust with consumers, open more business opportunities, and be recognized as a Christian business committed to Kingdom impact.",
      },
      {
        title: "Founding Member Pricing",
        body:
          "Secure the $279/year founding rate before Excellence Directory opens to the public.",
      },
      {
        title: "Featured Placement",
        body:
          "Receive added exposure to Christian consumers who are intentionally looking to support and hire Christian-owned businesses.",
      },
      {
        title: "Official Social Media Business Introduction",
        body:
          "Be introduced on Excellence Directory's official social media platforms as a Founding Member partner for additional visibility and exposure.",
      },
    ],
  },
  problem: {
    eyebrow: "Why this matters",
    heading:
      "Many Christian-owned businesses struggle to attract consistent, high-quality customers",
    body:
      "In today's highly competitive marketplace, even strong products and services can struggle to gain visibility while businesses investing heavily in premium advertising stand out. Many Christian-owned businesses are failing each year for this very reason.",
  },
  visibility: {
    eyebrow: "Founding Member offer",
    heading: "There Is a Better Way to Be Seen",
    body:
      "Excellence Directory is a dedicated Christian business directory built to increase visibility for Christian business owners and connect them with customers who intentionally want to support Christian businesses.",
  },
};

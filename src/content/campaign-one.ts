export const campaignOnePath = "/promotions";

export const campaignOneOffer = {
  href: "https://buy.stripe.com/bJebJ1ftccZMcoK8Dz53O06",
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
    badgeLine: "The badge is only available to the first 400 businesses.",
    heading: "Only Early Businesses Will Receive the Founding Member Badge.",
    dek:
      "The badge will no longer be available after the official launch.",
    imageAlt: "Excellence Directory onboarding screen for Christian business owners.",
  },
  foundingBenefits: {
    heading: "Your Founding Member Badge Gives You:",
    items: [
      {
        title: "Founding Member Recognition",
        body:
          "A premium reputation inside the directory, building more trust with consumers, creating more business opportunities, and positioning your company as a recognized Christian business committed to advancing Kingdom impact.",
      },
      {
        title: "Locked-In Lifetime Pricing",
        body:
          "20% discount locked in for life.",
      },
      {
        title: "Featured Placement",
        body:
          "This will give your business direct exposure to thousands of Christian consumers who are looking to support and intentionally hire Christian-owned businesses.",
      },
      {
        title: "Official Social Media Business Introduction",
        body:
          "Your business will be introduced on our official social media platforms as one of our Founding Member partners, giving you additional visibility and exposure to our growing Christian audience and community.",
      },
    ],
  },
  problem: {
    eyebrow: "Why this matters",
    heading:
      "Many Christian-owned businesses struggle to attract consistent, high-quality customers",
    body:
      "In today's highly competitive marketplace, even the best products and services are struggling to gain visibility, and only businesses investing heavily in premium advertising manage to stand out. Many Christian-owned businesses are failing each year for this very reason.",
  },
  visibility: {
    eyebrow: "Founding Member offer",
    heading: "There Is a Better Way to Be Seen",
    body:
      "Excellence Directory is a dedicated Christian business directory built to increase visibility for Christian business owners and connect them with customers who intentionally want to support Christian businesses.",
  },
};

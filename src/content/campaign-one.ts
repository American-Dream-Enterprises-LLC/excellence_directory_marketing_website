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
    "Reserve one of the first 400 Founders Pricing spots for early visibility, launch recognition, and pre-launch pricing before Excellence opens to the public.",
  primaryCta: {
    label: "Reserve Founders Pricing",
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
    title: "Founders Pricing Early Access | Excellence Directory",
    description:
      "Join Excellence Directory with Founders Pricing and receive launch recognition, featured visibility, and early business access.",
  },
  hero: {
    badgeLine: "Founders Pricing is only available to the first 400 businesses.",
    heading: "Only Early Businesses Will Receive Founders Pricing.",
    dek:
      "Founders Pricing will no longer be available after the official launch.",
    imageAlt: "Excellence Directory onboarding screen for Christian business owners.",
  },
  foundingBenefits: {
    heading: "Your Founders Pricing Gives You:",
    items: [
      {
        title: "Founding Member Recognition",
        body:
          "A premium reputation inside the directory, building more trust with consumers, creating more business opportunities, and positioning your company as a recognized Christian business committed to advancing Kingdom impact.",
      },
      {
        title: "Get Early Exposure to Christian Consumers",
        body:
          "Reach Christian consumers ahead of the official launch and establish your presence before the marketplace becomes more competitive.",
      },
      {
        title: "Featured Placement",
        body:
          "This will give your business direct exposure to countless Christian consumers who are looking to support and intentionally hire Christian-owned businesses. Even after the June 15th launch date, your business will continue to be featured, making it easier for you to connect with new Christian consumers who join the platform.",
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
    eyebrow: "Founders Pricing offer",
    heading: "There Is a Better Way to Be Seen",
    body:
      "Excellence Directory is a dedicated Christian business directory built to increase visibility for Christian business owners and connect them with customers who intentionally want to support Christian businesses.",
  },
  testimonials: {
    eyebrow: "Trusted voices",
    heading: "Leaders are already seeing the need for Excellence.",
    body:
      "Pastors, founders, and Christian professionals have shared why a values-aligned directory can help people choose with more confidence.",
    items: [
      {
        quote:
          "It's a wonderful resource for the Christian community and others to find honest vendors to meet their needs!",
        name: "Pastor Joanne Radke",
        role: "The 700 Club",
      },
      {
        quote:
          "In ministry, often congregants ask me for Christian business or contractor recommendations for work they need done. It's encouraging to see a place where Christians can now connect with other fellow believers for help in this area.",
        name: "Pastor Ryan Hawkins",
        role: "Evangelical Community Church",
      },
      {
        quote:
          "This Christian business directory is truly one of a kind, it's so refreshing to be able to find trusted professionals, search for churches, Christian jobs, and connect with like-minded believers all over the world!",
        name: "Timothy Sanders",
        role: "Entrepreneur and Writer",
      },
      {
        quote:
          "Excellence is offering a great tool for Kingdom Impact by connecting believers in the marketplace with shared values.",
        name: "The Lion's Den",
        role: "Kingdom business community",
      },
    ],
  },
};

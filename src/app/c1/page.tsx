import { permanentRedirect } from "next/navigation";

export default function LegacyCampaignPage() {
  permanentRedirect("/promotions");
}

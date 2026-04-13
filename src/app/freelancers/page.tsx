import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("freelancers");

export default function FreelancersDeskPage() {
  return <DeskPage deskSlug="freelancers" />;
}

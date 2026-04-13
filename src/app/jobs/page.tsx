import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("jobs");

export default function JobsDeskPage() {
  return <DeskPage deskSlug="jobs" />;
}

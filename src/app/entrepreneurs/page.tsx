import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("entrepreneurs");

export default function EntrepreneursDeskPage() {
  return <DeskPage deskSlug="entrepreneurs" />;
}

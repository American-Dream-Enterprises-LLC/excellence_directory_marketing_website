import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("coaches");

export default function CoachesDeskPage() {
  return <DeskPage deskSlug="coaches" />;
}

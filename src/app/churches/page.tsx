import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("churches");

export default function ChurchesDeskPage() {
  return <DeskPage deskSlug="churches" />;
}

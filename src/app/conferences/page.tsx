import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("conferences");

export default function ConferencesDeskPage() {
  return <DeskPage deskSlug="conferences" />;
}

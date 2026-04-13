import { DeskPage, getDeskPageMetadata } from "@/components/desk-page";

export const metadata = getDeskPageMetadata("ministries");

export default function MinistriesDeskPage() {
  return <DeskPage deskSlug="ministries" />;
}

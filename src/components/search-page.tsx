import { getRequestDeviceView } from "@/lib/device-view";
import { DesktopSearchPage } from "@/desktop/search/desktop-search-page";
import { MobileSearchPage } from "@/mobile/search/mobile-search-page";

type SearchPageRendererProps = {
  query: string;
};

export async function SearchPageRenderer({ query }: SearchPageRendererProps) {
  const deviceView = await getRequestDeviceView();

  return deviceView === "mobile" ? (
    <MobileSearchPage query={query} />
  ) : (
    <DesktopSearchPage query={query} />
  );
}

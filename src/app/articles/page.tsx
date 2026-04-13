import { permanentRedirect } from "next/navigation";

import { machinePaths } from "@/content/site-urls";

export default function LegacyArticleArchivePage() {
  permanentRedirect(machinePaths.articleArchive);
}

import type { Metadata } from "next";
import { SearchPageRenderer } from "@/components/search-page";
import { machinePaths } from "@/content/site-urls";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const metadata: Metadata = {
  alternates: {
    canonical: "/search",
    types: {
      "application/json": [
        {
          title: "Excellence Directory Copy JSON",
          url: machinePaths.copyJson,
        },
      ],
      "text/plain": [
        {
          title: "Excellence Directory LLMs TXT",
          url: machinePaths.llms,
        },
      ],
    },
  },
  robots: {
    follow: true,
    index: false,
  },
  title: "Search",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  return <SearchPageRenderer query={query} />;
}

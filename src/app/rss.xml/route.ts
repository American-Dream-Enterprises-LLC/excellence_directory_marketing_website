import { buildRssXml } from "@/content/machine-readable";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildRssXml(), {
    headers: {
      "access-control-allow-origin": "*",
      "cache-control": "public, max-age=600",
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
}

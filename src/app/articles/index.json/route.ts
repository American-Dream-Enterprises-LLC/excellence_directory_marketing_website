import {
  buildArticleIndexPayload,
  machineJsonHeaders,
} from "@/content/machine-readable";

export const dynamic = "force-static";

export async function GET() {
  return new Response(JSON.stringify(buildArticleIndexPayload(), null, 2), {
    headers: machineJsonHeaders,
  });
}

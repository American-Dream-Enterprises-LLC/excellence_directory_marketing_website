import { buildArticlePayload, machineJsonHeaders } from "@/content/machine-readable";

export async function GET(
  _request: Request,
  context: { params: Promise<{}> },
) {
  const { slugPath } = await context.params as { slugPath?: string };

  if (!slugPath || !slugPath.endsWith(".json")) {
    return new Response("Not found", {
      status: 404,
    });
  }

  const slug = slugPath.slice(0, -".json".length);
  const payload = buildArticlePayload(slug);

  if (!payload) {
    return new Response("Not found", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(payload, null, 2), {
    headers: machineJsonHeaders,
  });
}

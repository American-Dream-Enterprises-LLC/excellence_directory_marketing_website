import {
  buildLlmsText,
  machineTextHeaders,
} from "@/content/machine-readable";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildLlmsText(), {
    headers: machineTextHeaders,
  });
}

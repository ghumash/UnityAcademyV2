import { headers } from "next/headers";

export async function getClientMeta() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
  const ua = h.get("user-agent") || undefined;
  const referer = h.get("referer") || undefined;
  return { ip, ua, referer };
}

import { headers } from "next/headers";

export async function getClientMeta() {
  const h = await headers();
  // порядок попыток IP: стандартные прокси/edge заголовки
  const xff =
    h.get("x-forwarded-for") ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "";
  const ip = xff.split(",")[0]?.trim() || undefined;
  const ua = h.get("user-agent") || undefined;
  const referer = h.get("referer") || undefined;
  return { ip, ua, referer };
}

export type ClientMeta = {
  ua: string;
  referer?: string;
  lang?: string;
  ip?: string; // ← добавили
};

type HeadersShim = { get(name: string): string | null };

function cleanIp(ip?: string | null) {
  if (!ip) return undefined;
  // берём первый из списка и убираем префикс ::ffff:
  const first = ip.split(",")[0]?.trim();
  const v = first?.replace(/^::ffff:/, "");
  return v || undefined;
}

function fromForwardedHeader(v?: string | null) {
  if (!v) return undefined;
  // пример: for=1.2.3.4;proto=https;by=...
  const m = /for=(?:"?\[?)([^;\]\s",]+)(?:\]?"?)/i.exec(v);
  return cleanIp(m?.[1]);
}

export async function getClientMeta(): Promise<ClientMeta> {
  // Клиент
  if (typeof window !== "undefined") {
    return {
      ua: navigator.userAgent,
      referer: document.referrer || undefined,
      lang: navigator.language,
      // ip недоступен на клиенте — оставляем undefined
    };
  }

  // Сервер
  const mod = await import("next/headers");
  const h = (await Promise.resolve(mod.headers())) as HeadersShim;

  // Пытаемся вытащить IP из популярных заголовков
  const ip =
    cleanIp(h.get("x-forwarded-for")) ||
    cleanIp(h.get("x-real-ip")) ||
    cleanIp(h.get("cf-connecting-ip")) ||
    fromForwardedHeader(h.get("forwarded"));

  return {
    ua: h.get("user-agent") ?? "",
    referer: h.get("referer") ?? undefined, // HTTP-правильное написание — "referer"
    lang: h.get("accept-language") ?? undefined,
    ip,
  };
}

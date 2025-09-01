// src/shared/lib/request.ts
export type ClientMeta = {
  ua: string;
  referer?: string;
  lang?: string;
};

type HeadersShim = { get(name: string): string | null };

export async function getClientMeta(): Promise<ClientMeta> {
  // Клиент
  if (typeof window !== "undefined") {
    return {
      ua: navigator.userAgent,
      referer: document.referrer || undefined,
      lang: navigator.language,
    };
  }

  // Сервер: ленивый импорт + унификация sync/async сигнатуры headers()
  const mod = await import("next/headers");
  const maybe = mod.headers() as unknown;
  const h: HeadersShim = (await Promise.resolve(maybe)) as HeadersShim;

  return {
    ua: h.get("user-agent") ?? "",
    referer: h.get("referer") ?? undefined,
    lang: h.get("accept-language") ?? undefined,
  };
}

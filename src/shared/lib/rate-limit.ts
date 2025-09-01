// Простая in-memory квота (per-instance). Для прод серверлес смотри Redis/Upstash.
export type RateLimitOptions = {
  limit?: number; // кол-во запросов в окно
  windowMs?: number; // длительность окна
};

type Bucket = {
  resetAt: number;
  tokens: number;
};

const store = new Map<string, Bucket>();

export async function rateLimit(
  key: string,
  { limit = 5, windowMs = 15 * 60 * 1000 }: RateLimitOptions = {}
): Promise<{
  ok: boolean;
  remaining: number;
  resetAt: number;
  retryAfter?: number;
}> {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now >= bucket.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { resetAt, tokens: limit });
  }

  const b = store.get(key)!;

  if (b.tokens <= 0) {
    return {
      ok: false,
      remaining: 0,
      resetAt: b.resetAt,
      retryAfter: b.resetAt - now,
    };
  }

  b.tokens -= 1;
  return { ok: true, remaining: b.tokens, resetAt: b.resetAt };
}

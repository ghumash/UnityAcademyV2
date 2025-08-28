"use server";

import { headers } from "next/headers";
import { ApplicationSchema, type ApplicationInput } from "./schema";
import { deliverApplication } from "./delivery";

// simple rate-limit: 5 req / 10 min per IP (in-memory)
const BUCKET = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = BUCKET.get(ip);
  if (!bucket || bucket.resetAt < now) {
    BUCKET.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true as const };
  }
  if (bucket.count >= LIMIT) return { ok: false as const };
  bucket.count += 1;
  return { ok: true as const };
}

export async function submitApplication(input: ApplicationInput) {
  const parsed = ApplicationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  // honeypot
  if (data.hp && data.hp.trim() !== "") return { ok: true as const };

  // time-to-fill: минимум 3 секунды
  if (typeof data.ts === "number" && Date.now() - data.ts < 3000) {
    return { ok: true as const };
  }

  // headers() в server action — асинхронный
  const h = await headers();
  const xff = h.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim() || h.get("x-real-ip") || "0.0.0.0";

  if (!rateLimit(ip).ok) {
    return {
      ok: false as const,
      errors: { form: ["Слишком много попыток. Попробуй позже."] },
    };
  }

  const res = await deliverApplication(data, ip);
  if (!res.ok) {
    return {
      ok: false as const,
      errors: { form: ["Не удалось отправить заявку. Попробуй позже."] },
    };
  }

  return { ok: true as const };
}

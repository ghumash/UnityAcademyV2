"use server";

import { headers } from "next/headers";
import { ApplicationSchema, type ApplicationInput } from "./schema";
import { type SubmitResult, type SubmitErrors } from "./types";
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

export async function submitApplication(
  input: ApplicationInput
): Promise<SubmitResult> {
  const parsed = ApplicationSchema.safeParse(input);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors as SubmitErrors;
    return { ok: false, errors };
  }
  const data = parsed.data;

  // honeypot
  if (data.hp && data.hp.trim() !== "") return { ok: true };

  // time-to-fill: минимум 3 секунды
  if (typeof data.ts === "number" && Date.now() - data.ts < 3000) {
    return { ok: true };
  }

  // headers() в server action — асинхронный
  const h = await headers();
  const xff = h.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim() || h.get("x-real-ip") || "0.0.0.0";

  if (!rateLimit(ip).ok) {
    const errors: SubmitErrors = {
      form: ["Слишком много попыток. Попробуй позже."],
    };
    return { ok: false, errors };
  }

  const res = await deliverApplication(data, ip);
  if (!res.ok) {
    const errors: SubmitErrors = {
      form: ["Не удалось отправить заявку. Попробуй позже."],
    };
    return { ok: false, errors };
  }

  return { ok: true };
}

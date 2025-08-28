"use server";

import { headers } from "next/headers";
import { ContactSchema, type ContactInput } from "./schema";
import {
  type SubmitResult,
  type SubmitErrors,
  deliverContact,
} from "@/entities/apply";

// отдельный простейший rate-limit: 5/10мин на IP (in-memory)
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

export async function submitContact(
  input: ContactInput
): Promise<SubmitResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors as SubmitErrors;
    return { ok: false, errors };
  }
  const data = parsed.data;

  if (data.hp && data.hp.trim() !== "") return { ok: true }; // honeypot
  if (typeof data.ts === "number" && Date.now() - data.ts < 3000)
    return { ok: true }; // time-to-fill

  const h = await headers();
  const xff = h.get("x-forwarded-for") ?? "";
  const ip = xff.split(",")[0]?.trim() || h.get("x-real-ip") || "0.0.0.0";
  if (!rateLimit(ip).ok)
    return {
      ok: false,
      errors: { form: ["Слишком много попыток. Попробуй позже."] },
    };

  const res = await deliverContact(data, ip);
  if (!res.ok)
    return {
      ok: false,
      errors: { form: ["Не удалось отправить сообщение. Попробуй позже."] },
    };

  return { ok: true };
}

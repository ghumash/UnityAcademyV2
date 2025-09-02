"use server";

import type { ActionState } from "@/shared/lib/actions/result";

import { checkAntiBot } from "@/shared/lib/anti-bot";
import { rateLimit } from "@/shared/lib/rate-limit";
import { notify } from "@/shared/lib/notify";
import { getClientMeta } from "@/shared/lib/request";

import {
  ContactSchema,
  type ContactInput,
} from "@/features/contact/model/schema";
import { logError } from "@/shared/lib/logger.server";

function toBool(v: unknown) {
  return v === "on" || v === "true" || v === true || v === 1 || v === "1";
}

function zodIssuesToErrors(issues: import("zod").ZodIssue[]) {
  return Object.fromEntries(issues.map((i) => [i.path.join("."), i.message]));
}

export async function submitContact(input: ContactInput): Promise<ActionState> {
  try {
    // 1) Anti-bot
    const ab = checkAntiBot(input.hp, input.ts);
    if (ab) return { ok: false, message: "Rejected", errors: { form: ab } };

    // 2) Валидация
    const parsed = ContactSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        message: "Проверьте поля формы",
        errors: zodIssuesToErrors(parsed.error.issues),
      };
    }

    // 3) Метаданные и лимит (in-memory)
    const meta = await getClientMeta();
    const ip = meta.ip ?? "noip";
    const ua = (meta.ua ?? "noua").slice(0, 64);
    const key = `contact:${ip}:${ua}`;

    const rl = await rateLimit(key, { limit: 8, windowMs: 15 * 60 * 1000 });
    if (!rl.ok) {
      return {
        ok: false,
        message: "Слишком много попыток. Попробуйте позже.",
        errors: {
          form: `Подождите ${Math.ceil((rl.retryAfter ?? 0) / 1000)} с.`,
        },
      };
    }

    // 4) Уведомление
    await notify("contact", { data: parsed.data, meta });
    return { ok: true, message: "Сообщение отправлено" };
  } catch (err) {
    await logError("contact.submit", err, {
      input: { ...input, hp: undefined, ts: undefined },
    });
    return { ok: false, message: "Внутренняя ошибка. Попробуйте позже." };
  }
}

export async function contactAction(
  _: ActionState | undefined,
  form: FormData
): Promise<ActionState> {
  const hp = form.get("hp");
  const ts = form.get("ts");

  const input: ContactInput = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    message: String(form.get("message") ?? ""),
    consent: toBool(form.get("consent")),
    hp: typeof hp === "string" ? hp : "",
    ts: Number(ts ?? 0),
  };

  return submitContact(input);
}

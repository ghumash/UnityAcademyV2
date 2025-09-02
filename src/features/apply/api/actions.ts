"use server";

import {
  ApplicationSchema,
  type ApplicationInput,
} from "@/features/apply/model/schema";
import type { ActionState } from "@/shared/lib/actions/result";

import { checkAntiBot } from "@/shared/lib/anti-bot";
import { rateLimit } from "@/shared/lib/rate-limit";
import { notify } from "@/shared/lib/notify";
import { getClientMeta } from "@/shared/lib/request";
import { logError } from "@/shared/lib/logger.server";

function toBool(v: unknown) {
  return v === "on" || v === "true" || v === true || v === 1 || v === "1";
}

function zodIssuesToErrors(issues: import("zod").ZodIssue[]) {
  return Object.fromEntries(issues.map((i) => [i.path.join("."), i.message]));
}

export async function submitApplication(
  input: ApplicationInput
): Promise<ActionState> {
  try {
    // 1) Anti-bot
    const ab = checkAntiBot(input.hp, input.ts);
    if (ab) return { ok: false, message: "Rejected", errors: { form: ab } };

    // 2) Валидация
    const parsed = ApplicationSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        message: "Проверьте поля формы",
        errors: zodIssuesToErrors(parsed.error.issues),
      };
    }

    // 3) Метаданные клиента и rate limit (in-memory)
    const meta = await getClientMeta();
    const ip = meta.ip ?? "noip";
    const ua = (meta.ua ?? "noua").slice(0, 64);
    const key = `apply:${ip}:${ua}`;

    const rl = await rateLimit(key, { limit: 5, windowMs: 15 * 60 * 1000 });
    if (!rl.ok) {
      return {
        ok: false,
        message: "Слишком много попыток. Попробуйте позже.",
        errors: {
          form: `Подождите ${Math.ceil((rl.retryAfter ?? 0) / 1000)} с.`,
        },
      };
    }

    // 4) Уведомление через вебхук
    await notify("apply", { data: parsed.data, meta });
    return { ok: true, message: "Заявка отправлена" };
  } catch (err) {
    await logError("apply.submit", err, {
      input: { ...input, hp: undefined, ts: undefined },
    });
    return { ok: false, message: "Внутренняя ошибка. Попробуйте позже." };
  }
}

export async function applyAction(
  _: ActionState | undefined,
  form: FormData
): Promise<ActionState> {
  const input: ApplicationInput = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    course: String(form.get("course") ?? ""),
    message: String(form.get("message") ?? ""),
    consent: toBool(form.get("consent")),
    hp: typeof form.get("hp") === "string" ? (form.get("hp") as string) : "",
    ts: Number(form.get("ts") ?? 0),
  };
  return submitApplication(input);
}

"use server";

import { ContactSchema } from "./schema";
import { checkAntiBot } from "@/shared/lib/anti-bot";
import { rateLimit } from "@/shared/lib/rate-limit";
import { notify } from "@/shared/lib/notify";
import { getClientMeta } from "@/shared/lib/request";
import type { ActionState } from "@/shared/lib/actions/result";
import { logError } from "@/shared/lib/logger";

function toBool(v: unknown) {
  return v === "on" || v === "true" || v === true || v === 1 || v === "1";
}

export async function contactAction(
  _: ActionState | undefined,
  form: FormData
): Promise<ActionState> {
  try {
    const hp = form.get("hp");
    const ts = form.get("ts");
    const ab = checkAntiBot(hp, ts);
    if (ab) {
      return { ok: false, message: "Rejected", errors: { form: ab } };
    }

    const input = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      consent: toBool(form.get("consent")),
      hp: typeof hp === "string" ? hp : "",
      ts: Number(ts ?? 0),
    };

    const parsed = ContactSchema.safeParse(input);
    if (!parsed.success) {
      const errors = Object.fromEntries(
        parsed.error.issues.map((i) => [i.path.join("."), i.message])
      );
      return { ok: false, message: "Проверьте поля формы", errors };
    }

    const meta = await getClientMeta();
    const key = `contact:${meta.ip ?? "noip"}:${(meta.ua ?? "noua").slice(0, 64)}`;
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

    await notify("contact", { data: parsed.data, meta });
    return { ok: true, message: "Сообщение отправлено" };
  } catch (err) {
    await logError("contact.submit", err);
    return { ok: false, message: "Внутренняя ошибка. Попробуйте позже." };
  }
}

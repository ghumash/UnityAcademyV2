"use server";

import { checkAntiBot } from "@/shared/lib/anti-bot";
import { notify } from "@/shared/lib/notify";
import { getClientMeta } from "@/shared/lib/request";
import type { ActionState } from "@/shared/lib/actions/result";
import { ApplicationInput, ApplicationSchema } from "./schema";

function toBool(v: unknown) {
  return v === "on" || v === "true" || v === true || v === 1 || v === "1";
}

export async function submitApplication(
  input: ApplicationInput
): Promise<ActionState> {
  const ab = checkAntiBot(input.hp, input.ts);
  if (ab) return { ok: false, message: "Rejected", errors: { form: ab } };

  const parsed = ApplicationSchema.safeParse(input);
  if (!parsed.success) {
    const errors = Object.fromEntries(
      parsed.error.issues.map((i) => [i.path.join("."), i.message])
    );
    return { ok: false, message: "Проверьте поля формы", errors };
  }

  const meta = await getClientMeta();
  await notify("apply", { data: parsed.data, meta });

  return { ok: true, message: "Заявка отправлена" };
}

// Совместимость с useActionState (если где-то используешь form action)
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

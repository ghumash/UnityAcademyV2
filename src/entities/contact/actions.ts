"use server";

import { ContactSchema } from "./schema";
import { checkAntiBot } from "@/shared/lib/anti-bot";
import { notify } from "@/shared/lib/notify";
import { getClientMeta } from "@/shared/lib/request";
import type { ActionState } from "@/shared/lib/actions/result";

function toBool(v: unknown) {
  return v === "on" || v === "true" || v === true || v === 1 || v === "1";
}

export async function contactAction(
  _: ActionState | undefined,
  form: FormData
): Promise<ActionState> {
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
  await notify("contact", { data: parsed.data, meta });

  return { ok: true, message: "Сообщение отправлено" };
}

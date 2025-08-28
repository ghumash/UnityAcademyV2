import type { ApplicationInput } from "./schema";

type DeliverResult =
  | { ok: true; channel: "resend" | "telegram" | "console"; id?: string }
  | { ok: false; error: string };

function renderText(data: ApplicationInput, ip: string) {
  return [
    "📝 Новая заявка",
    `Имя: ${data.name}`,
    `Email: ${data.email}`,
    `Телефон: ${data.phone}`,
    `Курс: ${data.course}`,
    data.message ? `Сообщение: ${data.message}` : null,
    `IP: ${ip}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function renderHtml(data: ApplicationInput, ip: string) {
  return `
    <h2>Новая заявка</h2>
    <ul>
      <li><b>Имя:</b> ${data.name}</li>
      <li><b>Email:</b> ${data.email}</li>
      <li><b>Телефон:</b> ${data.phone}</li>
      <li><b>Курс:</b> ${data.course}</li>
      ${data.message ? `<li><b>Сообщение:</b> ${data.message}</li>` : ""}
      <li><b>IP:</b> ${ip}</li>
    </ul>
  `;
}

async function sendViaResend(
  data: ApplicationInput,
  ip: string
): Promise<DeliverResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!apiKey || !from || !to)
    return { ok: false, error: "RESEND_ENV_MISSING" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Заявка с сайта Unity Academy",
      html: renderHtml(data, ip),
      text: renderText(data, ip),
    }),
  });

  if (!res.ok) return { ok: false, error: `RESEND_HTTP_${res.status}` };
  const json = (await res.json()) as { id?: string };
  return { ok: true, channel: "resend", id: json.id };
}

async function sendViaTelegram(
  data: ApplicationInput,
  ip: string
): Promise<DeliverResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: "TG_ENV_MISSING" };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: renderText(data, ip),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) return { ok: false, error: `TG_HTTP_${res.status}` };
  return { ok: true, channel: "telegram" };
}

export async function deliverApplication(
  data: ApplicationInput,
  ip: string
): Promise<DeliverResult> {
  const tryResend = await sendViaResend(data, ip);
  if (tryResend.ok) return tryResend;

  const tryTG = await sendViaTelegram(data, ip);
  if (tryTG.ok) return tryTG;

  console.log("[apply][fallback] ->", { data, ip, errors: [tryResend, tryTG] });
  return { ok: true, channel: "console" };
}

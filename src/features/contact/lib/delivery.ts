// Общие доставщики (Resend/Telegram) + 2 формирователя: application/contact

import { ApplicationInput } from "@/features/apply";
import type { ContactInput } from "../model/schema";

type DeliverResult =
  | { ok: true; channel: "resend" | "telegram" | "console"; id?: string }
  | { ok: false; error: string };

async function sendResend(
  subject: string,
  html: string,
  text: string
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
    body: JSON.stringify({ from, to, subject, html, text }),
  });
  if (!res.ok) return { ok: false, error: `RESEND_HTTP_${res.status}` };
  const json = (await res.json()) as { id?: string };
  return { ok: true, channel: "resend", id: json.id };
}

async function sendTelegram(text: string): Promise<DeliverResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { ok: false, error: "TG_ENV_MISSING" };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) return { ok: false, error: `TG_HTTP_${res.status}` };
  return { ok: true, channel: "telegram" };
}

function renderLines(lines: (string | null | undefined)[]) {
  return lines.filter(Boolean).join("\n");
}

/* === Application === */
function appText(data: ApplicationInput, ip: string) {
  return renderLines([
    "📝 Новая заявка",
    `Имя: ${data.name}`,
    `Email: ${data.email}`,
    `Телефон: ${data.phone}`,
    `Курс: ${data.course}`,
    data.message ? `Сообщение: ${data.message}` : null,
    `IP: ${ip}`,
  ]);
}
function appHtml(data: ApplicationInput, ip: string) {
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
export async function deliverApplication(
  data: ApplicationInput,
  ip: string
): Promise<DeliverResult> {
  const subject = "Заявка с сайта Unity Academy";
  const text = appText(data, ip);
  const html = appHtml(data, ip);

  const tryResend = await sendResend(subject, html, text);
  if (tryResend.ok) return tryResend;

  const tryTG = await sendTelegram(text);
  if (tryTG.ok) return tryTG;

  console.log("[apply][fallback]", { data, ip, errors: [tryResend, tryTG] });
  return { ok: true, channel: "console" };
}

/* === Contact === */
function contactText(data: ContactInput, ip: string) {
  return renderLines([
    "✉️ Новое сообщение с контактов",
    `Имя: ${data.name}`,
    `Email: ${data.email}`,
    `Сообщение: ${data.message}`,
    `IP: ${ip}`,
  ]);
}
function contactHtml(data: ContactInput, ip: string) {
  return `
    <h2>Новое сообщение с контактов</h2>
    <ul>
      <li><b>Имя:</b> ${data.name}</li>
      <li><b>Email:</b> ${data.email}</li>
      <li><b>Сообщение:</b> ${data.message}</li>
      <li><b>IP:</b> ${ip}</li>
    </ul>
  `;
}
export async function deliverContact(
  data: ContactInput,
  ip: string
): Promise<DeliverResult> {
  const subject = "Сообщение с контактов Unity Academy";
  const text = contactText(data, ip);
  const html = contactHtml(data, ip);

  const tryResend = await sendResend(subject, html, text);
  if (tryResend.ok) return tryResend;

  const tryTG = await sendTelegram(text);
  if (tryTG.ok) return tryTG;

  console.log("[contact][fallback]", { data, ip, errors: [tryResend, tryTG] });
  return { ok: true, channel: "console" };
}

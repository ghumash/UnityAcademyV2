import "server-only";
import type { ChannelFactory, NotifyPayload } from "./types";

const has = (v?: string) => !!v && v.trim().length > 0;

/** ——— RESEND EMAIL ——— */
const makeResend: ChannelFactory = () => {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM; // напр. "Unity Academy <noreply@your.dom>"
  if (!has(key) || !has(from)) return null;

  // без импорта SDK: делаем простой fetch REST (SDK можно подключить по желанию)
  return {
    name: "resend",
    async send(p: NotifyPayload) {
      if (!p.to) return;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [p.to],
          subject: p.subject,
          html: p.html,
          text: p.text,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend failed: ${res.status} ${err}`);
      }
    },
  };
};

/** ——— TELEGRAM ——— */
const makeTelegram: ChannelFactory = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!has(token) || !has(chatId)) return null;

  return {
    name: "telegram",
    async send(p: NotifyPayload) {
      const text = `*${p.subject}*\n${p.text ?? ""}`.trim();
      const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        }
      );
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Telegram failed: ${res.status} ${err}`);
      }
    },
  };
};

/** ——— GENERIC WEBHOOK ——— */
const makeWebhook: ChannelFactory = () => {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!has(url)) return null;

  return {
    name: "webhook",
    async send(p: NotifyPayload) {
      const res = await fetch(url!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Webhook failed: ${res.status} ${err}`);
      }
    },
  };
};

export const makeChannels = () => {
  return [makeResend(), makeTelegram(), makeWebhook()].filter(Boolean);
};

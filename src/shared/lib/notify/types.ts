import "server-only";

export type NotifyPayload = {
  subject: string;
  html?: string;
  text?: string;
  to?: string;
  meta?: Record<string, unknown>;
};

export type NotifyChannel = {
  name: "resend" | "telegram" | "webhook";
  send: (p: NotifyPayload) => Promise<void>;
};

export type ChannelFactory = () => NotifyChannel | null;

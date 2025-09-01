export async function notify(
  topic: string,
  payload: unknown
): Promise<{ delivered: boolean }> {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return { delivered: false };
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ topic, payload, ts: Date.now() }),
      cache: "no-store",
    });
    return { delivered: true };
  } catch {
    return { delivered: false };
  }
}

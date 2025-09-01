type LogLevel = "info" | "warn" | "error";

function serializeError(err: unknown) {
  if (err instanceof Error) return { message: err.message, stack: err.stack };
  if (typeof err === "string") return { message: err };
  try {
    return { message: JSON.stringify(err) };
  } catch {
    return { message: String(err) };
  }
}

export async function logServer(
  level: LogLevel,
  topic: string,
  data?: unknown
) {
  const payload = { level, topic, data, ts: Date.now() };
  // локальный лог
  const line = `[${level.toUpperCase()}][${topic}] ${JSON.stringify(payload)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);

  // опционально: внешний вебхук
  const url = process.env.ERROR_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    // глушим
  }
}

export async function logError(topic: string, err: unknown, extra?: unknown) {
  await logServer("error", topic, { error: serializeError(err), extra });
}

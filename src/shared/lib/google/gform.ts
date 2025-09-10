// Вспомогательные утилиты для сборки тела запроса

export function buildGoogleFormBody(
  values: Record<string, string>,
  entriesMap: Record<string, string>
) {
  const params = new URLSearchParams();
  Object.entries(entriesMap).forEach(([key, entryKey]) => {
    const v = values[key];
    if (typeof v === "string") params.set(entryKey, v);
  });
  return params;
}

export function getClientIp(req: Request): string {
  // простой best-effort для rate limit (опционально)
  const xff = req.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "0.0.0.0";
}

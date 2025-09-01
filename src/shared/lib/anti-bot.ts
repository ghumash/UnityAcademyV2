const MIN_DELAY_MS = 3000;
const MAX_AGE_MS = 10 * 60 * 1000;

export function checkAntiBot(
  hp: unknown,
  ts: unknown,
  now = Date.now()
): string | null {
  if (typeof hp === "string" && hp.trim() !== "") return "Rejected";
  const n = Number(ts);
  if (!Number.isFinite(n)) return "Rejected";
  const age = now - n;
  if (age < MIN_DELAY_MS) return "Too fast";
  if (age > MAX_AGE_MS || age < -30_000) return "Expired";
  return null;
}

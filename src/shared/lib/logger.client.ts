// Вариант для Client Components — без "server-only".
import * as Sentry from "@sentry/nextjs";

export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogContext = {
  tags?: Record<string, string>;
  extras?: Record<string, unknown>;
  fingerprint?: string[];
  level?: LogLevel;
};

const isProd = process.env.NODE_ENV === "production";
const severityMap: Record<LogLevel, Sentry.SeverityLevel> = {
  debug: "debug",
  info: "info",
  warn: "warning",
  error: "error",
};

function normalizeError(err: unknown): Error {
  if (err instanceof Error) return err;
  if (typeof err === "string") return new Error(err);
  try {
    return new Error(JSON.stringify(err));
  } catch {
    return new Error(String(err));
  }
}

function withScope(ctx: LogContext | undefined, fn: () => void) {
  if (!ctx) return fn();
  Sentry.withScope((scope) => {
    if (ctx.level) scope.setLevel(severityMap[ctx.level]);
    if (ctx.tags)
      Object.entries(ctx.tags).forEach(([k, v]) => scope.setTag(k, v));
    if (ctx.extras)
      Object.entries(ctx.extras).forEach(([k, v]) =>
        scope.setExtra(k, v as any)
      );
    if (ctx.fingerprint) scope.setFingerprint(ctx.fingerprint);
    fn();
  });
}

export function log(level: LogLevel, message: string, ctx?: LogContext) {
  if (!isProd) {
    if (level === "debug") {
      // eslint-disable-next-line no-console
      console.debug(message, ctx ?? {});
    } else if (level === "info") {
      // eslint-disable-next-line no-console
      console.info(message, ctx ?? {});
    } else if (level === "warn") {
      console.warn(message, ctx ?? {});
    } else {
      console.error(message, ctx ?? {});
    }
  }
  withScope({ ...ctx, level }, () =>
    Sentry.captureMessage(message, severityMap[level])
  );
}

export function reportError(err: unknown, ctx?: LogContext) {
  const e = normalizeError(err);
  if (!isProd) console.error(e, ctx ?? {});
  withScope({ ...ctx, level: "error" }, () => Sentry.captureException(e));
}

// API совпадает с серверным:
export async function logError(
  event: string,
  err: unknown,
  extras?: Record<string, unknown>,
  tags?: Record<string, string>
): Promise<void> {
  reportError(err, { tags: { event, ...(tags ?? {}) }, extras });
}

export async function tryOrReport<T>(fn: () => Promise<T>, ctx?: LogContext) {
  try {
    return await fn();
  } catch (err) {
    reportError(err, ctx);
    throw err;
  }
}

export function addBreadcrumb(b: {
  category: string;
  message?: string;
  data?: Record<string, unknown>;
  level?: Exclude<Sentry.SeverityLevel, "fatal" | "critical">;
}) {
  Sentry.addBreadcrumb({
    category: b.category,
    message: b.message,
    data: b.data,
    level: b.level ?? "info",
  });
}

export function createLogger(base: LogContext) {
  const merge = (ctx?: LogContext) => ({
    tags: { ...(base.tags ?? {}), ...(ctx?.tags ?? {}) },
    extras: { ...(base.extras ?? {}), ...(ctx?.extras ?? {}) },
    fingerprint: ctx?.fingerprint ?? base.fingerprint,
    level: ctx?.level ?? base.level,
  });
  return {
    log: (level: LogLevel, message: string, ctx?: LogContext) =>
      log(level, message, merge(ctx)),
    reportError: (err: unknown, ctx?: LogContext) =>
      reportError(err, merge(ctx)),
    tryOrReport: <T>(fn: () => Promise<T>, ctx?: LogContext) =>
      tryOrReport(fn, merge(ctx)),
    logError: (
      event: string,
      err: unknown,
      extras?: Record<string, unknown>,
      tags?: Record<string, string>
    ) =>
      logError(event, err, extras, { ...(base.tags ?? {}), ...(tags ?? {}) }),
  };
}

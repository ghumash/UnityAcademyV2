import type { ApplicationInput } from "./schema";

export type SubmitErrors = Partial<
  Record<keyof ApplicationInput | "form", string[]>
>;

export type SubmitResult = { ok: true } | { ok: false; errors: SubmitErrors };

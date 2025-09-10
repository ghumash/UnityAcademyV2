import { NextResponse } from "next/server";
import type { z } from "zod";
import { buildGoogleFormBody } from "@/shared/lib/google";

interface HandleFormOptions<TSchema extends z.ZodType<Record<string, string>>> {
  schema: TSchema;
  formId?: string;
  entries: Record<string, string>;
}

export async function handleForm<
  TSchema extends z.ZodType<Record<string, string>>,
>(req: Request, { schema, formId, entries }: HandleFormOptions<TSchema>) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    // honeypot
    if ((parsed.data as any)._honeypot?.trim().length > 0) {
      return NextResponse.json({ ok: true, spam: true }, { status: 200 });
    }

    if (!formId) {
      return NextResponse.json(
        { ok: false, error: "NO_FORM_ID" },
        { status: 500 }
      );
    }

    // 👇 Cast, потому что Zod уже гарантировал объект строк
    const formBody = buildGoogleFormBody(
      parsed.data as Record<string, string>,
      entries
    );
    const endpoint = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

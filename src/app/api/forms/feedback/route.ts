import { NextResponse } from "next/server";
import { buildGoogleFormBody, gforms } from "@/shared/lib/google";
import { FeedbackSchema } from "@/features/feedback";

export const runtime = "nodejs"; // чтобы вести себя предсказуемо на сервере

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = FeedbackSchema.safeParse(body);
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

    // honeypot: если поле заполнено — делаем вид, что всё ок, но реально не шлём
    if ((parsed.data._company || "").trim().length > 0) {
      return NextResponse.json({ ok: true, spam: true }, { status: 200 });
    }

    // (опционально) rate limit — пример каркаса, подключите Upstash/Redis при желании
    // const ip = getClientIp(req);
    // if (!(await allowRequest(ip))) {
    //   return NextResponse.json({ ok: false, error: "RATE_LIMIT" }, { status: 429 });
    // }

    const { formId, entries } = gforms.feedback;
    console.log("entries", entries)
    if (!formId) {
      return NextResponse.json(
        { ok: false, error: "NO_FORM_ID" },
        { status: 500 }
      );
    }

    const formBody = buildGoogleFormBody(
      {
        name: parsed.data.name,
        surname: parsed.data.surname,
        email: parsed.data.email,
        message: parsed.data.message,
      },
      entries
    );

    const endpoint = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
      // redirect: "manual", // можно включить если хотите отслеживать Location
    });

    const ok = res.ok; // обычно true (Google отдаёт 200 после follow)
    return NextResponse.json({ ok }, { status: ok ? 200 : 502 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}

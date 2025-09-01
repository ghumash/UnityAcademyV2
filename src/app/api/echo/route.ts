export const runtime = "edge";

function pickHeaders(h: Headers) {
  const keys = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "user-agent",
    "referer",
  ];
  const out: Record<string, string | undefined> = {};
  for (const k of keys) out[k] = h.get(k) ?? undefined;
  return out;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  return new Response(
    JSON.stringify({
      method: "GET",
      query: Object.fromEntries(url.searchParams.entries()),
      headers: pickHeaders(req.headers),
      ts: Date.now(),
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}

export async function POST(req: Request) {
  let body: unknown = null;
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) body = await req.json();
    else if (ct.includes("text/plain")) body = await req.text();
  } catch {
    body = null;
  }
  return new Response(
    JSON.stringify({
      method: "POST",
      headers: pickHeaders(req.headers),
      body,
      ts: Date.now(),
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}

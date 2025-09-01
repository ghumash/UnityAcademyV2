export const runtime = "edge";

export async function GET(_req: Request) {
  const body = {
    ok: true,
    ts: Date.now(),
    runtime: "edge",
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

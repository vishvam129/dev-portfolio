import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BOOT = Date.now();

/** A real health endpoint the status page pings — returns genuine server timing. */
export async function GET() {
  const t0 = performance.now();
  // touch a little work so the timing is real, not zero
  let acc = 0;
  for (let i = 0; i < 5000; i++) acc += Math.sqrt(i);
  const serverMs = +(performance.now() - t0).toFixed(2);
  return NextResponse.json(
    {
      status: "operational",
      region: process.env.VERCEL_REGION ?? "local",
      commit: (process.env.VERCEL_GIT_COMMIT_SHA ?? "dev").slice(0, 7),
      uptime_s: Math.floor((Date.now() - BOOT) / 1000),
      server_ms: serverMs,
      checksum: acc.toFixed(0),
      ts: new Date().toISOString(),
    },
    { headers: { "cache-control": "no-store" } },
  );
}

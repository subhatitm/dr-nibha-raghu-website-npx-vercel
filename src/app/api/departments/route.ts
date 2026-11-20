import { departments } from "@/server/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const items = departments();
  return Response.json({ items, total: items.length });
}

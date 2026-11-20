import { searchSpecialties } from "@/server/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const values = new URL(request.url).searchParams.getAll("q");
  const result = searchSpecialties(values.length > 1 ? values : values[0]);
  if (!result.ok) return Response.json({ error: result.error }, { status: 400 });
  return Response.json({ items: result.items, total: result.items.length, query: result.query });
}

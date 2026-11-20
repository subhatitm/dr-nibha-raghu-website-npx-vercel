import "server-only";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import type { ClinicContact, Department, Specialty } from "@/lib/clinic";
import { maxQueryLength } from "@/lib/clinic";

let catalog: DatabaseSync | undefined;
function database() {
  catalog ??= new DatabaseSync(path.join(process.cwd(), "data/generated/clinic.sqlite"), { readOnly: true });
  return catalog;
}

function parse<T>(row: Record<string, unknown>): T {
  return JSON.parse(String(row.document)) as T;
}

export function departments(): Department[] {
  return database().prepare("SELECT document FROM departments ORDER BY display_order").all().map(parse<Department>);
}

export function clinicContact(): ClinicContact {
  const row = database().prepare("SELECT document FROM contact WHERE id = 1").get();
  if (!row) throw new Error("Clinic contact is missing from the catalog");
  return parse<ClinicContact>(row);
}

export function searchSpecialties(raw: string | string[] | undefined) {
  if (Array.isArray(raw) || (raw?.length ?? 0) > maxQueryLength) {
    return { ok: false, error: `Enter one search of up to ${maxQueryLength} characters.` } as const;
  }
  const query = (raw ?? "").trim();
  const words = query.normalize("NFKC").match(/[\p{L}\p{N}]+/gu) ?? [];
  if (query && !words.length) return { ok: true, query, items: [] as Specialty[] } as const;
  const rows = words.length
    ? database().prepare(`SELECT s.document FROM specialty_search
        JOIN specialties s ON s.id = specialty_search.id
        WHERE specialty_search MATCH ? ORDER BY s.display_order`).all(words.map(word => `"${word}"*`).join(" AND "))
    : database().prepare("SELECT document FROM specialties ORDER BY display_order").all();
  return { ok: true, query, items: rows.map(parse<Specialty>) } as const;
}

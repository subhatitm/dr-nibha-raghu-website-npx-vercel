import { clinicContact } from "@/server/catalog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeText(value: string) {
  return value.replaceAll("\\", "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/[,;]/g, "\\$&");
}

export function GET(request: Request) {
  const contact = clinicContact();
  const format = new URL(request.url).searchParams.get("format");
  if (!format || format === "json") return Response.json(contact);
  if (format !== "vcard") return Response.json({ error: "Choose json or vcard." }, { status: 400 });

  const address = ["", "", contact.street, contact.city, contact.region, contact.postcode, contact.country];
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${escapeText(contact.doctor)}`,
    `N:;${escapeText(contact.doctor)};;;`, `ORG:${escapeText(contact.clinic)}`,
    `TEL;TYPE=WORK:${contact.phone}`, "ADR;TYPE=WORK:" + address.map(escapeText).join(";"), "END:VCARD", ""];
  return new Response(lines.join("\r\n"), { headers: {
    "Content-Type": "text/vcard; charset=utf-8",
    "Content-Disposition": 'attachment; filename="dr-nibha-raghu.vcf"',
  } });
}

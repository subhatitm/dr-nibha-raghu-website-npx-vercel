import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const directory = new URL("../data/", import.meta.url);
const read = file => JSON.parse(readFileSync(new URL(file, directory), "utf8"));
const output = fileURLToPath(new URL("generated/clinic.sqlite", directory));
mkdirSync(new URL("generated/", directory), { recursive: true });
const temporary = output + "." + process.pid;
const db = new DatabaseSync(temporary);
try {
  db.exec(`BEGIN;
    CREATE TABLE departments (id TEXT PRIMARY KEY NOT NULL, display_order INTEGER NOT NULL, document TEXT NOT NULL);
    CREATE TABLE specialties (id TEXT PRIMARY KEY NOT NULL, display_order INTEGER NOT NULL, document TEXT NOT NULL);
    CREATE VIRTUAL TABLE specialty_search USING fts5(id UNINDEXED, terms, tokenize='unicode61');
    CREATE TABLE contact (id INTEGER PRIMARY KEY CHECK (id = 1), document TEXT NOT NULL);`);
  const addDepartment = db.prepare("INSERT INTO departments VALUES (?, ?, ?)");
  read("departments.json").forEach((department, i) => addDepartment.run(department.id, i, JSON.stringify(department)));
  const addSpecialty = db.prepare("INSERT INTO specialties VALUES (?, ?, ?)");
  const addTerms = db.prepare("INSERT INTO specialty_search VALUES (?, ?)");
  read("specialties.json").forEach((specialty, i) => {
    addSpecialty.run(specialty.id, i, JSON.stringify(specialty));
    const terms = [specialty.title, specialty.shortTitle, specialty.description, ...specialty.highlights,
      ...specialty.stages.flatMap(stage => [stage.name, stage.desc])];
    addTerms.run(specialty.id, terms.join(" "));
  });
  db.prepare("INSERT INTO contact VALUES (1, ?)").run(JSON.stringify(read("contact.json")));
  db.exec("COMMIT");
  db.close();
  renameSync(temporary, output);
} finally {
  if (db.isOpen) db.close();
  rmSync(temporary, { force: true });
}

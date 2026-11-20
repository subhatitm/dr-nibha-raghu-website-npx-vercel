export type Department = (typeof import("../../data/departments.json"))[number];
export type Specialty = (typeof import("../../data/specialties.json"))[number];
export type ClinicContact = typeof import("../../data/contact.json");

export const maxQueryLength = 80;

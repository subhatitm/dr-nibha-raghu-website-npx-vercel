"use client";

import HoursWidget from "@/components/ui/HoursWidget";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const reasons = [
  "Unhurried consultations with clear explanation of findings",
  "In-clinic nasal endoscopy & flexible laryngoscopy",
  "Minimally invasive FESS and micro-ear surgery",
  "Multidisciplinary head–neck cancer planning",
  "Transparent treatment costs, no upselling",
  "Follow-up support over call and WhatsApp",
];

export default function HoursContactSection() {
  return (
    <section className="block grid g2" aria-labelledby="hours-heading">
      <ScrollReveal animation="slide-up">
        <div className="glass hours card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <h3 id="hours-heading" style={{ margin: 0 }}>Clinic Hours</h3>
            <HoursWidget showFull={false} />
          </div>
          <HoursWidget showFull={true} />
          <p className="note" style={{ marginTop: "12px" }}>
            Times shown in IST
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100} animation="slide-up">
        <div className="glass card">
          <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-4">Why Patients Choose This Clinic</h3>
          <ul className="clean mb-6">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
          <Link href="#about" className="btn btn-ghost w-full sm:w-auto justify-center">
            About Dr. Nibha
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
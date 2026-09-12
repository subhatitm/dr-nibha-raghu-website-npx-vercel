"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const trustItems = [
  {
    icon: "experience",
    value: "15+",
    label: "Years of Experience",
    description: "Dedicated ENT practice",
  },
  {
    icon: "hospital",
    value: "Cytecare",
    label: "Hospital Affiliation",
    description: "Premier cancer & surgical center",
  },
  {
    icon: "specialty",
    value: "ENT + H&N",
    label: "Specialty Focus",
    description: "Ear, Nose, Throat & Head/Neck",
  },
  {
    icon: "patients",
    value: "5000+",
    label: "Patients Treated",
    description: "Successful outcomes",
  },
];

const icons: Record<string, React.ReactNode> = {
  experience: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  hospital: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  specialty: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  patients: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

export default function TrustStrip() {
  return (
    <section className="py-12 lg:py-16 border-y border-primary/10 bg-white/50" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <ScrollReveal key={item.icon} delay={index * 80} animation="slide-up">
              <div className="text-center lg:text-left p-4 lg:p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 lg:mb-5">
                  {icons[item.icon]}
                </div>
                <div className="font-display text-3xl lg:text-4xl font-extrabold text-foreground mb-1">
                  {item.value}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-foreground/60">
                  {item.description}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
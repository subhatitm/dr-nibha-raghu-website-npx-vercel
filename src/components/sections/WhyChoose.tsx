"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: "patience",
    title: "Unhurried Consultations",
    description: "Every visit is unrushed. Dr. Raghu takes the time to listen, understand your concerns, and explain your condition in clear, simple terms.",
    color: "primary",
  },
  {
    icon: "diagnosis",
    title: "Thorough Diagnosis First",
    description: "Comprehensive evaluation using advanced diagnostic tools to identify the root cause, not just treat symptoms. Precision leads to better outcomes.",
    color: "accent",
  },
  {
    icon: "communication",
    title: "Clear Communication",
    description: "Medical jargon translated into plain language. You'll understand your diagnosis, treatment options, and recovery expectations completely.",
    color: "primary",
  },
  {
    icon: "treatment",
    title: "Effective Treatment",
    description: "Evidence-based treatments tailored to your specific condition. From conservative management to advanced surgical interventions when needed.",
    color: "accent",
  },
];

const icons: Record<string, React.ReactNode> = {
  patience: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  diagnosis: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  communication: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h4m4 0h4m-4-4v4m0 4v4m-8-4h4m-4 0l4 4m-4-4l-4 4" />
    </svg>
  ),
  treatment: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

export default function WhyChoose() {
  return (
    <section className="block" aria-labelledby="why-choose-heading">
      <div className="wrap">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="why-choose-heading" className="font-display text-3xl sm:text-4xl font-bold text-[var(--ink)] mb-4">
              Why Patients Choose This Clinic
            </h2>
            <p className="lede">
              Combining clinical excellence with genuine compassion — here&apos;s what sets our care apart.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} animation="slide-up">
          <div className="grid g2 lg:g4 gap-6">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="glass card group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: feature.color === "primary"
                      ? "linear-gradient(140deg, var(--teal), #3aa7b8)"
                      : "linear-gradient(140deg, var(--gold), #e0a84a)",
                    boxShadow: "0 10px 24px -10px rgba(14, 116, 144, 0.8)",
                  }}
                  aria-hidden="true"
                >
                  {icons[feature.icon]}
                </div>
                <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                  {feature.title}
                </h3>
                <p className="muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
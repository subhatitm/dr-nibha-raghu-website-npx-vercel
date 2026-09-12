"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: "patience",
    title: "Patient-Centered Care",
    description: "Every consultation is unrushed. Dr. Raghu takes the time to listen, understand your concerns, and explain your condition in clear, simple terms.",
    color: "primary",
  },
  {
    icon: "diagnosis",
    title: "Thorough Diagnosis",
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h4m4 0h4m-8-4v4m0 0l-4 4m4-4l4 4m-8 4v-4m0-4v-4" />
    </svg>
  ),
  treatment: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

const iconBgColors = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
};

export default function WhyChoose() {
  return (
    <section className="py-16 lg:py-24 bg-background/50 relative" aria-labelledby="why-choose-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="why-choose-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Patients Choose Dr. Nibha Raghu
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Four pillars of care that have earned the trust of thousands of patients across Bengaluru
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.icon} delay={index * 100} animation="slide-up">
              <article
                className="group glass-card rounded-2xl p-6 lg:p-8 hover:shadow-3d-hover transition-all duration-500 border border-primary/10"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${iconBgColors[feature.color as keyof typeof iconBgColors]}`}
                  aria-hidden="true"
                >
                  {icons[feature.icon]}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    name: "Venkata R.",
    condition: "Nasal polyp surgery",
    quote: "A very reassuring experience. Everything was explained clearly before and after the procedure, and recovery went exactly as described.",
    rating: 5,
  },
  {
    name: "Rachana T.",
    condition: "Epistaxis treatment",
    quote: "She genuinely cared — listened patiently, explained the reasoning behind the treatment and answered all my questions.",
    rating: 5,
  },
  {
    name: "Verified patient",
    condition: "ENT consultation",
    quote: "The doctor explained exactly what was happening and how the affected area was involved. Five out of five for the overall experience.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="block" aria-labelledby="testimonials-heading">
      <div className="wrap">
        <ScrollReveal animation="slide-up">
          <h2 id="testimonials-heading" className="font-display text-3xl sm:text-4xl font-bold text-[var(--ink)] text-center mb-2">
            What Patients Say
          </h2>
          <p className="lede text-center max-w-2xl mx-auto">
            Real experiences from patients who&apos;ve trusted us with their care.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} animation="slide-up">
          <div className="grid g3 mt-10 gap-6">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className="glass card"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="stars mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i} aria-hidden="true">★</span>
                  ))}
                </div>
                <p className="text-[var(--ink)] leading-relaxed mb-4" style={{ fontStyle: "italic" }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="note text-sm">
                  <strong>{testimonial.name}</strong> · {testimonial.condition}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
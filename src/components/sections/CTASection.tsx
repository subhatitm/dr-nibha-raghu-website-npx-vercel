"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section
      className="block relative overflow-hidden"
      style={{
        background: "linear-gradient(140deg, var(--teal-dk), var(--teal))",
        borderRadius: "var(--radius)",
        marginTop: "56px",
      }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
        aria-hidden="true"
      />

      <div className="relative wrap py-16 lg:py-24 text-center">
        <ScrollReveal animation="slide-up">
          <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Schedule Your Consultation?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100} animation="slide-up">
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t let ENT issues affect your quality of life. Book an appointment today for expert diagnosis and personalized treatment.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} animation="slide-up">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-white text-[var(--teal)] font-semibold text-lg hover:bg-[var(--teal)]/10 hover:shadow-2xl transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment Online
            </Link>
            <a
              href="tel:+910000000000"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white/10 hover:shadow-2xl transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: +91 00000 00000
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} animation="fade-in">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span>Same-day appointments available</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>Insurance accepted</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Cytecare Hospital, Yelahanka</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
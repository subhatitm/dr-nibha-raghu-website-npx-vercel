"use client";

import Link from "next/link";
import ENTIllustration from "@/components/ui/ENTIllustration";
import TrustBadge from "@/components/ui/TrustBadge";
import HoursWidget from "@/components/ui/HoursWidget";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <ScrollReveal delay={100} animation="slide-down">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Accepting New Patients
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} animation="slide-up">
              <h1
                id="hero-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-foreground mb-6 text-balance"
              >
                Dr. Nibha Raghu
                <br />
                <span className="gradient-text">ENT Head & Neck Surgeon</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300} animation="slide-up">
              <p className="text-lg sm:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Providing expert, compassionate care for ear, nose, throat, and head & neck conditions.
                Board-certified with 4.9★ patient satisfaction.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} animation="slide-up">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
                <Link
                  href="/book-appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold text-lg hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 focus-visible-ring"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </Link>
                <a
                  href="tel:09902876872"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-lg hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 focus-visible-ring"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} animation="slide-up">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <TrustBadge size="large" />
                <HoursWidget />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={600} animation="slide-up">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <span>Cytecare Hospital, Yelahanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span>Head & Neck Surgery Specialist</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={200} animation="scale-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-[50%] blur-2xl animate-pulse-soft" aria-hidden="true" />
                <div className="relative glass-card rounded-[50%] p-2 lg:p-4 shadow-3d-hover">
                  <ENTIllustration size={480} animate={true} />
                </div>
                <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8">
                  <div className="neumorphic-card p-4 lg:p-6 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-3xl font-extrabold text-foreground">4.9</p>
                        <p className="text-sm text-foreground/60">Google Rating</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-foreground/10 flex items-center gap-2 text-sm text-foreground/70">
                      <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      <span>30 Verified Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
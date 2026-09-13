"use client";

import Link from "next/link";
import ENTIllustration from "@/components/ui/ENTIllustration";
import TrustBadge from "@/components/ui/TrustBadge";
import ScrollReveal from "@/components/ui/ScrollReveal";

const trustItems = [
  { value: "4.9", label: "Patient Rating", stars: true },
  { value: "30+", label: "Verified Reviews" },
  { value: "10+", label: "Years Experience" },
  { value: "MS (ENT)", label: "Head–Neck Onco Fellowship" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden pt-16 lg:pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative wrap py-12 lg:py-20">
        <div className="hero grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <ScrollReveal delay={100} animation="slide-down">
              <div className="pill mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" aria-hidden="true" />
                Yelahanka, Bengaluru
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} animation="slide-up">
              <h1 id="hero-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--ink)] mb-6 leading-tight">
                Expert ENT & Head–Neck Care,<br />
                <span style={{ color: "var(--teal)" }}>With Time to Listen</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={300} animation="slide-up">
              <p className="lede mb-8 max-w-none">
                Dr. Nibha Raghu is a Consultant ENT Surgeon with fellowship training in Head & Neck Oncology — offering precise diagnosis, minimally invasive sinus and ear surgery, and compassionate cancer care for the head and neck.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} animation="slide-up">
              <div className="hero-actions flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4">
                <Link href="#contact" className="btn btn-primary w-full sm:w-auto">
                  Book an Appointment
                </Link>
                <Link href="#services" className="btn btn-ghost w-full sm:w-auto">
                  Explore Services
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} animation="fade-in">
              <TrustBadge rating={4.9} reviewCount={30} size="large" />
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={200} animation="scale-in">
              <div className="glass portrait p-4 lg:p-6">
                <div
                  className="frame aspect-[4/5] rounded-xl grid place-items-center text-center p-8 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(150deg, rgba(14,116,144,0.18), rgba(255,255,255,0.5))",
                    border: "1px dashed rgba(14,116,144,0.4)",
                  }}
                >
                  <div className="relative z-10">
                    <ENTIllustration size={320} animate={true} />
                    <p className="mt-4 text-[var(--teal-dk)] font-display">Dr. Nibha Raghu</p>
                    <p className="text-[var(--ink-soft)] text-sm mt-1">3D ENT Anatomy Visualization</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-50" aria-hidden="true" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="badges grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-12 lg:mt-16">
          {trustItems.map((item, index) => (
            <ScrollReveal key={item.label} delay={600 + index * 100} animation="slide-up">
              <div className="glass card badge">
                <b className="font-display">
                  {item.value}
                  {item.stars && <span className="text-lg ml-1">★</span>}
                </b>
                <span>{item.label}</span>
                {item.stars && <div className="stars mt-2">★★★★★</div>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
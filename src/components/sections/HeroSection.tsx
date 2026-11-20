import Link from "next/link";
import ClinicModel from "../canvas/ClinicModel";

const stats = [
  { value: "16+", label: "Years of Overall Experience" },
  { value: "95733", label: "KMC Accredited Registration (MBBS, MS ENT, Fellowship)" },
  { value: "6", label: "Core Surgical Pillars" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="clinic-section relative min-h-screen flex items-center justify-start px-6 lg:px-12"
      aria-labelledby="hero-heading"
    >
      <div className="wrap clinic-hero-grid">
        <div className="clinic-hero-intro">
          <span className="pill">Yelahanka, Bengaluru · Cytecare Hospitals</span>
          <h1 id="hero-heading" className="font-display font-bold text-text-primary tracking-tight">
            Precision care that restores{" "}
            <span className="gradient-text-emerald">voice, breathing &amp; life.</span>
          </h1>
        </div>
        <div className="clinic-hero-model"><ClinicModel /></div>
        <div className="clinic-hero-details">
          <p className="lede text-text-secondary mb-6">
            Comprehensive Ear, Nose, Throat (ENT) &amp; Head-Neck Oncology care in Bengaluru.
            Dr. Nibha Raghu combines clinical experience with
            minimally invasive endoscopic precision and evidence-based oncology protocols.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn btn-primary">Book Appointment</Link>
            <Link href="#specialties" className="btn btn-glass">Explore Specialties</Link>
          </div>
        </div>
        <div className="clinic-hero-stats grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Key statistics">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass card text-center p-6"
              role="listitem"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text-emerald mb-2">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs sm:text-sm leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

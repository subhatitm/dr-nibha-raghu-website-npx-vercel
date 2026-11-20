import Link from "next/link";

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
      <div className="wrap max-w-5xl">
        <div
          className="mb-10"
        >
          <span className="pill inline-block" style={{ animationDelay: "0.3s" }}>
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" aria-hidden="true" />
            Yelahanka, Bengaluru · Cytecare Hospitals
          </span>
        </div>

        <h1
          id="hero-heading"
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary mb-8 leading-[1.05] tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          Precision care that restores{" "}
          <span className="gradient-text-emerald">voice, breathing & life.</span>
        </h1>

        <div
          className="mb-7"
        >
          <p className="lede text-text-secondary max-w-2xl">
            Comprehensive Ear, Nose, Throat (ENT) & Head-Neck Oncology care in Bengaluru.
            Dr. Nibha Raghu combines clinical experience with
            minimally invasive endoscopic precision and evidence-based oncology protocols.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4"
        >
          <Link href="#contact" className="btn btn-primary w-full sm:w-auto">
            Book Appointment
          </Link>
          <Link href="#specialties" className="btn btn-glass w-full sm:w-auto">
            Explore Specialties
          </Link>
        </div>

        {/* Floating Stats Preview */}
        <div
          className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4"
          role="list"
          aria-label="Key statistics"
        >
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

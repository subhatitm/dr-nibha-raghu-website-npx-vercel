
const metrics = [
  { value: "16+", label: "Years of Overall Experience", detail: "Across leading institutions including Cytecare Cancer Hospital and Columbia Asia" },
  { value: "95733", label: "Karnataka Medical Council Accredited Registration", detail: "MBBS, MS ENT, Fellowship in Head & Neck Oncology — verified credentials" },
  { value: "6", label: "Core Surgical Pillars", detail: "FESS, Oncology, Septoplasty, Laryngoscopy, Bronchoscopy, Tympanoplasty" },
];

const quote = "For restoring vital human senses, surgical precision knows no limits.";

export default function MetricsFlythroughSection() {
  return (
    <section
      id="patient-impact"
      className="clinic-section relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      aria-labelledby="metrics-heading"
    >
      <div className="wrap">
        {/* Mission Headline */}
        <div
          className="text-center mb-16"
        >
          <span className="pill inline-block mb-6" style={{ animationDelay: "0.2s" }}>
            Clinical Impact & Surgical Excellence
          </span>
          <h2
            id="metrics-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight gradient-text-emerald"
          >
            We deliver surgical excellence that transforms recovery by reimagining compassionate care.
          </h2>
        </div>

        {/* Two-Column Copy */}
        <div
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-20 max-w-5xl mx-auto"
        >
          <div className="glass card p-8">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">Minimally Invasive Precision</h3>
            <p className="lede text-text-secondary">
              In her clinical practice, Dr. Nibha Raghu combines minimally invasive endoscopic precision with evidence-based oncology protocols.
            </p>
          </div>
          <div className="glass card p-8">
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">Organ Preservation & Healing</h3>
            <p className="lede text-text-secondary">
              From complex skull-base and head-neck tumor resections to delicate pediatric airway and sinus procedures, every treatment plan is tailored to preserve organ function and accelerate healing.
            </p>
          </div>
        </div>

        {/* Floating 3D Depth Stat Counters */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 perspective-1000"
          role="list"
          aria-label="Clinical impact metrics"
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.value}
              className="glass card p-6 relative transform-style-3d group"
              role="listitem"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(${index * 20}px)`,
              }}
            >
              {/* Depth indicator */}
              <div className="absolute -top-3 -right-3 w-2 h-2 rounded-full" style={{
                background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                opacity: 0.6,
              }} />

              <div className="font-display text-4xl sm:text-5xl font-bold gradient-text-emerald mb-3" style={{ transform: "translateZ(20px)" }}>
                {metric.value}
              </div>
              <div className="font-medium text-text-primary mb-2" style={{ transform: "translateZ(10px)" }}>
                {metric.label}
              </div>
              <div className="text-text-muted text-sm leading-relaxed" style={{ transform: "translateZ(5px)" }}>
                {metric.detail}
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  filter: "blur(20px)",
                  zIndex: -1,
                }}
              />
            </div>
          ))}
        </div>

        {/* Secondary Orbit Quote */}
        <div
          className="text-center glass card p-8 lg:p-12 max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)" }} />
            <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)" }} />
          </div>

          <svg className="w-12 h-12 mx-auto mb-4 text-accent-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>

          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-text-primary leading-tight">
            &ldquo;{quote}&rdquo;
          </blockquote>

          <footer className="mt-6 text-text-muted text-sm">
            — Dr. Nibha Raghu, Associate Consultant ENT & Head-Neck Surgery
          </footer>
        </div>

        {/* Surgical Pillars Tags */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="pill pill-warm text-xs">Core Surgical Pillars</span>
          {["FESS", "Oncology", "Septoplasty", "Laryngoscopy", "Bronchoscopy", "Tympanoplasty"].map((pillar) => (
            <span key={pillar} className="pill text-xs" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
              {pillar}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

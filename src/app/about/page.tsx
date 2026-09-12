"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const qualifications = [
  "MBBS - Bachelor of Medicine and Bachelor of Surgery",
  "MS (ENT) - Master of Surgery in Otorhinolaryngology",
  "DNB (ENT) - Diplomate of National Board in ENT",
  "Fellowship in Head & Neck Oncology Surgery",
  "Advanced Training in Endoscopic Sinus Surgery",
  "Certification in Cochlear Implant Surgery",
];

const expertise = [
  { title: "Ear Disorders & Hearing Loss", items: ["Chronic ear infections", "Hearing evaluation & restoration", "Cochlear implants", "Tinnitus management", "Balance disorders"] },
  { title: "Nasal & Sinus Conditions", items: ["Chronic sinusitis", "Nasal polyps", "Deviated septum correction", "Allergic rhinitis", "Endoscopic sinus surgery"] },
  { title: "Throat & Voice Disorders", items: ["Voice disorders & hoarseness", "Tonsil & adenoid issues", "Swallowing difficulties", "Throat infections", "Laryngoscopy procedures"] },
  { title: "Head & Neck Surgery", items: ["Thyroid & parathyroid surgery", "Salivary gland disorders", "Neck mass evaluation", "Head & neck oncology", "Reconstructive surgery"] },
  { title: "Pediatric ENT", items: ["Childhood ear infections", "Tonsillectomy & adenoidectomy", "Congenital anomalies", "Airway management", "Speech & hearing issues"] },
];

export default function AboutContent() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 id="about-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Dr. Nibha Raghu
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              A dedicated ENT Head & Neck Surgeon committed to providing exceptional, patient-centered care
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} animation="slide-up">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative">
              <div className="glass-card rounded-2xl p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
                <div className="relative">
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center p-8">
                      <svg className="w-24 h-24 mx-auto text-primary/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <p className="text-foreground/50 text-lg">Dr. Nibha Raghu</p>
                      <p className="text-foreground/40 text-sm mt-1">Photo Placeholder</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-50" aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 lg:p-6 shadow-3d min-w-[220px]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-foreground">4.9</p>
                        <p className="text-sm text-foreground/60">Patient Satisfaction</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 rounded-lg bg-primary/5">
                        <p className="font-semibold text-primary">15+</p>
                        <p className="text-foreground/60">Years Experience</p>
                      </div>
                      <div className="p-2 rounded-lg bg-accent/5">
                        <p className="font-semibold text-accent">5000+</p>
                        <p className="text-foreground/60">Patients Treated</p>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/5">
                        <p className="font-semibold text-primary">30+</p>
                        <p className="text-foreground/60">Google Reviews</p>
                      </div>
                      <div className="p-2 rounded-lg bg-accent/5">
                        <p className="font-semibold text-accent">100%</p>
                        <p className="text-foreground/60">Patient Focused</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 lg:p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Professional Biography</h2>
                <div className="prose prose-foreground max-w-none text-foreground/70 leading-relaxed space-y-4">
                  <p>
                    Dr. Nibha Raghu is a highly accomplished ENT (Ear, Nose & Throat) Head and Neck Surgeon
                    with over 15 years of clinical experience. She currently practices at Cytecare Hospital,
                    Bengaluru&apos;s premier cancer and surgical care center, where she leads the ENT and Head & Neck
                    Surgery department.
                  </p>
                  <p>
                    Dr. Raghu completed her MBBS followed by Master of Surgery (MS) in Otorhinolaryngology
                    and earned her Diplomate of National Board (DNB) in ENT. She further pursued advanced
                    fellowship training in Head & Neck Oncology Surgery, gaining expertise in complex surgical
                    procedures for benign and malignant conditions of the head and neck region.
                  </p>
                  <p>
                    Throughout her career, Dr. Raghu has successfully treated thousands of patients with a wide
                    range of ENT conditions. She is particularly known for her expertise in endoscopic sinus
                    surgery, cochlear implant procedures, thyroid and parathyroid surgery, and minimally
                    invasive head & neck surgical techniques.
                  </p>
                  <p>
                    Her approach combines clinical excellence with genuine compassion. Patients consistently
                    praise her for unrushed consultations, thorough explanations, and treatment plans tailored
                    to their individual needs. She believes in empowering patients with knowledge, ensuring
                    they are active participants in their healthcare decisions.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 lg:p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Qualifications & Certifications</h2>
                <ul className="space-y-3" role="list">
                  {qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors" role="listitem">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-foreground">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} animation="slide-up">
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
              Areas of Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.map((area, index) => (
                <article
                  key={area.title}
                  className="glass-card rounded-2xl p-6 hover:shadow-3d-hover transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
                    {area.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground/70" role="list">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} animation="slide-up">
          <div className="mt-16 glass-card rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Experience Compassionate, Expert ENT Care
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re dealing with a chronic sinus issue, hearing concerns, or need specialized head & neck surgery, Dr. Raghu and her team are here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 focus-visible-ring"
              >
                Book Your Consultation
              </a>
              <a
                href="tel:09902876872"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 focus-visible-ring"
              >
                Call: 099028 76872
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
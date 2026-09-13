"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceIcon from "@/components/ui/ServiceIcon";

type ServiceIconType = "ear" | "sinus" | "throat" | "head-neck" | "hearing" | "voice";

const services: Array<{
  id: string;
  title: string;
  icon: ServiceIconType;
  description: string;
  color: "primary" | "accent";
}> = [
  { id: "fess", title: "Endoscopic Sinus Surgery (FESS)", icon: "sinus", description: "Image-guided, minimally invasive clearance of chronic sinus disease and nasal polyps with faster recovery.", color: "primary" },
  { id: "septoplasty", title: "Septoplasty & Turbinoplasty", icon: "sinus", description: "Correction of a deviated septum and reduction of enlarged turbinates to restore free nasal breathing.", color: "primary" },
  { id: "ear", title: "Tympanoplasty & Ear Microsurgery", icon: "ear", description: "Repair of perforated eardrums, mastoid surgery and management of chronic discharging ears.", color: "primary" },
  { id: "voice", title: "Voice & Airway Endoscopy", icon: "voice", description: "Flexible laryngoscopy and bronchoscopy to evaluate hoarseness, swallowing difficulty and airway narrowing.", color: "accent" },
  { id: "tonsil", title: "Tonsil & Adenoid Surgery", icon: "throat", description: "Adeno-tonsillectomy for recurrent infection, mouth breathing and obstructed sleep in children and adults.", color: "accent" },
  { id: "oncology", title: "Head & Neck Oncology", icon: "head-neck", description: "Surgical management of oral cavity, throat, salivary and thyroid tumours with multidisciplinary planning.", color: "primary" },
  { id: "allergy", title: "Allergy & Rhinitis Care", icon: "sinus", description: "Testing-guided medical management of allergic rhinitis, chronic sneezing and nasal hypersensitivity.", color: "primary" },
  { id: "sleep", title: "Snoring & Sleep Apnoea", icon: "voice", description: "Airway assessment, sleep-study interpretation and surgical or device-based treatment pathways.", color: "accent" },
  { id: "neck", title: "Neck Lump Evaluation", icon: "head-neck", description: "Ultrasound-guided FNAC, staging work-up and prompt referral for definitive treatment when needed.", color: "primary" },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const service = services.find(s => s.id === selectedService);

  return (
    <section className="block" aria-labelledby="services-heading">
      <div className="wrap">
        <ScrollReveal animation="slide-up">
          <h2 id="services-heading" className="font-display text-3xl sm:text-4xl font-bold text-[var(--ink)] mb-2">
            How We Can Help
          </h2>
          <p className="lede">
            A focused ENT practice covering the full range of ear, nose, throat, voice and head–neck conditions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100} animation="slide-up">
          <div className="grid g3 mt-10" role="tablist" aria-label="Service categories">
            {services.map((svc, index) => (
              <article
                key={svc.id}
                role="tab"
                aria-selected={selectedService === svc.id}
                aria-controls={`${svc.id}-panel`}
                id={`${svc.id}-tab`}
                tabIndex={selectedService === svc.id ? 0 : -1}
                onClick={() => setSelectedService(selectedService === svc.id ? null : svc.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedService(selectedService === svc.id ? null : svc.id);
                  }
                }}
                className={`group relative glass card cursor-pointer transition-all duration-300 ${
                  selectedService === svc.id
                    ? "ring-2 ring-[var(--teal)] shadow-[0_30px_70px_-22px_rgba(10,39,51,0.45)] transform -translate-y-1 z-10"
                    : "hover:shadow-[0_30px_70px_-22px_rgba(10,39,51,0.45)] border border-[var(--line)]"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 relative overflow-hidden"
                  style={{
                    background: svc.color === "primary"
                      ? "linear-gradient(140deg, var(--teal), #3aa7b8)"
                      : "linear-gradient(140deg, var(--gold), #e0a84a)",
                    boxShadow: "0 10px 24px -10px rgba(14, 116, 144, 0.8)",
                  }}
                  aria-hidden="true"
                >
                  <ServiceIcon type={svc.icon} size={40} />
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-2">
                  {svc.title}
                </h3>
                <p className="muted text-sm leading-relaxed">
                  {svc.description}
                </p>

                {selectedService === svc.id && (
                  <div className="mt-4 pt-4 border-t border-[var(--line)] animate-slide-down">
                    <Link
                      href="#contact"
                      className="btn btn-primary text-sm"
                    >
                      Book This Service
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        </ScrollReveal>

        {selectedService && (
          <ScrollReveal delay={200} animation="slide-up">
            <div className="mt-8 glass card p-8 text-center border border-[var(--teal)]/30">
              <h2 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">
                {service?.title}
              </h2>
              <p className="muted mb-6 max-w-2xl mx-auto">
                {service?.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#contact" className="btn btn-primary">
                  Schedule Consultation
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={() => setSelectedService(null)}
                >
                  View All Services
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {!selectedService && (
          <ScrollReveal delay={200} animation="slide-up">
            <div className="mt-10 glass card p-8 lg:p-12 text-center border border-[var(--line)]">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-[var(--ink)] mb-4">
                Can&apos;t Find Your Condition?
              </h2>
              <p className="muted mb-8 max-w-2xl mx-auto leading-relaxed">
                Dr. Raghu treats a wide range of ENT and head & neck conditions beyond what&apos;s listed above. Contact us to discuss your specific concerns.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="#contact" className="btn btn-primary">
                  Talk to the Clinic
                </Link>
                <Link href="#conditions" className="btn btn-ghost">
                  View All Conditions
                </Link>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

import Link from "next/link";
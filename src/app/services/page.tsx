"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceIcon from "@/components/ui/ServiceIcon";

const services = [
  {
    id: "ear",
    title: "Ear Disorders & Hearing Care",
    description: "Comprehensive diagnosis and treatment of all ear conditions, from common infections to complex hearing restoration procedures.",
    icon: "ear",
    color: "primary",
    treatments: [
      "Chronic otitis media & ear infections",
      "Hearing loss evaluation & management",
      "Cochlear implant surgery & rehabilitation",
      "Tinnitus (ringing in ears) treatment",
      "Vertigo & balance disorder management",
      "Eardrum perforation repair (tympanoplasty)",
      "Otosclerosis & stapedectomy surgery",
      "Ear wax removal & foreign body removal",
      "Pediatric ear conditions",
      "Sudden sensorineural hearing loss",
    ],
  },
  {
    id: "sinus",
    title: "Sinus & Nasal Treatment",
    description: "Advanced endoscopic and medical management of sinus and nasal conditions for lasting relief and improved breathing.",
    icon: "sinus",
    color: "primary",
    treatments: [
      "Chronic & recurrent sinusitis",
      "Nasal polyps (medical & surgical)",
      "Deviated nasal septum (septoplasty)",
      "Allergic rhinitis & immunotherapy",
      "Endoscopic sinus surgery (FESS)",
      "Nasal obstruction & breathing issues",
      "Epistaxis (nosebleeds) management",
      "Sinus headache & facial pain",
      "Smell & taste disorders",
      "Revision sinus surgery",
    ],
  },
  {
    id: "throat",
    title: "Throat & Voice Care",
    description: "Specialized care for throat conditions, voice disorders, and swallowing difficulties using state-of-the-art diagnostic techniques.",
    icon: "throat",
    color: "accent",
    treatments: [
      "Chronic tonsillitis & tonsillectomy",
      "Adenoid hypertrophy & adenoidectomy",
      "Voice disorders & hoarseness",
      "Vocal cord nodules/polyps/cysts",
      "Laryngopharyngeal reflux (LPR)",
      "Swallowing disorders (dysphagia)",
      "Chronic cough & throat clearing",
      "Sleep apnea & snoring evaluation",
      "Zenker's diverticulum",
      "Laryngeal cancer screening",
    ],
  },
  {
    id: "head-neck",
    title: "Head & Neck Surgery",
    description: "Expert surgical management of benign and malignant conditions of the thyroid, parathyroid, salivary glands, and neck masses.",
    icon: "head-neck",
    color: "accent",
    treatments: [
      "Thyroid nodules & thyroidectomy",
      "Parathyroid adenoma & hyperplasia",
      "Salivary gland tumors & surgery",
      "Neck mass evaluation & excision",
      "Head & neck cancer surgery",
      "Lymph node biopsy & dissection",
      "Branchial cleft cysts & sinuses",
      "Thyroglossal duct cysts",
      "Parapharyngeal space tumors",
      "Reconstructive & microvascular surgery",
    ],
  },
  {
    id: "hearing",
    title: "Hearing Evaluation & Restoration",
    description: "Complete audiological assessment and cutting-edge hearing restoration solutions for patients of all ages.",
    icon: "hearing",
    color: "primary",
    treatments: [
      "Pure tone & speech audiometry",
      "Tympanometry & acoustic reflexes",
      "Otoacoustic emissions (OAE) testing",
      "Auditory brainstem response (ABR)",
      "Hearing aid fitting & programming",
      "Bone-anchored hearing aids (BAHA)",
      "Cochlear implant candidacy & surgery",
      "Auditory rehabilitation therapy",
      "Pediatric hearing screening",
      "Tinnitus retraining therapy",
    ],
  },
  {
    id: "voice",
    title: "Voice & Swallowing Disorders",
    description: "Multidisciplinary approach to voice and swallowing disorders with advanced laryngeal videostroboscopy and therapy.",
    icon: "voice",
    color: "primary",
    treatments: [
      "Videostroboscopic laryngeal exam",
      "Voice therapy & rehabilitation",
      "Professional voice care (singers/teachers)",
      "Vocal cord paralysis treatment",
      "Spasmodic dysphonia management",
      "Swallowing therapy (FEES/VFS)",
      "Transgender voice modification",
      "Aging voice (presbyphonia) care",
      "Laryngeal framework surgery",
      "Office-based laryngeal procedures",
    ],
  },
];

const iconColors = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
};

export default function ServicesContent() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-24 relative" aria-labelledby="services-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 id="services-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Our ENT Services
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Comprehensive care for all ear, nose, throat, and head & neck conditions using the latest diagnostic and treatment technologies
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} animation="slide-up">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" role="tablist" aria-label="Service categories">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  role="tab"
                  aria-selected={selectedService === service.id}
                  aria-controls={`${service.id}-panel`}
                  id={`${service.id}-tab`}
                  tabIndex={selectedService === service.id ? 0 : -1}
                  onClick={() => setSelectedService(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedService(service.id);
                    }
                  }}
                  className={`group relative glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedService === service.id
                      ? "ring-2 ring-primary shadow-3d-hover transform -translate-y-1"
                      : "hover:shadow-3d-hover border border-primary/10"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${iconColors[service.color as keyof typeof iconColors]}`}
                    aria-hidden="true"
                  >
                    <ServiceIcon type={service.icon as ServiceIconProps["type"]} size={48} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    <span>View Treatments</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>

          {selectedService && (
            <div id={`${selectedService}-panel`} role="tabpanel" aria-labelledby={`${selectedService}-tab`}>
              <ScrollReveal delay={200} animation="slide-up">
                <div className="glass-card rounded-2xl p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors focus-visible-ring rounded px-3 py-2"
                    aria-label="Back to all services"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All Services
                  </button>
                  <div className="flex-1 text-center sm:text-left">
                    <ServiceIcon type={selectedService as ServiceIconProps["type"]} size={40} className="inline-block mb-3" />
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {services.find(s => s.id === selectedService)?.title}
                    </h2>
                  </div>
                  <div className="w-16" />
                </div>

                <div className="prose prose-foreground max-w-none text-foreground/70 leading-relaxed mb-8">
                  <p>{services.find(s => s.id === selectedService)?.description}</p>
                </div>

                <h3 className="font-semibold text-foreground mb-4">Treatments Offered</h3>
                <div className="grid sm:grid-cols-2 gap-3" role="list">
                  {services.find(s => s.id === selectedService)?.treatments.map((treatment, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors" role="listitem">
                      <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-foreground">{treatment}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
                  <p className="text-foreground/70 text-center sm:text-left">
                    Not sure which service you need? Let us help guide you.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="/book-appointment"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-all duration-300 focus-visible-ring"
                    >
                      Book Consultation
                    </a>
                    <a
                      href="tel:09902876872"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 focus-visible-ring"
                    >
                      Call for Guidance
                    </a>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            </div>
          )}

          {!selectedService && (
            <ScrollReveal delay={200} animation="slide-up">
              <div className="glass-card rounded-2xl p-8 lg:p-12 text-center border border-primary/20">
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Can't Find Your Condition?
                </h2>
                <p className="text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Dr. Raghu treats a wide range of ENT and head & neck conditions beyond what's listed above. Contact us to discuss your specific concerns.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/book-appointment"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light hover:shadow-xl transition-all duration-300 focus-visible-ring"
                  >
                    Book Appointment
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
          )}
        </div>
      </section>
    </div>
  );
}

interface ServiceIconProps {
  type: "ear" | "sinus" | "throat" | "head-neck" | "hearing" | "voice";
  size?: number;
  className?: string;
}
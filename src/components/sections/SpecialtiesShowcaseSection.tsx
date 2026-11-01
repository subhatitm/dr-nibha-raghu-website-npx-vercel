"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpecialtiesShowcaseSectionProps {
  isActive: boolean;
  sceneProgress: number;
}

const specialties = [
  {
    id: "fess",
    title: "Functional Endoscopic Sinus Surgery (FESS)",
    shortTitle: "FESS",
    description: "Image-guided, minimally invasive clearance of chronic sinus disease and nasal polyps with faster recovery and preserved mucosa.",
    stages: [
      { name: "Diagnostic Scan", icon: "📷", desc: "CT/MRI with 3D reconstruction" },
      { name: "3D Endoscopic Mapping", icon: "🗺️", desc: "Navigation-guided surgical planning" },
      { name: "Minimally Invasive Procedure", icon: "🔬", desc: "Endoscopic microdebrider & balloon sinuplasty" },
      { name: "Organ Preservation", icon: "🛡️", desc: "Mucosal sparing techniques" },
      { name: "Post-Op Rehabilitation", icon: "🏥", desc: "Saline irrigation & steroid sprays" },
      { name: "Follow-Up Care", icon: "📅", desc: "Endoscopic surveillance at 6/12 weeks" },
    ],
    highlights: ["Zero external incisions", "Same-day discharge", "95% symptom resolution", "2-week recovery"],
    duration: "45–90 min",
    recovery: "1–2 weeks",
  },
  {
    id: "oncology",
    title: "Head & Neck Oncology & Tumor Excision",
    shortTitle: "Oncology",
    description: "Surgical management of oral cavity, oropharyngeal, laryngeal, salivary and thyroid tumours with multidisciplinary planning and reconstruction.",
    stages: [
      { name: "Diagnostic Scan", icon: "📷", desc: "PET-CT, MRI, ultrasound-guided FNAC" },
      { name: "3D Endoscopic Mapping", icon: "🗺️", desc: "Tumor board & virtual surgical planning" },
      { name: "Minimally Invasive Procedure", icon: "🔬", desc: "Transoral robotic (TORS) / endoscopic resection" },
      { name: "Organ Preservation", icon: "🛡️", desc: "Nerve/vessel sparing & sentinel node biopsy" },
      { name: "Post-Op Rehabilitation", icon: "🏥", desc: "Speech/swallow therapy & nutrition support" },
      { name: "Follow-Up Care", icon: "📅", desc: "Multidisciplinary surveillance Q3–6 months" },
    ],
    highlights: ["Multidisciplinary tumor board", "Organ preservation focus", "Free flap reconstruction", "Adjuvant therapy coordination"],
    duration: "2–6 hours",
    recovery: "2–6 weeks",
  },
  {
    id: "septoplasty",
    title: "Septoplasty, Tonsillectomy & Airway Care",
    shortTitle: "Airway",
    description: "Correction of deviated septum, turbinate reduction, and adeno-tonsillectomy for obstructive sleep apnea and chronic airway obstruction.",
    stages: [
      { name: "Diagnostic Scan", icon: "📷", desc: "Nasendoscopy, sleep study, CT airway" },
      { name: "3D Endoscopic Mapping", icon: "🗺️", desc: "Airway dynamics analysis & planning" },
      { name: "Minimally Invasive Procedure", icon: "🔬", desc: "Powered intracapsular tonsillectomy, septoplasty" },
      { name: "Organ Preservation", icon: "🛡️", desc: "Mucosal flap preservation, coblation technology" },
      { name: "Post-Op Rehabilitation", icon: "🏥", desc: "Pain protocol, humidification, activity guidance" },
      { name: "Follow-Up Care", icon: "📅", desc: "Airway reassessment at 2/6 weeks" },
    ],
    highlights: ["Coblation/Plasma technology", "Intracapsular technique", "Pediatric expertise", "Sleep apnea resolution"],
    duration: "30–60 min",
    recovery: "7–10 days",
  },
  {
    id: "laryngoscopy",
    title: "Diagnostic Laryngoscopy & Bronchoscopy",
    shortTitle: "Voice/Airway",
    description: "Flexible and rigid laryngoscopy, bronchoscopy, and stroboscopy for hoarseness, swallowing difficulty, and airway narrowing evaluation.",
    stages: [
      { name: "Diagnostic Scan", icon: "📷", desc: "Videostroboscopy, FEES, CT neck/chest" },
      { name: "3D Endoscopic Mapping", icon: "🗺️", desc: "Vocal fold vibration analysis & airway mapping" },
      { name: "Minimally Invasive Procedure", icon: "🔬", desc: "Micro-laryngeal surgery, dilation, laser" },
      { name: "Organ Preservation", icon: "🛡️", desc: "Phonomicrosurgery principles, mucosal sparing" },
      { name: "Post-Op Rehabilitation", icon: "🏥", desc: "Voice therapy, silent period, reflux management" },
      { name: "Follow-Up Care", icon: "📅", desc: "Stroboscopic reassessment at 4/12 weeks" },
    ],
    highlights: ["High-definition stroboscopy", "In-office procedures", "Voice preservation", "Swallowing restoration"],
    duration: "15–45 min",
    recovery: "1–3 days",
  },
  {
    id: "tympanoplasty",
    title: "Tympanoplasty & Micro-Ear Reconstruction",
    shortTitle: "Micro-Ear",
    description: "Repair of perforated eardrums, ossiculoplasty, mastoidectomy, and stapedotomy for conductive hearing loss and chronic ear disease.",
    stages: [
      { name: "Diagnostic Scan", icon: "📷", desc: "Otoscopy, audiometry, CT temporal bone" },
      { name: "3D Endoscopic Mapping", icon: "🗺️", desc: "Middle ear 3D reconstruction & planning" },
      { name: "Minimally Invasive Procedure", icon: "🔬", desc: "Endoscopic transcanal, microscope-assisted" },
      { name: "Organ Preservation", icon: "🛡️", desc: "Chorda tympani & facial nerve monitoring" },
      { name: "Post-Op Rehabilitation", icon: "🏥", desc: "Water precautions, hearing rehab, packing removal" },
      { name: "Follow-Up Care", icon: "📅", desc: "Audiometric assessment at 6/12 weeks" },
    ],
    highlights: ["Endoscopic ear surgery", "Hearing restoration focus", "Facial nerve monitoring", "Cartilage/perichondrium grafts"],
    duration: "60–120 min",
    recovery: "2–4 weeks",
  },
];

export default function SpecialtiesShowcaseSection({ isActive, sceneProgress }: SpecialtiesShowcaseSectionProps) {
  const [hoveredSpecialty, setHoveredSpecialty] = useState<string | null>(null);
  const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  // Track mouse for floating preview card
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSpecialtyClick = (id: string) => {
    if (expandedSpecialty === id) {
      setExpandedSpecialty(null);
    } else {
      setExpandedSpecialty(id);
    }
  };

  const currentSpecialty = specialties.find((s) => s.id === expandedSpecialty) || specialties[0];
  const hovered = specialties.find((s) => s.id === hoveredSpecialty);

  return (
    <section
      id="specialties"
      className="relative min-h-screen flex flex-col px-6 lg:px-12"
      aria-labelledby="specialties-heading"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 0.8s ease",
        minHeight: expandedSpecialty ? "auto" : "100vh",
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: sceneProgress > 0.05 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center min-h-[60vh] pb-20 relative z-10"
      >
        <span className="pill inline-block mb-6">
          Core Clinical Specialties
        </span>
        <h2
          id="specialties-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 text-center gradient-text-emerald"
        >
          Interactive Specialty Explorer
        </h2>
        <p className="lede text-text-secondary max-w-2xl text-center">
          Hover over any specialty for a 3D preview. Click to expand into a split-screen
          treatment stage visualization with clinical highlights.
        </p>
      </motion.div>

      {/* Specialty List */}
      {!expandedSpecialty && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.15 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex items-center justify-center px-4 relative z-10"
        >
          <div className="w-full max-w-4xl">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="group relative mb-8"
                onMouseEnter={() => setHoveredSpecialty(specialty.id)}
                onMouseLeave={() => setHoveredSpecialty(null)}
                onClick={() => handleSpecialtyClick(specialty.id)}
              >
                <div
                  className={`glass card p-6 lg:p-8 transition-all duration-500 cursor-pointer ${
                    hoveredSpecialty === specialty.id
                      ? "ring-2 ring-accent-primary/50 scale-[1.02] z-10 shadow-[0_30px_60px_-15px_rgba(16,245,184,0.3)]"
                      : "hover:ring-1 hover:ring-accent-primary/30"
                  }`}
                  style={{
                    transformOrigin: "center",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{index + 1}.</span>
                        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                          {specialty.title}
                        </h3>
                      </div>
                      <p className="text-text-muted leading-relaxed pr-4">
                        {specialty.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: hoveredSpecialty === specialty.id ? 1 : 0.9 }}
                      className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                      style={{
                        background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                      }}
                    >
                      ▸
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating Preview Card */}
      <AnimatePresence>
        {hoveredSpecialty && hovered && !expandedSpecialty && (
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed pointer-events-none z-30 glass-strong p-4"
            style={{
              left: mouseRef.current.x + 20,
              top: mouseRef.current.y - 100,
              width: "280px",
              maxWidth: "90vw",
              transform: "translateY(-50%)",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            role="tooltip"
            aria-label={`Preview: ${hovered.title}`}
          >
            <div className="transform-style-3d" style={{ transform: "rotateX(2deg) rotateY(-2deg)" }}>
              <div className="w-full h-32 rounded-lg mb-3" style={{
                background: "linear-gradient(135deg, var(--bg-surface), var(--bg-mid))",
                border: "1px solid var(--glass-border)",
              }}>
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  {hovered.stages[0].icon}
                </div>
              </div>
              <h4 className="font-display text-sm font-bold text-text-primary mb-1">{hovered.shortTitle}</h4>
              <p className="text-text-muted text-xs mb-3 line-clamp-2">{hovered.description}</p>
              <div className="flex flex-wrap gap-1">
                {hovered.highlights.slice(0, 3).map((h) => (
                  <span key={h} className="pill text-[0.65rem] px-2 py-1">{h}</span>
                ))}
              </div>
              <p className="text-accent-primary text-xs font-medium mt-3">Click to explore treatment stages →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Split-Screen View */}
      <AnimatePresence mode="wait">
        {expandedSpecialty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="expanded-title"
            onClick={() => setExpandedSpecialty(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={(e) => e.stopPropagation()} />
            
            <div className="flex-1 flex w-full max-h-screen overflow-hidden glass-strong m-4 rounded-2xl"
              style={{
                borderColor: "rgba(16, 245, 184, 0.2)",
                maxWidth: "1400px",
                margin: "2vh auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Panel - Warm Alabaster/Taupe Grid */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-1/2 p-6 lg:p-8 overflow-y-auto"
                style={{
                  background: "linear-gradient(135deg, #fdf8f5 0%, #f5ebe0 50%, #ebe0d5 100%)",
                  borderRight: "1px solid rgba(223, 142, 123, 0.2)",
                }}
              >
                <div className="mb-6">
                  <span className="pill pill-warm text-xs mb-3 inline-block">SPECIALTY {specialties.findIndex(s => s.id === currentSpecialty.id) + 1}</span>
                  <h3 id="expanded-title" className="font-display text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                    {currentSpecialty.title}
                  </h3>
                  <p className="text-text-muted">{currentSpecialty.description}</p>
                </div>

                <h4 className="font-display text-lg font-bold text-text-primary mb-4">Treatment Stages</h4>
                <div className="grid grid-cols-2 gap-4" role="list" aria-label="Treatment stages">
                  {currentSpecialty.stages.map((stage, idx) => (
                    <motion.div
                      key={stage.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                      className="card-warm p-4 text-center group cursor-pointer transform-style-3d"
                      role="listitem"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(223, 142, 123, 0.15)",
                      }}
                    >
                      <div className="text-3xl mb-2">{stage.icon}</div>
                      <h5 className="font-medium text-text-primary text-sm mb-1">{stage.name}</h5>
                      <p className="text-text-muted text-[0.75rem]">{stage.desc}</p>
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{
                        background: "linear-gradient(135deg, var(--warm-accent), var(--warm-muted))",
                        filter: "blur(10px)",
                        zIndex: -1,
                      }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Panel - Dark Emerald Backdrop */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-1/2 p-6 lg:p-8 flex flex-col"
                style={{ background: "var(--bg-deep)" }}
              >
                <div className="mb-6">
                  <span className="pill mb-3 inline-block" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
                    SPECIALTY {specialties.findIndex(s => s.id === currentSpecialty.id) + 1}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                    {currentSpecialty.title}
                  </h3>
                  <p className="text-text-muted">{currentSpecialty.description}</p>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  {/* Clinical Highlights */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-display text-lg font-bold text-text-primary">Clinical Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentSpecialty.highlights.map((highlight) => (
                        <span key={highlight} className="pill text-xs" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-glass-border">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4 text-text-muted text-sm">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Duration: {currentSpecialty.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                          Recovery: {currentSpecialty.recovery}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={(e) => { e.stopPropagation(); setExpandedSpecialty(null); }}
                        className="btn btn-primary w-full sm:w-auto"
                      >
                        Explore Treatment & Book
                      </button>
                      <button
                        onClick={() => setExpandedSpecialty(null)}
                        className="btn btn-glass w-full sm:w-auto"
                      >
                        Back to Specialties
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Close hint */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-dim text-sm pointer-events-none"
            >
              Click outside or press ESC to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
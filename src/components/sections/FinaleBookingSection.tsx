"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface FinaleBookingSectionProps {
  isActive: boolean;
  sceneProgress: number;
}

export default function FinaleBookingSection({ isActive, sceneProgress }: FinaleBookingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    specialty: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const specialties = [
    "Functional Endoscopic Sinus Surgery (FESS)",
    "Head & Neck Oncology & Tumor Excision",
    "Septoplasty, Tonsillectomy & Airway Care",
    "Diagnostic Laryngoscopy & Bronchoscopy",
    "Tympanoplasty & Micro-Ear Reconstruction",
    "General ENT Consultation",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.specialty) newErrors.specialty = "Please select a specialty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // In production, this would call your API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus("idle");
        setFormData({ name: "", phone: "", email: "", preferredDate: "", preferredTime: "", specialty: "", message: "" });
      }, 3000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      aria-labelledby="finale-heading"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 0.8s ease",
      }}
    >
      <div className="wrap max-w-4xl">
        {/* Particle Morph Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: sceneProgress > 0.1 ? 1 : 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-16 flex items-center justify-center"
        >
          <div
            className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center"
            style={{
              perspective: "1000px",
            }}
          >
            {/* Animated helix/particle visualization */}
            <div className="relative w-full h-full transform-style-3d" style={{
              animation: "helixRotate 20s linear infinite",
            }}>
              <style jsx>{`
                @keyframes helixRotate {
                  from { transform: rotateY(0deg) rotateX(15deg); }
                  to { transform: rotateY(360deg) rotateX(15deg); }
                }
                @keyframes pulseGlow {
                  0%, 100% { opacity: 0.4; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.05); }
                }
              `}</style>
              
              {/* Particle rings */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.8 }}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: "var(--accent-primary)",
                    borderWidth: "1px",
                    opacity: 0.6,
                    transform: `rotateX(60deg) rotateZ(${i * 15}deg) translateZ(${i * 8}px)`,
                    boxShadow: "0 0 20px var(--accent-primary)",
                    animation: `pulseGlow ${3 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}

              {/* Central glowing core */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute w-16 h-16 lg:w-20 lg:h-20 rounded-full transform-style-3d"
                style={{
                  background: "radial-gradient(circle at 30% 30%, var(--accent-primary), var(--accent-secondary), transparent 70%)",
                  boxShadow: "0 0 40px var(--accent-primary), 0 0 80px var(--accent-secondary), inset 0 0 20px rgba(255,255,255,0.2)",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Finale Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: sceneProgress > 0.2 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="pill inline-block mb-6">
            Book Your Consultation
          </span>
          <h2
            id="finale-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight gradient-text-emerald"
          >
            Ready to Restore Your Voice, Breathing & Life?
          </h2>
          <p className="lede text-text-secondary mb-12 max-w-2xl mx-auto">
            Schedule a personalized consultation with Dr. Nibha Raghu at Cytecare Hospitals.
            Experience precision ENT & Head-Neck surgical care backed by 16+ years of expertise.
          </p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: sceneProgress > 0.3 ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary text-lg px-12 py-5 group relative overflow-hidden"
            style={{
              boxShadow: "0 8px 40px -10px rgba(16, 245, 184, 0.5), 0 0 0 1px rgba(16, 245, 184, 0.1)",
            }}
            aria-label="Open appointment booking"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment & Virtual Consultation
            </span>
            <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" aria-hidden="true" />
          </button>
        </motion.div>

        {/* Clinic Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.4 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Location",
              details: "Cytecare Hospitals, Near Bagalur Cross, Yelahanka, Bengaluru 560064",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "OPD Schedule",
              details: "Mon–Sat · 9:00 AM – 4:00 PM | Consultation Fee: ₹1,000",
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: "Booking",
              details: "Instant WhatsApp/Call confirmation after submission",
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glass card p-6 text-center group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent-primary group-hover:scale-110 transition-transform"
                style={{ background: "rgba(16, 245, 184, 0.1)" }}
              >
                {card.icon}
              </div>
              <h4 className="font-display text-lg font-bold text-text-primary mb-2">{card.title}</h4>
              <p className="text-text-muted text-sm">{card.details}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Doctor Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.5 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass card p-6 lg:p-8 max-w-2xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 text-center md:text-left">
            <div className="flex items-center md:items-start gap-4">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center text-2xl lg:text-3xl font-bold font-display flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  color: "var(--bg-deep)",
                }}
              >
                NR
              </div>
              <div>
                <h4 className="font-display text-xl lg:text-2xl font-bold text-text-primary">Dr. Nibha Raghu</h4>
                <p className="text-accent-primary font-medium mb-1">Associate Consultant — ENT, Head & Neck Surgery and Oncology</p>
                <p className="text-text-muted text-sm">Cytecare Cancer Hospital, Bengaluru</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm">
              <span className="px-3 py-1 rounded-full text-accent-primary text-xs font-medium" style={{ background: "rgba(16, 245, 184, 0.1)", border: "1px solid var(--accent-primary)" }}>
                MBBS · MS (ENT)
              </span>
              <span className="px-3 py-1 rounded-full text-accent-primary text-xs font-medium" style={{ background: "rgba(16, 245, 184, 0.1)", border: "1px solid var(--accent-primary)" }}>
                Fellowship: Head & Neck Oncology
              </span>
              <span className="px-3 py-1 rounded-full text-accent-primary text-xs font-medium" style={{ background: "rgba(16, 245, 184, 0.1)", border: "1px solid var(--accent-primary)" }}>
                KMC: 95733
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scroll to top hint */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[50] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative glass-strong max-w-md w-full max-h-[90vh] overflow-y-auto"
              style={{
                borderRadius: "var(--radius-lg)",
                borderColor: "rgba(16, 245, 184, 0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 id="modal-title" className="font-display text-2xl font-bold mb-1">
                      Book Appointment
                    </h2>
                    <p className="text-text-muted text-sm">
                      Dr. Nibha Raghu — Cytecare Hospitals, Yelahanka
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="glass p-2 rounded-xl hover:glass-hover transition-all flex-shrink-0"
                    aria-label="Close booking modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Appointment request submitted! We'll confirm via WhatsApp/call shortly.</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-secondary">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
                      placeholder="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p id="name-error" className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-text-secondary">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
                      placeholder="+91 98765 43210"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-secondary">
                      Email (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium mb-2 text-text-secondary">
                      Specialty *
                    </label>
                    <select
                      id="specialty"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all appearance-none"
                      aria-invalid={!!errors.specialty}
                      aria-describedby={errors.specialty ? "specialty-error" : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a specialty</option>
                      {specialties.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.specialty && <p id="specialty-error" className="mt-1 text-sm text-red-400">{errors.specialty}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium mb-2 text-text-secondary">
                        Preferred Date *
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
                        aria-invalid={!!errors.preferredDate}
                        aria-describedby={errors.preferredDate ? "date-error" : undefined}
                        disabled={isSubmitting}
                      />
                      {errors.preferredDate && <p id="date-error" className="mt-1 text-sm text-red-400">{errors.preferredDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium mb-2 text-text-secondary">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all appearance:none"
                        disabled={isSubmitting}
                      >
                        <option value="">Select time</option>
                        {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-secondary">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary placeholder-text-dim focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all resize-none"
                      placeholder="Any specific concerns or symptoms..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full sm:w-auto justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="btn btn-glass w-full sm:w-auto justify-center"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Clinic Info */}
                <div className="mt-6 pt-6 border-t border-glass-border space-y-3 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Cytecare Hospitals, Near Bagalur Cross, Yelahanka, Bengaluru 560064</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mon–Sat · 9:00 AM – 4:00 PM | Consultation Fee: ₹1,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Instant WhatsApp/Call confirmation after booking</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
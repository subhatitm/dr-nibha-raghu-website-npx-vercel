"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navItems = [
  { href: "#practice", label: "Practice" },
  { href: "#specialties", label: "Specialties" },
  { href: "#facilities", label: "Facilities" },
  { href: "#patient-impact", label: "Patient Impact" },
  { href: "#contact", label: "Contact" },
];

export default function HudOverlay() {
  const { progress, currentScene } = useScrollProgress();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/ambient-clinic.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  // Scene-specific brand styling
  const isWarmScene = currentScene === 2;

  return (
    <>
      {/* Top-Left Brand Header */}
      <div
        id="hud-overlay"
        className="fixed inset-0 pointer-events-none z-[40]"
        style={{ zIndex: 40 }}
      >
        <div className="absolute top-6 left-6 pointer-events-auto flex flex-col items-start gap-2">
          <Link
            href="#home"
            className="brand flex items-center gap-3 font-display font-bold text-text-primary transition-all duration-500"
            aria-label="Dr. Nibha Raghu - Home"
            style={{
              color: isWarmScene ? "var(--warm-accent)" : "var(--text-primary)",
            }}
          >
            <span
              className="mark w-10 h-10 rounded-xl grid place-items-center text-[var(--bg-deep)] text-xl font-bold"
              style={{
                background: isWarmScene
                  ? "linear-gradient(140deg, var(--warm-accent), var(--warm-muted))"
                  : "linear-gradient(140deg, var(--accent-primary), var(--accent-secondary))",
              }}
              aria-hidden="true"
            >
              NR
            </span>
            <span>
              Dr. Nibha Raghu
              <small className="block font-sans font-medium text-xs tracking-wider uppercase text-text-muted" style={{ fontSize: "0.65rem" }}>
                ENT & Head–Neck Surgery
              </small>
            </span>
          </Link>
          <div
            className="pill"
            style={{
              background: isWarmScene
                ? "rgba(244, 198, 184, 0.2)"
                : "var(--glass-bg)",
              borderColor: isWarmScene
                ? "rgba(223, 142, 123, 0.3)"
                : "var(--glass-border)",
              color: isWarmScene ? "var(--warm-accent)" : "var(--accent-primary)",
            }}
          >
            Associate Consultant — Cytecare Hospitals, Bengaluru
          </div>
        </div>

        {/* Top-Right CTA Pill */}
        <div className="absolute top-6 right-6 pointer-events-auto">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="btn btn-primary group relative overflow-hidden"
            style={{
              background: isWarmScene
                ? "linear-gradient(135deg, var(--warm-accent), #e8a895)"
                : "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              boxShadow: isWarmScene
                ? "0 4px 24px -4px rgba(223, 142, 123, 0.4), 0 0 0 1px rgba(223, 142, 123, 0.1)"
                : "0 4px 24px -4px rgba(16, 245, 184, 0.4), 0 0 0 1px rgba(16, 245, 184, 0.1)",
            }}
            aria-label="Book Appointment"
          >
            <span className="relative z-10">Book Appointment</span>
            <span
              className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Bottom-Center Floating Navigation Dock */}
        <nav
          className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-1 px-4 py-3"
          style={{
            background: isWarmScene
              ? "rgba(244, 198, 184, 0.15)"
              : "var(--glass-bg)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: isWarmScene
              ? "1px solid rgba(223, 142, 123, 0.2)"
              : "1px solid var(--glass-border)",
            borderRadius: "9999px",
            boxShadow: "0 8px 32px -8px rgba(0, 0, 0, 0.4)",
          }}
          aria-label="Main navigation"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-300 relative"
              style={{
                color: isWarmScene ? "var(--warm-muted)" : "var(--text-muted)",
              }}
            >
              {item.label}
              <span
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-primary transition-all duration-300"
                style={{
                  backgroundColor: isWarmScene ? "var(--warm-accent)" : "var(--accent-primary)",
                }}
              />
            </Link>
          ))}
        </nav>

        {/* Bottom-Left Audio Wave Toggle */}
        <div className="absolute bottom-6 left-6 pointer-events-auto">
          <button
            onClick={toggleAudio}
            className="glass p-3 rounded-xl transition-all duration-300 hover:glass-hover"
            style={{
              background: isWarmScene
                ? "rgba(244, 198, 184, 0.15)"
                : "var(--glass-bg)",
              borderColor: isWarmScene
                ? "rgba(223, 142, 123, 0.2)"
                : "var(--glass-border)",
            }}
            aria-label={isAudioPlaying ? "Pause ambient audio" : "Play ambient audio"}
            aria-pressed={isAudioPlaying}
          >
            <svg
              className="w-6 h-6 transition-colors duration-300"
              style={{
                color: isAudioPlaying
                  ? (isWarmScene ? "var(--warm-accent)" : "var(--accent-primary)")
                  : "var(--text-muted)",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Audio waves animation */}
              <path
                d="M5 17v-4"
                className={isAudioPlaying ? "animate-wave-1" : ""}
                style={{
                  animationDelay: "0ms",
                  opacity: isAudioPlaying ? 1 : 0.4,
                }}
              />
              <path
                d="M9 14v-8"
                className={isAudioPlaying ? "animate-wave-2" : ""}
                style={{
                  animationDelay: "100ms",
                  opacity: isAudioPlaying ? 1 : 0.5,
                }}
              />
              <path
                d="M13 11v-12"
                className={isAudioPlaying ? "animate-wave-3" : ""}
                style={{
                  animationDelay: "200ms",
                  opacity: isAudioPlaying ? 1 : 0.6,
                }}
              />
              <path
                d="M17 14v-8"
                className={isAudioPlaying ? "animate-wave-4" : ""}
                style={{
                  animationDelay: "300ms",
                  opacity: isAudioPlaying ? 1 : 0.5,
                }}
              />
              <path
                d="M21 17v-4"
                className={isAudioPlaying ? "animate-wave-5" : ""}
                style={{
                  animationDelay: "400ms",
                  opacity: isAudioPlaying ? 1 : 0.4,
                }}
              />
              {!isAudioPlaying && (
                <line x1="5" y1="17" x2="19" y2="5" stroke="currentColor" strokeWidth={1.5} opacity="0.5" />
              )}
            </svg>
            <style jsx>{`
              @keyframes wave {
                0%, 100% { transform: scaleY(0.3); transform-origin: bottom; }
                50% { transform: scaleY(1); transform-origin: bottom; }
              }
              .animate-wave-1 { animation: wave 0.6s ease-in-out infinite; }
              .animate-wave-2 { animation: wave 0.6s ease-in-out infinite 0.1s; }
              .animate-wave-3 { animation: wave 0.6s ease-in-out infinite 0.2s; }
              .animate-wave-4 { animation: wave 0.6s ease-in-out infinite 0.3s; }
              .animate-wave-5 { animation: wave 0.6s ease-in-out infinite 0.4s; }
            `}</style>
          </button>
        </div>

        {/* Bottom-Right Scroll Indicator */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
          <div
            className="scroll-indicator"
            style={{
              background: isWarmScene
                ? "rgba(223, 142, 123, 0.1)"
                : "rgba(255, 255, 255, 0.06)",
            }}
          >
            <div
              className="scroll-progress"
              style={{
                width: "100%",
                height: `${progress * 100}%`,
                background: isWarmScene
                  ? "linear-gradient(180deg, var(--warm-accent), var(--warm-muted))"
                  : "linear-gradient(180deg, var(--accent-primary), var(--accent-secondary))",
                borderRadius: "2px",
                transformOrigin: "bottom",
                transition: "height 0.1s linear",
              }}
            />
          </div>
          <div
            className="absolute -right-10 bottom-0 text-xs font-mono text-text-dim"
            style={{ color: isWarmScene ? "var(--warm-muted)" : "var(--text-dim)" }}
          >
            {Math.round(progress * 100)}%
          </div>
        </div>

        {/* Scene Indicator Dots (Side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((sceneNum) => (
            <div
              key={sceneNum}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: currentScene === sceneNum
                  ? (isWarmScene ? "var(--warm-accent)" : "var(--accent-primary)")
                  : "rgba(255, 255, 255, 0.15)",
                transform: currentScene === sceneNum ? "scale(1.5)" : "scale(1)",
                boxShadow: currentScene === sceneNum
                  ? (isWarmScene
                      ? "0 0 12px var(--warm-accent)"
                      : "0 0 12px var(--accent-primary)")
                  : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          onClose={() => setIsBookingOpen(false)}
          isWarmScene={isWarmScene}
        />
      )}
    </>
  );
}

// ============================================
// BOOKING MODAL
// ============================================

function BookingModal({ onClose, isWarmScene }: { onClose: () => void; isWarmScene: boolean }) {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
        setFormData({ name: "", phone: "", email: "", preferredDate: "", preferredTime: "", specialty: "", message: "" });
      }, 2000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[50] flex items-center justify-center p-4"
      style={{ zIndex: 50 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div
        className="relative glass-strong max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{
          background: isWarmScene
            ? "rgba(244, 198, 184, 0.2)"
            : "var(--glass-strong)",
          borderColor: isWarmScene
            ? "rgba(223, 142, 123, 0.3)"
            : "rgba(16, 245, 184, 0.2)",
          borderRadius: "var(--radius-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 id="booking-title" className="font-display text-2xl font-bold mb-1">
                Book Appointment
              </h2>
              <p className="text-text-muted text-sm">
                Dr. Nibha Raghu — Cytecare Hospitals, Yelahanka
              </p>
            </div>
            <button
              onClick={onClose}
              className="glass p-2 rounded-xl hover:glass-hover transition-all"
              aria-label="Close booking modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Appointment request submitted! We'll confirm via WhatsApp/call shortly.</span>
              </div>
            </div>
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
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface/50 border border-glass-border text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all appearance-none"
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
                style={{
                  background: isWarmScene
                    ? "linear-gradient(135deg, var(--warm-accent), #e8a895)"
                    : "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                }}
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
                onClick={onClose}
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
      </div>
    </div>
  );
}
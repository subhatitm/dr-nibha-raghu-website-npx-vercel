"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TrustBadge from "@/components/ui/TrustBadge";

export default function BookAppointmentContent() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    patientType: "new",
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    preferredDate: "",
    preferredTime: "",
    concern: "",
    symptoms: "",
    referredBy: "",
    insurance: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setFormData({
      patientType: "new",
      name: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      preferredDate: "",
      preferredTime: "",
      concern: "",
      symptoms: "",
      referredBy: "",
      insurance: "",
    });
    setStep(1);

    setTimeout(() => setStatus("idle"), 5000);
  };

  const nextStep = () => setStep((s) => (s < 3 ? (s + 1) : 3) as 1 | 2 | 3);
  const prevStep = () => setStep((s) => (s > 1 ? (s - 1) : 1) as 1 | 2 | 3);

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen">
      <section className="py-12 lg:py-20 relative" aria-labelledby="booking-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                <TrustBadge rating={4.9} reviewCount={30} size="compact" />
              </div>
              <h1 id="booking-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Book Your Appointment
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Choose your preferred booking method. Online booking is quick and secure, or call us directly for immediate assistance.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} animation="slide-up">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Link
                href="tel:09902876872"
                className="glass-card rounded-2xl p-8 text-center hover:shadow-3d-hover hover:border-primary/30 transition-all duration-300 border border-primary/10 h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">Call to Book</h3>
                <p className="text-foreground/60 mb-4">Speak with our friendly front desk team</p>
                <div className="text-2xl font-bold text-accent mb-2">099028 76872</div>
                <p className="text-sm text-foreground/50">Mon-Sat: 9AM - 4PM</p>
              </Link>

              <Link
                href="https://wa.me/919902876872?text=Hello%20Dr.%20Nibha%20Raghu%2C%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-8 text-center hover:shadow-3d-hover hover:border-primary/30 transition-all duration-300 border border-primary/10 h-full flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.402h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.467-.335 49.36 49.36 0 00-4.386-1.165A1 1 0 012 12V4a1 1 0 011-1h3.014a1 1 0 01.994.883l.334 6.667a9.83 9.83 0 004.143 3.98.965.965 0 011.386.235l2.54 1.844a49.316 49.316 0 005.404 2.183 9.87 9.87 0 01.234-.98c.16-.39.234-.78.16-1.171-.087-.475-.328-.917-.632-1.182-.099-.087-.199-.174-.322-.149-.133.025-.272.134-.487.386-.198.233-.52.788-.62 1.104-.086.273-.187.547-.274.734-.074.16-.173.334-.222.472-.037.11-.086.198-.086.285 0 .123.123.273.323.36.198.087.446.174.745.174.21 0 .458-.025.71-.06.263-.037.6-.149.894-.348.323-.21.604-.51.793-.876.198-.373.25-.644.2-.947-.05-.272-.198-.472-.435-.643zm-8.206-1.414c-.173-.413-.315-.775-.315-1.164 0-.389.134-.735.315-.883.086-.123.25-.262.487-.335.21-.062.333-.087.471-.124.149-.037.297-.062.434-.062.198 0 .413.087.57.174.134.086.25.2.386.273.123.062.198.087.249.087.05 0 .1-.025.149-.05.05-.05.1-.134.1-.223 0-.273-.472-1.233-.792-1.664-.32-.413-.745-.547-1.065-.547-.224 0-.547.087-.694.124-.224.062-.36.074-.413.05-.075-.012-.124-.024-.149-.024zm5.856-6.894c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.472.099-.174.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.402h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.467-.335 49.36 49.36 0 00-4.386-1.165A1 1 0 012 12V4a1 1 0 011-1h3.014a1 1 0 01.994.883l.334 6.667a9.83 9.83 0 004.143 3.98.965.965 0 011.386.235l2.54 1.844a49.316 49.316 0 005.404 2.183 9.87 9.87 0 01.234-.98c.16-.39.234-.78.16-1.171-.087-.475-.328-.917-.632-1.182-.099-.087-.199-.174-.322-.149-.133.025-.272.134-.487.386-.198.233-.52.788-.62 1.104-.086.273-.187.547-.274.734-.074.16-.173.334-.222.472-.037.11-.086.198-.086.285 0 .123.123.273.323.36.198.087.446.174.745.174.21 0 .458-.025.71-.06.263-.037.6-.149.894-.348.323-.21.604-.51.793-.876.198-.373.25-.644.2-.947-.05-.272-.198-.472-.435-.643zm-8.206-1.414c-.173-.413-.315-.775-.315-1.164 0-.389.134-.735.315-.883.086-.123.25-.262.487-.335.21-.062.333-.087.471-.124.149-.037.297-.062.434-.062.198 0 .413.087.57.174.134.086.25.2.386.273.123.062.198.087.249.087.05 0 .1-.025.149-.05.05-.05.1-.134.1-.223 0-.273-.472-1.233-.792-1.664-.32-.413-.745-.547-1.065-.547-.224 0-.547.087-.694.124-.224.062-.36.074-.413.05-.075-.012-.124-.024-.149-.024zm5.856-6.894" /></svg>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">WhatsApp Booking</h3>
                <p className="text-foreground/60 mb-4">Quick booking via WhatsApp chat</p>
                <p className="text-sm text-foreground/50">Available 24/7 for requests</p>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} animation="slide-up">
            <div className="glass-card rounded-2xl p-6 lg:p-8 border border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${step >= 1 ? "bg-primary text-white" : "bg-foreground/10 text-foreground/40"}`}>1</div>
                  <div className={`${step >= 1 ? "text-primary" : "text-foreground/40"}`}>
                    <p className="font-semibold">Patient Info</p>
                    <p className="text-sm text-foreground/50">Basic details</p>
                  </div>
                </div>
                <div className={`w-8 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-foreground/10"}`} aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${step >= 2 ? "bg-primary text-white" : "bg-foreground/10 text-foreground/40"}`}>2</div>
                  <div className={`${step >= 2 ? "text-primary" : "text-foreground/40"}`}>
                    <p className="font-semibold">Appointment</p>
                    <p className="text-sm text-foreground/50">Date & time</p>
                  </div>
                </div>
                <div className={`w-8 h-1 rounded-full ${step >= 3 ? "bg-primary" : "bg-foreground/10"}`} aria-hidden="true" />
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${step >= 3 ? "bg-primary text-white" : "bg-foreground/10 text-foreground/40"}`}>3</div>
                  <div className={`${step >= 3 ? "text-primary" : "text-foreground/40"}`}>
                    <p className="font-semibold">Confirm</p>
                    <p className="text-sm text-foreground/50">Review & submit</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {step === 1 && (
                  <div className="space-y-6" data-step="1">
                    <h3 className="font-semibold text-foreground">Patient Information</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="patientType" className="block text-sm font-medium text-foreground mb-2">
                          Patient Type
                        </label>
                        <select
                          id="patientType"
                          name="patientType"
                          value={formData.patientType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                        >
                          <option value="new">New Patient</option>
                          <option value="returning">Returning Patient</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          placeholder="Enter your full name"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone Number <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          placeholder="Enter your phone number"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          placeholder="Enter your email (optional)"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          max={new Date().toISOString().split("T")[0]}
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-foreground mb-2">
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not">Prefer not to say</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="referredBy" className="block text-sm font-medium text-foreground mb-2">
                          Referred By
                        </label>
                        <select
                          id="referredBy"
                          name="referredBy"
                          value={formData.referredBy}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                        >
                          <option value="">How did you hear about us?</option>
                          <option value="google">Google Search</option>
                          <option value="referral">Doctor Referral</option>
                          <option value="friend">Friend/Family</option>
                          <option value="social">Social Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-all duration-300 focus-visible-ring"
                      >
                        Continue
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6" data-step="2">
                    <h3 className="font-semibold text-foreground">Appointment Details</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-2">
                          Preferred Date <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          required
                          min={minDate}
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-foreground mb-2">
                          Preferred Time <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          required
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          aria-required="true"
                        >
                          <option value="">Select preferred time</option>
                          <option value="9:00-10:00">9:00 AM - 10:00 AM</option>
                          <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                          <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                          <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                          <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                          <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="concern" className="block text-sm font-medium text-foreground mb-2">
                          Primary Concern <span className="text-accent" aria-hidden="true">*</span>
                        </label>
                        <select
                          id="concern"
                          name="concern"
                          required
                          value={formData.concern}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          aria-required="true"
                        >
                          <option value="">Select your concern</option>
                          <option value="ear">Ear Problems (hearing, infections, pain)</option>
                          <option value="sinus">Sinus & Nasal Issues</option>
                          <option value="throat">Throat & Voice Problems</option>
                          <option value="head-neck">Head & Neck Concerns</option>
                          <option value="hearing">Hearing Evaluation</option>
                          <option value="voice">Voice & Swallowing Issues</option>
                          <option value="pediatric">Pediatric ENT</option>
                          <option value="other">Other / General Consultation</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="insurance" className="block text-sm font-medium text-foreground mb-2">
                          Insurance Provider
                        </label>
                        <input
                          type="text"
                          id="insurance"
                          name="insurance"
                          value={formData.insurance}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                          placeholder="Insurance provider (if applicable)"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="symptoms" className="block text-sm font-medium text-foreground mb-2">
                        Symptoms & Additional Details
                      </label>
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        rows={4}
                        value={formData.symptoms}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none"
                        placeholder="Describe your symptoms, duration, severity, and any other relevant details..."
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 focus-visible-ring"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-all duration-300 focus-visible-ring"
                      >
                        Continue
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6" data-step="3">
                    <h3 className="font-semibold text-foreground">Review & Confirm</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-primary/5">
                        <h4 className="font-semibold text-primary mb-3">Patient Information</h4>
                        <dl className="grid sm:grid-cols-2 gap-2 text-sm">
                          <dt className="text-foreground/50">Name:</dt>
                          <dd className="font-medium text-foreground">{formData.name || "—"}</dd>
                          <dt className="text-foreground/50">Phone:</dt>
                          <dd className="font-medium text-foreground">{formData.phone || "—"}</dd>
                          <dt className="text-foreground/50">Email:</dt>
                          <dd className="font-medium text-foreground">{formData.email || "—"}</dd>
                          <dt className="text-foreground/50">Type:</dt>
                          <dd className="font-medium text-foreground capitalize">{formData.patientType}</dd>
                        </dl>
                      </div>
                      <div className="p-4 rounded-xl bg-accent/5">
                        <h4 className="font-semibold text-accent mb-3">Appointment Details</h4>
                        <dl className="grid sm:grid-cols-2 gap-2 text-sm">
                          <dt className="text-foreground/50">Date:</dt>
                          <dd className="font-medium text-foreground">{formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—"}</dd>
                          <dt className="text-foreground/50">Time:</dt>
                          <dd className="font-medium text-foreground">{formData.preferredTime || "—"}</dd>
                          <dt className="text-foreground/50">Concern:</dt>
                          <dd className="font-medium text-foreground capitalize">{formData.concern?.replace("-", " ") || "—"}</dd>
                          <dt className="text-foreground/50">Insurance:</dt>
                          <dd className="font-medium text-foreground">{formData.insurance || "Not provided"}</dd>
                        </dl>
                      </div>
                    </div>

                    {status === "success" && (
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200 animate-slide-down" role="alert">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <div>
                            <p className="font-semibold text-green-800">Appointment Request Submitted Successfully!</p>
                            <p className="text-green-700 text-sm">Our team will contact you shortly to confirm your appointment details.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4 border-t border-primary/10">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 focus-visible-ring"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                            Submitting...
                          </>
                        ) : (
                          "Confirm & Submit Request"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} animation="slide-up">
            <div className="mt-8 glass-card rounded-2xl p-6 lg:p-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">Need Help?</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-primary/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Same Day</h4>
                  <p className="text-sm text-foreground/60">Urgent appointments available</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Insurance</h4>
                  <p className="text-sm text-foreground/60">Most major plans accepted</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Hospital Visit</h4>
                  <p className="text-sm text-foreground/60">Cytecare Hospital, Yelahanka</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
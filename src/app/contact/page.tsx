"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HoursWidget from "@/components/ui/HoursWidget";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    concern: "",
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
    setFormData({ name: "", phone: "", email: "", preferredDate: "", preferredTime: "", concern: "" });

    setTimeout(() => setStatus("idle"), 5000);
  };

  const contactInfo = {
    address: "Cytecare Hospital, International Airport Road, Venkatala, near Bagalur Cross, Hyderabad–Bengaluru Highway, Yelahanka, Bengaluru, Karnataka 560064",
    phone: "099028 76872",
    email: "appointments@drnibharaghu.com",
    plusCode: "4J95+99 Bengaluru, Karnataka",
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-24 relative" aria-labelledby="contact-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 id="contact-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Location & Contact
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Visit us at Cytecare Hospital, Yelahanka, or reach out to schedule your appointment
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-16">
              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 lg:p-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Our Location
                  </h2>
                  <address className="not-italic text-foreground/70 leading-relaxed space-y-3">
                    <p className="font-medium text-foreground">Cytecare Hospital</p>
                    <p>International Airport Road, Venkatala</p>
                    <p>Near Bagalur Cross</p>
                    <p>Hyderabad–Bengaluru Highway</p>
                    <p>Yelahanka, Bengaluru</p>
                    <p>Karnataka 560064</p>
                    <p className="text-sm text-primary font-medium mt-2">Plus Code: 4J95+99 Bengaluru, Karnataka</p>
                  </address>
                </div>

                <div className="glass-card rounded-2xl p-6 lg:p-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <a href="tel:09902876872" className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50">Phone</p>
                        <p className="font-medium text-foreground">099028 76872</p>
                      </div>
                    </a>
                    <a href="mailto:appointments@drnibharaghu.com" className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/50">Email</p>
                        <p className="font-medium text-foreground">appointments@drnibharaghu.com</p>
                      </div>
                    </a>
                  </div>
                </div>

                <HoursWidget showFull />
              </div>

              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-card shadow-3d">
                <iframe
                  title="Cytecare Hospital Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5123456789!2d77.5946!3d13.1025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c8b5d4e5%3A0x123456789abcdef!2sCytecare%20Hospital!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href="https://www.google.com/maps/dir//Cytecare+Hospital,+International+Airport+Road,+Venkatala,+Yelahanka,+Bengaluru,+Karnataka+560064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-lg text-primary font-medium hover:bg-primary/5 transition-all focus-visible-ring"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  Get Directions
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} animation="slide-up">
            <div className="glass-card rounded-2xl p-6 lg:p-10">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Request an Appointment
              </h2>
              <p className="text-foreground/70 mb-8">
                Fill out the form below and our team will contact you to confirm your appointment within 24 hours.
              </p>

              {status === "success" && (
                <div className="mb-8 p-4 rounded-xl bg-green-50 border border-green-200 animate-slide-down" role="alert">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <p className="font-semibold text-green-800">Appointment Request Submitted!</p>
                      <p className="text-green-700 text-sm">Our team will contact you shortly to confirm your appointment details.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
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
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
                      placeholder="Enter your full name"
                      aria-required="true"
                    />
                  </div>
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
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
                      placeholder="Enter your phone number"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
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
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
                      placeholder="Enter your email (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
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
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
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
                  <div>
                    <label htmlFor="concern" className="block text-sm font-medium text-foreground mb-2">
                      Primary Concern
                    </label>
                    <select
                      id="concern"
                      name="concern"
                      value={formData.concern}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50"
                    >
                      <option value="">Select your concern (optional)</option>
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
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.concern}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all disabled:opacity-50 resize-none"
                    placeholder="Describe your symptoms, concerns, or any additional information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Appointment Request"
                  )}
                </button>

                <p className="text-xs text-foreground/50 text-center sm:text-left">
                  By submitting this form, you agree to be contacted by our clinic regarding your appointment request. We respect your privacy and will not share your information.
                </p>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} animation="slide-up">
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <a
                href="/book-appointment"
                className="glass-card rounded-2xl p-6 text-center hover:shadow-3d-hover transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Book Online</h3>
                <p className="text-foreground/60 text-sm">Schedule your appointment through our online booking system</p>
              </a>
              <a
                href="tel:09902876872"
                className="glass-card rounded-2xl p-6 text-center hover:shadow-3d-hover transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                <p className="text-foreground/60 text-sm">Speak directly with our front desk team</p>
              </a>
              <a
                href="https://www.google.com/maps/dir//Cytecare+Hospital,+International+Airport+Road,+Venkatala,+Yelahanka,+Bengaluru,+Karnataka+560064"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 text-center hover:shadow-3d-hover transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Get Directions</h3>
                <p className="text-foreground/60 text-sm">Open in Google Maps for turn-by-turn navigation</p>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
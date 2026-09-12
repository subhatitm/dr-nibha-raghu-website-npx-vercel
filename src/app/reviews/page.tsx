"use client";

import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const reviews = [
  {
    id: 1,
    name: "Priya S.",
    initial: "PS",
    rating: 5,
    date: "2 weeks ago",
    text: "Dr. Raghu is incredibly thorough and patient. She took the time to explain my sinus condition in detail and answered all my questions. The endoscopic sinus surgery went smoothly and my recovery was faster than expected. Highly recommend!",
    tags: ["Thorough Diagnosis", "Clear Communication", "Effective Treatment"],
  },
  {
    id: 2,
    name: "Rajesh K.",
    initial: "RK",
    rating: 5,
    date: "1 month ago",
    text: "Excellent doctor with great bedside manner. My mother had thyroid surgery with Dr. Raghu and the care was exceptional. She explained the procedure clearly, the surgery was successful, and follow-up care was thorough. 5 stars well deserved.",
    tags: ["Professionalism", "Effective Treatment", "Clear Explanations"],
  },
  {
    id: 3,
    name: "Anita M.",
    initial: "AM",
    rating: 5,
    date: "3 weeks ago",
    text: "Best ENT doctor I've visited in Bangalore. My son had recurring ear infections and Dr. Raghu diagnosed the underlying issue that others missed. Treatment plan worked perfectly. She's patient with kids and explains everything to parents.",
    tags: ["Thorough Diagnosis", "Patient with Kids", "Effective Treatment"],
  },
  {
    id: 4,
    name: "Vikram P.",
    initial: "VP",
    rating: 5,
    date: "2 months ago",
    text: "Dr. Raghu performed my septoplasty and turbinate reduction. The difference in my breathing is remarkable. She was very professional, explained risks and benefits clearly, and the post-op care was excellent. No rushed appointments ever.",
    tags: ["Unrushed Consultations", "Professionalism", "Effective Treatment"],
  },
  {
    id: 5,
    name: "Sunita R.",
    initial: "SR",
    rating: 5,
    date: "1 month ago",
    text: "Visited for chronic tonsillitis. Dr. Raghu recommended tonsillectomy after conservative treatment failed. Surgery was smooth, pain management was excellent, and recovery guidance was detailed. She truly cares about her patients' wellbeing.",
    tags: ["Thorough Diagnosis", "Dedication", "Clear Communication"],
  },
  {
    id: 6,
    name: "Arjun D.",
    initial: "AD",
    rating: 5,
    date: "3 months ago",
    text: "My father had a neck mass that turned out to be a salivary gland tumor. Dr. Raghu handled the case with expertise and compassion. The surgery was complex but successful. Her team's coordination and follow-up were outstanding.",
    tags: ["Head & Neck Surgery", "Expertise", "Professional Team"],
  },
  {
    id: 7,
    name: "Meera L.",
    initial: "ML",
    rating: 5,
    date: "2 weeks ago",
    text: "Dr. Raghu treated my voice disorder (vocal cord nodules). Voice therapy and her guidance helped me avoid surgery. As a teacher, my voice is my livelihood - she understood this completely. Truly dedicated to her patients.",
    tags: ["Voice Care", "Conservative Approach", "Dedication"],
  },
  {
    id: 8,
    name: "Karthik N.",
    initial: "KN",
    rating: 5,
    date: "1 month ago",
    text: "Outstanding care for my sudden hearing loss. Dr. Raghu acted quickly with steroid treatment and monitoring. My hearing recovered significantly. She's knowledgeable, accessible, and genuinely invested in patient outcomes.",
    tags: ["Quick Action", "Expertise", "Patient-Centered"],
  },
];

const ratingBreakdown = [
  { stars: 5, count: 24, percentage: 80 },
  { stars: 4, count: 5, percentage: 17 },
  { stars: 3, count: 1, percentage: 3 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];

export default function ReviewsContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, next]);

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3).concat(
    reviews.slice(0, Math.max(0, 3 - (reviews.length - currentIndex)))
  );

  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-24 relative" aria-labelledby="reviews-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" aria-hidden="true" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="slide-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 id="reviews-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Patient Reviews
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Real experiences from patients who trusted Dr. Nibha Raghu with their ENT care
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} animation="slide-up">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl lg:text-7xl font-extrabold gradient-text">4.9</div>
                  <div>
                    <div className="flex items-center gap-1" aria-label="4.9 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-accent fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <p className="text-foreground/60">Based on 30 Google Reviews</p>
                  </div>
                </div>

                <div className="space-y-3" role="img" aria-label="Rating breakdown: 80% 5 stars, 17% 4 stars, 3% 3 stars">
                  {ratingBreakdown.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="text-sm text-foreground/70 w-8 text-right">{rating.stars}★</span>
                      <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                          style={{ width: `${rating.percentage}%` }}
                          role="progressbar"
                          aria-valuenow={rating.percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${rating.stars} star ratings: ${rating.percentage}%`}
                        />
                      </div>
                      <span className="text-sm text-foreground/60 w-12">{rating.count}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10 grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-primary/5">
                    <p className="text-2xl font-extrabold text-primary">30+</p>
                    <p className="text-sm text-foreground/60">Total Reviews</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/5">
                    <p className="text-2xl font-extrabold text-accent">97%</p>
                    <p className="text-sm text-foreground/60">Would Recommend</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5">
                    <p className="text-2xl font-extrabold text-primary">4.9</p>
                    <p className="text-sm text-foreground/60">Average Rating</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-bold text-foreground">Common Themes from Reviews</h3>
                <div className="flex flex-wrap gap-3">
                  {["Thorough Diagnosis", "Clear Explanations", "Effective Treatment", "Unrushed Consultations", "Professionalism", "Dedication", "Patient-Centered", "Expertise"].map((theme) => (
                    <span key={theme} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} animation="slide-up">
            <div className="relative">
              <h2 className="sr-only">Patient Testimonials</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Patient testimonials">
                {visibleReviews.map((review, index) => (
                  <article key={review.id} className="glass-card rounded-2xl p-6 hover:shadow-3d-hover transition-all duration-300" role="listitem" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {review.initial}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <p className="text-sm text-foreground/50">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-accent fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      ))}
                    </div>
                    <p className="text-foreground/70 leading-relaxed mb-4">{review.text}</p>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Review themes">
                      {review.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium border border-primary/10" role="listitem">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  onMouseEnter={() => setAutoPlay(false)}
                  onMouseLeave={() => setAutoPlay(true)}
                  className="p-3 rounded-xl glass-card hover:shadow-3d-hover transition-all focus-visible-ring"
                  aria-label="Previous reviews"
                >
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex gap-1.5" role="tablist" aria-label="Review pages">
                  {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i * 3)}
                      onMouseEnter={() => setAutoPlay(false)}
                      onMouseLeave={() => setAutoPlay(true)}
                      role="tab"
                      aria-selected={currentIndex === i * 3}
                      aria-label={`Page ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentIndex === i * 3 ? "bg-primary w-8" : "bg-foreground/30 hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  onMouseEnter={() => setAutoPlay(false)}
                  onMouseLeave={() => setAutoPlay(true)}
                  className="p-3 rounded-xl glass-card hover:shadow-3d-hover transition-all focus-visible-ring"
                  aria-label="Next reviews"
                >
                  <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300} animation="slide-up">
            <div className="mt-16 text-center">
              <a
                href="https://www.google.com/search?q=Dr+Nibha+Raghu+Cytecare+Hospital+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 focus-visible-ring"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Read All Reviews on Google
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
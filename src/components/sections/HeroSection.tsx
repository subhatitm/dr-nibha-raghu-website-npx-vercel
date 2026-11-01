"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  isActive: boolean;
  sceneProgress: number;
}

const stats = [
  { value: "16+", label: "Years of Specialized ENT & Surgical Experience" },
  { value: "4.9★", label: "Patient Trust & Clinical Satisfaction Score" },
  { value: "8,800+", label: "Hospital Reviews & Multidisciplinary Consultations" },
  { value: "95733", label: "KMC Accredited Registration (MBBS, MS ENT, Fellowship)" },
  { value: "6", label: "Core Surgical Pillars" },
];

export default function HeroSection({ isActive, sceneProgress }: HeroSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={textRef}
      id="home"
      className="relative min-h-screen flex items-center justify-start px-6 lg:px-12"
      aria-labelledby="hero-heading"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 0.8s ease",
      }}
    >
      <div className="wrap max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: sceneProgress > 0.3 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="pill inline-block" style={{ animationDelay: "0.3s" }}>
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" aria-hidden="true" />
            Yelahanka, Bengaluru · Cytecare Hospitals
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: sceneProgress > 0.4 ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            id="hero-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary mb-8 leading-[1.05] tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Precision care that restores{" "}
            <span className="gradient-text-emerald">voice, breathing & life.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.5 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <Link
            href="#specialties"
            className="text-accent-primary font-semibold text-lg flex items-center gap-2 group inline-block"
          >
            EXPLORE OUR MEDICAL UNIVERSE
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.6 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="lede text-text-secondary max-w-2xl">
            Comprehensive Ear, Nose, Throat (ENT) & Head-Neck Oncology care in Bengaluru.
            Dr. Nibha Raghu combines 16+ years of specialized clinical experience with
            minimally invasive endoscopic precision and evidence-based oncology protocols.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.7 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4"
        >
          <Link href="#contact" className="btn btn-primary w-full sm:w-auto">
            Book Appointment
          </Link>
          <Link href="#specialties" className="btn btn-glass w-full sm:w-auto">
            Explore Specialties
          </Link>
        </motion.div>

        {/* Floating Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: sceneProgress > 0.8 ? 1 : 0, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              className="glass card text-center p-6"
              role="listitem"
            >
              <div className="font-display text-2xl sm:text-3xl font-bold gradient-text-emerald mb-2">
                {stat.value}
              </div>
              <div className="text-text-muted text-xs sm:text-sm leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
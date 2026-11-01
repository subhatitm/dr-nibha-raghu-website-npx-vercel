"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface DioramaSectionProps {
  isActive: boolean;
  sceneProgress: number;
}

const departments = [
  {
    id: "opd",
    name: "ENT Outpatient Suite",
    description: "State-of-the-art consultation rooms with video-endoscopy integration for real-time diagnosis.",
    icon: "🏥",
    position: { x: -3, z: 2 },
  },
  {
    id: "sinus",
    name: "Endoscopic Sinus Lab",
    description: "Dedicated FESS suite with image-guidance navigation and high-definition endoscopic towers.",
    icon: "🔬",
    position: { x: 3, z: 2 },
  },
  {
    id: "oncology",
    name: "Head & Neck Oncology Wing",
    description: "Multidisciplinary tumor board room, robotic surgery access, and reconstruction planning suite.",
    icon: "🎯",
    position: { x: 0, z: -3 },
  },
  {
    id: "ear",
    name: "Micro-Ear Surgery Theater",
    description: "Operating microscope with 4K recording, facial nerve monitoring, and laser integration.",
    icon: "👂",
    position: { x: -3, z: -2 },
  },
  {
    id: "diagnostics",
    name: "Diagnostics Center",
    description: "Audiometry, tympanometry, vestibular testing, and sleep study facilities on-site.",
    icon: "📊",
    position: { x: 3, z: -2 },
  },
];

export default function DioramaSection({ isActive, sceneProgress }: DioramaSectionProps) {
  const [activeDept, setActiveDept] = useState<string | null>("opd");

  const activeDepartment = departments.find((d) => d.id === activeDept) || departments[0];

  return (
    <section
      id="facilities"
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      aria-labelledby="diorama-heading"
      style={{
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? "auto" : "none",
        transition: "opacity 0.8s ease",
        background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--warm-bg) 100%)",
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: sceneProgress > 0.1 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="pill pill-warm inline-block mb-6">
            3D Hospital & Clinic Diorama Showcase
          </span>
          <h2
            id="diorama-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 gradient-text-warm"
          >
            Explore Our Surgical Center
          </h2>
          <p className="lede text-text-secondary max-w-2xl mx-auto">
            Navigate our interactive 3D architectural diorama — click departments to highlight
            facilities and learn about each specialized unit.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.2 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Department filters"
        >
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept.id)}
              role="tab"
              aria-selected={activeDept === dept.id}
              aria-controls={`${dept.id}-panel`}
              id={`${dept.id}-tab`}
              className={`filter-pill ${activeDept === dept.id ? "active" : ""}`}
              style={{
                background: activeDept === dept.id
                  ? "linear-gradient(135deg, var(--warm-accent), var(--warm-muted))"
                  : "var(--glass-bg)",
                borderColor: activeDept === dept.id
                  ? "transparent"
                  : "rgba(223, 142, 123, 0.3)",
                color: activeDept === dept.id ? "var(--bg-deep)" : "var(--warm-muted)",
              }}
            >
              {dept.name}
            </button>
          ))}
        </motion.div>

        {/* 3D Diorama Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: sceneProgress > 0.3 ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="aspect-[4/3] rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--warm-bg) 0%, var(--warm-surface) 50%, #e8b5a8 100%)",
              border: "1px solid rgba(223, 142, 123, 0.2)",
              boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Placeholder for 3D diorama - in production this would be a Three.js canvas */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">{activeDepartment.icon}</div>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                  {activeDepartment.name}
                </h3>
                <p className="text-text-muted max-w-md mx-auto">
                  {activeDepartment.description}
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-text-dim text-sm">
                  <span>📍 Position: {activeDepartment.position.x > 0 ? "East" : "West"} Wing</span>
                  <span>•</span>
                  <span>{activeDepartment.position.z > 0 ? "North" : "South"} Block</span>
                </div>
              </div>

              {/* Mini map indicator */}
              <div className="absolute bottom-4 right-4 glass p-2 rounded-lg" style={{ minWidth: "120px" }}>
                <div className="text-xs text-text-muted mb-1">DIORAMA MAP</div>
                <div className="relative w-24 h-24 rounded-lg" style={{ background: "rgba(0,0,0,0.2)" }}>
                  {departments.map((d) => (
                        <div
                          key={d.id}
                          className="absolute w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            left: `${50 + d.position.x * 3}%`,
                            top: `${50 - d.position.z * 3}%`,
                            transform: activeDept === d.id ? "translate(-50%, -50%) scale(1.5)" : "translate(-50%, -50%)",
                            background: activeDept === d.id ? "var(--warm-accent)" : "rgba(255,255,255,0.5)",
                            boxShadow: activeDept === d.id ? "0 0 8px var(--warm-accent)" : "none",
                          }}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Department Detail Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.5 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 glass-warm card p-6 lg:p-8"
          id={`${activeDept}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeDept}-tab`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, var(--warm-accent), var(--warm-muted))" }}
              >
                {activeDepartment.icon}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {activeDepartment.name}
                </h3>
                <p className="text-text-muted text-sm mt-1">{activeDepartment.description}</p>
              </div>
            </div>
            <Link
              href="#contact"
              className="btn btn-warm w-full lg:w-auto justify-center"
            >
              Book in This Department
            </Link>
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: sceneProgress > 0.7 ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: "🏗️", title: "Tiered Pedestal Design", desc: "Circular architecture inspired by healing mandalas" },
            { icon: "🌳", title: "Therapeutic Landscape", desc: "Stylized healing gardens with seating for recovery" },
            { icon: "💡", title: "Warm Ambient Lighting", desc: "Street lamps and pathway lighting for evening calm" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glass-warm card p-6 text-center"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-display text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
              <p className="text-text-muted text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
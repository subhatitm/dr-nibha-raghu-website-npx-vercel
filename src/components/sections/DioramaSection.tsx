"use client";

import Link from "next/link";

import { departments } from "../departments";


export default function DioramaSection({ selected, onSelect }: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const activeDepartment = departments[selected];
  const activeDept = activeDepartment.id;

  return (
    <section
      id="facilities"
      className="clinic-section relative min-h-screen flex items-center justify-center px-6 lg:px-12"
      aria-labelledby="diorama-heading"
      style={{
        background: "linear-gradient(180deg, var(--bg-deep) 0%, #322421 100%)",
      }}
    >
      <div className="wrap">
        {/* Section Header */}
        <div
          className="text-center mb-16"
        >
          <span className="pill pill-warm inline-block mb-6">
            Clinic facilities
          </span>
          <h2
            id="diorama-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 gradient-text-warm"
          >
            Explore Our Surgical Center
          </h2>
          <p className="lede text-text-secondary max-w-2xl mx-auto">
            Select a department to see its facilities and location on the illustrated map.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          role="group"
          aria-label="Department filters"
        >
          {departments.map((dept, index) => (
            <button
              key={dept.id}
              onClick={() => onSelect(index)}
              aria-pressed={activeDept === dept.id}
              aria-controls="department-panel"
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
        </div>

        {/* 3D Diorama Viewport */}
        <div
          className="relative"
        >
          <div
            className="clinic-map rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #342821 0%, #40312b 50%, #392d29 100%)",
              border: "1px solid rgba(223, 142, 123, 0.2)",
              boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="relative w-full flex flex-col items-center justify-center gap-4 p-5 md:p-8">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">{activeDepartment.icon}</div>
                <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                  {activeDepartment.name}
                </h3>
                <p className="text-text-muted max-w-md mx-auto">
                  {activeDepartment.description}
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-text-dim text-sm">
                  <span>📍 Position: {activeDepartment.position.x === 0 ? "Central" : activeDepartment.position.x > 0 ? "East" : "West"} Wing</span>
                  <span>•</span>
                  <span>{activeDepartment.position.z > 0 ? "North" : "South"} Block</span>
                </div>
              </div>

              {/* Mini map indicator */}
              <div className="glass p-2 rounded-lg" style={{ minWidth: "120px" }}>
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
        </div>

        {/* Department Detail Panel */}
        <div
          className="mt-12 glass-warm card p-6 lg:p-8"
          id="department-panel"
          role="region"
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
        </div>

        {/* Key Features Grid */}
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: "🏗️", title: "Tiered Pedestal Design", desc: "Circular architecture inspired by healing mandalas" },
            { icon: "🌳", title: "Therapeutic Landscape", desc: "Stylized healing gardens with seating for recovery" },
            { icon: "💡", title: "Warm Ambient Lighting", desc: "Street lamps and pathway lighting for evening calm" },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-warm card p-6 text-center"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h4 className="font-display text-lg font-bold text-text-primary mb-2">{feature.title}</h4>
              <p className="text-text-muted text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

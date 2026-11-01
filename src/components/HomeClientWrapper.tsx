"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))" }}
        >
          NR
        </div>
        <p className="text-text-muted">Loading 3D experience...</p>
      </div>
    </div>
  ),
});

export default function HomeClientWrapper() {
  return <HomeClient />;
}
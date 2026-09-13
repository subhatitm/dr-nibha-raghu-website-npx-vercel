"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#conditions", label: "Conditions" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const closeDrawer = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`site sticky top-0 z-60 px-4 py-3 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_16px_40px_-18px_rgba(10,39,51,0.5)] border-b border-white/20"
          : "bg-white/60 backdrop-blur-xl border-b border-white/30"
      }`}
      role="banner"
      id="hdr"
    >
      <nav className="wrap flex items-center gap-4" aria-label="Main navigation">
        <Link
          href="#home"
          className="brand flex items-center gap-3 font-display font-bold text-foreground flex-shrink-0"
          aria-label="Dr. Nibha Raghu - Home"
        >
          <span
            className="mark w-10 h-10 rounded-xl grid place-items-center text-white text-xl"
            style={{ background: "linear-gradient(140deg, var(--teal-dk), #39a3bb)" }}
            aria-hidden="true"
          >
            N
          </span>
          <span>
            Dr. Nibha Raghu
            <small className="block font-sans font-medium text-xs tracking-wider uppercase text-[var(--ink-soft)]">
              ENT & Head–Neck Surgery
            </small>
          </span>
        </Link>

        <div className="main hidden md:flex items-center gap-1 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-xl text-sm font-medium text-[var(--ink-soft)] hover:bg-white/70 hover:text-[var(--teal-dk)] transition-all duration-250"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="btn btn-primary hidden md:inline-flex"
        >
          Book Appointment
        </Link>

        <button
          className="burger md:hidden w-11 h-11 rounded-xl border border-[var(--line)] bg-white/60 grid place-items-center cursor-pointer p-0"
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="block w-5 h-0.5 bg-[var(--ink)] mx-auto my-1 transition-all duration-300 rounded"
            style={isMobileMenuOpen ? { transform: "translateY(5px) rotate(45deg)" } : {}} />
          <span className="block w-5 h-0.5 bg-[var(--ink)] mx-auto my-1 transition-all duration-300 rounded"
            style={isMobileMenuOpen ? { opacity: 0 } : {}} />
          <span className="block w-5 h-0.5 bg-[var(--ink)] mx-auto my-1 transition-all duration-300 rounded"
            style={isMobileMenuOpen ? { transform: "translateY(-5px) rotate(-45deg)" } : {}} />
        </button>
      </nav>

      <div
        className={`drawer md:hidden fixed inset-x-4 top-[calc(100%+12px)] z-50 flex-col gap-3 px-4 py-4 transition-all duration-350 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(22px)",
          border: "1px solid var(--line)",
          borderRadius: "18px",
          boxShadow: "0 18px 50px -18px rgba(10,39,51,0.35)",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-3 rounded-xl font-medium text-[var(--ink)] hover:bg-[rgba(14,116,144,0.12)] hover:text-[var(--teal-dk)] transition-all"
            onClick={closeDrawer}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className="btn btn-primary justify-center mt-2"
          onClick={closeDrawer}
        >
          Book Appointment
        </Link>
      </div>
    </header>
  );
}
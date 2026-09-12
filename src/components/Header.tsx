"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/book-appointment", label: "Book Appointment" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsMobileMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-3d border-b border-primary/10"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-display font-bold text-primary hover:opacity-80 transition-opacity focus-visible-ring rounded-lg px-2 py-1"
            aria-label="Dr. Nibha Raghu - Home"
          >
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
              <path
                d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 12V20M12 16H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="4" fill="currentColor" />
            </svg>
            <span className="hidden sm:block">Dr. Nibha Raghu</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary focus-visible-ring rounded px-2 py-1 ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                {pathname === item.href && (
                  <span
                    className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="tel:09902876872"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors focus-visible-ring rounded-lg px-3 py-2"
              aria-label="Call us: 099028 76872"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>099028 76872</span>
            </a>

            <Link
              href="/book-appointment"
              className="hidden lg:inline-flex items-center gap-2 bg-accent text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-accent-light hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 focus-visible-ring"
            >
              Book Appointment
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors focus-visible-ring"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:09902876872"
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors focus-visible-ring"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 099028 76872
            </a>
            <Link
              href="/book-appointment"
              className="text-center px-4 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-light transition-colors focus-visible-ring"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
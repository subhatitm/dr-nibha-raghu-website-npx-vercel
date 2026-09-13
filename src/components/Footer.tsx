import Link from "next/link";

const footerNav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#conditions", label: "Conditions" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const footerServices = [
  { href: "#services", label: "Sinus & FESS" },
  { href: "#services", label: "Ear Microsurgery" },
  { href: "#services", label: "Voice & Swallowing" },
  { href: "#services", label: "Head–Neck Oncology" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site mt-28 pb-16" role="contentinfo">
      <div className="wrap">
        <div
          className="glass fgrid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: "26px",
            padding: "32px",
          }}
        >
          <div>
            <Link href="#home" className="brand flex items-center gap-3 font-display font-bold text-foreground mb-4">
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
            <p className="note mb-4" style={{ maxWidth: "280px" }}>
              Comprehensive ear, nose, throat and head–neck surgical care in Yelahanka, North Bengaluru.
            </p>
            <div className="stars">★★★★★ <span className="note">4.9 · 30+ reviews</span></div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-[var(--ink-soft)] mb-4">Explore</h4>
            <nav className="flex flex-col gap-2">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-1 text-[var(--ink)] hover:text-[var(--teal-dk)] transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-[var(--ink-soft)] mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              {footerServices.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-1 text-[var(--ink)] hover:text-[var(--teal-dk)] transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-[var(--ink-soft)] mb-4">Visit</h4>
            <p className="note mb-4">
              Yelahanka, Bengaluru 560064<br />
              Mon–Sat · 9:00 AM – 4:00 PM
            </p>
            <Link href="#contact" className="btn btn-primary inline-flex justify-center">
              Book Now
            </Link>
          </div>
        </div>

        <p className="legal text-center mt-10 text-sm text-[var(--ink-soft)]">
          © {currentYear} Dr. Nibha Raghu Clinic. All rights reserved. ·
          Information on this site is for general awareness and is not a substitute for a personal medical consultation.
        </p>
      </div>
    </footer>
  );
}
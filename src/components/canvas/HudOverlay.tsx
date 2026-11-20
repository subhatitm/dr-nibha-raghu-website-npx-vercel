const navItems = [
  { href: "#home", label: "Practice" },
  { href: "#facilities", label: "Facilities" },
  { href: "#patient-impact", label: "Patient impact" },
  { href: "#specialties", label: "Specialties" },
  { href: "#contact", label: "Contact" },
];

export default function HudOverlay({ progress, currentScene }: { progress: number; currentScene: number }) {
  return (
    <header className="clinic-header">
      <a href="#home" className="clinic-brand">
        <span className="clinic-mark" aria-hidden="true">NR</span>
        <span>Dr. Nibha Raghu<small>ENT &amp; Head–Neck Surgery</small></span>
      </a>
      <nav aria-label="Main navigation">
        {navItems.map((item, i) => (
          <a key={item.href} href={item.href} aria-current={currentScene === i + 1 ? "location" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="btn btn-primary clinic-book">Appointments</a>
      <div className="clinic-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
    </header>
  );
}

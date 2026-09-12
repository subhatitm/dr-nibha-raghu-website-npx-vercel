import Link from "next/link";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Dr. Nibha Raghu" },
    { href: "/services", label: "Our Services" },
    { href: "/reviews", label: "Patient Reviews" },
    { href: "/contact", label: "Contact Us" },
    { href: "/book-appointment", label: "Book Appointment" },
  ],
  services: [
    { href: "/services#ear", label: "Ear Disorders" },
    { href: "/services#sinus", label: "Sinus & Nasal Treatment" },
    { href: "/services#throat", label: "Throat & Voice Care" },
    { href: "/services#head-neck", label: "Head & Neck Surgery" },
    { href: "/services#hearing", label: "Hearing Evaluation" },
  ],
  contact: {
    address: "Cytecare Hospital, International Airport Road, Venkatala, near Bagalur Cross, Hyderabad–Bengaluru Highway, Yelahanka, Bengaluru, Karnataka 560064",
    phone: "099028 76872",
    email: "appointments@drnibharaghu.com",
    hours: "Mon - Sat: 9:00 AM - 4:00 PM\nSunday: Closed",
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/90 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" aria-hidden="true" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-display font-bold text-white mb-6" aria-label="Dr. Nibha Raghu - Home">
              <svg className="w-8 h-8 text-primary-light" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
                <path d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 12V20M12 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="16" r="4" fill="currentColor" />
              </svg>
              <span>Dr. Nibha Raghu</span>
            </Link>
            <p className="text-background/70 text-base leading-relaxed mb-6 max-w-xs">
              Board-certified ENT Head & Neck Surgeon providing compassionate, comprehensive care for ear, nose, throat, and head & neck conditions at Cytecare Hospital.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-light bg-primary/10 px-3 py-2 rounded-xl w-fit">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              <span className="font-semibold">4.9★</span>
              <span className="text-background/70">(30 Google Reviews)</span>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-lg font-semibold text-white mb-5 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary-light transition-colors duration-200 focus-visible-ring rounded px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our services">
            <h3 className="text-lg font-semibold text-white mb-5 tracking-tight">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary-light transition-colors duration-200 focus-visible-ring rounded px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-lg font-semibold text-white mb-5 tracking-tight">Contact & Hours</h3>
            <address className="not-italic text-background/70 space-y-4">
              <div>
                <p className="font-medium text-white mb-1">Location</p>
                <p className="text-sm leading-relaxed">{footerLinks.contact.address}</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Phone</p>
                <a href="tel:09902876872" className="text-background/70 hover:text-primary-light transition-colors">099028 76872</a>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Email</p>
                <a href="mailto:appointments@drnibharaghu.com" className="text-background/70 hover:text-primary-light transition-colors">appointments@drnibharaghu.com</a>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Hours</p>
                <p className="text-sm leading-relaxed whitespace-pre-line">{footerLinks.contact.hours}</p>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {currentYear} Dr. Nibha Raghu. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.google.com/maps/search/Cytecare+Hospital+Yelahanka" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-primary-light transition-colors text-sm focus-visible-ring rounded" aria-label="View on Google Maps">
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Directions
              </a>
              <a href="https://www.google.com/search?q=Dr+Nibha+Raghu+Cytecare+Hospital+reviews" target="_blank" rel="noopener noreferrer" className="text-background/50 hover:text-primary-light transition-colors text-sm focus-visible-ring rounded" aria-label="Google Reviews">
                <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Google Reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
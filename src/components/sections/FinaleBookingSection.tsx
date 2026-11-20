import type { ClinicContact } from "@/lib/clinic";

export default function FinaleBookingSection({ contact }: { contact: ClinicContact }) {
  return (
    <section id="contact" className="clinic-section clinic-contact" aria-labelledby="finale-heading">
      <div className="wrap max-w-4xl">
        <p className="pill">{contact.clinic} · {contact.area}</p>
        <h2 id="finale-heading" className="font-display font-bold mt-5 mb-5">Book a consultation</h2>
        <p className="lede mb-8">
          Choose a clinic appointment on Dr. Nibha Raghu’s booking page or call Cytecare
          to confirm availability, fees and visiting hours.
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="btn btn-primary" href={contact.bookingUrl}>Book on Practo</a>
          <a className="btn btn-glass" href={`tel:${contact.phone}`}>Call {contact.phoneDisplay}</a>
          <a className="btn btn-glass" href="/api/contact?format=vcard" download>Save clinic contact</a>
        </div>
        <address className="glass card mt-10 not-italic">
          <strong>{contact.clinic}</strong><br />
          {contact.street}, {contact.city} {contact.postcode}
        </address>
      </div>
    </section>
  );
}

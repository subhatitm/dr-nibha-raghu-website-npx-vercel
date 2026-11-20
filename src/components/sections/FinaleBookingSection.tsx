export default function FinaleBookingSection() {
  return (
    <section id="contact" className="clinic-section clinic-contact" aria-labelledby="finale-heading">
      <div className="wrap max-w-4xl">
        <p className="pill">Cytecare Hospitals · Yelahanka</p>
        <h2 id="finale-heading" className="font-display font-bold mt-5 mb-5">Book a consultation</h2>
        <p className="lede mb-8">
          Choose a clinic appointment on Dr. Nibha Raghu’s booking page or call Cytecare
          to confirm availability, fees and visiting hours.
        </p>
        <div className="flex flex-wrap gap-4">
          <a className="btn btn-primary" href="https://www.practo.com/bangalore/doctor/nibha-raghu-ear-nose-throat-ent-specialist?practice_id=1142571">Book on Practo</a>
          <a className="btn btn-glass" href="tel:+918022176767">Call 080 2217 6767</a>
        </div>
        <address className="glass card mt-10 not-italic">
          <strong>Cytecare Hospitals</strong><br />
          Near Bagalur Cross, Yelahanka, Bengaluru 560064
        </address>
      </div>
    </section>
  );
}

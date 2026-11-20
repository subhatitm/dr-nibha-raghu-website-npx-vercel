import Form from "next/form";
import Link from "next/link";
import { maxQueryLength, type Specialty } from "@/lib/clinic";

export default function SpecialtiesShowcaseSection({ items, query, error }: { items: Specialty[]; query: string; error?: string }) {
  return (
    <section id="specialties" className="clinic-section" aria-labelledby="specialties-heading">
      <div className="wrap max-w-5xl">
        <p className="pill">Core clinical specialties</p>
        <h2 id="specialties-heading" className="gradient-text-emerald my-5 font-bold">Interactive Specialty Explorer</h2>
        <p className="lede mb-8">Select a specialty to explore treatment stages and clinical highlights.</p>
        <Form action="/#specialties" role="search" aria-label="Find a specialty" className="specialty-search">
          <label htmlFor="specialty-query">Search specialties</label>
          <div>
            <input key={query} id="specialty-query" type="search" name="q" defaultValue={query}
              maxLength={maxQueryLength} placeholder="e.g. sinus, ear, voice" />
            <button type="submit" className="btn btn-primary">Search</button>
            {(query || error) && <Link href="/#specialties" className="btn btn-glass">Clear</Link>}
          </div>
        </Form>
        {error && <p role="alert" className="mb-6">{error}</p>}
        {query && <p role="status" className="mb-6">{items.length
          ? `${items.length} ${items.length === 1 ? "specialty" : "specialties"} matching “${query}”.`
          : `No specialties matched “${query}”. Try another term or clear the search.`}</p>}
        {items.map(specialty => (
          <details key={specialty.id} name="specialty" className="specialty-details glass mb-4">
            <summary>
              <span>
                <strong className="font-display text-lg sm:text-2xl">{specialty.title}</strong>
                <span className="block text-text-muted mt-2">{specialty.description}</span>
              </span>
            </summary>
            <div className="specialty-panels">
              <div>
                <h3>Treatment stages</h3>
                <ol className="space-y-4 mt-5">
                  {specialty.stages.map(stage => (
                    <li key={stage.name}>
                      <strong>{stage.name}</strong>
                      <span className="block text-sm text-text-muted">{stage.desc}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3>Clinical highlights</h3>
                <ul className="mt-5 mb-6 flex flex-wrap gap-2">
                  {specialty.highlights.map(highlight => <li key={highlight} className="pill">{highlight}</li>)}
                </ul>
                <p className="mb-2">Typical duration: {specialty.duration}</p>
                <p className="mb-6">Typical recovery: {specialty.recovery}</p>
                <a href="#contact" className="btn btn-primary">Book a consultation</a>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

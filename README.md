# Dr. Nibha Raghu’s clinic website

The mobile and desktop homepage presents an interactive 3D clinic. Next.js server components and HTTP route handlers use the same SQLite catalog for department details, specialty search and clinic contact information. Booking links lead to Practo and the hospital telephone line.

## Local development

Use Node.js 24. Run `npm ci` and `npm run dev`. For a production build, run `npm run build` followed by `npm start`.

## Updating the directory

Edit the public clinic records in [departments.json](data/departments.json), [specialties.json](data/specialties.json) or [contact.json](data/contact.json). Keep department IDs aligned with the five wings of the 3D model. Restart the development server after changing the data. Publishing an edit to the production branch regenerates the catalog on Vercel.

The build indexes specialties for full-text search and packages the SQLite database with the Node.js functions. The deployed catalog is read-only. Changes persist in the versioned source records. Appointment scheduling is handled by the existing booking provider.

## Public API

| Request | Result |
| --- | --- |
| `GET /api/departments` | Ordered clinic departments and their model positions |
| `GET /api/specialties` | All specialties with stages, highlights and display details |
| `GET /api/specialties?q=sinus` | Matching specialties, count and query |
| `GET /api/contact` | Public booking and hospital contact details |
| `GET /api/contact?format=vcard` | Downloadable contact card |

The specialty form also accepts a normal GET request at `/?q=sinus#specialties`. Searches accept one query up to 80 characters. An empty query lists the full directory.

import contact from "../../data/contact.json";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = new URL("https://" + (process.env.VERCEL_PROJECT_PRODUCTION_URL || "dr-nibha-raghu-website-npx-vercel.vercel.app"));

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon, Cytecare Hospitals Bengaluru",
    template: "%s | Dr. Nibha Raghu",
  },
  description: "Dr. Nibha Raghu — Associate Consultant ENT, Head & Neck Surgery and Oncology at Cytecare Hospitals, Bengaluru. Expert in FESS, Septoplasty, Micro-Ear Surgery, Laryngoscopy, Bronchoscopy, Tympanoplasty & Head-Neck Oncology. Book appointment.",
  keywords: [
    "ENT specialist Yelahanka",
    "head and neck surgeon Bangalore",
    "FESS Bangalore",
    "septoplasty",
    "tonsillectomy",
    "tympanoplasty",
    "head neck oncology",
    "Dr Nibha Raghu",
    "Cytecare Hospitals",
    "ENT surgeon Bengaluru",
  ],
  authors: [{ name: "Dr. Nibha Raghu" }],
  creator: "Dr. Nibha Raghu",
  publisher: "Dr. Nibha Raghu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl.href,
    siteName: "Dr. Nibha Raghu — ENT & Head-Neck Surgery",
    title: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon, Bengaluru",
    description: "Expert ENT and head & neck surgical care at Cytecare Hospitals, Yelahanka.",
  },
  twitter: {
    card: "summary",
    title: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon",
    description: "Expert ENT and head & neck surgical care at Cytecare Hospitals, Yelahanka.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#031612" },
    { media: "(prefers-color-scheme: light)", color: "#031612" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Nibha Raghu",
  medicalSpecialty: ["Otolaryngologic", "Oncologic"],
  description: "Associate Consultant ENT, Head & Neck Surgery and Oncology at Cytecare Hospitals, Bengaluru.",
  url: siteUrl.href,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.clinic}, ${contact.street}`,
    addressLocality: contact.city,
    addressRegion: contact.region,
    postalCode: contact.postcode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.1067,
    longitude: 77.5929,
  },
  telephone: contact.phone,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
  knowsAbout: [
    "Functional Endoscopic Sinus Surgery (FESS)",
    "Head & Neck Oncology",
    "Septoplasty",
    "Tonsillectomy",
    "Diagnostic Laryngoscopy",
    "Bronchoscopy",
    "Tympanoplasty",
    "Micro-Ear Reconstruction",
    "Skull Base Surgery",
    "Pediatric Airway Surgery",
  ],
  sameAs: [
    "https://www.practo.com/bangalore/doctor/nibha-raghu-ear-nose-throat-ent-specialist",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23031612'/%3E%3Cpath d='M32 12C20.7 12 12 20.7 12 32s8.7 20 20 20 20-8.7 20-20S43.3 12 32 12z' fill='none' stroke='%2310F5B8' stroke-width='3'/%3E%3Ctext x='32' y='40' font-size='24' font-family='Georgia' fill='%2310F5B8' text-anchor='middle' font-weight='bold'%3ENR%3C/text%3E%3C/svg%3E"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
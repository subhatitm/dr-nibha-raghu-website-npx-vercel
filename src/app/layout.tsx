import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon in Yelahanka, Bangalore",
    template: "%s | Dr. Nibha Raghu",
  },
  description: "Dr. Nibha Raghu — ENT specialist and Head & Neck Onco-Surgeon in Yelahanka, Bangalore. FESS, septoplasty, tonsillectomy, tympanoplasty and head-neck cancer care. Book an appointment.",
  keywords: [
    "ENT specialist Yelahanka",
    "head and neck surgeon Bangalore",
    "FESS Bangalore",
    "septoplasty",
    "tonsillectomy",
    "Dr Nibha Raghu",
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
    url: "https://drnibharaghu.com",
    siteName: "Dr. Nibha Raghu ENT Clinic",
    title: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon, Bangalore",
    description: "Expert ENT and head & neck surgical care in Yelahanka, Bangalore. 4.9★ rated by patients.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Nibha Raghu - ENT Head & Neck Surgeon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon",
    description: "Expert ENT and head & neck surgical care in Yelahanka, Bangalore. 4.9★ rated by patients.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0e7490" },
    { media: "(prefers-color-scheme: dark)", color: "#0b5566" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Nibha Raghu",
  medicalSpecialty: ["Otolaryngologic", "Oncologic"],
  description: "ENT and Head & Neck surgeon practising in Yelahanka, Bangalore.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cytecare Cancer Hospital, Venkatala, Yelahanka",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560064",
    addressCountry: "IN",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "30" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com/maps" />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230e7490'/%3E%3Ctext x='32' y='43' font-size='34' font-family='Georgia' fill='white' text-anchor='middle'%3EN%3C/text%3E%3C/svg%3E"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
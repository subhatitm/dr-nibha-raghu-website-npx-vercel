import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

export const metadataBase = new URL("https://drnibharaghu.com");

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Dr. Nibha Raghu | ENT Head & Neck Surgeon | Cytecare Hospital, Yelahanka, Bengaluru",
    template: "%s | Dr. Nibha Raghu",
  },
  description: "Dr. Nibha Raghu - 4.9★ ENT Head & Neck Surgeon at Cytecare Hospital, Yelahanka, Bengaluru. Expert in ear disorders, sinus treatment, throat care, and head & neck surgery. Book appointment today.",
  keywords: [
    "ENT surgeon",
    "head and neck surgeon",
    "Dr. Nibha Raghu",
    "Cytecare Hospital",
    "Yelahanka Bengaluru",
    "ear nose throat specialist",
    "sinus treatment",
    "hearing evaluation",
    "head neck surgery",
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
    siteName: "Dr. Nibha Raghu - ENT Head & Neck Surgeon",
    title: "Dr. Nibha Raghu | ENT Head & Neck Surgeon | Cytecare Hospital",
    description: "4.9★ ENT Head & Neck Surgeon at Cytecare Hospital, Yelahanka, Bengaluru. Expert care for ear, nose, throat & head neck conditions.",
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
    title: "Dr. Nibha Raghu | ENT Head & Neck Surgeon",
    description: "4.9★ ENT Head & Neck Surgeon at Cytecare Hospital, Yelahanka, Bengaluru.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#0f766e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Nibha Raghu",
  medicalSpecialty: "Otolaryngology",
  description: "Board-certified ENT Head & Neck Surgeon at Cytecare Hospital, Yelahanka, Bengaluru",
  url: "https://drnibharaghu.com",
  logo: "https://drnibharaghu.com/icon-512.png",
  image: "https://drnibharaghu.com/og-image.jpg",
  telephone: "+91-99028-76872",
  email: "appointments@drnibharaghu.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cytecare Hospital, International Airport Road, Venkatala, near Bagalur Cross",
    addressLocality: "Yelahanka",
    addressRegion: "Karnataka",
    postalCode: "560064",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.1025",
    longitude: "77.5946",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  priceRange: "₹₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
  knowsAbout: [
    "Ear Disorders",
    "Hearing Loss",
    "Cochlear Implants",
    "Sinusitis",
    "Nasal Polyps",
    "Deviated Septum",
    "Voice Disorders",
    "Thyroid Surgery",
    "Head & Neck Cancer",
    "Pediatric ENT",
  ],
  sameAs: [
    "https://www.google.com/search?q=Dr+Nibha+Raghu+Cytecare+Hospital+reviews",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google.com/maps" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
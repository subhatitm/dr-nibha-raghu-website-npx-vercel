import { Metadata } from "next";
import HomeClientWrapper from "@/components/HomeClientWrapper";

// Force dynamic rendering - this page uses client-only 3D canvas
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
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
    url: "https://drnibharaghu.com",
    siteName: "Dr. Nibha Raghu — ENT & Head-Neck Surgery",
    title: "Dr. Nibha Raghu | ENT & Head-Neck Surgeon, Bengaluru",
    description: "Expert ENT and head & neck surgical care at Cytecare Hospitals, Yelahanka. 16+ years experience. 4.9★ patient rating.",
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
    description: "Expert ENT and head & neck surgical care at Cytecare Hospitals, Yelahanka. 16+ years experience. 4.9★ patient rating.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
  other: {
    "theme-color": "#031612",
  },
};

export default function Home() {
  return <HomeClientWrapper />;
}
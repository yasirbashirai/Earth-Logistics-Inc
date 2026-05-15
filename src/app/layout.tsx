import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { company } from "@/data/company";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display-loaded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

const SITE_URL = "https://earthlogistics247.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Earth Logistics Inc | Freight Broker — Revolving Freight Globally 24/7",
    template: "%s | Earth Logistics Inc",
  },
  description:
    "Earth Logistics Inc is a DOT-authorized freight broker in Saint John, Indiana. Dry van, flatbed, reefer, lowboy, end dump, pneumatic tanker, hazmat, hopper bottom & more. Instant quotes, 24/7 dispatch, 25,000+ vetted carriers.",
  keywords: [
    "freight broker",
    "Indiana freight broker",
    "Saint John Indiana logistics",
    "dry van shipping",
    "flatbed trucking",
    "reefer freight",
    "refrigerated trucking",
    "lowboy heavy haul",
    "end dump trucking",
    "pneumatic tanker",
    "hopper bottom",
    "hazmat shipping",
    "car hauler",
    "instant freight quote",
    "freight brokerage USA",
    "DOT authorized broker",
    "FMCSA freight broker",
    "Earth Logistics Inc",
  ],
  authors: [{ name: "Earth Logistics Inc" }],
  creator: "Earth Logistics Inc",
  publisher: "Earth Logistics Inc",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Earth Logistics Inc",
    title: "Earth Logistics Inc — Revolving Freight Globally 24/7",
    description:
      "DOT-authorized freight broker. Instant freight quotes for dry van, flatbed, reefer, lowboy heavy-haul, end dump, pneumatic tanker, hazmat and more.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Earth Logistics Inc — DOT-authorized freight broker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth Logistics Inc — Revolving Freight Globally 24/7",
    description:
      "DOT-authorized freight broker. Instant freight quotes across the United States, 24/7 dispatch.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  category: "Freight & Logistics",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "MovingCompany"],
  "@id": `${SITE_URL}#organization`,
  name: company.name,
  legalName: "Earth Logistics Inc",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "DOT-authorized freight broker headquartered in Saint John, Indiana — full-service freight solutions across all 48 states, 24/7.",
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "9401 Iris St",
    addressLocality: company.city,
    addressRegion: company.state,
    postalCode: company.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.4509,
    longitude: -87.4717,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  sameAs: [
    company.social.facebook,
    company.social.linkedin,
    company.social.instagram,
    company.social.twitter,
  ].filter((u) => u && u !== "#"),
  knowsAbout: [
    "Dry van freight",
    "Flatbed trucking",
    "Refrigerated freight",
    "Heavy haul",
    "End dump",
    "Pneumatic tanker",
    "Hopper bottom",
    "Hazmat shipping",
    "Car hauler",
    "Liquid tanker",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: company.name,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-ink-900">
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

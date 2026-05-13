import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://earthlogistics247.com"),
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
    "lowboy heavy haul",
    "end dump trucking",
    "pneumatic tanker",
    "hopper bottom",
    "hazmat shipping",
    "car hauler",
    "instant freight quote",
    "Earth Logistics Inc",
  ],
  authors: [{ name: "Earth Logistics Inc" }],
  openGraph: {
    type: "website",
    url: "https://earthlogistics247.com",
    siteName: "Earth Logistics Inc",
    title: "Earth Logistics Inc — Revolving Freight Globally 24/7",
    description:
      "DOT-authorized freight broker. Instant freight quotes for dry van, flatbed, reefer, lowboy heavy-haul, end dump, pneumatic tanker, hazmat and more.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth Logistics Inc — Revolving Freight Globally 24/7",
    description:
      "DOT-authorized freight broker. Instant freight quotes across the United States.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-ink-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

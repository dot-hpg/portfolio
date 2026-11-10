import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Guntuku Hariprasad | Data Analyst",
  description:
    "Data analyst portfolio of Guntuku Hariprasad: SQL, Python, statistics and dashboards applied to real business cases, from 99,441 Target orders to 550,068 Walmart transactions, each ending in recommendations.",
  openGraph: {
    title: "Guntuku Hariprasad | Data Analyst",
    description:
      "SQL, Python, statistics and dashboards applied to real business cases, each ending in recommendations a business can act on.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink">{children}</body>
    </html>
  );
}

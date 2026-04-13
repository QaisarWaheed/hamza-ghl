import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "GHL Architect | Funnels & Automations",
    template: "%s | GHL Architect",
  },
  description:
    "Premium GoHighLevel funnels, websites, and automations—portfolio-driven UX with systems that scale.",
  openGraph: {
    title: "GHL Architect | Funnels & Automations",
    description: "Premium GoHighLevel builds—funnels, sites, and automations with agency-level polish.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary antialiased">
        <div className="noise-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}

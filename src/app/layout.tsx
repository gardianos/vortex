import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "VORTEX | Intelligence Empowers Capital",
  description:
    "VORTEX leverages cutting-edge AI and data intelligence to transform crypto markets and empower informed investment decisions.",
  keywords: [
    "crypto",
    "AI",
    "investment",
    "capital markets",
    "SaaS",
    "financial intelligence",
    "portfolio analytics",
    "blockchain",
  ],
  authors: [{ name: "Vortex Intelligence GmbH" }],
  openGraph: {
    title: "VORTEX | Intelligence Empowers Capital",
    description:
      "VORTEX leverages cutting-edge AI and data intelligence to transform crypto markets.",
    type: "website",
    locale: "de_DE",
    siteName: "VORTEX",
  },
  twitter: {
    card: "summary_large_image",
    title: "VORTEX | Intelligence Empowers Capital",
    description:
      "VORTEX leverages cutting-edge AI and data intelligence to transform crypto markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg-primary)] w-full min-w-full`}
      >
        {children}
      </body>
    </html>
  );
}

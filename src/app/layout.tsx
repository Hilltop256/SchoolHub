import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "School Hub - Uganda School Management System",
    template: "%s | School Hub",
  },
  description:
    "Comprehensive school management system for Ugandan schools. Features student enrollment, fee tracking, payment recording, report cards, attendance tracking, and SMS notifications.",
  keywords: [
    "school management",
    "Uganda",
    "education",
    "fee tracking",
    "student management",
    "attendance",
    "report cards",
  ],
  authors: [{ name: "School Hub Team" }],
  creator: "School Hub",
  publisher: "School Hub",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: "https://schoolhub.ug",
    siteName: "School Hub Uganda",
    title: "School Hub - Uganda School Management System",
    description:
      "Comprehensive school management platform for Ugandan schools with fee tracking, attendance, and reporting.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "School Hub Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SchoolHubUG",
    title: "School Hub - Uganda School Management System",
    description:
      "Comprehensive school management platform for Ugandan schools.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Sitemap and robots */}
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 text-neutral-100`}
      >
        {/* Skip to main content link for accessibility */}
        <Link href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </Link>
        
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}

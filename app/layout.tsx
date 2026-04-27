import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salela Bongo LLC — Building Africa's Digital Future",
  description:
    "Salela Bongo LLC is a US-registered technology company building mobile apps and digital platforms for Africa and its diaspora. Products include Jeux de Dames, Yekola, and Yebela Store.",
  keywords: [
    "Salela Bongo",
    "African apps",
    "Jeux de Dames",
    "Yekola",
    "Yebela",
    "African technology",
    "iOS apps Africa",
    "Android apps Africa",
  ],
  authors: [{ name: "Salela Bongo LLC" }],
  openGraph: {
    title: "Salela Bongo LLC — Building Africa's Digital Future",
    description:
      "Mobile apps and digital platforms built for Africa — in French, English, and Lingala.",
    url: "https://salelabongo.org",
    siteName: "Salela Bongo LLC",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salela Bongo LLC",
    description: "Building Africa's Digital Future",
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

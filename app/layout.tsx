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
  title: "Salela Bongo LLC — Apprenez. Changez Votre Vie. / Learn. Change Your Life.",
  description:
    "Salela Bongo LLC est une société technologique américaine qui construit des applications mobiles et des plateformes numériques pour l'Afrique et sa diaspora. Nos produits incluent Jeux de Dames, DarAkili et Yebela Store. — Salela Bongo LLC is a US-registered technology company building mobile apps and digital platforms for Africa and its diaspora. Products include Jeux de Dames, DarAkili, and Yebela Store.",
  keywords: [
    "Salela Bongo",
    "African apps",
    "Jeux de Dames",
    "DarAkili",
    "Yebela",
    "African technology",
    "iOS apps Africa",
    "Android apps Africa",
    "applications africaines",
    "technologie Afrique",
    "diaspora africaine",
    "apprentissage en ligne",
  ],
  authors: [{ name: "Salela Bongo LLC" }],
  openGraph: {
    title: "Salela Bongo LLC — Apprenez. Changez Votre Vie.",
    description:
      "Applications mobiles et plateformes numériques conçues pour l'Afrique — en français, anglais et lingala. / Mobile apps and digital platforms built for Africa — in French, English, and Lingala.",
    url: "https://salelabongo.org",
    siteName: "Salela Bongo LLC",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "https://salelabongo.org/main.jpeg",
        width: 2168,
        height: 1952,
        alt: "Salela Bongo LLC — Apprenez. Changez Votre Vie. / Learn. Change Your Life.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salela Bongo LLC — Apprenez. Changez Votre Vie.",
    description:
      "Applications mobiles et plateformes numériques pour l'Afrique et sa diaspora. / Mobile apps and digital platforms for Africa and its diaspora.",
    images: ["https://salelabongo.org/main.jpeg"],
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

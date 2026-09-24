import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Salela Bongo LLC — Apprenez. Changez Votre Vie. / Learn. Change Your Life.",
  description:
    "Salela Bongo LLC est une société technologique américaine qui construit des applications mobiles et des plateformes numériques pour l'Afrique et sa diaspora. Nos produits incluent Jeux de Dames, DarAkili, Yebela Store, DoubleVoix (interprétation consécutive, anciennement CBD) et Kuetu (annotation de données pour les langues africaines). — Salela Bongo LLC is a US-registered technology company building mobile apps and digital platforms for Africa and its diaspora. Products include Jeux de Dames, DarAkili, Yebela Store, DoubleVoix (consecutive interpretation, formerly CBD), and Kuetu (data labelling for African languages).",
  keywords: [
    "Salela Bongo",
    "African apps",
    "Jeux de Dames",
    "DarAkili",
    "Yebela",
    "DoubleVoix",
    "doublevoix.com",
    "CBD",
    "Consecutive Bilingual Dubbing",
    "doublage bilingue consécutif",
    "interprétation vidéo",
    "Kuetu",
    "KuetuBot",
    "data labelling African languages",
    "annotation de données",
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
        url: "https://salelabongo.org/og-image.jpg",
        width: 1200,
        height: 630,
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
    images: ["https://salelabongo.org/og-image.jpg"],
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

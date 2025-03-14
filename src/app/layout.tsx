import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://resize.vercel.app"),
  title: {
    default: "Resize2 - Convertisseur d'Images et Documents en Ligne",
    template: "%s | Resize2",
  },
  description:
    "Convertissez, compressez et optimisez vos images et documents en ligne gratuitement. Support des formats WebP, JPEG, PNG, AVIF et PDF.",
  keywords: [
    "conversion image",
    "compression image",
    "optimisation image",
    "convertisseur webp",
    "convertisseur avif",
    "compression pdf",
    "redimensionner image",
    "convertisseur gratuit",
  ],
  authors: [{ name: "Resize2" }],
  creator: "Resize2",
  publisher: "Resize2",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://resize2.vercel.app",
    title: "Resize2 - Convertisseur d'Images et Documents en Ligne",
    description:
      "Convertissez et optimisez vos fichiers facilement et gratuitement",
    siteName: "Resize2",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize2 - Convertisseur d'Images et Documents",
    description:
      "Convertissez et optimisez vos fichiers facilement et gratuitement",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Resize2",
              applicationCategory: "Multimedia",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <div className="background-gradient absolute inset-0 z-[-1] min-h-full" />
        {children}
        <Footer />
        <Toaster />
        <Analytics debug={true} />
      </body>
    </html>
  );
}

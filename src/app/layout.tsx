import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://votre-domaine.com"),
  title: {
    default: "FileFlow - Convertisseur d'Images et Documents en Ligne",
    template: "%s | FileFlow",
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
  authors: [{ name: "FileFlow" }],
  creator: "FileFlow",
  publisher: "FileFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://votre-domaine.com",
    title: "FileFlow - Convertisseur d'Images et Documents en Ligne",
    description:
      "Convertissez et optimisez vos fichiers facilement et gratuitement",
    siteName: "FileFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileFlow - Convertisseur d'Images et Documents",
    description:
      "Convertissez et optimisez vos fichiers facilement et gratuitement",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      <body className={inter.className}>
        <Header />
        <div className="background-gradient absolute inset-0 z-[-1] min-h-full" />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

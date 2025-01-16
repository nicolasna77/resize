import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertisseur et Optimiseur d'Images",
  description:
    "Convertissez et optimisez vos images en WebP, JPEG, PNG ou AVIF. Compression intelligente et redimensionnement facile.",
  keywords: [
    "conversion image",
    "compression image",
    "optimisation image",
    "convertisseur webp",
    "convertisseur avif",
    "redimensionner image",
  ],
  openGraph: {
    title: "Convertisseur et Optimiseur d'Images | FileFlow",
    description: "Convertissez et optimisez vos images en quelques clics",
    type: "website",
  },
};

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

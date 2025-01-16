import ImageProcessor from "@/components/ImageProcessor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Convertisseur et Optimiseur d'Images",
    description:
      "Convertissez et optimisez vos images en WebP, JPEG, PNG ou AVIF. Compression intelligente et redimensionnement facile.",
    openGraph: {
      title: "Convertisseur et Optimiseur d'Images",
      description: "Convertissez et optimisez vos images en quelques clics",
    },
  };
};

export default function ImagePage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-8">
      <header className="mb-8 grid grid-cols-3 items-center">
        <div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Optimisez vos images
        </h1>
        <div />
      </header>
      <ImageProcessor />
    </main>
  );
}

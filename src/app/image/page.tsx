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
    <main className="min-h-screen container mx-auto px-4 py-4 md:py-8">
      <header className="mb-4 md:mb-8 flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0">
        <div className="w-full md:w-auto">
          <Link href="/" className="inline-block">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center order-first md:order-none">
          Optimisez vos images
        </h1>
        <div className="hidden md:block" />
      </header>
      <ImageProcessor />
    </main>
  );
}

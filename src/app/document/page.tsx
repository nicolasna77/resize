import DocumentProcessor from "@/components/DocumentProcessor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Convertisseur de Documents",
    description:
      "Convertissez vos documents PDF en images ou autres formats. Compression et optimisation incluses.",
    openGraph: {
      title: "Convertisseur de Documents",
      description: "Convertissez vos documents facilement",
    },
  };
};

export default function DocumentPage() {
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
          Convertissez vos documents
        </h1>
        <div className="hidden md:block" />
      </header>
      <DocumentProcessor />
    </main>
  );
}

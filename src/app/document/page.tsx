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
          Convertissez vos documents
        </h1>
        <div /> {/* Empty div for grid alignment */}
      </header>
      <DocumentProcessor />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  FileText,
  ImageIcon,
  Zap,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { track } from "@vercel/analytics";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    track("navigation_click", { destination: "image" });
    // Simulate loading for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessMessage(true);
    }, 2000);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const features = [
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Conversion d'Images",
      description: "Convertissez vos images en WebP, JPEG, PNG ou AVIF",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Traitement de Documents",
      description: "Convertissez vos PDFs en images ou autres formats",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Compression Optimisée",
      description: "Réduisez la taille sans perdre en qualité",
    },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Convertissez et Optimisez vos Fichiers{" "}
            <span className="text-primary">Facilement</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Une solution simple et rapide pour convertir, redimensionner et
            optimiser vos images et documents.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/image"
                    onClick={handleNavigation}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "group transition-all duration-300 ease-in-out transform hover:scale-105",
                      isLoading && "pointer-events-none opacity-50"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      "Image"
                    )}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Commencez à convertir vos images maintenant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleNavigation}
                    size="lg"
                    variant="outline"
                    className="group transition-all duration-300 ease-in-out transform hover:scale-105 relative"
                    disabled={true}
                  >
                    <div className="flex items-center gap-2">
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        "Document"
                      )}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="absolute -top-3 -right-3 px-2 py-0.5 text-xs"
                    >
                      Bientôt disponible
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>La conversion de documents sera bientôt disponible</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted-foreground">
              Des outils puissants pour gérer vos fichiers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8">
            Convertissez et optimisez vos fichiers dès maintenant !
          </p>
          <Link
            href="/image"
            onClick={handleNavigation}
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "group transition-all duration-300 ease-in-out transform hover:scale-105",
              isLoading && "pointer-events-none opacity-50"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Essayer gratuitement"
            )}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-50" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10" />
        </motion.div>
      </section>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg flex items-center"
          >
            <CheckCircle className="w-6 h-6 mr-2" />
            <span>Redirection réussie !</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

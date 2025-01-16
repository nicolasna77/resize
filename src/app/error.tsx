"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <CardTitle>Une erreur est survenue</CardTitle>
          </div>
          <CardDescription>
            Nous nous excusons pour la gêne occasionnée.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error.message || "Une erreur inattendue s'est produite."}
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground mt-2">
              Code erreur: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Accueil
          </Button>
          <Button onClick={() => reset()}>Réessayer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

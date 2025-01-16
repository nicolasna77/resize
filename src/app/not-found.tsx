import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
      <div className="rounded-full bg-muted p-4">
        <FileQuestion className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold">Page non trouvée</h2>
      <p className="text-muted-foreground text-center max-w-[500px]">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}

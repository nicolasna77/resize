"use client";

import Image from "next/image";
import { ArrowRight, Download, Loader, Trash2, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
import { ProcessedFile, ImageFormat } from "@/lib/constants";
import { formatBytes } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProcessedImageCardProps {
  image: ProcessedFile;
  selectedFormat: ImageFormat;
  onRemove: (id: string) => void;
}

export function ProcessedImageCard({
  image,
  selectedFormat,
  onRemove,
}: ProcessedImageCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 space-y-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">
              {image.originalName.split(".").slice(0, -1).join(".")}
            </span>
            <Badge variant="secondary" className="text-xs">
              {image.originalName.split(".").pop()}
            </Badge>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <Badge variant="default" className="text-xs">
              {selectedFormat}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(image.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {image.status === "processing" && (
          <div className="flex flex-col justify-center items-center aspect-video bg-muted/50 p-4">
            <Loader className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">
              Traitement en cours...
            </p>
          </div>
        )}

        {image.status === "error" && (
          <div className="flex flex-col justify-center items-center aspect-video bg-destructive/10 p-4">
            <p className="text-sm text-destructive font-medium">
              Erreur lors du traitement
            </p>
          </div>
        )}

        {image.status === "completed" && image.stats && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-video group cursor-zoom-in">
                  <Image
                    src={image.url}
                    alt={image.originalName}
                    fill
                    className="object-contain transition-transform group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                    <div className="bg-background/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-screen-lg w-full h-[90vh]">
                <DialogTitle className="sr-only">
                  {image.originalName}
                </DialogTitle>
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={image.originalName}
                    fill
                    className="object-contain"
                    quality={100}
                    sizes="90vw"
                  />
                </div>
              </DialogContent>
            </Dialog>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Taille</p>
                  <div className="flex items-center gap-2">
                    <span>{formatBytes(image.stats.originalSize)}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-primary font-medium">
                      {formatBytes(image.stats.convertedSize)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Réduction</p>
                  <p className="text-primary font-medium">
                    {Math.round(image.stats.compressionRatio)}%
                  </p>
                </div>
                {image.stats.dimensions && (
                  <div className="col-span-2 space-y-2">
                    <p className="text-muted-foreground">Dimensions</p>
                    <div className="flex items-center gap-2">
                      <span>
                        {image.stats.dimensions.original.width} x{" "}
                        {image.stats.dimensions.original.height}
                      </span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary font-medium">
                        {image.stats.dimensions.resized.width} x{" "}
                        {image.stats.dimensions.resized.height}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <Button asChild variant="outline" className="w-full" size="sm">
                <a
                  href={image.url}
                  download={`${
                    image.originalName.split(".")[0]
                  }.${selectedFormat}`}
                  className="flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </a>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import { Download, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
import { ImageSettings } from "./image-settings";
import { ProcessedImageCard } from "./processed-image-card";
import {
  ImageFormat,
  ProcessedFile,
  ResizeMode,
  ResizeValues,
} from "@/lib/constants";
import { processImage } from "@/lib/process-image";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";

export default function ImageProcessor() {
  const [processedImages, setProcessedImages] = useState<ProcessedFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("webp");
  const [quality, setQuality] = useState(80);
  const [compress, setCompress] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalImagesRef = useRef(0);

  const queueRef = useRef<File[]>([]);
  const processingRef = useRef(false);

  const [resize, setResize] = useState(false);
  const [resizeMode, setResizeMode] = useState<ResizeMode>("none");
  const [resizeValues, setResizeValues] = useState<ResizeValues>({
    width: 1920,
    height: 1080,
    percentage: 100,
  });

  const processQueue = useCallback(async () => {
    if (processingRef.current || queueRef.current.length === 0) return;

    processingRef.current = true;
    setIsProcessing(true);
    totalImagesRef.current = queueRef.current.length;
    setProgress(0);

    try {
      for (let i = 0; i < queueRef.current.length; i++) {
        try {
          await processImage(
            queueRef.current[i],
            selectedFormat,
            quality,
            compress,
            setProcessedImages
          );
          setProgress(((i + 1) / totalImagesRef.current) * 100);
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.error("Erreur lors du traitement de l'image:", error);
          toast.error(
            `Erreur lors du traitement de ${queueRef.current[i].name}`
          );
        }
      }
      queueRef.current = [];
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
      setProgress(0);
    }
  }, [selectedFormat, quality, compress]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      queueRef.current.push(...acceptedFiles);
      processQueue();
    },
    [processQueue]
  );

  const removeImage = (imageId: string) => {
    setProcessedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const downloadAllImages = () => {
    processedImages
      .filter((img) => img.status === "completed")
      .forEach((img) => {
        const link = document.createElement("a");
        link.href = img.url;
        link.download = `${img.originalName.split(".")[0]}.${selectedFormat}`;
        link.click();
      });
  };

  const removeAllImages = () => {
    setProcessedImages([]);
  };

  const stopProcessing = () => {
    queueRef.current = [];
    processingRef.current = false;
    setIsProcessing(false);
    setProgress(0);
    toast.info("Traitement arrêté");
  };

  return (
    <div className="mx-auto space-y-8">
      <div className="max-w-4xl mx-auto">
        {isProcessing && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Traitement des images en cours...
            </p>
          </div>
        )}

        <div className="space-y-6">
          <ImageSettings
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            compress={compress}
            setCompress={setCompress}
            quality={quality}
            setQuality={setQuality}
            resize={resize}
            setResize={setResize}
            resizeMode={resizeMode}
            setResizeMode={setResizeMode}
            resizeValues={resizeValues}
            setResizeValues={setResizeValues}
          />
          <Separator />
          <ImageUpload onDrop={onDrop} />
        </div>
      </div>

      {processedImages.length > 0 && (
        <div className="space-y-4 py-8">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Images traitées
            </h2>

            {isProcessing && (
              <div className="flex-1 max-w-sm flex items-center gap-4">
                <Progress value={progress} className="flex-1" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {Math.round(progress)}%
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                onClick={isProcessing ? stopProcessing : removeAllImages}
                variant={isProcessing ? "destructive" : "outline"}
                size={"sm"}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4" />
                {isProcessing ? "Arrêter" : "Tout supprimer"}
              </Button>
              <Button
                onClick={downloadAllImages}
                className="flex items-center gap-2 whitespace-nowrap"
                size={"sm"}
                disabled={isProcessing}
              >
                <Download className="w-4 h-4" />
                Tout télécharger
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedImages.map((image) => (
              <ProcessedImageCard
                key={image.id}
                image={image}
                selectedFormat={selectedFormat}
                onRemove={removeImage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { DocumentFormat, ProcessedFile, FORMAT_OPTIONS } from "@/lib/constants";
import { processDocument } from "@/lib/process-document";
import { DocumentCard } from "@/components/document-processor";
import { FileUpload } from "@/components/file-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ResizeMode, ResizeValues } from "@/lib/constants";

export default function DocumentProcessor() {
  const [processedFiles, setProcessedFiles] = useState<ProcessedFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<DocumentFormat>("pdf");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalFilesRef = useRef(0);

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
    totalFilesRef.current = queueRef.current.length;
    setProgress(0);

    try {
      for (let i = 0; i < queueRef.current.length; i++) {
        try {
          await processDocument(
            queueRef.current[i],
            selectedFormat,
            setProcessedFiles
          );
          setProgress(((i + 1) / totalFilesRef.current) * 100);
        } catch (error) {
          console.error("Erreur lors du traitement du document:", error);
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
  }, [selectedFormat]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      queueRef.current.push(...acceptedFiles);
      processQueue();
    },
    [processQueue]
  );

  const removeFile = (fileId: string) => {
    setProcessedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  return (
    <div className="mx-auto space-y-8 max-w-7xl px-4">
      <Card className="backdrop-blur-sm bg-background/95">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Conversion de Documents</CardTitle>
          <p className="text-sm text-muted-foreground">
            Convertissez vos documents PDF en images ou redimensionnez-les
            facilement
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative">
              <FileUpload onDrop={onDrop} type="document" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format de sortie</label>
              <Select
                value={selectedFormat}
                onValueChange={(value) =>
                  setSelectedFormat(value as DocumentFormat)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un format" />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.document.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Redimensionnement</label>
                <Switch checked={resize} onCheckedChange={setResize} />
              </div>
              {resize && (
                <div className="space-y-4 pt-2">
                  <Select
                    value={resizeMode}
                    onValueChange={(value) =>
                      setResizeMode(value as ResizeMode)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mode de redimensionnement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dimensions">
                        Dimensions précises
                      </SelectItem>
                      <SelectItem value="width">Largeur fixe</SelectItem>
                      <SelectItem value="height">Hauteur fixe</SelectItem>
                      <SelectItem value="percentage">Pourcentage</SelectItem>
                    </SelectContent>
                  </Select>

                  {resizeMode === "dimensions" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        value={resizeValues.width}
                        onChange={(e) =>
                          setResizeValues({
                            ...resizeValues,
                            width: Number(e.target.value),
                          })
                        }
                        min={1}
                        max={10000}
                        placeholder="Largeur"
                      />
                      <Input
                        type="number"
                        value={resizeValues.height}
                        onChange={(e) =>
                          setResizeValues({
                            ...resizeValues,
                            height: Number(e.target.value),
                          })
                        }
                        min={1}
                        max={10000}
                        placeholder="Hauteur"
                      />
                    </div>
                  ) : (
                    <Input
                      type="number"
                      value={
                        resizeMode === "width"
                          ? resizeValues.width
                          : resizeMode === "height"
                          ? resizeValues.height
                          : resizeValues.percentage
                      }
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setResizeValues({
                          ...resizeValues,
                          [resizeMode]: value,
                        });
                      }}
                      min={1}
                      max={resizeMode === "percentage" ? 100 : 10000}
                      placeholder={
                        resizeMode === "width"
                          ? "Largeur"
                          : resizeMode === "height"
                          ? "Hauteur"
                          : "Pourcentage"
                      }
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {processedFiles.length > 0 && (
        <div className="space-y-4">
          {isProcessing && (
            <div className="relative h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedFiles.map((file) => (
              <DocumentCard
                key={file.id}
                document={file}
                selectedFormat={selectedFormat}
                onRemove={removeFile}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

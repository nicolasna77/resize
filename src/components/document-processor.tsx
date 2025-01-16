"use client";

import { formatBytes } from "@/lib/utils";
import { ProcessedFile, DocumentFormat } from "@/lib/constants";
import { FileText, Trash2, Download } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface DocumentCardProps {
  document: ProcessedFile;
  selectedFormat: DocumentFormat;
  onRemove: (id: string) => void;
}

export function DocumentCard({
  document,
  selectedFormat,
  onRemove,
}: DocumentCardProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="font-medium">{document.originalName}</p>
              <p className="text-sm text-muted-foreground">
                {formatBytes(document.stats?.originalSize || 0)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(document.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        {document.status === "completed" && (
          <Button asChild variant="outline" className="w-full">
            <a
              href={document.url}
              download={`${
                document.originalName.split(".")[0]
              }.${selectedFormat}`}
              className="flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useDropzone } from "react-dropzone";
import { FileType, ACCEPTED_FILES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  type: FileType;
}

export function FileUpload({ onDrop, type }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILES[type],
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary"
      )}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-muted-foreground">
        Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner
      </p>
    </div>
  );
}

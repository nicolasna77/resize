"use client";

import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onDrop: (files: File[]) => void;
}

export function ImageUpload({ onDrop }: ImageUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".avif"],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Déposez vos images ici...</p>
      ) : (
        <p>Glissez-déposez vos images ici, ou cliquez pour sélectionner</p>
      )}
    </div>
  );
}

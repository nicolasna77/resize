import { ProcessedFile, DocumentFormat } from "./constants";

export async function processDocument(
  file: File,
  format: DocumentFormat,
  setProcessedFiles: React.Dispatch<React.SetStateAction<ProcessedFile[]>>
) {
  const documentId = `${file.name}-${Date.now()}`;
  const originalSize = file.size;

  setProcessedFiles((prev) => [
    ...prev,
    {
      id: documentId,
      originalName: file.name,
      url: "",
      type: "document",
      status: "processing",
    },
  ]);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);

    const response = await fetch("/api/process-document", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const convertedSize = blob.size;
    const compressionRatio =
      ((originalSize - convertedSize) / originalSize) * 100;

    setProcessedFiles((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              url,
              status: "completed" as const,
              stats: {
                originalSize,
                convertedSize,
                compressionRatio,
              },
            }
          : doc
      )
    );
  } catch (error) {
    setProcessedFiles((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, status: "error" as const } : doc
      )
    );
    throw error;
  }
}

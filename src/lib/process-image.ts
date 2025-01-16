import { ProcessedFile, ImageFormat } from "./constants";

export async function processImage(
  file: File,
  format: ImageFormat,
  quality: number,
  compress: boolean,
  setProcessedImages: React.Dispatch<React.SetStateAction<ProcessedFile[]>>
) {
  const imageId = `${file.name}-${Date.now()}`;
  const originalSize = file.size;

  setProcessedImages((prev) => [
    ...prev,
    {
      id: imageId,
      originalName: file.name,
      url: "",
      type: "image",
      status: "processing",
    },
  ]);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);
    formData.append("quality", quality.toString());
    formData.append("compress", compress.toString());

    const response = await fetch("/api/process-image", {
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

    setProcessedImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? {
              ...img,
              url,
              status: "completed" as const,
              stats: {
                originalSize,
                convertedSize,
                compressionRatio,
              },
            }
          : img
      )
    );
  } catch (error) {
    setProcessedImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, status: "error" as const } : img
      )
    );
    throw error;
  }
}

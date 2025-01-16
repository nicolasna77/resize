export type FileFormat = ImageFormat | DocumentFormat;

export type ImageFormat = "jpeg" | "png" | "webp" | "avif";
export type DocumentFormat = "pdf" | "docx" | "txt" | "md";

export const FORMAT_OPTIONS = {
  image: [
    { value: "webp", label: "WebP" },
    { value: "jpeg", label: "JPEG" },
    { value: "png", label: "PNG" },
    { value: "avif", label: "AVIF" },
  ],
  document: [
    { value: "pdf", label: "PDF" },
    { value: "png", label: "Image PNG" },
    { value: "jpeg", label: "Image JPEG" },
  ],
} as const;

export type FileType = "image" | "document" | "audio";

export type ProcessedFile = {
  id: string;
  originalName: string;
  url: string;
  type: FileType;
  status: "processing" | "completed" | "error";
  stats?: {
    originalSize: number;
    convertedSize: number;
    compressionRatio: number;
    dimensions?: {
      original: { width: number; height: number };
      resized: { width: number; height: number };
    };
  };
};

export const ACCEPTED_FILES = {
  image: {
    "image/*": [".png", ".jpg", ".jpeg", ".webp", ".avif"],
  },
  document: {
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "text/plain": [".txt"],
    "text/markdown": [".md"],
  },
  audio: {
    "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
  },
};

export type ResizeMode =
  | "none"
  | "width"
  | "height"
  | "percentage"
  | "dimensions";

export type ResizeValues = {
  width: number;
  height: number;
  percentage: number;
};

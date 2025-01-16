"use client";

import { FileType } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image as ImageIcon } from "lucide-react";

interface FileTypeSelectorProps {
  selectedType: FileType;
  onTypeChange: (type: FileType) => void;
}

export function FileTypeSelector({
  selectedType,
  onTypeChange,
}: FileTypeSelectorProps) {
  return (
    <Tabs
      value={selectedType}
      onValueChange={(v) => onTypeChange(v as FileType)}
    >
      <TabsList className="grid w-full grid-cols-2 max-w-xl mx-auto">
        <TabsTrigger value="image" className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Images
        </TabsTrigger>
        <TabsTrigger value="document" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Documents
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

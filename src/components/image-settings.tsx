"use client";

import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ImageFormat,
  FORMAT_OPTIONS,
  ResizeMode,
  ResizeValues,
} from "@/lib/constants";
import { Separator } from "./ui/separator";
import { Settings2, Maximize2, Image as ImageIcon } from "lucide-react";

interface ImageSettingsProps {
  selectedFormat: ImageFormat;
  setSelectedFormat: (format: ImageFormat) => void;
  compress: boolean;
  setCompress: (compress: boolean) => void;
  quality: number;
  setQuality: (quality: number) => void;
  resize: boolean;
  setResize: (resize: boolean) => void;
  resizeMode: ResizeMode;
  setResizeMode: (mode: ResizeMode) => void;
  resizeValues: ResizeValues;
  setResizeValues: (values: ResizeValues) => void;
}

export function ImageSettings({
  selectedFormat,
  setSelectedFormat,
  compress,
  setCompress,
  quality,
  setQuality,
  resize,
  setResize,
  resizeMode,
  setResizeMode,
  resizeValues,
  setResizeValues,
}: ImageSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Options de traitement
        </CardTitle>
        <CardDescription>
          Configurez les paramètres de conversion et d&apos;optimisation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Format de sortie</h3>
          </div>
          <Select
            value={selectedFormat}
            onValueChange={(value) => setSelectedFormat(value as ImageFormat)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un format" />
            </SelectTrigger>
            <SelectContent>
              {FORMAT_OPTIONS.image.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Compression</h3>
            </div>
            <Switch checked={compress} onCheckedChange={setCompress} />
          </div>

          {compress && (
            <div className="pl-6 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted-foreground">
                  Qualité de l&apos;image
                </label>
                <span className="text-sm font-medium">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={([value]) => setQuality(value)}
                min={1}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Redimensionnement</h3>
            </div>
            <Switch checked={resize} onCheckedChange={setResize} />
          </div>

          {resize && (
            <div className="pl-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Mode de redimensionnement
                </label>
                <Select
                  value={resizeMode}
                  onValueChange={(value) => setResizeMode(value as ResizeMode)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un mode" />
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
              </div>

              {resizeMode === "dimensions" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Largeur (px)
                    </label>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Hauteur (px)
                    </label>
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
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    {resizeMode === "width"
                      ? "Largeur (px)"
                      : resizeMode === "height"
                      ? "Hauteur (px)"
                      : "Pourcentage (%)"}
                  </label>
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
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

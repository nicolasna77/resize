import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const maxDuration = 300; // Augmenter le timeout à 300 secondes
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const format = (formData.get("format") as string) || "webp";
    const quality = parseInt(formData.get("quality") as string) || 80;
    const compress = formData.get("compress") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier n'a été fourni" },
        { status: 400 }
      );
    }

    // Convertir le File en Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Initialiser Sharp avec des options de mémoire plus élevées
    const processedImage = sharp(buffer, {
      limitInputPixels: false, // Désactiver la limite de pixels
      sequentialRead: true, // Lecture séquentielle pour les gros fichiers
    });

    try {
      // Vérifier que l'image est valide
      const metadata = await processedImage.metadata();

      if (!metadata) {
        throw new Error("Impossible de lire les métadonnées de l'image");
      }

      // Appliquer la compression si nécessaire
      if (compress && metadata.width && metadata.width > 1920) {
        processedImage.resize(1920, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      // Définir les options de conversion selon le format
      let outputBuffer;

      switch (format) {
        case "jpeg":
          outputBuffer = await processedImage
            .jpeg({ quality, mozjpeg: true })
            .toBuffer();
          break;
        case "png":
          outputBuffer = await processedImage
            .png({ quality, compressionLevel: 9 })
            .toBuffer();
          break;
        case "webp":
          outputBuffer = await processedImage
            .webp({ quality, effort: 6 })
            .toBuffer();
          break;
        case "avif":
          outputBuffer = await processedImage
            .avif({ quality, effort: 6 })
            .toBuffer();
          break;
        default:
          outputBuffer = await processedImage
            .webp({ quality, effort: 6 })
            .toBuffer();
      }

      // Retourner l'image convertie
      return new NextResponse(outputBuffer, {
        headers: {
          "Content-Type": `image/${format}`,
          "Cache-Control": "public, max-age=31536000",
          "Content-Length": outputBuffer.length.toString(),
        },
      });
    } catch (error) {
      console.error("Erreur lors du traitement de l'image:", error);
      return NextResponse.json(
        { error: "Erreur lors du traitement de l'image" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur générale:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de la requête" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};

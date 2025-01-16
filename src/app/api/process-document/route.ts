import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier n'a été fourni" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Traitement selon le format
    let outputBuffer;
    if (format === "pdf") {
      const pdfDoc = await PDFDocument.load(buffer);
      outputBuffer = await pdfDoc.save();
    } else if (format === "png" || format === "jpeg") {
      // Conversion en image
      const image = sharp(buffer);
      if (format === "png") {
        outputBuffer = await image.png().toBuffer();
      } else {
        outputBuffer = await image.jpeg().toBuffer();
      }
    } else if (format === "txt") {
      // Conversion en texte (exemple basique)
      outputBuffer = buffer;
    } else {
      throw new Error("Format non supporté");
    }

    return new NextResponse(outputBuffer, {
      headers: {
        "Content-Type":
          format === "pdf" ? "application/pdf" : `image/${format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors du traitement du document:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement du document" },
      { status: 500 }
    );
  }
}

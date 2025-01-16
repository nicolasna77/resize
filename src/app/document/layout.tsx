import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertisseur de Documents",
  description:
    "Convertissez vos documents PDF en images ou autres formats. Compression et optimisation incluses.",
  keywords: [
    "conversion pdf",
    "pdf vers image",
    "compression pdf",
    "convertisseur document",
    "optimisation document",
  ],
  openGraph: {
    title: "Convertisseur de Documents | Resize2",
    description: "Convertissez vos documents facilement",
    type: "website",
  },
};

export default function DocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

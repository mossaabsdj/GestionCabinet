"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";

export default function ButtonScan() {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      // Importer un bilan déjà en PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "bilan.pdf";
      link.click();
      return;
    }

    // Convertir une image (scanner/radio) en PDF
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgData = e.target?.result;
      const pdf = new jsPDF();
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save("scanner.pdf");
      };
    };
    reader.readAsDataURL(file);
  };

  const openFilePicker = (acceptType) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = acceptType;
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-3 font-semibold shadow-lg">
            📄 Ajouter un Document Médical
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-2xl border border-purple-200">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-purple-700">
              📂 Sélection du document
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              onClick={() => openFilePicker("application/pdf")}
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white w-full py-3 rounded-xl font-semibold shadow-md transition"
            >
              📑 Bilan (PDF de laboratoire)
            </Button>
            <Button
              onClick={() => openFilePicker("image/*")}
              className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white w-full py-3 rounded-xl font-semibold shadow-md transition"
            >
              📷 Scanner (Image radiologique → PDF)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileUpload}
      />
    </>
  );
}

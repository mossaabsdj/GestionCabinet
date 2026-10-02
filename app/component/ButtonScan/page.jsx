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
import { isElectron, showWebDemoNotice } from "@/lib/platform-alert";
import { Scanner, FileText, Image as ImageIcon, Sparkles } from "lucide-react";

export default function ButtonScan() {
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = "bilan.pdf";
      link.click();
      return;
    }

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

  const handleHardwareScan = () => {
    if (!isElectron()) {
      showWebDemoNotice(
        "Numérisation Matérielle Directe (Scanner TWAIN / USB)",
        "La communication matérielle directe avec votre scanner physique nécessite l'application Desktop (Electron). En mode Web, vous pouvez importer vos documents PDF et images scannées directement."
      );
      return;
    }
    // If running in Electron, trigger native scanner IPC
    if (window.electron?.scanDocument) {
      window.electron.scanDocument();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-lg px-6 py-3 font-semibold shadow-lg">
            📄 Ajouter un Document Médical
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-2xl shadow-2xl border border-[var(--color-200)]">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-[var(--color-700)]">
              📂 Sélection ou Numérisation du Document
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => openFilePicker("application/pdf")}
              className="bg-gradient-to-r from-[var(--color-500)] to-[var(--color-700)] hover:from-[var(--color-600)] hover:to-[var(--color-800)] text-white w-full py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" /> 📑 Bilan (PDF de laboratoire)
            </Button>
            <Button
              onClick={() => openFilePicker("image/*")}
              className="bg-gradient-to-r from-[var(--color-400)] to-[var(--color-600)] hover:from-[var(--color-500)] hover:to-[var(--color-700)] text-white w-full py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-5 h-5" /> 📷 Importer Image (Radio / Scan → PDF)
            </Button>
            <Button
              onClick={handleHardwareScan}
              variant="outline"
              className="border-dashed border-2 border-[var(--color-400)] text-[var(--color-700)] hover:bg-[var(--color-50)] w-full py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Numérisation Directe Scanner (Desktop)
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

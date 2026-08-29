"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Database, UploadCloud, DownloadCloud, Palette } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTheme, themes } from "@/context/theme-context";

// === Animation ===
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function ParametrePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // === Handle Backup ===
  const handleBackup = async () => {
    try {
      setLoading(true);
      setMessage("Exportation de la base de données en cours...");

      if (typeof window !== "undefined" && window?.electron?.backup) {
        await window.electron.backup();
        setMessage("✅ Base de données exportée avec succès !");
      } else {
        // Browser Web Mode: Download backup from API
        const res = await fetch("/api/backup");
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Échec du téléchargement de la sauvegarde.");
        }
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const timestamp = new Date().toISOString().split("T")[0];
        a.download = `backup_amel_${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setMessage("✅ Base de données exportée et téléchargée avec succès !");
      }
    } catch (error) {
      console.error(error);
      setMessage(`❌ Échec de l'exportation: ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
    }
  };

  // === Handle Restore Button Click ===
  const handleRestoreClick = async () => {
    try {
      if (typeof window !== "undefined" && window?.electron?.restore) {
        setLoading(true);
        setMessage("Importation de la base de données en cours...");
        await window.electron.restore();
        setMessage("✅ Base de données restaurée avec succès !");
        setLoading(false);
      } else {
        // In browser: trigger file selection dialog
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          fileInputRef.current.click();
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Échec de l'importation !");
      setLoading(false);
    }
  };

  // === Handle File Input Selection in Browser ===
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setMessage("Restauration de la base de données en cours...");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/restore", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la restauration.");
      }

      setMessage("✅ Base de données restaurée avec succès !");
    } catch (error) {
      console.error(error);
      setMessage(`❌ Échec de l'importation: ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[var(--color-600)] rounded-xl">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-sm text-gray-600">
              Sauvegarde, restauration et personnalisation de l'application
            </p>
          </div>
        </div>

        {/* Theme Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-[var(--color-600)]" />
            <h2 className="text-lg font-semibold text-gray-900">
              Thème et Apparence
            </h2>
          </div>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-800">
                Sélection du thème
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Choisissez le thème et la palette de couleurs de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-full md:w-80">
                  <SelectValue placeholder="Sélectionner un thème" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {themes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-black/10"
                          style={{ backgroundColor: t.color }}
                        />
                        <span>{t.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Hidden File Input for Web Mode Restore */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,.sql"
          className="hidden"
        />

        {/* Card Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Export Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DownloadCloud className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Exporter la base de données
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Téléchargez une sauvegarde complète des données
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <button
                onClick={handleBackup}
                disabled={loading}
                className="px-5 py-2.5 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-lg font-medium disabled:opacity-50 transition-colors shadow-sm"
              >
                {loading ? "Exportation..." : "Exporter maintenant"}
              </button>
            </CardContent>
          </Card>

          {/* Import Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Importer une sauvegarde
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Restaurez vos données depuis un fichier de sauvegarde (.json / .sql)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <button
                onClick={handleRestoreClick}
                disabled={loading}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors shadow-sm"
              >
                {loading ? "Importation..." : "Importer un fichier"}
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Message */}
        {message && (
          <div className="mt-8 text-center">
            <p
              className={`text-sm font-medium ${
                message.includes("✅")
                  ? "text-emerald-600"
                  : message.includes("❌")
                    ? "text-red-600"
                    : "text-gray-600"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

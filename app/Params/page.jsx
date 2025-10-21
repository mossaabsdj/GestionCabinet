"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, UploadCloud, DownloadCloud } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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

  // === Handle Backup ===
  const handleBackup = async () => {
    try {
      setLoading(true);
      setMessage("Exportation de la base de données en cours...");
      await window.electron.backup();
      setMessage("✅ Base de données exportée avec succès !");
    } catch (error) {
      console.error(error);
      setMessage("❌ Échec de l’exportation !");
    } finally {
      setLoading(false);
    }
  };

  // === Handle Restore ===
  const handleRestore = async () => {
    try {
      setLoading(true);
      setMessage("Importation de la base de données en cours...");
      await window.electron.restore();
      setMessage("✅ Base de données restaurée avec succès !");
    } catch (error) {
      console.error(error);
      setMessage("❌ Échec de l’importation !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-600 rounded-xl">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-sm text-gray-600">
              Sauvegarde et restauration de la base de données
            </p>
          </div>
        </div>

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
                  Créez une sauvegarde complète au format SQL
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <button
                onClick={handleBackup}
                disabled={loading}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Exportation..." : "Exporter maintenant"}
              </button>
            </CardContent>
          </Card>

          {/* Import Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <UploadCloud className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Importer une sauvegarde
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Restaurez la base depuis un fichier SQL existant
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <button
                onClick={handleRestore}
                disabled={loading}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
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
                  ? "text-green-600"
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

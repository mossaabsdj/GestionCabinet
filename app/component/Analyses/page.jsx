"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Analyses({
  patientID,
  ShowAddDialogNewAnalyse,
  setShowAddDialogNewAnalyse,
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const [formData, setFormData] = useState({
    consultationId: "",
    type: "",
    description: "",
    fichier: "",
  });

  // ✅ Fetch files (filtered by patient)
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const [radiosRes, bilansRes] = await Promise.all([
        fetch("/api/radio"),
        fetch("/api/bilanfile"),
      ]);

      const [radios, bilans] = await Promise.all([
        radiosRes.json(),
        bilansRes.json(),
      ]);

      // Filter only the patient’s files
      const filteredRadios = radios.filter(
        (r) => r.patient.id === Number(patientID)
      );
      const filteredBilans = bilans.filter(
        (b) => b.patient.id === Number(patientID)
      );

      const combined = [
        ...filteredRadios.map((r) => ({
          id: r.id,
          name: r.description || "Radio",
          date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
          type: "Radio",
          fichier: r.fichier,
        })),
        ...filteredBilans.map((b) => ({
          id: b.id,
          name: b.description || "Bilan",
          date: new Date(b.createdAt).toLocaleDateString("fr-FR"),
          type: "Bilan",
          fichier: b.fichier,
        })),
      ];

      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFiles(combined);
    } catch (err) {
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientID) fetchFiles();
  }, [patientID]);

  // ✅ Open file in new tab
  const openFile = (path) => {
    if (path) window.open("/uploads/" + path, "_blank");
  };

  // ✅ Add new file
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        formData.type.toLowerCase() === "radio"
          ? "/api/radio"
          : "/api/bilanfile";

      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          patientId: Number(patientID),
        }),
      });

      setShowAddDialogNewAnalyse(false);
      setFormData({
        consultationId: null,
        type: "",
        description: "",
        fichier: "",
      });
      fetchFiles();
    } catch (err) {
      console.error("Erreur lors de l’ajout:", err);
    }
  };
  const handleFileChange = (file) => {
    if (file) {
      console.log("Selected file:", file.name);
      // setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  // ✅ Delete confirmation
  const confirmDelete = (file) => {
    setFileToDelete(file);
    setShowDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;
    try {
      const endpoint =
        fileToDelete.type === "Radio" ? "/api/radio?id=" : "/api/bilanfile?id=";
      await fetch(endpoint + fileToDelete.id, { method: "DELETE" });
      setShowDeleteDialog(false);
      setFileToDelete(null);
      fetchFiles();
    } catch (err) {
      console.error("Erreur de suppression:", err);
    }
  };

  return (
    <div className="p-5 ">
      {/* Header */}

      {/* Content */}
      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">Aucun fichier trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file) => (
            <Card
              key={file.id}
              className="bg-purple-50 relative p-4 hover:bg-purple-100 transition cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(file);
                }}
                className="group absolute top-2 right-2 h-9 w-9 flex items-center justify-center
             rounded-full border border-red-200 bg-red-50/60 text-red-500
             hover:bg-red-100 hover:border-red-300 hover:text-red-600
             shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />

                {/* Tooltip */}
                <span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Supprimer
                </span>
              </button>

              <CardContent onClick={() => openFile(file.fichier)}>
                <p className="font-medium text-purple-700 text-lg">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar size={16} /> {file.date}
                </div>
                <p className="text-sm text-purple-700 font-semibold mt-1">
                  {file.type}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ✅ Add Dialog */}
      <Dialog
        open={ShowAddDialogNewAnalyse}
        onOpenChange={setShowAddDialogNewAnalyse}
      >
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-purple-700">
              Ajouter une analyse
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-3 mt-2">
            <div>
              <Label>Type (Radio / Bilan)</Label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Type</option>
                <option value="Radio">Radio</option>
                <option value="Bilan">Bilan</option>
              </select>
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Lien du fichier</Label>
              <Input
                type="file"
                onChange={(e) => {
                  console.log(e);
                  setFormData({ ...formData, fichier: e.target.files[0].name });
                  handleFileChange(e.target.files[0]);
                }}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDialogNewAnalyse(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Delete Confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-purple-700">
              Confirmer la suppression
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer{" "}
            <span className="font-semibold">{fileToDelete?.name}</span> ?
          </p>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Trash, Pill, Download, Upload } from "lucide-react";
import AddMedicamentModal from "@/app/component/NewMedicament/page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingScreen from "../component/LoadingScreen/page";

import DialogPage from "@/app/component/DialogPage/page";
import DialogAlert from "@/app/component/DialgoAlert/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { exportToJSON, exportToExcel, importFromJSON, importFromExcel } from "@/lib/import-export";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString();
}

export default function MedicamentsPage() {
  const [medicaments, setMedicaments] = useState([]);
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMedicament, setNewMedicament] = useState({ nom: "" });
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showAlert = (title, message) =>
    setAlertData({ open: true, title, message });
  // 🧩 Load medicaments from API
  useEffect(() => {
    async function fetchMedicaments() {
      setLoading(true);

      try {
        const res = await fetch("/api/medicaments");
        const data = await res.json();
        if (Array.isArray(data)) setMedicaments(data);
        setLoading(false);
      } catch (err) {
        showAlert("Erreur", "Impossible de charger les médicaments.");
      }
    }
    fetchMedicaments();
  }, []);

  // 🔍 Filter search
  const filteredMedicaments = useMemo(() => {
    return medicaments.filter((m) =>
      m.nom.toLowerCase().includes(query.toLowerCase())
    );
  }, [medicaments, query]);

  const totalCount = medicaments.length;

  // ➕ Add Medicament (calls API)
  async function handleAddMedicament(nom) {
    if (!nom) return;
    showAlert("Erreur", "Le nom du médicament est requis");

    setLoading(true);
    try {
      const res = await fetch("/api/medicaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nom),
      });

      if (!res.ok) throw new showAlert("Erreur", "erreur api");
      const created = await res.json();
      setMedicaments((prev) => [created, ...prev]);
      setNewMedicament({ nom: "" });
      setIsAddOpen(false);
    } catch (err) {
      console.error("Erreur lors de l’ajout", err);
      showAlert("Erreur", "Impossible d’ajouter le médicament.");
    } finally {
      setLoading(false);
    }
  }

  // ❌ Delete Medicament
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/medicaments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur API");
      setMedicaments((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
      showAlert("Erreur", "Erreur lors de la suppression.");
    }
  }

  // 📤 Export Medicaments
  const handleExportJSON = () => {
    exportToJSON(medicaments, "medicaments.json");
  };

  const handleExportExcel = () => {
    exportToExcel(medicaments, "medicaments.xlsx");
  };

  // 📥 Import Medicaments
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      let importedData;
      if (file.name.endsWith(".json")) {
        importedData = await importFromJSON(file);
      } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        importedData = await importFromExcel(file);
      } else {
        showAlert("Erreur", "Format de fichier non supporté.");
        return;
      }

      setLoading(true);
      for (const item of importedData) {
        if (item.nom) {
          await fetch("/api/medicaments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom: item.nom }),
          });
        }
      }

      const res = await fetch("/api/medicaments");
      const data = await res.json();
      if (Array.isArray(data)) setMedicaments(data);
      showAlert("Succès", "Importation terminée !");
    } catch (err) {
      showAlert("Erreur", "Échec de l'importation.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-50)] via-white to-[var(--color-100)] p-6">
      <DialogAlert
        open={alertData.open}
        onClose={() => setAlertData({ ...alertData, open: false })}
        title={alertData.title}
        message={alertData.message}
      />
      <AddMedicamentModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMedicament}
        value={newMedicament}
        setValue={setNewMedicament}
        loading={loading}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--color-100)] rounded-full shadow-md">
            <Pill className="w-6 h-6 text-[var(--color-700)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-800)]">Médicaments</h2>
            <p className="text-sm text-muted-foreground">
              Gestion des médicaments
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleExportJSON}
            className="flex items-center gap-2 bg-[var(--color-500)] hover:bg-[var(--color-600)] text-white shadow"
          >
            <Download className="w-4 h-4" /> JSON
          </Button>
          <Button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-[var(--color-500)] hover:bg-[var(--color-600)] text-white shadow"
          >
            <Download className="w-4 h-4" /> Excel
          </Button>
          <div className="relative">
            <Button
              onClick={() => document.getElementById("import-medicaments").click()}
              className="flex items-center gap-2 bg-[var(--color-500)] hover:bg-[var(--color-600)] text-white shadow"
            >
              <Upload className="w-4 h-4" /> Importer
            </Button>
            <Input
              id="import-medicaments"
              type="file"
              accept=".json,.xlsx,.xls"
              onChange={handleImport}
              className="hidden absolute inset-0"
            />
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white shadow"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6 border-[var(--color-200)] shadow-sm">
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nom du médicament..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 w-64 focus:ring-[var(--color-500)]"
              />
            </div>

            <div className="ml-auto px-4 py-2 text-[var(--color-700)] bg-[var(--color-50)] border border-[var(--color-200)] rounded-xl shadow font-semibold">
              Total : {totalCount}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[var(--color-200)] shadow-md">
        <CardContent>
          <div className="rounded-lg border border-[var(--color-100)] max-h-96 overflow-y-auto">
            <Table className="w-full border-collapse">
              <TableHeader className="sticky top-0 bg-gradient-to-r from-[var(--color-50)] to-[var(--color-100)]">
                <TableRow>
                  <TableHead className="px-4 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)]">
                    Nom
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)]">
                    Créé le
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredMedicaments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Aucun médicament trouvé
                    </TableCell>
                  </TableRow>
                )}
                {filteredMedicaments.map((m) => (
                  <TableRow key={m.id} className="hover:bg-[var(--color-50)]/50">
                    <TableCell>{m.nom}</TableCell>
                    <TableCell>{formatDate(m.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <DialogPage
                          title="Supprimer"
                          triggerText={"Supprimer"}
                          description="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
                          onConfirm={() => handleDelete(m.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


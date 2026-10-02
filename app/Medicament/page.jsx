"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Pill, Download, Upload } from "lucide-react";
import AddMedicamentModal from "@/app/component/NewMedicament/page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import DialogPage from "@/app/component/DialogPage/page";
import AlertModal from "@/app/component/success/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeletonRows } from "@/components/ui/table-skeleton";

import {
  exportToJSON,
  exportToExcel,
  importFromJSON,
  importFromExcel,
} from "@/lib/import-export";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR");
}

export default function MedicamentsPage() {
  const [medicaments, setMedicaments] = useState([]);
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMedicament, setNewMedicament] = useState({ nom: "" });
  const [loading, setLoading] = useState(true);

  // === Centered Alert Modal State ===
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: "success",
    title: "",
    description: "",
  });

  const showAlert = (type, title, description, autoClose = true) => {
    setAlertConfig({
      type,
      title,
      description,
      autoClose,
      autoCloseDelay: type === "error" ? 4000 : 2500,
    });
    setAlertOpen(true);
  };

  // 🧩 Load medicaments from API
  async function fetchMedicaments() {
    setLoading(true);
    try {
      const res = await fetch("/api/medicaments");
      const data = await res.json();
      if (Array.isArray(data)) setMedicaments(data);
    } catch {
      showAlert("error", "Erreur", "Impossible de charger les médicaments.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMedicaments();
  }, []);

  // 🔍 Filter search
  const filteredMedicaments = useMemo(() => {
    return medicaments.filter((m) =>
      m.nom.toLowerCase().includes(query.toLowerCase()),
    );
  }, [medicaments, query]);

  const totalCount = medicaments.length;

  // ➕ Add Medicament (calls API)
  async function handleAddMedicament(nom) {
    if (!nom || !nom.trim()) {
      showAlert(
        "warning",
        "Champ requis",
        "Le nom du médicament est obligatoire.",
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/medicaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nom.trim()),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l’ajout du médicament.");
      }

      setMedicaments((prev) => [data, ...prev]);
      setNewMedicament({ nom: "" });
      setIsAddOpen(false);
      showAlert(
        "success",
        "Succès !",
        `Le médicament "${data.nom}" a été ajouté.`,
      );
    } catch (err) {
      console.error(err);
      showAlert(
        "error",
        "Erreur d'ajout",
        err.message || "Impossible d’ajouter le médicament.",
      );
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur lors de la suppression.");
      }
      setMedicaments((prev) => prev.filter((m) => m.id !== id));
      showAlert(
        "success",
        "Supprimé !",
        "Le médicament a été supprimé avec succès.",
      );
    } catch (err) {
      console.error("Erreur suppression:", err);
      showAlert(
        "error",
        "Erreur",
        err.message || "Erreur lors de la suppression.",
      );
    }
  }

  // 📤 Export Medicaments
  const handleExportJSON = () => {
    if (medicaments.length === 0) {
      showAlert("warning", "Attention", "Aucun médicament à exporter.");
      return;
    }
    const cleanData = medicaments.map((m) => ({
      nom: m.nom,
      createdAt: m.createdAt,
    }));
    exportToJSON(
      cleanData,
      `medicaments_${new Date().toISOString().slice(0, 10)}.json`,
    );
    showAlert(
      "success",
      "Exportation réussie",
      "Le fichier JSON a été téléchargé.",
    );
  };

  const handleExportExcel = () => {
    if (medicaments.length === 0) {
      showAlert("warning", "Attention", "Aucun médicament à exporter.");
      return;
    }
    const cleanData = medicaments.map((m) => ({
      nom: m.nom,
      createdAt: m.createdAt,
    }));
    exportToExcel(
      cleanData,
      `medicaments_${new Date().toISOString().slice(0, 10)}.xlsx`,
      "Médicaments",
    );
    showAlert(
      "success",
      "Exportation réussie",
      "Le fichier Excel (.xlsx) a été téléchargé.",
    );
  };

  // 📥 Import Medicaments (JSON, Excel, CSV)
  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      let importedData = [];

      if (file.name.endsWith(".json")) {
        importedData = await importFromJSON(file);
      } else if (
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".csv")
      ) {
        importedData = await importFromExcel(file);
      } else {
        showAlert(
          "error",
          "Format non supporté",
          "Veuillez choisir un fichier .json, .xlsx, .xls ou .csv.",
        );
        return;
      }

      if (importedData.length === 0) {
        showAlert(
          "warning",
          "Fichier vide",
          "Aucun médicament trouvé dans le fichier.",
        );
        return;
      }

      const res = await fetch("/api/medicaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: importedData }),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de l'importation.");
      }

      if (Array.isArray(result.medicaments)) {
        setMedicaments(result.medicaments);
      } else {
        await fetchMedicaments();
      }

      showAlert(
        "success",
        "Importation terminée !",
        `${result.addedCount ?? importedData.length} nouveau(x) médicament(s) importé(s) avec succès${
          result.skippedCount
            ? ` (${result.skippedCount} doublon(s) ignoré(s))`
            : ""
        }.`,
      );
    } catch (err) {
      console.error(err);
      showAlert(
        "error",
        "Échec de l'importation",
        err.message || "Erreur lors de l'importation.",
      );
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-50)] via-white to-[var(--color-100)] p-6">
      {/* Centered Nice Alert Modal */}
      <AlertModal
        config={alertConfig}
        dialogOpen={alertOpen}
        setDialogOpen={setAlertOpen}
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--color-100)] rounded-full shadow-md">
            <Pill className="w-6 h-6 text-[var(--color-700)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-800)]">
              Médicaments
            </h2>
            <p className="text-sm text-muted-foreground">
              Gestion de la liste des médicaments, importation et exportation
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={handleExportJSON}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
          >
            <Download className="w-4 h-4 text-blue-600" /> Export JSON
          </Button>
          <Button
            onClick={handleExportExcel}
            variant="outline"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-600" /> Export Excel
          </Button>
          <div className="relative">
            <Button
              onClick={() =>
                document.getElementById("import-medicaments").click()
              }
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm"
            >
              <Upload className="w-4 h-4 text-purple-600" /> Importer
            </Button>
            <Input
              id="import-medicaments"
              type="file"
              accept=".json,.xlsx,.xls,.csv"
              onChange={handleImport}
              className="hidden"
            />
          </div>
          <Button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white shadow"
          >
            <Plus className="w-4 h-4" /> Ajouter un médicament
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6 border-[var(--color-200)] shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Label className="font-semibold text-gray-700">Rechercher</Label>
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Nom du médicament..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 w-full sm:w-80 focus:ring-[var(--color-500)]"
              />
            </div>

            <div className="ml-auto px-4 py-2 text-[var(--color-700)] bg-[var(--color-50)] border border-[var(--color-200)] rounded-xl shadow-sm font-semibold text-sm">
              Total : {totalCount}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-[var(--color-200)] shadow-md">
        <CardContent className="p-0">
          <div className="rounded-lg border border-[var(--color-100)] max-h-[600px] overflow-y-auto">
            <Table className="w-full border-collapse">
              <TableHeader className="sticky top-0 bg-gradient-to-r from-[var(--color-50)] to-[var(--color-100)] z-10">
                <TableRow>
                  <TableHead className="px-6 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)]">
                    Nom du Médicament
                  </TableHead>
                  <TableHead className="px-6 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)]">
                    Date d'ajout
                  </TableHead>
                  <TableHead className="px-6 py-3 font-bold text-[var(--color-800)] border-b border-[var(--color-200)] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableSkeletonRows
                    columns={3}
                    rows={5}
                    widths={["w-3/4", "w-1/3", "w-16"]}
                  />
                ) : filteredMedicaments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-gray-500"
                    >
                      Aucun médicament trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMedicaments.map((m) => (
                    <TableRow
                      key={m.id}
                      className="hover:bg-[var(--color-50)]/50 transition-colors"
                    >
                      <TableCell className="px-6 py-3.5 font-medium text-gray-900">
                        {m.nom}
                      </TableCell>
                      <TableCell className="px-6 py-3.5 text-gray-600">
                        {formatDate(m.createdAt)}
                      </TableCell>
                      <TableCell className="px-6 py-3.5">
                        <div className="flex items-center justify-center gap-2">
                          <DialogPage
                            title="Supprimer le médicament"
                            triggerText={"Supprimer"}
                            description={`Êtes-vous sûr de vouloir supprimer "${m.nom}" ? Cette action est irréversible.`}
                            onConfirm={() => handleDelete(m.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

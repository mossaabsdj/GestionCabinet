"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, ClipboardList, Download, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingScreen from "../component/LoadingScreen/page";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import DialogPage from "@/app/component/DialogPage/page";
import DialogAlert from "@/app/component/DialgoAlert/page";

import { exportToJSON, exportToExcel, importFromJSON, importFromExcel } from "@/lib/import-export";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString();
}

export default function BilansPage() {
  const [bilans, setBilans] = useState([]);
  const [query, setQuery] = useState("");
  const [newBilan, setNewBilan] = useState({ nom: "" });
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showAlert = (title, message) =>
    setAlertData({ open: true, title, message });
  // 🧩 Load bilans from API
  useEffect(() => {
    async function fetchBilans() {
      setLoading(true);

      try {
        const res = await fetch("/api/bilans");
        const data = await res.json();
        if (Array.isArray(data)) setBilans(data);
        setLoading(false);
      } catch (err) {
        showAlert("Erreur", "Impossible de charger les bilans.");
      }
    }

    fetchBilans();
  }, []);

  // 🔍 Filter search
  const filteredBilans = useMemo(() => {
    return bilans.filter((b) =>
      b.nom.toLowerCase().includes(query.toLowerCase())
    );
  }, [bilans, query]);

  const totalCount = bilans.length;

  // ➕ Add Bilan
  async function handleAddBilan(close) {
    if (!newBilan.nom.trim())
      return showAlert("Champ requis", "Le nom du bilan est obligatoire.");
    setLoading(true);
    try {
      const res = await fetch("/api/bilans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: newBilan.nom }),
      });

      if (!res.ok) throw new Error("Erreur API");

      const created = await res.json();
      setBilans((prev) => [created, ...prev]);
      setNewBilan({ nom: "" });
      close();
    } catch (err) {
      console.error("Erreur lors de l’ajout", err);
      showAlert("Erreur", "Impossible d’ajouter le bilan.");
    } finally {
      setLoading(false);
    }
  }

  // ❌ Delete Bilan
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/bilans?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur API");
      setBilans((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Erreur suppression:", err);
      showAlert("Erreur", "Erreur lors de la suppression.");
    }
  }

  // 📤 Export Bilans
  const handleExportJSON = () => {
    exportToJSON(bilans, "bilans.json");
  };

  const handleExportExcel = () => {
    exportToExcel(bilans, "bilans.xlsx");
  };

  // 📥 Import Bilans
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
          await fetch("/api/bilans", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom: item.nom }),
          });
        }
      }

      const res = await fetch("/api/bilans");
      const data = await res.json();
      if (Array.isArray(data)) setBilans(data);
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
      {/* Header */}
      <DialogAlert
        open={alertData.open}
        onClose={() => setAlertData({ ...alertData, open: false })}
        title={alertData.title}
        message={alertData.message}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--color-100)] rounded-full shadow-md">
            <ClipboardList className="w-6 h-6 text-[var(--color-700)]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-800)]">Bilans</h2>
            <p className="text-sm text-muted-foreground">
              Gestion des bilans médicaux
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
              onClick={() => document.getElementById("import-bilans").click()}
              className="flex items-center gap-2 bg-[var(--color-500)] hover:bg-[var(--color-600)] text-white shadow"
            >
              <Upload className="w-4 h-4" /> Importer
            </Button>
            <Input
              id="import-bilans"
              type="file"
              accept=".json,.xlsx,.xls"
              onChange={handleImport}
              className="hidden absolute inset-0"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white shadow">
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/90 border border-[var(--color-200)] shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-[var(--color-700)] font-semibold flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Nouveau Bilan
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nom">Nom du bilan</Label>
                  <Input
                    id="nom"
                    placeholder="Ex: Bilan sanguin"
                    value={newBilan.nom}
                    onChange={(e) => setNewBilan({ nom: e.target.value })}
                    className="focus:ring-[var(--color-500)]"
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-[var(--color-300)] text-[var(--color-700)]"
                  >
                    Annuler
                  </Button>
                </DialogClose>
                <Button
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddBilan(() =>
                      document
                        .querySelector("[data-state='open'] button")
                        ?.click()
                    );
                  }}
                  className="bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white"
                >
                  {loading ? "Ajout..." : "Confirmer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                placeholder="Nom du bilan..."
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
                {filteredBilans.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Aucun bilan trouvé
                    </TableCell>
                  </TableRow>
                )}
                {filteredBilans.map((b) => (
                  <TableRow key={b.id} className="hover:bg-[var(--color-50)]/50">
                    <TableCell>{b.nom}</TableCell>
                    <TableCell>{formatDate(b.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <DialogPage
                          title="Supprimer"
                          triggerText={"Supprimer"}
                          description="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
                          onConfirm={() => handleDelete(b.id)}
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


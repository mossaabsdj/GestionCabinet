"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Trash, ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString();
}

export default function BilansPage() {
  const [bilans, setBilans] = useState([]);
  const [query, setQuery] = useState("");
  const [newBilan, setNewBilan] = useState({ nom: "" });
  const [loading, setLoading] = useState(false);
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
      try {
        const res = await fetch("/api/bilans");
        const data = await res.json();
        if (Array.isArray(data)) setBilans(data);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      {/* Header */}
      <DialogAlert
        open={alertData.open}
        onClose={() => setAlertData({ ...alertData, open: false })}
        title={alertData.title}
        message={alertData.message}
      />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full shadow-md">
            <ClipboardList className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Bilans</h2>
            <p className="text-sm text-muted-foreground">
              Gestion des bilans médicaux
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow">
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md backdrop-blur-md bg-white/90 border border-purple-200 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-purple-700 font-semibold flex items-center gap-2">
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
                  className="focus:ring-purple-500"
                />
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-purple-300 text-purple-700"
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
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? "Ajout..." : "Confirmer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6 border-purple-200 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nom du bilan..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 w-64 focus:ring-purple-500"
              />
            </div>

            <div className="ml-auto px-4 py-2 text-purple-700 bg-purple-50 border border-purple-200 rounded-xl shadow font-semibold">
              Total : {totalCount}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-purple-200 shadow-md">
        <CardContent>
          <div className="rounded-lg border border-purple-100 max-h-96 overflow-y-auto">
            <Table className="w-full border-collapse">
              <TableHeader className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100">
                <TableRow>
                  <TableHead className="px-4 py-3 font-bold text-purple-800 border-b border-purple-200">
                    Nom
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-purple-800 border-b border-purple-200">
                    Créé le
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-purple-800 border-b border-purple-200 text-center">
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
                  <TableRow key={b.id} className="hover:bg-purple-50/50">
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

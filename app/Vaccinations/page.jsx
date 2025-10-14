"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Syringe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import DialogPage from "@/app/component/DialogPage/page";
import DialogAlert from "@/app/component/DialgoAlert/page";
import VaccinationModal from "@/app/component/VaccinationModal/page";

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString();
}

export default function VaccinationsPage() {
  const [vaccinations, setVaccinations] = useState([]);
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    vaccineName: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showAlert = (title, message) =>
    setAlertData({ open: true, title, message });

  useEffect(() => {
    async function fetchVaccinations() {
      setLoading(true);

      try {
        const res = await fetch("/api/Vaccine");
        const data = await res.json();
        if (Array.isArray(data)) setVaccinations(data);
        setLoading(false);
      } catch {
        showAlert("Erreur", "Impossible de charger les vaccinations.");
      }
    }
    fetchVaccinations();
  }, []);

  const filteredVaccinations = useMemo(() => {
    return vaccinations.filter((v) =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [vaccinations, query]);

  const totalCount = vaccinations.length;

  async function handleAddVaccination(vaccineName) {
    console.log(vaccineName);

    if (!vaccineName) {
      return showAlert("Erreur", "Le nom du vaccin est requis.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/Vaccine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: vaccineName,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Erreur API");
      const created = await res.json();
      setVaccinations((prev) => [created, ...prev]);
      setNewVaccination({ vaccineName: "", createdAt: "" });
      setIsAddOpen(false);
    } catch {
      showAlert("Erreur", "Impossible d’ajouter la vaccination.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/Vaccine?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur API");
      setVaccinations((prev) => prev.filter((v) => v.id !== id));
    } catch {
      showAlert("Erreur", "Erreur lors de la suppression.");
    }
  }
  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      <DialogAlert
        open={alertData.open}
        onClose={() => setAlertData({ ...alertData, open: false })}
        title={alertData.title}
        message={alertData.message}
      />

      <VaccinationModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddVaccination}
        value={newVaccination}
        setValue={setNewVaccination}
        loading={loading}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full shadow-md">
            <Syringe className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Vaccinations</h2>
            <p className="text-sm text-gray-500">
              Gestion des noms et dates de vaccination
            </p>
          </div>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow rounded-xl"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6 border-purple-200 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nom du vaccin..."
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
                    Nom du vaccin
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-purple-800 border-b border-purple-200">
                    Date de création
                  </TableHead>
                  <TableHead className="px-4 py-3 font-bold text-purple-800 border-b border-purple-200 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredVaccinations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Aucune vaccination trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVaccinations.map((v) => (
                    <TableRow key={v.id} className="hover:bg-purple-50/50">
                      <TableCell>{v.name}</TableCell>
                      <TableCell>
                        {formatDate(v.createdAt || v.dateGiven)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DialogPage
                          title="Supprimer"
                          triggerText={"Supprimer"}
                          description="Êtes-vous sûr de vouloir supprimer cette vaccination ? Cette action est irréversible."
                          onConfirm={() => handleDelete(v.id)}
                        />
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

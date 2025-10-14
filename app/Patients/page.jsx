"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Stethoscope,
  Plus,
  Trash,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import AjouteModal from "@/app/component/NewPatient/page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingScreen from "../component/LoadingScreen/page";

import { Label } from "@/components/ui/label";

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ageExact, setAgeExact] = useState("");
  const [filterDays, setFilterDays] = useState("none");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    nom: "",
    age: "",
    telephone: "",
    adresse: "",
    antecedents: "",
    groupeSanguin: "",
  });

  // ===== Fetch patients from API =====
  async function fetchPatients() {
    try {
      setLoading(true);
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors du chargement des patients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  // ===== Filter + Sort logic =====
  const filteredPatients = useMemo(() => {
    let data = patients?.filter((p) => {
      const q = query.trim().toLowerCase();
      if (
        q &&
        !p.nom.toLowerCase().includes(q) &&
        !p.telephone?.toLowerCase().includes(q)
      )
        return false;
      if (dateFrom && new Date(p.createdAt) < new Date(dateFrom)) return false;
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (new Date(p.createdAt) > to) return false;
      }
      if (ageExact && p.age !== Number(ageExact)) return false;
      if (
        filterDays === "new-30" &&
        new Date(p.createdAt) < Date.now() - 30 * 24 * 60 * 60 * 1000
      )
        return false;
      if (
        filterDays === "old-30" &&
        new Date(p.createdAt) >= Date.now() - 30 * 24 * 60 * 60 * 1000
      )
        return false;
      return true;
    });

    if (sortBy === "age")
      data.sort((a, b) =>
        sortOrder === "asc"
          ? (a.age || 0) - (b.age || 0)
          : (b.age || 0) - (a.age || 0)
      );
    if (sortBy === "date")
      data.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );

    return data;
  }, [
    patients,
    query,
    dateFrom,
    dateTo,
    ageExact,
    filterDays,
    sortBy,
    sortOrder,
  ]);

  const totalCount = patients?.length;

  function toggleSort(field) {
    if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }

  // ===== Add new patient API =====
  async function handleAddPatient(data) {
    console.log(JSON.stringify(data));
    if (!data.nom) return alert("Le nom est requis");

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const created = await res.json();
      setPatients((prev) => [created, ...prev]);
      setNewPatient({
        nom: "",
        age: "",
        telephone: "",
        adresse: "",
        antecedents: "",
        groupeSanguin: "",
      });
      setIsAddOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du patient");
    }
  }

  // ===== Delete patient API =====
  async function handleDelete(id) {
    if (!confirm("Supprimer ce patient ?")) return;
    try {
      const res = await fetch(`/api/patients?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur suppression");
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du patient");
    }
  }
  if (loading) return <LoadingScreen />;

  return (
    <div className="overflow-y-hidden min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <AjouteModal
        onAdd={handleAddPatient}
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full shadow-md">
            <Stethoscope className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Patients</h2>
            <p className="text-sm text-muted-foreground">
              Gestion des dossiers patients
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow"
        >
          <Plus className="w-4 h-4" /> Ajouter
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-purple-200 shadow-sm">
        <CardContent>
          <div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col">
              <Label className="mb-1">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Nom ou téléphone..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 focus:ring-purple-500 w-56"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">Date depuis</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">Date jusqu'à</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">Âge exact</Label>
              <Input
                placeholder="ex: 30"
                value={ageExact}
                onChange={(e) => setAgeExact(e.target.value)}
                className="w-28"
              />
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">Ancien / Nouveau</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={filterDays === "new-30" ? "default" : "outline"}
                  onClick={() =>
                    setFilterDays(filterDays === "new-30" ? "none" : "new-30")
                  }
                  className="flex items-center gap-1"
                >
                  <ArrowDown className="h-4 w-4" /> Nouveau
                </Button>
                <Button
                  size="sm"
                  variant={filterDays === "old-30" ? "default" : "outline"}
                  onClick={() =>
                    setFilterDays(filterDays === "old-30" ? "none" : "old-30")
                  }
                  className="flex items-center gap-1"
                >
                  <ArrowUp className="h-4 w-4" /> Ancien
                </Button>
              </div>
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
          {loading ? (
            <p className="text-center py-10">Chargement...</p>
          ) : (
            <div className="rounded-lg border border-purple-100">
              <div className="max-h-99 overflow-y-auto">
                <Table className="w-full border-collapse">
                  <TableHeader className="sticky top-0 bg-gradient-to-r from-purple-50 to-purple-100">
                    <TableRow>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200">
                        Nom
                      </TableHead>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200">
                        Âge
                      </TableHead>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200">
                        Téléphone
                      </TableHead>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200">
                        Groupe
                      </TableHead>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200">
                        Créé le
                      </TableHead>
                      <TableHead className="px-4 py-3 font-bold text-purple-800 text-sm border-b border-purple-200 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          Aucun patient trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((p) => (
                        <TableRow key={p.id} className="hover:bg-purple-50/50">
                          <TableCell>{p.nom}</TableCell>
                          <TableCell>{p.age ?? "-"}</TableCell>
                          <TableCell>{p.telephone ?? "-"}</TableCell>
                          <TableCell>{p.groupeSanguin ?? "-"}</TableCell>
                          <TableCell>{formatDate(p.createdAt)}</TableCell>
                          <TableCell className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(p.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

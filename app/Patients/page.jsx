"use client";
import { Search } from "lucide-react";

import { useState, useMemo } from "react";
import { Stethoscope, Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";
import AjouteModal from "@/app/component/NewPatient/page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

const mockPatients = [
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 1,
    nom: "Ahmed Ben Ali",
    age: 34,
    telephone: "0555-123-456",
    adresse: "Alger, Algérie",
    antecedents: "Hypertension",
    groupeSanguin: "A+",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 2,
    nom: "Sofia Belkacem",
    age: 27,
    telephone: "0555-987-654",
    adresse: "Oran",
    antecedents: "Aucun",
    groupeSanguin: "O-",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
  },
  {
    id: 3,
    nom: "Yassin Mansouri",
    age: 52,
    telephone: "0555-555-555",
    adresse: "Constantine",
    antecedents: "Diabète",
    groupeSanguin: "B+",
    createdAt: new Date().toISOString(),
  },
];

export default function PatientsPage() {
  const [patients, setPatients] = useState(mockPatients);

  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [ageExact, setAgeExact] = useState("");
  const [filterDays, setFilterDays] = useState("none"); // "none" | "new-30" | "old-30"
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

  const filteredPatients = useMemo(() => {
    let data = patients.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q) {
        const inName = p.nom?.toLowerCase().includes(q);
        const inTel = p.telephone?.toLowerCase().includes(q);
        if (!inName && !inTel) return false;
      }
      if (dateFrom) {
        if (new Date(p.createdAt) < new Date(dateFrom)) return false;
      }
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        if (new Date(p.createdAt) > to) return false;
      }
      if (ageExact) {
        if (!p.age || p.age !== Number(ageExact)) return false;
      }
      if (filterDays === "new-30") {
        const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
        if (new Date(p.createdAt).getTime() < cutoff) return false;
      } else if (filterDays === "old-30") {
        const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
        if (new Date(p.createdAt).getTime() >= cutoff) return false;
      }
      return true;
    });

    if (sortBy === "age") {
      data = data.sort((a, b) =>
        sortOrder === "asc"
          ? (a.age ?? 0) - (b.age ?? 0)
          : (b.age ?? 0) - (a.age ?? 0)
      );
    } else if (sortBy === "date") {
      data = data.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

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

  const totalCount = patients.length;

  function toggleSort(field) {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }

  function handleAddPatient(e) {
    e.preventDefault();
    if (!newPatient.nom) return alert("Le nom est requis");

    const nextId = (patients.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1;
    const created = {
      id: nextId,
      nom: newPatient.nom,
      age: newPatient.age ? Number(newPatient.age) : null,
      telephone: newPatient.telephone || null,
      adresse: newPatient.adresse || null,
      antecedents: newPatient.antecedents || null,
      groupeSanguin: newPatient.groupeSanguin || null,
      createdAt: new Date().toISOString(),
    };

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
  }

  function handleDelete(id) {
    if (!confirm("Supprimer ce patient ?")) return;
    setPatients((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="overflow-y-hidden min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <AjouteModal
        onAdd={handleAddPatient}
        open={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
        }}
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

        <div className="flex items-center gap-6">
          <Button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </Button>
        </div>
      </div>
      {/* Filters */}
      <Card className="mb-6 border-purple-200 shadow-sm">
        <CardContent>
          <div className="flex flex-wrap items-end gap-8">
            {/* Search */}
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

            {/* Date depuis */}
            <div className="flex flex-col">
              <Label className="mb-1">Date depuis</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-40"
              />
            </div>

            {/* Date jusqu'à */}
            <div className="flex flex-col">
              <Label className="mb-1">Date jusqu'à</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-40"
              />
            </div>

            {/* Âge exact */}
            <div className="flex flex-col">
              <Label className="mb-1">Âge exact</Label>
              <Input
                placeholder="ex: 30"
                value={ageExact}
                onChange={(e) => setAgeExact(e.target.value)}
                className="w-28"
              />
            </div>

            {/* Ancien / Nouveau */}
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

            {/* Total pushed to the right */}
            <div className="ml-auto px-4 py-2 text-purple-700 bg-purple-50 border border-purple-200 rounded-xl shadow font-semibold">
              Total : {totalCount}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DataTable */}
      <Card className="border-purple-200 shadow-md">
        <CardContent>
          <div className="rounded-lg border border-purple-100">
            <div className="max-h-99 overflow-y-auto">
              <Table className="w-full border-collapse">
                <TableHeader className="sticky top-0  bg-gradient-to-r from-purple-50 to-purple-100">
                  <TableRow>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200">
                      Nom
                    </TableHead>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200">
                      Âge
                    </TableHead>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200">
                      Téléphone
                    </TableHead>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200">
                      Groupe
                    </TableHead>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200">
                      Créé le
                    </TableHead>
                    <TableHead className="sticky top-0 px-4 py-3 font-bold text-purple-800 text-sm  tracking-wide border-b border-purple-200 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredPatients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Aucun patient trouvé
                      </TableCell>
                    </TableRow>
                  )}
                  {filteredPatients.map((p) => (
                    <TableRow key={p.id} className="hover:bg-purple-50/50">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-purple-800">
                            {p.nom}
                          </span>
                          {p.adresse && (
                            <span className="text-xs text-muted-foreground">
                              {p.adresse}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{p.age ?? "-"}</TableCell>
                      <TableCell>{p.telephone ?? "-"}</TableCell>
                      <TableCell>{p.groupeSanguin ?? "-"}</TableCell>
                      <TableCell>{formatDate(p.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-200 text-purple-700 hover:bg-purple-100"
                          >
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(p.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

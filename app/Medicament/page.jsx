"use client";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Plus, Trash, Pill } from "lucide-react";

import AddMedicamentModal from "@/app/component/NewMedicament/page"; // create a modal component similar to AjouteModal
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
import { Label } from "@/components/ui/label";

const mockMedicaments = [
  { id: 1, nom: "Paracétamol", createdAt: new Date().toISOString() },
  { id: 2, nom: "Ibuprofène", createdAt: new Date().toISOString() },
  { id: 3, nom: "Amoxicilline", createdAt: new Date().toISOString() },
];

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString();
}

export default function MedicamentsPage() {
  const [medicaments, setMedicaments] = useState(mockMedicaments);
  const [query, setQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMedicament, setNewMedicament] = useState({ nom: "" });

  const filteredMedicaments = useMemo(() => {
    return medicaments.filter((m) =>
      m.nom.toLowerCase().includes(query.toLowerCase())
    );
  }, [medicaments, query]);

  const totalCount = medicaments.length;

  function handleAddMedicament(e) {
    e.preventDefault();
    if (!newMedicament.nom) return alert("Le nom du médicament est requis");

    const nextId =
      (medicaments.reduce((m, x) => Math.max(m, x.id), 0) || 0) + 1;
    const created = {
      id: nextId,
      nom: newMedicament.nom,
      createdAt: new Date().toISOString(),
    };

    setMedicaments((prev) => [created, ...prev]);
    setNewMedicament({ nom: "" });
    setIsAddOpen(false);
  }

  function handleDelete(id) {
    if (!confirm("Supprimer ce médicament ?")) return;
    setMedicaments((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
      <AddMedicamentModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddMedicament}
        value={newMedicament}
        setValue={setNewMedicament}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full shadow-md">
            <Pill className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Médicaments</h2>
            <p className="text-sm text-muted-foreground">
              Gestion des médicaments
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

      {/* Search */}
      <Card className="mb-6 border-purple-200 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Rechercher</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Nom du médicament..."
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

      {/* DataTable */}
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
                {filteredMedicaments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Aucun médicament trouvé
                    </TableCell>
                  </TableRow>
                )}
                {filteredMedicaments.map((m) => (
                  <TableRow key={m.id} className="hover:bg-purple-50/50">
                    <TableCell>{m.nom}</TableCell>
                    <TableCell>{formatDate(m.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(m.id)}
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
        </CardContent>
      </Card>
    </div>
  );
}

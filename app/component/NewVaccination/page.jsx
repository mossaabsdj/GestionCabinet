"use client";

import { useState, useEffect } from "react";
import { Syringe, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AddVaccinationButton({
  patientId,
  onAdded,
  setrefrech,
}) {
  const [open, setOpen] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [dateGiven, setDateGiven] = useState("");
  const [doseNumber, setDoseNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch available vaccines
  useEffect(() => {
    async function fetchVaccines() {
      try {
        const res = await fetch("/api/Vaccine");
        if (!res.ok) throw new Error("Erreur lors du chargement des vaccins");
        const data = await res.json();
        setVaccines(data);
      } catch (error) {
        console.error("❌ Erreur de chargement:", error);
      }
    }
    fetchVaccines();
  }, []);

  // ✅ Submit new vaccination
  const handleAddVaccination = async () => {
    if (!selectedVaccine || !dateGiven) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/vaccinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          vaccineId: selectedVaccine,
          dateGiven,
          doseNumber,
          notes,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l’ajout de la vaccination");
      const data = await res.json();
      setrefrech(true);

      if (onAdded) onAdded(data);
      setOpen(false);
      setSelectedVaccine("");
      setDateGiven("");
      setDoseNumber("");
      setNotes("");
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("Impossible d’ajouter la vaccination.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modern Button */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-xl shadow-md transition"
      >
        <Plus className="w-5 h-5" />
        Nouvelle vaccination
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-2xl p-6 shadow-lg border border-purple-200">
          <DialogHeader className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-purple-100 rounded-full shadow-md">
              <Syringe className="w-7 h-7 text-purple-700" />
            </div>
            <DialogTitle className="text-2xl font-bold text-purple-800">
              Ajouter une Vaccination
            </DialogTitle>
            <p className="text-sm text-gray-500 text-center">
              Sélectionnez un vaccin et remplissez les informations.
            </p>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-purple-700 font-medium">Vaccin *</Label>
              <select
                className="w-full h-12 mt-1 border rounded-xl px-3 text-gray-700 focus:ring-2 focus:ring-purple-500"
                value={selectedVaccine}
                onChange={(e) => setSelectedVaccine(e.target.value)}
              >
                <option value="">-- Sélectionnez un vaccin --</option>
                {vaccines.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-purple-700 font-medium">
                Date donnée *
              </Label>
              <Input
                type="date"
                value={dateGiven}
                onChange={(e) => setDateGiven(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-purple-700 font-medium">
                Numéro de dose
              </Label>
              <Input
                type="number"
                value={doseNumber}
                onChange={(e) => setDoseNumber(e.target.value)}
                placeholder="Ex: 1"
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-purple-700 font-medium">Notes</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optionnel"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          {/* Buttons */}
          <DialogFooter className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-12 px-6 rounded-xl border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleAddVaccination}
              className="h-12 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

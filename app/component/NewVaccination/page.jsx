"use client";

import { useState, useEffect } from "react";
import { Syringe, Plus, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

  // ✅ New states for adding vaccine
  const [showAddVaccine, setShowAddVaccine] = useState(false);
  const [newVaccineName, setNewVaccineName] = useState("");
  const [addingVaccine, setAddingVaccine] = useState(false);

  // ✅ Alert Dialog states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    description: "",
    variant: "default",
  });

  // ✅ Show alert helper
  const showAlert = (title, description, variant = "default") => {
    setAlertConfig({ title, description, variant });
    setAlertOpen(true);
  };

  // ✅ Fetch available vaccines
  useEffect(() => {
    fetchVaccines();
  }, []);

  const fetchVaccines = async () => {
    try {
      const res = await fetch("/api/Vaccine");
      if (!res.ok) throw new Error("Erreur lors du chargement des vaccins");
      const data = await res.json();
      setVaccines(data);
    } catch (error) {
      console.error("❌ Erreur de chargement:", error);
    }
  };

  // ✅ Add new vaccine to database
  const handleAddNewVaccine = async () => {
    if (!newVaccineName.trim()) {
      showAlert(
        "Champs requis",
        "Veuillez entrer un nom de vaccin",
        "destructive",
      );
      return;
    }

    setAddingVaccine(true);
    try {
      const res = await fetch("/api/Vaccine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newVaccineName.trim() }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du vaccin");

      const newVaccine = await res.json();

      // Refresh vaccine list and select the new one
      await fetchVaccines();
      setSelectedVaccine(newVaccine.id);
      setNewVaccineName("");
      setShowAddVaccine(false);
      showAlert("Succès", "Le vaccin a été ajouté avec succès", "default");
    } catch (error) {
      console.error("❌ Erreur:", error);
      showAlert("Erreur", "Impossible d'ajouter le vaccin", "destructive");
    } finally {
      setAddingVaccine(false);
    }
  };

  // ✅ Submit new vaccination
  const handleAddVaccination = async () => {
    if (!selectedVaccine || !dateGiven) {
      showAlert(
        "Champs requis",
        "Veuillez remplir tous les champs requis",
        "destructive",
      );
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
      if (!res.ok) throw new Error("Erreur lors de l'ajout de la vaccination");
      const data = await res.json();
      setrefrech(true);

      if (onAdded) onAdded(data);
      setOpen(false);
      setSelectedVaccine("");
      setDateGiven("");
      setDoseNumber("");
      setNotes("");
      showAlert(
        "Succès",
        "La vaccination a été ajoutée avec succès",
        "default",
      );
    } catch (error) {
      console.error("❌ Erreur:", error);
      showAlert("Erreur", "Impossible d'ajouter la vaccination", "destructive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modern Button */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white font-medium px-5 py-2 rounded-xl shadow-md transition"
      >
        <Plus className="w-5 h-5" />
        Nouvelle vaccination
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-2xl p-6 shadow-lg border border-[var(--color-200)]">
          <DialogHeader className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-[var(--color-100)] rounded-full shadow-md">
              <Syringe className="w-7 h-7 text-[var(--color-700)]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[var(--color-800)]">
              Ajouter une Vaccination
            </DialogTitle>
            <p className="text-sm text-gray-500 text-center">
              Sélectionnez un vaccin et remplissez les informations.
            </p>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-[var(--color-700)] font-medium">
                Vaccin *
              </Label>
              <div className="flex gap-2 mt-1">
                <select
                  className="flex-1 h-12 border rounded-xl px-3 text-gray-700 focus:ring-2 focus:ring-[var(--color-500)]"
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
                <Button
                  type="button"
                  onClick={() => setShowAddVaccine(!showAddVaccine)}
                  className="h-12 px-4 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-xl"
                  title="Ajouter un nouveau vaccin"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>

              {/* Add New Vaccine Section */}
              {showAddVaccine && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <Label className="text-green-700 font-medium text-sm">
                    Nouveau vaccin
                  </Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newVaccineName}
                      onChange={(e) => setNewVaccineName(e.target.value)}
                      placeholder="Nom du vaccin"
                      className="h-10 rounded-lg"
                      disabled={addingVaccine}
                    />
                    <Button
                      onClick={handleAddNewVaccine}
                      disabled={addingVaccine}
                      className="h-10 px-4 bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-lg text-sm"
                    >
                      {addingVaccine ? "..." : "Ajouter"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-[var(--color-700)] font-medium">
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
              <Label className="text-[var(--color-700)] font-medium">
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
              <Label className="text-[var(--color-700)] font-medium">
                Notes
              </Label>
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
              onClick={() => {
                setOpen(false);
                setShowAddVaccine(false);
                setNewVaccineName("");
              }}
              className="h-12 px-6 rounded-xl border-gray-300 hover:bg-gray-100"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleAddVaccination}
              className="h-12 px-6 rounded-xl bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white font-medium"
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Alert Dialog (replaces SweetAlert) */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full ${
                  alertConfig.variant === "destructive"
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                <AlertCircle
                  className={`w-6 h-6 ${
                    alertConfig.variant === "destructive"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                />
              </div>
              <AlertDialogTitle
                className={`text-xl ${
                  alertConfig.variant === "destructive"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {alertConfig.title}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 mt-2">
              {alertConfig.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={`rounded-xl px-6 ${
                alertConfig.variant === "destructive"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[var(--color-600)] hover:bg-[var(--color-700)]"
              } text-white`}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

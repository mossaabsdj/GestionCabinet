"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Syringe, CalendarClock, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Vaccination({ patientId, refrech, setrefrech }) {
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // ✅ Fetch vaccinations
  useEffect(() => {
    if (!patientId) return;

    async function fetchVaccinations() {
      try {
        const res = await fetch(`/api/vaccinations?patientId=${patientId}`);
        if (!res.ok)
          throw new Error("Erreur lors du chargement des vaccinations");

        const data = await res.json();
        setVaccinations(data);
      } catch (error) {
        console.error("❌ Erreur:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVaccinations();
    if (refrech) {
      setrefrech(false);
    }
  }, [patientId, refrech]);

  // ✅ Delete function
  const handleDelete = async () => {
    if (!selectedVaccine) return;
    try {
      const res = await fetch(`/api/vaccinations?id=${selectedVaccine.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setVaccinations((prev) =>
        prev.filter((v) => v.id !== selectedVaccine.id)
      );
      setOpenDialog(false);
      setSelectedVaccine(null);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (!patientId) {
    return (
      <div className="p-4 flex items-center gap-2 text-gray-500">
        <AlertCircle className="w-5 h-5 text-gray-400" />
        <p>Aucun patient sélectionné.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Chargement des vaccinations...
      </div>
    );
  }

  return (
    <div className="p-4">
      {vaccinations.length === 0 ? (
        <p className="text-gray-500">
          Aucune vaccination trouvée pour ce patient.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vaccinations.map((vaccine) => (
            <Card
              key={vaccine.id}
              className="bg-purple-50 hover:bg-purple-100 p-3 transition rounded-2xl shadow-sm relative"
            >
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-200 rounded-full">
                      <Syringe className="w-5 h-5 text-purple-700" />
                    </div>
                    <p className="font-semibold text-lg text-purple-800">
                      {vaccine.vaccine.name}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="group relative h-10 w-10 rounded-full border border-red-200 bg-red-50/50 
             hover:bg-red-100 hover:border-red-300 transition-all duration-300 shadow-sm
             hover:shadow-md"
                    onClick={() => {
                      setSelectedVaccine(vaccine);
                      setOpenDialog(true);
                    }}
                  >
                    <Trash2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    <span
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Supprimer
                    </span>
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <CalendarClock size={16} />
                  {new Date(vaccine.dateGiven).toLocaleDateString("fr-FR")}
                </div>

                {vaccine.doseNumber && (
                  <p className="text-sm text-purple-600 mt-2">
                    Dose: {vaccine.doseNumber}
                  </p>
                )}

                {vaccine.notes && (
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {vaccine.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ✅ Delete confirmation dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-700">
              Supprimer la vaccination
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-purple-700">
                {selectedVaccine?.vaccine.name}
              </span>
              ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="border-gray-300"
            >
              Annuler
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

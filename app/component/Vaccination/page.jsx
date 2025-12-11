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
  if (!patientId)
    return <p className="text-gray-500 text-center mt-10">Aucune Patient .</p>;
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Vaccin
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Dose
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vaccinations.map((vaccine, index) => (
                  <tr
                    key={vaccine.id}
                    className={`transition-colors hover:bg-purple-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-full">
                          <Syringe className="w-4 h-4 text-purple-700" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          {vaccine.vaccine.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <CalendarClock size={16} className="text-purple-500" />
                        {new Date(vaccine.dateGiven).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {vaccine.doseNumber ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                          Dose {vaccine.doseNumber}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {vaccine.notes ? (
                        <span className="text-sm text-gray-600 italic">
                          {vaccine.notes}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="group h-9 w-9 rounded-full border border-red-200 bg-red-50/50 
                    hover:bg-red-100 hover:border-red-300 transition-all duration-300 shadow-sm
                    hover:shadow-md"
                        onClick={() => {
                          setSelectedVaccine(vaccine);
                          setOpenDialog(true);
                        }}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

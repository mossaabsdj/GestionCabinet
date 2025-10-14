"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Trash2,
  User,
  Activity,
  Heart,
  FileText,
  Pill,
  FlaskConical,
} from "lucide-react";

export default function PatientVisits({ patientId }) {
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // ✅ Fetch consultations
  useEffect(() => {
    if (!patientId) return;

    const fetchConsultations = async () => {
      try {
        const res = await fetch(`/api/Consulter?patientId=${patientId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Erreur de chargement");

        setVisits(data);
      } catch (err) {
        console.error("❌ Erreur:", err);
      }
    };

    fetchConsultations();
  }, [patientId]);

  // ✅ Delete consultation
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/Consulter?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Erreur lors de la suppression");

      setVisits((prev) => prev.filter((v) => v.id !== id));
      setDeleteConfirm(false);
      setSelectedVisit(null);
    } catch (err) {
      console.error(err);
    }
  }

  const renderMedicalInfo = (visit) => {
    const fields = [
      { icon: User, label: "Taille", value: visit.taille, unite: "cm" },
      { icon: User, label: "Poids", value: visit.poids, unite: "kg" },
      {
        icon: Activity,
        label: "TA Systolique",
        value: visit.tensionSystolique,
        unite: "mmHg",
      },
      {
        icon: Activity,
        label: "TA Diastolique",
        value: visit.tensionDiastolique,
        unite: "mmHg",
      },
      {
        icon: Activity,
        label: "Température",
        value: visit.temperature,
        unite: "°C",
      },
      {
        icon: Heart,
        label: "Fréquence cardiaque",
        value: visit.frequenceCardiaque,
        unite: "bpm",
      },
      {
        icon: Activity,
        label: "Fréquence respiratoire",
        value: visit.frequenceRespiratoire,
        unite: "cpm",
      },
      {
        icon: Activity,
        label: "Saturation O₂",
        value: visit.saturationOxygene,
        unite: "%",
      },
      {
        icon: Activity,
        label: "Glycémie",
        value: visit.glycemie,
        unite: "g/L",
      },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {fields.map((info, idx) => (
          <Card key={idx} className="flex items-center justify-between p-3">
            <div className="flex flex-row items-center">
              <info.icon className="text-purple-500 mr-2" size={18} />
              <span className="text-gray-600 text-sm">{info.label}</span>
            </div>
            <div className="text-right text-gray-800">
              {info.value ?? "—"} {info.unite}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      {visits.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune consultation trouvée.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visits.map((visit) => (
            <Card
              key={visit.id}
              onClick={() => setSelectedVisit(visit)}
              className="bg-purple-50 p-3 cursor-pointer hover:bg-purple-100 transition"
            >
              <CardContent>
                <p className="font-medium text-purple-700 text-lg">
                  Consultation #{visit.id}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar size={16} />{" "}
                  {new Date(visit.createdAt).toLocaleDateString("fr-FR")}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock size={16} />{" "}
                  {new Date(visit.createdAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ====================== */}
      {/* DETAILS DIALOG */}
      {/* ====================== */}
      <Dialog
        open={!!selectedVisit}
        onOpenChange={() => setSelectedVisit(null)}
      >
        <DialogContent className="min-w-5xl w-full bg-purple-50 rounded-xl p-6 overflow-y-auto max-h-[90vh]">
          {selectedVisit && (
            <>
              <DialogHeader>
                <DialogTitle className="text-purple-700 text-lg font-semibold">
                  Détails de la Consultation #{selectedVisit.id}
                </DialogTitle>
              </DialogHeader>

              {/* Notes */}
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                  {selectedVisit.note || "Aucune note enregistrée."}
                </p>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                  {selectedVisit.developpementPsychomoteur ||
                    "Aucune note enregistrée."}
                </p>
              </div>

              {/* Infos médicales */}
              {renderMedicalInfo(selectedVisit)}

              {/* Ordonnance */}
              {selectedVisit?.ordonnance?.items?.length > 0 && (
                <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-purple-700 mb-3">
                    <FileText size={20} />
                    <span className="font-semibold text-lg">Ordonnance</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead className="bg-purple-200 text-purple-800">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold">
                            Médicament
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Dosage
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Fréquence
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Durée
                          </th>
                          <th className="py-3 px-4 text-left font-semibold">
                            Quantité
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedVisit.ordonnance.items.map((item, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-purple-100 hover:bg-purple-100 transition"
                          >
                            <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-1">
                              <Pill size={16} className="text-purple-600" />{" "}
                              {item.medicament?.nom || "—"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.dosage || "—"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.frequence || "—"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.duree || "—"}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.quantite || 0} unité(s)
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bilan */}
              {selectedVisit.bilanRecip &&
                selectedVisit.bilanRecip.items?.length > 0 && (
                  <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <FlaskConical size={20} />
                      <span className="font-semibold">Bilan</span>
                    </div>
                    {selectedVisit?.bilanRecip?.items?.length > 0 && (
                      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-green-700 mb-3">
                          <FileText size={20} />
                          <span className="font-semibold text-lg">
                            Bilan Reçu
                          </span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead className="bg-green-200 text-green-800">
                              <tr>
                                <th className="py-3 px-4 text-left font-semibold">
                                  Nom du Bilan
                                </th>
                                <th className="py-3 px-4 text-left font-semibold">
                                  Résultat
                                </th>
                                <th className="py-3 px-4 text-left font-semibold">
                                  Remarque
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {selectedVisit.bilanRecip.items.map(
                                (item, idx) => (
                                  <tr
                                    key={idx}
                                    className="border-b border-green-100 hover:bg-green-100 transition"
                                  >
                                    <td className="py-3 px-4 font-medium text-gray-800">
                                      {item.bilan?.nom || "—"}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                      {item.resultat || "—"}
                                    </td>
                                    <td className="py-3 px-4 text-gray-700">
                                      {item.remarque || "—"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              {/* Buttons */}
              <DialogFooter className="mt-6 flex justify-between">
                <Button
                  variant="destructive"
                  onClick={() => setDeleteConfirm(true)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 size={16} /> Supprimer
                </Button>
                <Button onClick={() => setSelectedVisit(null)}>Fermer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ====================== */}
      {/* DELETE CONFIRM DIALOG */}
      {/* ====================== */}
      <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <DialogContent className="sm:max-w-sm bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Supprimer la consultation ?
            </DialogTitle>
            <DialogDescription>
              Cette action est <b>irréversible</b>. Êtes-vous sûr de vouloir
              continuer ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => setDeleteConfirm(false)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedVisit?.id)}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
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
  Edit3,
  Save,
} from "lucide-react";

export default function PatientVisits({ patientId }) {
  const [visits, setVisits] = useState([]);
  const printRef = useRef();
  const bilanPrintRef = useRef();

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
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
  // ✅ Fetch consultations
  useEffect(() => {
    if (!patientId) return;

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

  // ✅ Save modifications
  async function handleSave() {
    try {
      // Convert specific fields to numeric types safely
      const formattedData = {
        ...editedData,
        taille: editedData.taille ? parseFloat(editedData.taille) : null,
        poids: editedData.poids ? parseFloat(editedData.poids) : null,
        tensionSystolique: editedData.tensionSystolique
          ? parseInt(editedData.tensionSystolique)
          : null,
        tensionDiastolique: editedData.tensionDiastolique
          ? parseInt(editedData.tensionDiastolique)
          : null,
        temperature: editedData.temperature
          ? parseFloat(editedData.temperature)
          : null,
        frequenceCardiaque: editedData.frequenceCardiaque
          ? parseInt(editedData.frequenceCardiaque)
          : null,
        frequenceRespiratoire: editedData.frequenceRespiratoire
          ? parseInt(editedData.frequenceRespiratoire)
          : null,
        saturationOxygene: editedData.saturationOxygene
          ? parseInt(editedData.saturationOxygene)
          : null,
        glycemie: editedData.glycemie ? parseFloat(editedData.glycemie) : null,
      };

      const res = await fetch("/api/Consulter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedVisit.id, ...formattedData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de mise à jour");
      await fetchConsultations();
      setSelectedVisit(null);
      // ✅ Update UI with correct types
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour:", err);
    }
  }

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const renderMedicalInfo = (visit) => {
    const fields = [
      {
        icon: User,
        label: "Taille",
        value: visit.taille,
        unite: "cm",
        field: "taille",
      },
      {
        icon: User,
        label: "Poids",
        value: visit.poids,
        unite: "kg",
        field: "poids",
      },
      {
        icon: Activity,
        label: "TA Systolique",
        value: visit.tensionSystolique,
        unite: "mmHg",
        field: "tensionSystolique",
      },
      {
        icon: Activity,
        label: "TA Diastolique",
        value: visit.tensionDiastolique,
        unite: "mmHg",
        field: "tensionDiastolique",
      },
      {
        icon: Activity,
        label: "Température",
        value: visit.temperature,
        unite: "°C",
        field: "temperature",
      },
      {
        icon: Heart,
        label: "Fréquence cardiaque",
        value: visit.frequenceCardiaque,
        unite: "bpm",
        field: "frequenceCardiaque",
      },
      {
        icon: Activity,
        label: "Fréquence respiratoire",
        value: visit.frequenceRespiratoire,
        unite: "cpm",
        field: "frequenceRespiratoire",
      },
      {
        icon: Activity,
        label: "Saturation O₂",
        value: visit.saturationOxygene,
        unite: "%",
        field: "saturationOxygene",
      },
      {
        icon: Activity,
        label: "Glycémie",
        value: visit.glycemie,
        unite: "g/L",
        field: "glycemie",
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
              {isEditing ? (
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 w-20 text-sm"
                  value={editedData[info.field] ?? visit[info.field] ?? ""}
                  onChange={(e) => handleChange(info.field, e.target.value)}
                />
              ) : (
                <>
                  {info.value ?? "—"} {info.unite}
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };
  const handlePrintElectron = () => {
    if (!printRef.current) return;
    console.log("sbn");
    const printContents = printRef.current.outerHTML;

    window.electron.printOrdonnance({
      title: "Ordonnance - Dr DIB Amel",
      html: `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8fa; margin: 0; }
            .ord-print-header { text-align: center; padding: 24px 0 8px; border-bottom: 2px solid #7c3aed; }
            .ord-print-title { font-size: 2rem; color: #7c3aed; font-weight: bold; margin-bottom: 4px; }
            .ord-print-doc { font-size: 1.1rem; color: #444; margin-bottom: 2px; }
            .ord-print-date { font-size: 0.95rem; color: #888; margin-bottom: 12px; }
            .ord-print-list { margin: 24px 0; }
            .ord-print-item { padding: 12px 18px; border-radius: 8px; background: #fff; margin-bottom: 12px; box-shadow: 0 2px 8px #e9e9f3; }
            .ord-print-item-title { font-size: 1.1rem; color: #7c3aed; font-weight: 500; }
            .ord-print-item-details { font-size: 0.98rem; color: #444; margin-top: 2px; }
            .ord-print-footer { text-align: right; font-size: 1rem; color: #7c3aed; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `,
    });
  };

  // ✅ Print Bilan using Electron
  const handlePrintBilanElectron = () => {
    if (!bilanPrintRef.current) return;

    const printContents = bilanPrintRef.current.outerHTML;

    window.electron.printBilan({
      title: "Bilans & Analyses - Dr DIB Amel",
      html: `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8fa; margin: 0; }
            .bilan-print-header { text-align: center; padding: 24px 0 8px; border-bottom: 2px solid #7c3aed; }
            .bilan-print-title { font-size: 2rem; color: #7c3aed; font-weight: bold; margin-bottom: 4px; }
            .bilan-print-doc { font-size: 1.1rem; color: #444; margin-bottom: 2px; }
            .bilan-print-date { font-size: 0.95rem; color: #888; margin-bottom: 12px; }
            .bilan-print-list { margin: 24px 0; }
            .bilan-print-item { padding: 12px 18px; border-radius: 8px; background: #fff; margin-bottom: 12px; box-shadow: 0 2px 8px #e9e9f3; }
            .bilan-print-footer { text-align: right; font-size: 1rem; color: #7c3aed; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `,
    });
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
              onClick={() => {
                setSelectedVisit(visit);
                setEditedData(visit);
                setIsEditing(false);
              }}
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
        <DialogContent className="min-w-7xl w-full bg-purple-50 rounded-xl p-6 overflow-y-auto max-h-[90vh]">
          {selectedVisit && (
            <>
              <DialogHeader>
                <div className="flex flex-row justify-between ">
                  <DialogTitle className="text-purple-700 text-lg font-semibold">
                    Consultation #{selectedVisit.id}
                  </DialogTitle>
                  <div className="flex flex-row p-4">
                    {isEditing ? (
                      <Button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save size={16} /> Enregistrer
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Edit3 size={16} /> Modifier
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteConfirm(true)}
                      className="flex items-center  mx-3 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              {/* Notes */}
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">Notes</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    className="w-full border rounded-lg p-2 bg-white"
                    value={editedData.note ?? ""}
                    onChange={(e) => handleChange("note", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                    {selectedVisit.note || "Aucune note enregistrée."}
                  </p>
                )}
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">
                  Développement Psychomoteur
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    className="w-full border rounded-lg p-2 bg-white"
                    value={editedData.developpementPsychomoteur ?? ""}
                    onChange={(e) =>
                      handleChange("developpementPsychomoteur", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                    {selectedVisit.developpementPsychomoteur ||
                      "Aucune note enregistrée."}
                  </p>
                )}
              </div>

              {/* Infos médicales */}
              {renderMedicalInfo(selectedVisit)}

              {/* Buttons */}

              {/* ====================== */}
              {/* BILAN RECIP (Analyses) */}
              {/* ====================== */}
              {selectedVisit?.bilanRecip?.items?.length > 0 && (
                <div ref={bilanPrintRef} className="mt-5">
                  <h3 className="text-purple-700 font-semibold text-md flex items-center gap-2">
                    <FlaskConical size={18} /> Bilans / Analyses #
                    {selectedVisit.bilanRecip.id}
                  </h3>
                  <div className="mt-2 bg-white rounded-lg shadow-sm p-3">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-purple-50">
                          <th className="text-left p-2">Bilan</th>
                          <th className="text-left p-2">Résultat</th>
                          <th className="text-left p-2">Remarque</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVisit.bilanRecip.items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-2">{item.bilan?.nom || "—"}</td>
                            <td className="p-2">{item.resultat || "—"}</td>
                            <td className="p-2">{item.remarque || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ====================== */}
              {/* ORDONNANCE (Prescription) */}
              {/* ====================== */}
              {selectedVisit?.ordonnance?.items?.length > 0 && (
                <div ref={printRef} className="mt-5">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-purple-700 font-semibold text-md flex items-center gap-2">
                      <Pill size={18} /> Ordonnance #
                      {selectedVisit.ordonnance.id}
                    </h3>
                    <button
                      onClick={() => {
                        handlePrintElectron();
                      }}
                    >
                      print
                    </button>
                  </div>

                  <div className="mt-2 bg-white rounded-lg shadow-sm p-3">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-purple-50">
                          <th className="text-left p-2">Médicament</th>
                          <th className="text-left p-2">Dosage</th>
                          <th className="text-left p-2">Fréquence</th>
                          <th className="text-left p-2">Durée</th>
                          <th className="text-left p-2">Quantité</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVisit.ordonnance.items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-2">
                              {item.medicament?.nom || "—"}
                            </td>
                            <td className="p-2">{item.dosage || "—"}</td>
                            <td className="p-2">{item.frequence || "—"}</td>
                            <td className="p-2">{item.duree || "—"}</td>
                            <td className="p-2">{item.quantite || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
          <DialogFooter className="mt-6 flex justify-between">
            <div className="flex gap-2">
              <Button onClick={() => setSelectedVisit(null)}>Fermer</Button>
            </div>
          </DialogFooter>
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

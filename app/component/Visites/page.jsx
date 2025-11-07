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
  Pill,
  FlaskConical,
  Edit3,
  Save,
  Ruler,
} from "lucide-react";

export default function PatientVisits({ patientId, query }) {
  const [visits, setVisits] = useState([]);
  const [filtredData, setfiltredData] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const printRef = useRef();
  const bilanPrintRef = useRef();

  // 🔄 Filter by query
  useEffect(() => {
    const filtred = visits?.filter((v) => v.id.toString().includes(query));
    setfiltredData(filtred);
  }, [query, visits]);

  // 🔄 Fetch consultations
  const fetchConsultations = async () => {
    try {
      const res = await fetch(`/api/Consulter?patientId=${patientId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de chargement");
      setVisits(data);
      setfiltredData(data);
    } catch (err) {
      console.error("❌ Erreur:", err);
    }
  };

  useEffect(() => {
    if (!patientId) return;
    fetchConsultations();
  }, [patientId]);

  // 🗑️ Delete consultation
  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/Consulter?id=${id}`, { method: "DELETE" });
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

  // 💾 Save modifications
  async function handleSave() {
    try {
      const formattedData = {
        ...editedData,
        taille: editedData.taille ? parseFloat(editedData.taille) : null,
        poids: editedData.poids ? parseFloat(editedData.poids) : null,
        perimetreCranien: editedData.perimetreCranien
          ? parseFloat(editedData.perimetreCranien)
          : null,
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
        body: JSON.stringify({
          id: selectedVisit.id,
          ...formattedData,
          motifDeConsultation: editedData.motifDeConsultation || null,
          rendezVousDate: editedData.rendezVousDate || null,
          rendezVousDescription: editedData.rendezVousDescription || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de mise à jour");

      await fetchConsultations();
      setIsEditing(false);
      setSelectedVisit(null);
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour:", err);
    }
  }

  // 🔄 Handle form changes
  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // ⚕️ Medical Info Grid (with perimetreCranien)
  const renderMedicalInfo = (visit) => {
    const fields = [
      {
        icon: Ruler,
        label: "Périmètre crânien",
        value: visit.perimetreCranien,
        unite: "cm",
        field: "perimetreCranien",
      },
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

  return (
    <div className="p-4">
      {filtredData?.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucune consultation trouvée.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtredData?.map((visit) => (
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
                <div className="flex flex-row justify-between">
                  <DialogTitle className="text-purple-700 text-lg font-semibold">
                    Consultation #{selectedVisit.id}
                  </DialogTitle>
                  <div className="flex gap-3">
                    {isEditing ? (
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                      >
                        <Save size={16} /> Enregistrer
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                      >
                        <Edit3 size={16} /> Modifier
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteConfirm(true)}
                      className="flex items-center bg-red-500 hover:bg-red-600 text-white"
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
                    value={editedData.note ?? selectedVisit.note ?? ""}
                    onChange={(e) => handleChange("note", e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                    {selectedVisit.note || "Aucune note enregistrée."}
                  </p>
                )}
              </div>
              {/* Motif de consultation */}
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">
                  Motif de consultation
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    className="w-full border rounded-lg p-2 bg-white"
                    value={editedData.motifDeConsultation ?? ""}
                    onChange={(e) =>
                      handleChange("motifDeConsultation", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-gray-700 bg-white p-3 rounded-lg shadow-sm min-h-[60px]">
                    {selectedVisit.motifDeConsultation ||
                      "Aucun motif enregistré."}
                  </p>
                )}
              </div>

              {/* Développement psychomoteur */}
              <div className="mt-3">
                <label className="block text-sm font-medium mb-1">
                  Développement psychomoteur
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

              {/* 🗓️ Rendez-vous */}
              <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-purple-700 font-semibold flex items-center gap-2 mb-2">
                  <Calendar size={18} /> Rendez-vous
                </h4>
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Date du rendez-vous
                      </label>
                      <input
                        type="datetime-local"
                        className="border rounded-md px-3 py-2 w-full text-sm"
                        value={
                          editedData.rendezVousDate ??
                          (selectedVisit.rendezVous?.date
                            ? new Date(selectedVisit.rendezVous.date)
                                .toISOString()
                                .slice(0, 16)
                            : "")
                        }
                        onChange={(e) =>
                          handleChange("rendezVousDate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">
                        Description
                      </label>
                      <input
                        type="text"
                        className="border rounded-md px-3 py-2 w-full text-sm"
                        value={
                          editedData.rendezVousDescription ??
                          selectedVisit.rendezVous?.description ??
                          ""
                        }
                        onChange={(e) =>
                          handleChange("rendezVousDescription", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm">
                    <b>Date :</b>{" "}
                    {selectedVisit.rendezVous?.date
                      ? new Date(
                          selectedVisit.rendezVous.date
                        ).toLocaleDateString("fr-FR")
                      : "—"}{" "}
                    | <b>Description :</b>{" "}
                    {selectedVisit.rendezVous?.description || "—"}
                  </p>
                )}
              </div>

              {/* 🧪 Infos médicales */}
              {renderMedicalInfo(selectedVisit)}
              {/* ====================== */}
              {/* 🔬 BILAN RECIP (Analyses) */}
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
              {/* 💊 ORDONNANCE (Prescription) */}
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
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      Imprimer
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

              <DialogFooter className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedVisit(null)}>Fermer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 🗑️ DELETE CONFIRM DIALOG */}
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

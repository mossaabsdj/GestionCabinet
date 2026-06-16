"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Droplets,
  Gauge,
  HeartPulse,
  Stethoscope,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientVisits({ patientId, query, fetchPatientById }) {
  const [visits, setVisits] = useState([]);
  const [filtredData, setfiltredData] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [currentVisitIndex, setCurrentVisitIndex] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const printRef = useRef();
  const bilanPrintRef = useRef();
  const justifPrintRef = useRef();

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
  const handlePrintElectron = async () => {
    console.log(selectedPatient);
    try {
      if (!prescriptionItems || prescriptionItems.length === 0) {
        //alert("Aucune donnée à imprimer");
        return;
      }
      const fullname = selectedPatient.nom;
      let prenom = "";
      let nom = "";

      if (fullname.trim()) {
        const parts = fullname.trim().split(" ");
        if (parts.length === 1) {
          // only one word provided
          nom = parts[0];
        } else {
          // assume last word is family name (Dib Amel → prenom: Amel, nom: Dib)
          prenom = parts.slice(0, -1).join(" ");
          nom = parts[parts.length - 1];
        }
      }
      const datenaissance = selectedPatient.dateDeNaissance;
      const age = calculateAge(datenaissance);
      // 1️⃣ Fetch last consultation + ordonnance IDs from your API
      const res = await fetch("/api/last-records");
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des identifiants");
      const data = await res.json();

      // 2️⃣ Compute next IDs (safe even if null)
      const nextConsultationId = (data.lastConsultationId || 0) + 1;
      const nextOrdonnanceId = (data.lastOrdonnanceId || 0) + 1;

      console.log("🩺 Next Consultation ID:", nextConsultationId);
      console.log("💊 Next Ordonnance ID:", nextOrdonnanceId);
      console.log(nom + "-" + prenom + "-" + age);
      // 3️⃣ Send to Electron printer
      window.electron?.printOrdonnance({
        consultationId: nextConsultationId,
        ordonnanceId: nextOrdonnanceId,
        nom: nom,
        prenom: prenom,
        age: age,
        items: prescriptionItems.map((it) => ({
          name: it.nom,
          dosage: it.dosage,
          duration: it.duree,
          frequency: it.frequence,
          quantity: it.quantite,
        })),
      });
    } catch (error) {
      console.error("Erreur lors de l'impression de l'ordonnance:", error);
      //  alert("Erreur lors de l'impression de l'ordonnance.");
    }
  };
  const handlePrintBilanElectron = async () => {
    try {
      if (!labItems || labItems.length === 0) {
        //  alert("Aucun examen à imprimer");
        return;
      }

      // 🧒 Split patient name into nom / prenom
      const fullname = selectedPatient.nom || "";
      let prenom = "";
      let nom = "";

      if (fullname.trim()) {
        const parts = fullname.trim().split(" ");
        if (parts.length === 1) nom = parts[0];
        else {
          prenom = parts.slice(0, -1).join(" ");
          nom = parts[parts.length - 1];
        }
      }

      // 🍼 Compute age (pediatric format)
      const datenaissance = selectedPatient.dateDeNaissance;
      const age = calculateAge(datenaissance);

      // 🧾 Fetch last IDs
      const res = await fetch("/api/last-records");
      if (!res.ok)
        throw new Error("Erreur lors de la récupération des identifiants");
      const data = await res.json();

      const nextBilanId = (data.lastBilanId || 0) + 1;
      const nextConsultationId = (data.lastConsultationId || 0) + 1;

      console.log("🧪 Next Bilan ID:", nextBilanId);
      console.log("🩺 Next Consultation ID:", nextConsultationId);
      console.log(`👶 ${nom} - ${prenom} - ${age}`);

      // 🖨️ Send to Electron for printing
      window.electron?.printBilan({
        bilanId: nextBilanId,
        consultationId: nextConsultationId,
        nom,
        prenom,
        age,
        items: labItems.map((exam) => ({
          id: exam.id,
          nom: exam.nom,
        })),
      });
    } catch (error) {
      console.error("Erreur lors de l'impression du bilan:", error);
      // alert("Erreur lors de l'impression du bilan.");
    }
  };

  function handlePrintJustif() {
    if (!justifPrintRef.current) return;
    const printContents = justifPrintRef.current.innerHTML;
    const win = window.open("", "PRINT", "height=700,width=900");
    win.document.write(`
      <html>
        <head>
          <title>Justification médicale - Dr DIB Amel</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f8fa; margin: 0; }
            .justif-print-header { text-align: center; padding: 24px 0 8px; border-bottom: 2px solid #7c3aed; }
            .justif-print-title { font-size: 2rem; color: #7c3aed; font-weight: bold; margin-bottom: 4px; }
            .justif-print-doc { font-size: 1.1rem; color: #444; margin-bottom: 2px; }
            .justif-print-date { font-size: 0.95rem; color: #888; margin-bottom: 12px; }
            .justif-print-text { margin: 32px 0; font-size: 1.1rem; color: #444; background: #fff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px #e9e9f3; }
            .justif-print-footer { text-align: right; font-size: 1rem; color: #7c3aed; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 12px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }

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
      await fetchPatientById(patientId);

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
        createdAt: editedData.createdAt
          ? new Date(editedData.createdAt).toISOString()
          : selectedVisit.createdAt,
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

      // Update the selected visit after save
      const updatedVisit = filtredData[currentVisitIndex];
      await fetchPatientById(patientId);

      setSelectedVisit(updatedVisit);
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour:", err);
    }
  }

  // 🔄 Handle form changes
  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigate to next/previous visit
  const handleNextVisit = () => {
    if (currentVisitIndex < filtredData.length - 1) {
      const newIndex = currentVisitIndex + 1;
      setCurrentVisitIndex(newIndex);
      setSelectedVisit(filtredData[newIndex]);
      setEditedData(filtredData[newIndex]);
      setIsEditing(false);
    }
  };

  const handlePrevVisit = () => {
    if (currentVisitIndex > 0) {
      const newIndex = currentVisitIndex - 1;
      setCurrentVisitIndex(newIndex);
      setSelectedVisit(filtredData[newIndex]);
      setEditedData(filtredData[newIndex]);
      setIsEditing(false);
    }
  };

  // Get all medical fields (show all in edit mode, only filled in view mode)
  const getMedicalFields = (visit, showAll = false) => {
    const allFields = [
      {
        icon: Stethoscope,
        label: "Motif de consultation",
        value: visit.motifDeConsultation,
        field: "motifDeConsultation",
        type: "textarea",
      },
      {
        icon: ClipboardList,
        label: "Notes",
        value: visit.note,
        field: "note",
        type: "textarea",
      },
      {
        icon: Sparkles,
        label: "Développement psychomoteur",
        value: visit.developpementPsychomoteur,
        field: "developpementPsychomoteur",
        type: "textarea",
      },
      {
        icon: Ruler,
        label: "Périmètre crânien",
        value: visit.perimetreCranien,
        unite: "cm",
        field: "perimetreCranien",
        type: "number",
      },
      {
        icon: Ruler,
        label: "Taille",
        value: visit.taille,
        unite: "cm",
        field: "taille",
        type: "number",
      },
      {
        icon: User,
        label: "Poids",
        value: visit.poids,
        unite: "kg",
        field: "poids",
        type: "number",
      },
      {
        icon: Activity,
        label: "TA Systolique",
        value: visit.tensionSystolique,
        unite: "mmHg",
        field: "tensionSystolique",
        type: "number",
      },
      {
        icon: Activity,
        label: "TA Diastolique",
        value: visit.tensionDiastolique,
        unite: "mmHg",
        field: "tensionDiastolique",
        type: "number",
      },
      {
        icon: Thermometer,
        label: "Température",
        value: visit.temperature,
        unite: "°C",
        field: "temperature",
        type: "number",
      },
      {
        icon: HeartPulse,
        label: "Fréquence cardiaque",
        value: visit.frequenceCardiaque,
        unite: "bpm",
        field: "frequenceCardiaque",
        type: "number",
      },
      {
        icon: Gauge,
        label: "Fréquence respiratoire",
        value: visit.frequenceRespiratoire,
        unite: "cpm",
        field: "frequenceRespiratoire",
        type: "number",
      },
      {
        icon: Droplets,
        label: "Saturation O₂",
        value: visit.saturationOxygene,
        unite: "%",
        field: "saturationOxygene",
        type: "number",
      },
      {
        icon: ClipboardList,
        label: "Glycémie",
        value: visit.glycemie,
        unite: "g/L",
        field: "glycemie",
        type: "number",
      },
    ];

    // In edit mode, show all fields. In view mode, only show filled fields
    if (showAll) {
      return allFields;
    }

    return allFields.filter(
      (field) =>
        field.value !== null && field.value !== undefined && field.value !== "",
    );
  };

  // ⚕️ Medical Info Grid (show all fields in edit mode, only filled in view mode)
  const renderMedicalInfo = (visit) => {
    const fields = getMedicalFields(visit, isEditing);

    if (!isEditing && fields.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Aucune donnée médicale disponible pour cette consultation
        </div>
      );
    }

    return (
      <div className="space-y-4 mt-4">
        {/* Textarea fields */}
        {fields
          .filter((f) => f.type === "textarea")
          .map((info, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <info.icon className="text-[var(--color-500)]" size={18} />
                <span className="text-gray-700 font-medium text-sm">
                  {info.label}
                </span>
              </div>
              {isEditing ? (
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-[var(--color-500)] focus:border-[var(--color-500)]"
                  value={editedData[info.field] ?? visit[info.field] ?? ""}
                  onChange={(e) => handleChange(info.field, e.target.value)}
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-wrap">
                  {info.value}
                </p>
              )}
            </div>
          ))}

        {/* Number fields in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fields
            .filter((f) => f.type === "number")
            .map((info, idx) => (
              <Card
                key={idx}
                className="flex items-center justify-between p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-row items-center">
                  <info.icon
                    className="text-[var(--color-500)] mr-2"
                    size={18}
                  />
                  <span className="text-gray-600 text-sm">{info.label}</span>
                </div>
                <div className="text-right text-gray-800">
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      className="border border-gray-300 rounded px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-[var(--color-500)]"
                      value={editedData[info.field] ?? visit[info.field] ?? ""}
                      onChange={(e) => handleChange(info.field, e.target.value)}
                    />
                  ) : (
                    <span className="font-semibold">
                      {info.value} {info.unite}
                    </span>
                  )}
                </div>
              </Card>
            ))}
        </div>
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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[var(--color-100)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r bg-[var(--color-400)] text-white">
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-sm uppercase tracking-wider">
                    Heure
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtredData?.map((visit, index) => (
                  <tr
                    key={visit.id}
                    onClick={() => {
                      setCurrentVisitIndex(index);
                      setSelectedVisit(visit);
                      setEditedData(visit);
                      setIsEditing(false);
                    }}
                    className={`cursor-pointer transition-colors hover:bg-[var(--color-50)] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[var(--color-100)] text-[var(--color-800)]">
                        Consultation #{visit.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Calendar
                          size={16}
                          className="text-[var(--color-500)]"
                        />
                        {new Date(visit.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Clock size={16} className="text-[var(--color-500)]" />
                        {new Date(visit.createdAt).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ====================== */}
      {/* DETAILS DIALOG */}
      {/* ====================== */}
      <Dialog
        open={!!selectedVisit}
        onOpenChange={() => {
          setSelectedVisit(null);
          setIsEditing(false);
        }}
      >
        <DialogContent className="min-w-7xl h-11/12  w-full bg-gradient-to-br from-[var(--color-50)] to-white rounded-2xl p-8 overflow-y-auto shadow-2xl">
          {selectedVisit && (
            <>
              <DialogHeader>
                <div className="flex flex-col gap-4">
                  {/* Title and Navigation Row */}
                  <div className="flex justify-between items-center">
                    <DialogTitle className="text-2xl font-bold text-[var(--color-700)]">
                      Consultation #{selectedVisit.id}
                    </DialogTitle>

                    {/* Center: Pagination Navigation */}
                    {filtredData.length > 1 && (
                      <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-md">
                        <button
                          onClick={handlePrevVisit}
                          disabled={currentVisitIndex === 0}
                          className={`p-3 rounded-lg transition-all font-semibold ${
                            currentVisitIndex === 0
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                              : "bg-[var(--color-500)] text-white hover:bg-[var(--color-600)] shadow-md hover:shadow-lg"
                          }`}
                          title="Précédente"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <span className="text-sm font-semibold text-gray-700 min-w-[100px] text-center">
                          Visite {currentVisitIndex + 1} / {filtredData.length}
                        </span>

                        <button
                          onClick={handleNextVisit}
                          disabled={
                            currentVisitIndex === filtredData.length - 1
                          }
                          className={`p-3 rounded-lg transition-all font-semibold ${
                            currentVisitIndex === filtredData.length - 1
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                              : "bg-[var(--color-500)] text-white hover:bg-[var(--color-600)] shadow-md hover:shadow-lg"
                          }`}
                          title="Suivante"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}

                    {/* Right: Action Buttons */}
                    <div className="flex gap-3">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditedData(selectedVisit);
                            }}
                            className="px-5 py-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                          >
                            <Save size={18} /> Enregistrer
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <Edit3 size={18} /> Modifier
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirm(true)}
                        className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Date/Time Row */}
                  <div className="flex justify-end">
                    {isEditing ? (
                      <input
                        type="datetime-local"
                        className="border-2 border-[var(--color-200)] rounded-xl px-4 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[var(--color-500)] focus:border-[var(--color-500)]"
                        value={
                          editedData.createdAt
                            ? typeof editedData.createdAt === "string" &&
                              editedData.createdAt.length === 16
                              ? editedData.createdAt
                              : new Date(editedData.createdAt)
                                  .toISOString()
                                  .slice(0, 16)
                            : selectedVisit.createdAt
                              ? new Date(selectedVisit.createdAt)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                        }
                        onChange={(e) => {
                          handleChange("createdAt", e.target.value);
                        }}
                      />
                    ) : (
                      <div className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-2.5 border-2 border-[var(--color-100)] shadow-md">
                        <Calendar className="w-5 h-5 text-[var(--color-600)]" />
                        <span className="text-xs uppercase tracking-wider text-[var(--color-600)] font-semibold">
                          Date & heure
                        </span>
                        <span className="text-base font-bold text-[var(--color-900)]">
                          {selectedVisit.createdAt
                            ? new Date(selectedVisit.createdAt).toLocaleString(
                                "fr-FR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "—"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>

              {/* 🗓️ Rendez-vous */}
              {(selectedVisit.rendezVous || isEditing) && (
                <div className="mt-4 bg-white p-3 rounded-lg shadow-sm">
                  <h4 className="text-[var(--color-700)] font-semibold flex items-center gap-2 mb-2">
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
                            handleChange(
                              "rendezVousDescription",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm">
                      <b>Date :</b>{" "}
                      {selectedVisit.rendezVous?.date
                        ? new Date(
                            selectedVisit.rendezVous.date,
                          ).toLocaleDateString("fr-FR")
                        : "—"}{" "}
                      | <b>Description :</b>{" "}
                      {selectedVisit.rendezVous?.description || "—"}
                    </p>
                  )}
                </div>
              )}

              {/* 🧪 Infos médicales */}
              {renderMedicalInfo(selectedVisit)}

              {/* ====================== */}
              {/* 🔬 BILAN RECIP (Analyses) */}
              {/* ====================== */}
              {selectedVisit?.bilanRecip?.items?.length > 0 && (
                <div ref={bilanPrintRef} className="mt-5">
                  <h3 className="text-[var(--color-700)] font-semibold text-md flex items-center gap-2">
                    <FlaskConical size={18} /> Bilans / Analyses #
                    {selectedVisit.bilanRecip.id}
                  </h3>
                  <div className="mt-2 bg-white rounded-lg shadow-sm p-3">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-[var(--color-50)]">
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
                    <h3 className="text-[var(--color-700)] font-semibold text-md flex items-center gap-2">
                      <Pill size={18} /> Ordonnance #
                      {selectedVisit.ordonnance.id}
                    </h3>
                    <Button
                      className="bg-gradient-to-r from-[var(--color-500)] to-[var(--color-600)] hover:from-[var(--color-600)] hover:to-[var(--color-700)] shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={handlePrintElectron}
                      size="sm"
                    >
                      🖨️ Imprimer
                    </Button>
                  </div>

                  <div className="mt-2 bg-white rounded-lg shadow-sm p-3">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b bg-[var(--color-50)]">
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

              <DialogFooter className="mt-8 flex justify-center"></DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* 🗑️ DELETE CONFIRM DIALOG */}
      <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <Trash2 size={24} />
              Supprimer la consultation ?
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 mt-3">
              Cette action est <b className="text-red-600">irréversible</b>.
              Êtes-vous sûr de vouloir continuer ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setDeleteConfirm(false)}
              className="px-6 py-2.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition font-semibold text-gray-700 shadow-sm"
            >
              Annuler
            </button>
            <button
              onClick={() => handleDelete(selectedVisit?.id)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition font-semibold shadow-md hover:shadow-lg"
            >
              Supprimer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


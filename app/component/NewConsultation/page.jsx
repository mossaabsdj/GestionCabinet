"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  AlertCircle,
  User,
  Activity,
  Heart,
  FileText,
  Plus,
  FlaskConical,
  Calendar,
  Pill,
  Ruler,
  Stethoscope,
  Clock,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import NewOrdanance from "@/app/component/NewOrdanance/page";

export default function NewConsultationPage({ selectedPatient = {}, onSave }) {
  const [form, setForm] = useState({
    note: "",
    ordonnance: {},
    taille: "",
    poids: "",
    tensionSystolique: "",
    tensionDiastolique: "",
    temperature: "",
    frequenceCardiaque: "",
    frequenceRespiratoire: "",
    saturationOxygene: "",
    glycemie: "",
    developpementPsychomoteur: "",
    motifDeConsultation: "",
    perimetreCranien: "",
    rendezVousDate: "",
    rendezVousDescription: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showNewOrdonnance, setShowNewOrdonnance] = useState(false);
  const [showRendezVous, setShowRendezVous] = useState(false);

  const setordananceData = (data) => {
    setForm((prev) => ({
      ...prev,
      ordonnance:
        data?.ordonnance?.items && data.ordonnance.items.length > 0
          ? data.ordonnance
          : prev.ordonnance, // keep old data if no items
      bilanRecip:
        data?.bilanRecip?.items && data.bilanRecip.items.length > 0
          ? data.bilanRecip
          : prev.bilanRecip, // keep old data if no items
    }));

    setShowNewOrdonnance(false);
  };

  useEffect(() => {
    if (selectedPatient && Object.keys(selectedPatient).length > 0) {
      setForm((prev) => ({
        ...prev,
        note: selectedPatient.note ?? "",
        ordonnance: selectedPatient.ordonnance ?? {},
        taille: selectedPatient.taille ?? "",
        poids: selectedPatient.poids ?? "",
        tensionSystolique: selectedPatient.tensionSystolique ?? "",
        tensionDiastolique: selectedPatient.tensionDiastolique ?? "",
        temperature: selectedPatient.temperature ?? "",
        frequenceCardiaque: selectedPatient.frequenceCardiaque ?? "",
        frequenceRespiratoire: selectedPatient.frequenceRespiratoire ?? "",
        saturationOxygene: selectedPatient.saturationOxygene ?? "",
        glycemie: selectedPatient.glycemie ?? "",
        developpementPsychomoteur:
          selectedPatient.developpementPsychomoteur ?? "",
        motifDeConsultation: selectedPatient.motifDeConsultation ?? "",
        perimetreCranien: selectedPatient.perimetreCranien ?? "",
        rendezVousDate: selectedPatient?.rendezVous?.date
          ? new Date(selectedPatient.rendezVous.date).toISOString().slice(0, 16)
          : "",
        rendezVousDescription: selectedPatient?.rendezVous?.description ?? "",
      }));
    }
  }, [selectedPatient]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      await Promise.resolve(onSave?.({ ...form }));
      setForm({
        note: "",
        ordonnance: {},
        taille: "",
        poids: "",
        tensionSystolique: "",
        tensionDiastolique: "",
        temperature: "",
        frequenceCardiaque: "",
        frequenceRespiratoire: "",
        saturationOxygene: "",
        glycemie: "",
        developpementPsychomoteur: "",
        motifDeConsultation: "",
        perimetreCranien: "",
        rendezVousDate: "",
        rendezVousDescription: "",
      });
      setShowRendezVous(false);
      setSaving(false);
    } catch (e) {
      setSaving(false);
      setError(e?.message ?? "Erreur lors de l'enregistrement");
    }
  }

  const medicalInfo = [
    {
      icon: User,
      label: "Taille",
      name: "taille",
      value: form.taille,
      type: "number",
      unite: "cm",
    },
    {
      icon: User,
      label: "Poids",
      name: "poids",
      value: form.poids,
      type: "number",
      unite: "kg",
    },
    {
      icon: Ruler,
      label: "Périmètre crânien",
      name: "perimetreCranien",
      value: form.perimetreCranien,
      type: "number",
      unite: "cm",
    },
    {
      icon: Activity,
      label: "TA systolique",
      name: "tensionSystolique",
      value: form.tensionSystolique,
      type: "number",
      unite: "mmHg",
    },
    {
      icon: Activity,
      label: "TA diastolique",
      name: "tensionDiastolique",
      value: form.tensionDiastolique,
      type: "number",
      unite: "mmHg",
    },
    {
      icon: Activity,
      label: "Température",
      name: "temperature",
      value: form.temperature,
      type: "number",
      unite: "°C",
    },
    {
      icon: Heart,
      label: "Fréquence cardiaque",
      name: "frequenceCardiaque",
      value: form.frequenceCardiaque,
      type: "number",
      unite: "bpm",
    },
    {
      icon: Activity,
      label: "Fréquence respiratoire",
      name: "frequenceRespiratoire",
      value: form.frequenceRespiratoire,
      type: "number",
      unite: "cpm",
    },
    {
      icon: Activity,
      label: "Saturation O₂",
      name: "saturationOxygene",
      value: form.saturationOxygene,
      type: "number",
      unite: "%",
    },
    {
      icon: Activity,
      label: "Glycémie",
      name: "glycemie",
      value: form.glycemie,
      type: "number",
      unite: "g/L",
    },
  ];

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 p-0">
      <div className="max-w-full mx-auto dark:bg-gray-800 rounded-2xl p-6 md:p-6">
        {error && (
          <div className="flex items-center gap-2 mb-4 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {/* 🩺 Motif de consultation */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">
            Motif de consultation
          </label>
          <textarea
            name="motifDeConsultation"
            value={form.motifDeConsultation}
            onChange={handleChange}
            rows={3}
            placeholder="Ex: Fièvre, toux, contrôle, etc."
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Notes */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Développement psychomoteur */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-2">
            Développement psychomoteur
          </label>
          <textarea
            name="developpementPsychomoteur"
            value={form.developpementPsychomoteur}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Infos médicales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalInfo.map((info) => (
            <Card key={info.label} className="flex items-center gap-3 p-3">
              <div className="flex justify-between w-full">
                <div className="flex flex-row items-center">
                  <info.icon className="text-purple-500" size={20} />
                  <span className="text-gray-500 ml-2">{info.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type={info.type}
                    name={info.name}
                    value={info.value}
                    onChange={handleChange}
                    className="text-right w-20 border-b focus:outline-none focus:border-purple-400 bg-transparent"
                  />
                  {info.unite && (
                    <span className="text-gray-400 text-sm ml-1">
                      {info.unite}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="py-4">
          {" "}
          {/* Collapsible Rendez-vous Section */}
          <div className="mb-6 border rounded-lg">
            <button
              type="button"
              onClick={() => setShowRendezVous((prev) => !prev)}
              className="w-full flex justify-between items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-t-lg"
            >
              <div className="flex items-center gap-2 text-purple-700 font-medium">
                <Calendar size={18} />
                <span>Rendez-vous</span>
              </div>
              {showRendezVous ? (
                <ChevronUp size={20} className="text-purple-600" />
              ) : (
                <ChevronDown size={20} className="text-purple-600" />
              )}
            </button>
          </div>
          {showRendezVous && (
            <div className="px-4 space-y-2  dark:bg-gray-900 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="flex items-center gap-3 p-3">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row items-center">
                      <Calendar className="text-purple-500" size={20} />
                      <span className="text-gray-500 ml-2">
                        Date du rendez-vous
                      </span>
                    </div>
                    <input
                      type="datetime-local"
                      name="rendezVousDate"
                      value={form.rendezVousDate}
                      onChange={handleChange}
                      className="text-right w-48 border-b focus:outline-none focus:border-purple-400 bg-transparent"
                    />
                  </div>
                </Card>

                <Card className="flex items-center gap-3 p-3">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row items-center">
                      <Clock className="text-purple-500" size={20} />
                      <span className="text-gray-500 ml-2">Description</span>
                    </div>
                    <input
                      type="text"
                      name="rendezVousDescription"
                      value={form.rendezVousDescription}
                      onChange={handleChange}
                      placeholder="Ex: Contrôle, suivi..."
                      className="text-right w-48 border-b focus:outline-none focus:border-purple-400 bg-transparent"
                    />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
        {/* ====================== */}
        {/* 💊 ORDONNANCE & 🔬 BILAN SECTIONS */}
        {/* ====================== */}
        <div className="mt-6 space-y-4">
          {/* === Add Ordonnance Button === */}
          {!showNewOrdonnance ? (
            <button
              type="button"
              onClick={() => setShowNewOrdonnance(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 
         text-white hover:bg-purple-700 transition"
            >
              <Plus className="w-4 h-4" />
              Ajouter une ordonnance / bilan
            </button>
          ) : (
            <NewOrdanance
              open={true}
              onOpenChange={setShowNewOrdonnance}
              onsave={setordananceData}
              selectedPatient={selectedPatient}
            />
          )}

          {/* === Ordonnance Summary Card === */}
          {form?.ordonnance && form.ordonnance.items?.length > 0 && (
            <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-purple-700">
                  <FileText size={20} />
                  <span className="font-semibold">
                    Ordonnance:{" "}
                    {form.ordonnance.type || form.ordonnance.id || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Pill size={18} />
                  <span>
                    Médicaments:{" "}
                    {form.ordonnance.items ? form.ordonnance.items.length : 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>
                    {form.ordonnance.date
                      ? new Date(form.ordonnance.date).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    ordonnance: {},
                  }))
                }
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}

          {/* === Bilan Summary Card === */}
          {form.bilanRecip && form.bilanRecip.items?.length > 0 && (
            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-green-700">
                  <FlaskConical size={20} />
                  <span className="font-semibold">
                    Bilan: {form.bilanRecip.type || form.bilanRecip.id || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FlaskConical size={18} />
                  <span>
                    Analyses:{" "}
                    {form.bilanRecip.items ? form.bilanRecip.items.length : 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>
                    {form.bilanRecip.date
                      ? new Date(form.bilanRecip.date).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    bilanRecip: {},
                  }))
                }
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  AlertCircle,
  User,
  Activity,
  Heart,
  FilePlus,
  Trash2,
  FileText,
  Plus,
  FlaskConical,
  Calendar,
  Pill,
} from "lucide-react";
import { Card } from "@/components/ui/card"; // shadcn/ui
import NewOrdanance from "@/app/component/NewOrdanance/page";
import AddVaccinationButton from "../NewVaccination/page";
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
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showNewOrdonnance, setShowNewOrdonnance] = useState(false);
  const setordananceData = (data) => {
    console.log(JSON.stringify(data));
    setForm((prev) => ({
      ...prev,
      ordonnance: data.ordonnance,
      bilanRecip: data.bilanRecip,
    }));
    console.log("Form" + JSON.stringify(form));
    setShowNewOrdonnance(false);
  };
  useEffect(() => {
    if (selectedPatient && Object.keys(selectedPatient).length > 0) {
      setForm((prev) => ({
        ...prev,
        note: selectedPatient.note ?? "",
        ordonnance: selectedPatient.ordonnance ?? "",
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
      }));
    }
  }, [selectedPatient]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // Add new file

  // Change type of a file

  // Remove a file

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
      });
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
      unite: "cpm", // cycles per minute
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
      <div className="max-w-full mx-auto dark:bg-gray-800 rounded-2xl p-6 md:p-8 ">
        {error && (
          <div className="flex items-center gap-2 mb-4 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2">
            developpement Psychomoteur
          </label>
          <textarea
            name="developpementPsychomoteur"
            value={form.developpementPsychomoteur}
            onChange={handleChange}
            rows={1}
            className="w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>
        {/* Infos médicales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalInfo.map((info) => (
            <Card key={info.label} className="flex items-center gap-3 p-3">
              <div className="flex justify-between w-full">
                {/* Label + Icon */}
                <div className="flex flex-row items-center">
                  <info.icon className="text-purple-500" size={20} />
                  <span className="text-gray-500 ml-2">{info.label}</span>
                </div>

                {/* Input + Unit */}
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

        {/* Bouton ordonnance */}
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
              Ajouter une ordonnance
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
          {form.bilanRecip && form.bilanRecip.items.length > 0 && (
            <div className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-green-700">
                  <FlaskConical size={20} />
                  <span className="font-semibold">
                    Bilan: {form.ordonnance.type || form.ordonnance.id || "—"}
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
                    bilan: {},
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

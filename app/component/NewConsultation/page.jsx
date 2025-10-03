"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  AlertCircle,
  ClipboardList,
  User,
  Activity,
  Heart,
} from "lucide-react";
import { Card } from "@/components/ui/card"; // assuming shadcn/ui is used

export default function NewConsultationPage({ selectedPatient = {}, onSave }) {
  const [form, setForm] = useState({
    note: "",
    taille: "",
    poids: "",
    tensionSystolique: "",
    tensionDiastolique: "",
    temperature: "",
    frequenceCardiaque: "",
    frequenceRespiratoire: "",
    saturationOxygene: "",
    glycemie: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      note: selectedPatient.note ?? "",
      taille: selectedPatient.taille ?? "",
      poids: selectedPatient.poids ?? "",
      tensionSystolique: selectedPatient.tensionSystolique ?? "",
      tensionDiastolique: selectedPatient.tensionDiastolique ?? "",
      temperature: selectedPatient.temperature ?? "",
      frequenceCardiaque: selectedPatient.frequenceCardiaque ?? "",
      frequenceRespiratoire: selectedPatient.frequenceRespiratoire ?? "",
      saturationOxygene: selectedPatient.saturationOxygene ?? "",
      glycemie: selectedPatient.glycemie ?? "",
    });
  }, [selectedPatient]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      await Promise.resolve(onSave?.(form));
      setSaving(false);
    } catch (e) {
      setSaving(false);
      setError(e?.message ?? "Erreur lors de l'enregistrement");
    }
  }

  const medicalInfo = [
    { icon: User, label: "Taille (cm)", name: "taille", value: form.taille },
    { icon: User, label: "Poids (kg)", name: "poids", value: form.poids },
    {
      icon: Activity,
      label: "TA systolique",
      name: "tensionSystolique",
      value: form.tensionSystolique,
    },
    {
      icon: Activity,
      label: "TA diastolique",
      name: "tensionDiastolique",
      value: form.tensionDiastolique,
    },
    {
      icon: Activity,
      label: "Température (°C)",
      name: "temperature",
      value: form.temperature,
    },
    {
      icon: Heart,
      label: "Fréquence cardiaque",
      name: "frequenceCardiaque",
      value: form.frequenceCardiaque,
    },
    {
      icon: Activity,
      label: "Fréquence respiratoire",
      name: "frequenceRespiratoire",
      value: form.frequenceRespiratoire,
    },
    {
      icon: Activity,
      label: "Saturation O₂ (%)",
      name: "saturationOxygene",
      value: form.saturationOxygene,
    },
    {
      icon: Activity,
      label: "Glycémie",
      name: "glycemie",
      value: form.glycemie,
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

        {/* Medical Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalInfo.map((info) => (
            <Card key={info.label} className="flex items-center gap-3 p-3">
              <div className="flex justify-between w-full">
                <div className="flex flex-row items-center">
                  <info.icon className="text-purple-500" size={20} />
                  <span className="text-gray-500 ml-2">{info.label}</span>
                </div>
                <input
                  name={info.name}
                  value={info.value}
                  onChange={handleChange}
                  className="text-right border-b focus:outline-none focus:border-purple-400 bg-transparent"
                />
              </div>
            </Card>
          ))}
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

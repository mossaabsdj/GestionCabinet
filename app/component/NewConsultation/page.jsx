"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  AlertCircle,
  FileText,
  Plus,
  FlaskConical,
  Calendar,
  Pill,
  Trash2,
  Loader2,
  Sparkles,
  Edit3,
  ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import NewOrdanance from "@/app/component/NewOrdanance/page";

export default function NewConsultationPage({
  selectedPatient = {},
  onSave,
  viderForm,
  setViderForm,
  openAddModal = false,
  setOpenAddModal,
}) {
  const [form, setForm] = useState({
    note: "",
    motifDeConsultation: "",
    ordonnance: {},
    bilanRecip: {},
    justification: null,
    radios: [],
    rendezVousDate: "",
    rendezVousDescription: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Modal states
  const [selectorModalOpen, setSelectorModalOpen] = useState(false);
  const [showNewOrdonnance, setShowNewOrdonnance] = useState(false);
  const [ordonnanceDefaultTab, setOrdonnanceDefaultTab] =
    useState("ordonnance");

  // Radio Modal state
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [editingRadioIndex, setEditingRadioIndex] = useState(null);
  const [radioForm, setRadioForm] = useState({ description: "", fichier: "" });
  const [uploadingRadio, setUploadingRadio] = useState(false);

  // RendezVous Modal state
  const [showRendezVousModal, setShowRendezVousModal] = useState(false);
  const [rendezVousForm, setRendezVousForm] = useState({
    date: "",
    description: "",
  });

  // Delete Confirmation state
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: "",
    index: null,
    title: "",
    message: "",
  });

  // Sync external openAddModal trigger from header
  useEffect(() => {
    if (openAddModal) {
      setSelectorModalOpen(true);
      setOpenAddModal?.(false);
    }
  }, [openAddModal, setOpenAddModal]);

  const setordananceData = (data) => {
    setForm((prev) => ({
      ...prev,
      ordonnance:
        data?.ordonnance?.items && data.ordonnance.items.length > 0
          ? data.ordonnance
          : prev.ordonnance,
      bilanRecip:
        data?.bilanRecip?.items && data.bilanRecip.items.length > 0
          ? data.bilanRecip
          : prev.bilanRecip,
      justification:
        data?.justification !== undefined
          ? data.justification
          : prev.justification,
    }));
    setShowNewOrdonnance(false);
  };

  useEffect(() => {
    if (selectedPatient && Object.keys(selectedPatient).length > 0) {
      setForm((prev) => ({
        ...prev,
        note: selectedPatient.note ?? "",
        motifDeConsultation: selectedPatient.motifDeConsultation ?? "",
        ordonnance: selectedPatient.ordonnance ?? {},
        bilanRecip: selectedPatient.bilanRecip ?? {},
        justification:
          selectedPatient.justificationRecord ||
          (typeof selectedPatient.justification === "object"
            ? selectedPatient.justification
            : selectedPatient.justification
              ? {
                  titre: "Justification médicale",
                  texte: selectedPatient.justification,
                }
              : null),
        radios: Array.isArray(selectedPatient.radios)
          ? selectedPatient.radios
          : [],
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

  useEffect(() => {
    if (viderForm) {
      setForm({
        note: "",
        motifDeConsultation: "",
        ordonnance: {},
        bilanRecip: {},
        justification: null,
        radios: [],
        rendezVousDate: "",
        rendezVousDescription: "",
      });
      setViderForm(false);
    }
  }, [viderForm, setViderForm]);

  async function handleSave() {
    setError("");
    setSaving(true);
    try {
      await Promise.resolve(onSave?.({ ...form }));
      setSaving(false);
    } catch (e) {
      setSaving(false);
      setError(e?.message ?? "Erreur lors de l'enregistrement");
    }
  }

  // Edit actions
  const handleEdit = (type, index = null) => {
    if (type === "ordonnance") {
      setOrdonnanceDefaultTab("ordonnance");
      setShowNewOrdonnance(true);
    } else if (type === "bilan") {
      setOrdonnanceDefaultTab("labs");
      setShowNewOrdonnance(true);
    } else if (type === "justification") {
      setOrdonnanceDefaultTab("justif");
      setShowNewOrdonnance(true);
    } else if (type === "radio") {
      setEditingRadioIndex(index);
      setRadioForm({
        description: form.radios[index]?.description || "",
        fichier: form.radios[index]?.fichier || "",
      });
      setShowRadioModal(true);
    } else if (type === "rendezVous") {
      setRendezVousForm({
        date: form.rendezVousDate || "",
        description: form.rendezVousDescription || "",
      });
      setShowRendezVousModal(true);
    }
  };

  // Delete prompt & confirm
  const handlePromptDelete = (type, index = null, title, message) => {
    setDeleteConfirm({
      open: true,
      type,
      index,
      title,
      message,
    });
  };

  const handleConfirmDelete = () => {
    const { type, index } = deleteConfirm;
    if (type === "ordonnance") {
      setForm((prev) => ({ ...prev, ordonnance: {} }));
    } else if (type === "bilan") {
      setForm((prev) => ({ ...prev, bilanRecip: {} }));
    } else if (type === "justification") {
      setForm((prev) => ({ ...prev, justification: null }));
    } else if (type === "radio") {
      setForm((prev) => ({
        ...prev,
        radios: prev.radios.filter((_, i) => i !== index),
      }));
    } else if (type === "rendezVous") {
      setForm((prev) => ({
        ...prev,
        rendezVousDate: "",
        rendezVousDescription: "",
      }));
    }
    setDeleteConfirm({
      open: false,
      type: "",
      index: null,
      title: "",
      message: "",
    });
  };

  // Radio file upload
  const handleRadioFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingRadio(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur de téléversement");
      const data = await res.json();
      setRadioForm((prev) => ({
        ...prev,
        fichier: file.name,
        description: prev.description || file.name.replace(/\.[^/.]+$/, ""),
      }));
    } catch (err) {
      console.error(err);
      setError("Échec du téléversement du fichier.");
    } finally {
      setUploadingRadio(false);
    }
  };

  const handleSaveRadio = (e) => {
    e.preventDefault();
    if (editingRadioIndex !== null) {
      setForm((prev) => ({
        ...prev,
        radios: prev.radios.map((r, i) =>
          i === editingRadioIndex ? { ...r, ...radioForm } : r,
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        radios: [...(prev.radios || []), { ...radioForm, id: Date.now() }],
      }));
    }
    setShowRadioModal(false);
    setEditingRadioIndex(null);
    setRadioForm({ description: "", fichier: "" });
  };

  const handleSaveRendezVous = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      rendezVousDate: rendezVousForm.date,
      rendezVousDescription: rendezVousForm.description,
    }));
    setShowRendezVousModal(false);
  };

  // Element counters
  const hasOrdonnance = Boolean(
    form.ordonnance?.items && form.ordonnance.items.length > 0,
  );
  const hasBilan = Boolean(
    form.bilanRecip?.items && form.bilanRecip.items.length > 0,
  );
  const hasJustification = Boolean(
    form.justification &&
    (form.justification.texte || typeof form.justification === "string"),
  );
  const hasRadios = Boolean(form.radios && form.radios.length > 0);
  const hasRendezVous = Boolean(form.rendezVousDate);

  const totalAttached =
    (hasOrdonnance ? 1 : 0) +
    (hasBilan ? 1 : 0) +
    (hasJustification ? 1 : 0) +
    (form.radios?.length || 0) +
    (hasRendezVous ? 1 : 0);

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 p-0">
      <div className="max-w-full mx-auto dark:bg-gray-800 rounded-2xl p-6 md:p-6">
        {error && (
          <div className="flex items-center gap-2 mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {/* ======================================================== */}
        {/* 🌟 SECTION DU HAUT : ÉLÉMENTS ATTACHÉS À LA CONSULTATION */}
        {/* ======================================================== */}
        <div className="mb-6">
          {totalAttached === 0 ? (
            <div className="p-4 bg-gradient-to-r from-[var(--color-50)]/60 to-slate-50 border border-dashed border-[var(--color-300)] rounded-2xl flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Aucun élément attaché pour le moment. Cliquez sur « Ajouter »
                pour joindre une ordonnance, un bilan, une radio ou un prochain
                rendez-vous.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectorModalOpen(true)}
                className="border-[var(--color-300)] text-[var(--color-700)] hover:bg-[var(--color-100)] rounded-xl"
              >
                + Ajouter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* 💊 Ordonnance Card */}
              {hasOrdonnance && (
                <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row align-middle  items-center">
                          {" "}
                          <div className="flex flex-row p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                            <Pill size={18} />
                          </div>
                          <span className="p-1 font-semibold text-sm text-blue-900">
                            Ordonnance
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-200/80 text-blue-800">
                          {form.ordonnance.items.length} médicament(s)
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5  pt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit("ordonnance")}
                          className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-lg transition"
                          title="Modifier l'ordonnance"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePromptDelete(
                              "ordonnance",
                              null,
                              "Supprimer l'ordonnance",
                              "Êtes-vous sûr de vouloir retirer cette ordonnance de la consultation ?",
                            )
                          }
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition"
                          title="Supprimer l'ordonnance"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 🔬 Bilan / Analyses Card */}
              {hasBilan && (
                <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row align-middle items-center">
                          <div className="flex flex-row p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                            <FlaskConical size={18} />
                          </div>
                          <span className="p-1 font-semibold text-sm text-emerald-900">
                            Bilan
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-200/80 text-emerald-800">
                          {form.bilanRecip.items.length} analyse(s)
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit("bilan")}
                          className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded-lg transition"
                          title="Modifier le bilan"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePromptDelete(
                              "bilan",
                              null,
                              "Supprimer le bilan",
                              "Êtes-vous sûr de vouloir retirer ce bilan de la consultation ?",
                            )
                          }
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition"
                          title="Supprimer le bilan"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 📄 Justification Card */}
              {hasJustification && (
                <div className="bg-purple-50/80 border border-purple-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row align-middle items-center">
                          <div className="flex flex-row p-1.5 bg-purple-100 text-purple-700 rounded-lg">
                            <FileText size={18} />
                          </div>
                          <span className="p-1 font-semibold text-sm text-purple-900">
                            Justification
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-200/80 text-purple-800">
                          {form.justification?.titre || "Certificat"}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit("justification")}
                          className="p-1.5 text-purple-700 hover:bg-purple-100 rounded-lg transition"
                          title="Modifier la justification"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePromptDelete(
                              "justification",
                              null,
                              "Supprimer la justification",
                              "Êtes-vous sûr de vouloir retirer cette justification de la consultation ?",
                            )
                          }
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition"
                          title="Supprimer la justification"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 🩻 Radio Cards */}
              {hasRadios &&
                form.radios.map((radio, idx) => (
                  <div
                    key={`radio-${idx}`}
                    className="bg-indigo-50/80 border border-indigo-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-row align-middle items-center">
                            <div className="flex flex-row p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                              <ImageIcon size={18} />
                            </div>
                            <span className="p-1 font-semibold text-sm text-indigo-900">
                              Radio
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-200/80 text-indigo-800">
                            {radio.description || radio.fichier || `Radio #${idx + 1}`}
                          </span>
                        </div>

                        <div className="flex items-center justify-end gap-1.5 pt-2">
                          <button
                            type="button"
                            onClick={() => handleEdit("radio", idx)}
                            className="p-1.5 text-indigo-700 hover:bg-indigo-100 rounded-lg transition"
                            title="Modifier la radio"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handlePromptDelete(
                                "radio",
                                idx,
                                "Supprimer la radio",
                                "Êtes-vous sûr de vouloir supprimer cette radiographie de la consultation ?",
                              )
                            }
                            className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition"
                            title="Supprimer la radio"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* 📅 Prochain Rendez-vous Card */}
              {hasRendezVous && (
                <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row align-middle items-center">
                          <div className="flex flex-row p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                            <Calendar size={18} />
                          </div>
                          <span className="p-1 font-semibold text-sm text-amber-900">
                            Rendez-vous
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-200/80 text-amber-800">
                          {new Date(form.rendezVousDate).toLocaleString("fr-FR", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2">
                        <button
                          type="button"
                          onClick={() => handleEdit("rendezVous")}
                          className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-lg transition"
                          title="Modifier le rendez-vous"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePromptDelete(
                              "rendezVous",
                              null,
                              "Supprimer le rendez-vous",
                              "Êtes-vous sûr de vouloir retirer ce rendez-vous de la consultation ?",
                            )
                          }
                          className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition"
                          title="Supprimer le rendez-vous"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ====================== */}
        {/* 🩺 MOTIF DE CONSULTATION */}
        {/* ====================== */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Motif de consultation
          </label>
          <textarea
            name="motifDeConsultation"
            value={form.motifDeConsultation}
            onChange={handleChange}
            rows={2}
            placeholder="Ex: Douleur dentaire, détartrage, contrôle, extraction..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-300)]"
          />
        </div>

        {/* ====================== */}
        {/* 📝 NOTES CLINIQUES */}
        {/* ====================== */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Notes & Observations
          </label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={5}
            placeholder="Examen clinique, diagnostic, remarques sur les soins..."
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-300)]"
          />
        </div>

        {/* ====================== */}
        {/* 💾 BOUTON ENREGISTRER */}
        {/* ====================== */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-600)] text-white hover:bg-[var(--color-700)] disabled:opacity-60 shadow-md hover:shadow-lg transition-all font-medium text-sm"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enregistrement en cours...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer la consultation
              </>
            )}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 🎯 MODAL SÉLECTEUR : AJOUTER À LA CONSULTATION */}
      {/* ======================================================== */}
      <Dialog open={selectorModalOpen} onOpenChange={setSelectorModalOpen}>
        <DialogContent className="sm:max-w-lg p-6 rounded-2xl">
          <DialogHeader className="text-left mb-4">
            <DialogTitle className="text-xl font-bold text-[var(--color-800)] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-600)]" />
              Ajouter à la consultation
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              Sélectionnez l'élément que vous souhaitez attacher à cette
              consultation :
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-3">
            {/* Option 1: Ordonnance / Bilan / Justification */}
            <button
              type="button"
              onClick={() => {
                setSelectorModalOpen(false);
                setOrdonnanceDefaultTab("ordonnance");
                setShowNewOrdonnance(true);
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-[var(--color-500)] hover:bg-[var(--color-50)]/50 transition-all text-left group shadow-sm hover:shadow"
            >
              <div className="p-3 rounded-xl bg-[var(--color-100)] text-[var(--color-700)] group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 group-hover:text-[var(--color-700)]">
                  Ordonnance / Bilan / Justification
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Prescription de médicaments, demandes d'analyses ou certificat
                  médical
                </p>
              </div>
            </button>

            {/* Option 2: Radio */}
            <button
              type="button"
              onClick={() => {
                setSelectorModalOpen(false);
                setEditingRadioIndex(null);
                setRadioForm({ description: "", fichier: "" });
                setShowRadioModal(true);
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group shadow-sm hover:shadow"
            >
              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-700 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 group-hover:text-indigo-700">
                  Radio / Imagerie
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Joindre un cliché radiologique ou une image médicale
                </p>
              </div>
            </button>

            {/* Option 3: Prochain rendez-vous */}
            <button
              type="button"
              onClick={() => {
                setSelectorModalOpen(false);
                setRendezVousForm({
                  date: form.rendezVousDate || "",
                  description: form.rendezVousDescription || "",
                });
                setShowRendezVousModal(true);
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-left group shadow-sm hover:shadow"
            >
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 group-hover:text-amber-700">
                  Prochain rendez-vous
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Planifier la date et l'objet de la prochaine visite
                </p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ======================================================== */}
      {/* 💊 MODAL ORDONNANCE / BILAN / JUSTIFICATION (RÉUTILISATION) */}
      {/* ======================================================== */}
      {showNewOrdonnance && (
        <NewOrdanance
          open={true}
          onOpenChange={setShowNewOrdonnance}
          onsave={setordananceData}
          selectedPatient={selectedPatient}
          initialData={form}
          defaultTab={ordonnanceDefaultTab}
        />
      )}

      {/* ======================================================== */}
      {/* 🩻 MODAL RADIO */}
      {/* ======================================================== */}
      <Dialog open={showRadioModal} onOpenChange={setShowRadioModal}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[var(--color-800)] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-600" />
              {editingRadioIndex !== null
                ? "Modifier la radio"
                : "Ajouter une radio"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Renseignez la description et téléversez le cliché radiologique.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveRadio} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description / Titre *
              </label>
              <Input
                type="text"
                required
                value={radioForm.description}
                onChange={(e) =>
                  setRadioForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Ex: Radio panoramique, rétro-alvéolaire 14..."
                className="h-11 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fichier (image ou document)
              </label>
              {radioForm.fichier && (
                <div className="mb-2 text-xs text-slate-600 flex items-center justify-between bg-slate-100 p-2 rounded-lg">
                  <span className="truncate max-w-[280px]">
                    Fichier : {radioForm.fichier}
                  </span>
                </div>
              )}
              <Input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleRadioFileChange}
                className="h-11 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-50)] file:text-[var(--color-700)] hover:file:bg-[var(--color-100)]"
              />
              {uploadingRadio && (
                <p className="text-xs text-[var(--color-600)] flex items-center gap-1 mt-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Téléversement
                  en cours...
                </p>
              )}
            </div>

            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRadioModal(false)}
                className="rounded-xl"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={uploadingRadio || !radioForm.description.trim()}
                className="bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-xl"
              >
                {editingRadioIndex !== null
                  ? "Enregistrer"
                  : "Ajouter la radio"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ======================================================== */}
      {/* 📅 MODAL PROCHAIN RENDEZ-VOUS */}
      {/* ======================================================== */}
      <Dialog open={showRendezVousModal} onOpenChange={setShowRendezVousModal}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[var(--color-800)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              {form.rendezVousDate
                ? "Modifier le rendez-vous"
                : "Planifier le prochain rendez-vous"}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Définissez la date et l'objet de la prochaine séance.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveRendezVous} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date et heure du rendez-vous *
              </label>
              <Input
                type="datetime-local"
                required
                value={rendezVousForm.date}
                onChange={(e) =>
                  setRendezVousForm((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="h-11 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Objet / Description
              </label>
              <Input
                type="text"
                value={rendezVousForm.description}
                onChange={(e) =>
                  setRendezVousForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Ex: Séance de soin, détartrage, contrôle..."
                className="h-11 rounded-xl"
              />
            </div>

            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRendezVousModal(false)}
                className="rounded-xl"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={!rendezVousForm.date}
                className="bg-[var(--color-600)] hover:bg-[var(--color-700)] text-white rounded-xl"
              >
                Enregistrer le rendez-vous
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ======================================================== */}
      {/* ⚠️ MODAL DE CONFIRMATION DE SUPPRESSION */}
      {/* ======================================================== */}
      <Dialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm((prev) => ({ ...prev, open }))}
      >
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">
              {deleteConfirm.title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 mt-2">{deleteConfirm.message}</p>
          <DialogFooter className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setDeleteConfirm({
                  open: false,
                  type: "",
                  index: null,
                  title: "",
                  message: "",
                })
              }
              className="rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Liste exemple médicaments ---
const MEDS = [
  {
    id: "paracetamol",
    name: "Paracétamol",
    form: "Comprimé",
    strengths: ["500 mg", "1000 mg"],
  },
  {
    id: "ibuprofen",
    name: "Ibuprofène",
    form: "Comprimé",
    strengths: ["200 mg", "400 mg"],
  },
  {
    id: "amoxicillin",
    name: "Amoxicilline",
    form: "Capsule",
    strengths: ["500 mg"],
  },
  {
    id: "omeprazole",
    name: "Oméprazole",
    form: "Gélule",
    strengths: ["20 mg"],
  },
];

// --- Liste exemple examens ---
const EXAMS = [
  "Hémogramme",
  "Glycémie",
  "Cholestérol total",
  "Triglycérides",
  "Créatinine",
  "Uricémie",
  "Bilan hépatique",
  "Ionogramme sanguin",
  "CRP",
  "TSH",
];

const TYPE_MED_MAP = {
  diabete: [
    {
      id: "metformin",
      name: "Metformine",
      form: "Comprimé",
      strengths: ["500 mg", "850 mg"],
    },
    {
      id: "glibenclamide",
      name: "Glibenclamide",
      form: "Comprimé",
      strengths: ["5 mg"],
    },
  ],
  hta: [
    {
      id: "amlodipine",
      name: "Amlodipine",
      form: "Comprimé",
      strengths: ["5 mg", "10 mg"],
    },
    {
      id: "enalapril",
      name: "Enalapril",
      form: "Comprimé",
      strengths: ["5 mg", "20 mg"],
    },
  ],
  antibio: [
    {
      id: "amoxicillin",
      name: "Amoxicilline",
      form: "Capsule",
      strengths: ["500 mg"],
    },
    {
      id: "ciprofloxacin",
      name: "Ciprofloxacine",
      form: "Comprimé",
      strengths: ["500 mg"],
    },
  ],
  autre: [],
};

const PRESET_TYPES = [
  { id: "diabete", label: "Ordonnance Diabète" },
  { id: "hta", label: "Ordonnance Hypertension" },
  { id: "antibio", label: "Ordonnance Antibiotique" },
  { id: "autre", label: "Autre" },
];

const BILAN_PRESET_TYPES = [
  { id: "diabete", label: "Bilan Diabète" },
  { id: "hta", label: "Bilan Hypertension" },
  { id: "infectieux", label: "Bilan Infectieux" },
  { id: "autre", label: "Autre" },
];

const BILAN_TYPE_EXAMS = {
  sanguin: [
    "Hémogramme",
    "Glycémie",
    "Cholestérol total",
    "Triglycérides",
    "Créatinine",
    "Ionogramme sanguin",
  ],
  urinaire: [
    "Protéinurie",
    "Glycosurie",
    "Examen cytobactériologique des urines",
  ],
  imagerie: [
    "Radiographie thoracique",
    "Échographie abdominale",
    "IRM cérébrale",
  ],
  autre: [],
};

const BILAN_TYPE_EXAMS_EXT = {
  diabete: [
    "Glycémie à jeun",
    "HbA1c",
    "Bilan lipidique",
    "Créatinine",
    "Protéinurie",
  ],
  hta: [
    "Ionogramme sanguin",
    "Créatinine",
    "ECG",
    "Protéinurie",
    "Bilan lipidique",
  ],
  infectieux: [
    "CRP",
    "Hémogramme",
    "Examen cytobactériologique des urines",
    "Radiographie thoracique",
  ],
  autre: [],
};

const JUSTIF_PRESET_TYPES = [
  { id: "arret7", label: "Arrêt de travail 7 jours" },
  { id: "arret14", label: "Arrêt de travail 14 jours" },
  { id: "congeMat", label: "Congé maternité" },
  { id: "autre", label: "Autre" },
];

const JUSTIF_TYPE_TEXTS = {
  arret7: "Arrêt de travail pour raison médicale, durée : 7 jours.",
  arret14: "Arrêt de travail pour raison médicale, durée : 14 jours.",
  congeMat: "Congé maternité selon la législation en vigueur.",
  autre: "",
};

export default function PrescriptionModal({
  open,
  onOpenChange,
  onsave,
  selectedPatient,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [type, setType] = useState(PRESET_TYPES[0].id);
  const [openMedDialog, setOpenMedDialog] = useState(false);

  const [tmpStrength, setTmpStrength] = useState("");
  const [tmpDose, setTmpDose] = useState("1 fois/jour");
  const [tmpDuration, setTmpDuration] = useState("5 jours");
  const [tmpQuantite, setTmpQuantite] = useState(1);

  const [labQuery, setLabQuery] = useState("");
  const [labSuggestions, setLabSuggestions] = useState([]);
  const [labItems, setLabItems] = useState([]);
  const [labType, setLabType] = useState("");

  const [justifText, setJustifText] = useState("");

  const [highlightedMedIdx, setHighlightedMedIdx] = useState(-1);
  const [highlightedLabIdx, setHighlightedLabIdx] = useState(-1);

  const printRef = useRef();
  const [bilanType, setBilanType] = useState(BILAN_PRESET_TYPES[0].id);
  const [justifType, setJustifType] = useState(JUSTIF_PRESET_TYPES[0].id);

  const bilanPrintRef = useRef();
  const justifPrintRef = useRef();

  // --- Search Médicaments ---
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setHighlightedMedIdx(-1);
      return;
    }
    const q = query.trim().toLowerCase();
    const filtered = MEDS.filter(
      (m) => m.name.toLowerCase().includes(q) || m.id.includes(q)
    );
    setSuggestions(filtered);
    setHighlightedMedIdx(filtered.length > 0 ? 0 : -1);
  }, [query]);

  // --- Search Examens ---
  useEffect(() => {
    if (!labQuery.trim()) {
      setLabSuggestions([]);
      setHighlightedLabIdx(-1);
      return;
    }
    const q = labQuery.trim().toLowerCase();
    const filtered = EXAMS.filter(
      (e) => e.toLowerCase().includes(q) && !labItems.includes(e)
    );
    setLabSuggestions(filtered);
    setHighlightedLabIdx(filtered.length > 0 ? 0 : -1);
  }, [labQuery, labItems]);

  // --- Keyboard navigation for meds ---
  function handleMedKeyDown(e) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      setHighlightedMedIdx((idx) =>
        idx + 1 < suggestions.length ? idx + 1 : idx
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedMedIdx((idx) => (idx - 1 >= 0 ? idx - 1 : idx));
    } else if (e.key === "Enter" && highlightedMedIdx >= 0) {
      const s = suggestions[highlightedMedIdx];
      setSelectedMed(s);
      setTmpStrength(s.strengths[0]);
      setOpenMedDialog(true);
    }
  }

  // --- Keyboard navigation for labs ---
  function handleLabKeyDown(e) {
    if (!labSuggestions.length) return;
    if (e.key === "ArrowDown") {
      setHighlightedLabIdx((idx) =>
        idx + 1 < labSuggestions.length ? idx + 1 : idx
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedLabIdx((idx) => (idx - 1 >= 0 ? idx - 1 : idx));
    } else if (e.key === "Enter" && highlightedLabIdx >= 0) {
      addLab(labSuggestions[highlightedLabIdx]);
    }
  }

  function addMedication() {
    if (!selectedMed) return;
    const item = {
      uid: `${selectedMed.id}-${Date.now()}`,
      medId: selectedMed.id,
      name: selectedMed.name,
      form: selectedMed.form,
      strength: tmpStrength || selectedMed.strengths[0],
      dose: tmpDose,
      frequency: "",
      duration: tmpDuration,
      quantite: tmpQuantite,
    };
    setPrescriptionItems([...prescriptionItems, item]);
    setSelectedMed(null);
    setQuery("");
    setOpenMedDialog(false);
    setTmpQuantite(1);
  }

  function removeItem(uid) {
    setPrescriptionItems(prescriptionItems.filter((i) => i.uid !== uid));
  }

  function addLab(exam) {
    if (!labItems.includes(exam)) setLabItems([...labItems, exam]);
    setLabQuery("");
  }

  function removeLab(exam) {
    setLabItems(labItems.filter((i) => i !== exam));
  }

  function handleSave() {
    const payload = {
      type,
      items: prescriptionItems,
      labs: labItems,
      justification: justifText,
      date: new Date().toISOString(),
    };
    onsave(payload);
    console.log("✅ Saved:", payload);
    alert("✅ Données sauvegardées");
  }

  const totalMeds = prescriptionItems.length;

  useEffect(() => {
    // Only auto-fill if not "autre"
    if (type !== "autre" && TYPE_MED_MAP[type]) {
      // Avoid duplicates
      const meds = TYPE_MED_MAP[type].map((med) => ({
        uid: `${med.id}-${Date.now()}-${Math.random()}`,
        medId: med.id,
        name: med.name,
        form: med.form,
        strength: med.strengths[0],
        dose: "1 fois/jour",
        frequency: "",
        duration: "7 jours",
      }));
      setPrescriptionItems(meds);
    } else if (type === "autre") {
      setPrescriptionItems([]);
    }
  }, [type]);

  useEffect(() => {
    if (bilanType && BILAN_TYPE_EXAMS_EXT[bilanType]) {
      setLabItems(BILAN_TYPE_EXAMS_EXT[bilanType]);
    }
  }, [bilanType]);

  useEffect(() => {
    if (justifType && JUSTIF_TYPE_TEXTS[justifType] !== undefined) {
      setJustifText(JUSTIF_TYPE_TEXTS[justifType]);
    }
  }, [justifType]);

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "PRINT", "height=700,width=900");
    win.document.write(`
      <html>
        <head>
          <title>Ordonnance - Dr DIB Amel</title>
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
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  function handlePrintBilan() {
    if (!bilanPrintRef.current) return;
    const printContents = bilanPrintRef.current.innerHTML;
    const win = window.open("", "PRINT", "height=700,width=900");
    win.document.write(`
      <html>
        <head>
          <title>Bilans & Analyses - Dr DIB Amel</title>
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
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  }

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
    function handleShortcut(e) {
      // Ctrl+P for print
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        handlePrint();
      }
      // Ctrl+S for save
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [handlePrint, handleSave]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Optional: Close button */}

      <DialogContent className="max-w-4xl min-w-4xl p-0">
        <div className="p-6">
          <Tabs defaultValue="ordonnance">
            <TabsList className="grid grid-cols-3 bg-purple-100 text-purple-700 rounded-lg">
              <TabsTrigger value="ordonnance">📝 Ordonnance</TabsTrigger>
              <TabsTrigger value="labs">🧪 Bilans & Analyses</TabsTrigger>
              <TabsTrigger value="justif">
                📄 Justification médicale
              </TabsTrigger>
            </TabsList>

            {/* Ordonnance */}
            <TabsContent value="ordonnance">
              <Card className="mt-4 border-purple-300 shadow-md ">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Plus size={20} className="text-purple-500" /> Rédiger une
                      ordonnance
                    </CardTitle>
                  </div>
                  <Button
                    className="bg-purple-500 hover:bg-purple-700"
                    onClick={handlePrint}
                    size="sm"
                  >
                    🖨️ Imprimer
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2 relative">
                      <Label htmlFor="med-search">Médicament</Label>
                      <div className="relative">
                        <Input
                          id="med-search"
                          placeholder="Tapez le nom du médicament..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={handleMedKeyDown}
                          className="focus:ring-2 focus:ring-purple-400"
                          autoComplete="off"
                        />
                        <div className="absolute right-3 top-3 pointer-events-none text-purple-500">
                          <Search size={16} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {query && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-56 overflow-auto"
                          >
                            {suggestions.length > 0 ? (
                              suggestions.map((s, idx) => (
                                <li
                                  key={s.id}
                                  className={`px-3 py-2 flex justify-between items-center cursor-pointer ${
                                    idx === highlightedMedIdx
                                      ? "bg-purple-100"
                                      : "hover:bg-purple-50"
                                  }`}
                                  onMouseEnter={() => setHighlightedMedIdx(idx)}
                                  onClick={() => {
                                    setSelectedMed(s);
                                    setTmpStrength(s.strengths[0]);
                                    setOpenMedDialog(true);
                                  }}
                                  ref={(el) => {
                                    if (idx === highlightedMedIdx && el)
                                      el.scrollIntoView({ block: "nearest" });
                                  }}
                                >
                                  <div>
                                    <div className="font-medium text-purple-700">
                                      {s.name}
                                    </div>
                                  </div>
                                  <div className="text-xs text-purple-500 font-medium">
                                    sélectionner
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li className="px-3 py-2 text-sm text-gray-500 text-center">
                                Aucun médicament trouvé
                              </li>
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <Label>Type d'ordonnance</Label>
                      <Select
                        onValueChange={(v) => setType(v)}
                        defaultValue={type}
                      >
                        <SelectTrigger className="w-full  border-purple-300">
                          <SelectValue placeholder="Choisir" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRESET_TYPES.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modal Médicament */}
              <Dialog open={openMedDialog} onOpenChange={setOpenMedDialog}>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-purple-700">
                      {selectedMed?.name}{" "}
                      {selectedMed && `(${selectedMed.form})`}
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                      Choisissez la concentration, la posologie, la durée et la
                      quantité.
                    </p>
                  </DialogHeader>

                  {selectedMed && (
                    <div className="grid gap-3">
                      <div>
                        {/* === Dosage === */}
                        <div>
                          <Label>Dosage</Label>
                          <select
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={tmpStrength}
                            onChange={(e) => setTmpStrength(e.target.value)}
                          >
                            <option value="">-- Sélectionner --</option>
                            {selectedMed?.strengths?.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                            <option value="custom">Autre...</option>
                          </select>

                          {tmpStrength === "custom" && (
                            <input
                              type="text"
                              className="mt-2 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Entrer un dosage personnalisé..."
                              onChange={(e) => setTmpStrength(e.target.value)}
                            />
                          )}
                        </div>

                        {/* === Posologie === */}
                        <div>
                          <Label>Posologie (rythme de prise)</Label>
                          <select
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={tmpDose}
                            onChange={(e) => setTmpDose(e.target.value)}
                          >
                            <option value="">-- Sélectionner --</option>
                            <option value="1 fois / jour">1 fois / jour</option>
                            <option value="2 fois / jour">2 fois / jour</option>
                            <option value="3 fois / jour">3 fois / jour</option>
                            <option value="Toutes les 8 heures">
                              Toutes les 8 heures
                            </option>
                            <option value="Selon besoin">Selon besoin</option>
                            <option value="custom">Autre...</option>
                          </select>

                          {tmpDose === "custom" && (
                            <input
                              type="text"
                              className="mt-2 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Entrer une posologie personnalisée..."
                              onChange={(e) => setTmpDose(e.target.value)}
                            />
                          )}
                        </div>

                        {/* === Durée === */}
                        <div>
                          <Label>Durée</Label>
                          <select
                            className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={tmpDuration}
                            onChange={(e) => setTmpDuration(e.target.value)}
                          >
                            <option value="">-- Sélectionner --</option>
                            <option value="3 jours">3 jours</option>
                            <option value="5 jours">5 jours</option>
                            <option value="7 jours">7 jours</option>
                            <option value="10 jours">10 jours</option>
                            <option value="14 jours">14 jours</option>
                            <option value="1 mois">1 mois</option>
                            <option value="custom">Autre...</option>
                          </select>

                          {tmpDuration === "custom" && (
                            <input
                              type="text"
                              className="mt-2 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Entrer une durée personnalisée..."
                              onChange={(e) => setTmpDuration(e.target.value)}
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <Label>Quantité (boîtes)</Label>
                        <Input
                          type="number"
                          min={1}
                          value={tmpQuantite}
                          onChange={(e) =>
                            setTmpQuantite(Number(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  )}

                  <DialogFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setOpenMedDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={addMedication}
                    >
                      <Plus size={16} className="mr-2" /> Ajouter
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Card className="mt-2 border-purple-300">
                <CardHeader>
                  <CardTitle className="text-purple-700">
                    Ordonnance — Aperçu ({totalMeds})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {prescriptionItems.length === 0 ? (
                    <div className="h-88 text-gray-500">
                      Aucun médicament ajouté.
                    </div>
                  ) : (
                    <ul className="space-y-3 h-88 overflow-auto">
                      {prescriptionItems.map((it) => (
                        <li
                          key={it.uid}
                          className="flex items-center justify-between border rounded p-3 hover:bg-purple-50"
                        >
                          <div>
                            <div className="font-medium text-purple-700">
                              {it.name}{" "}
                              <span className="text-sm text-gray-500">
                                {it.strength}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {it.dose} pendant{it.frequency} {it.duration} •
                              <span className="ml-2 text-purple-700 font-bold">
                                {it.quantite ? it.quantite : 1} x boîte
                                {it.quantite > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(it.uid)}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Print Section (hidden) */}
              <div className="hidden" ref={printRef}>
                <div className="ord-print-header">
                  <div className="ord-print-title">Ordonnance Médicale</div>
                  <div className="ord-print-doc">Dr DIB Amel</div>
                  <div className="ord-print-date">
                    {new Date().toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="ord-print-list">
                  {prescriptionItems.length === 0 ? (
                    <div className="text-gray-500 px-4 py-8 text-center">
                      Aucun médicament ajouté.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {prescriptionItems.map((it) => (
                        <li
                          key={it.uid}
                          className="flex flex-col p-3 border rounded-md hover:bg-purple-50 transition-colors ord-print-item"
                        >
                          <div className="font-medium text-purple-700 ord-print-item-title">
                            {it.name}{" "}
                            <span className="text-gray-600 font-normal">
                              {it.strength}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 mt-1 ord-print-item-details">
                            {it.dose} • {it.frequency} • {it.duration} •{" "}
                            <span className="text-purple-700 font-bold">
                              {it.quantite} boîte{it.quantite > 1 ? "s" : ""}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="ord-print-footer">
                  Signature : ................................
                </div>
              </div>
            </TabsContent>

            {/* Bilans & Analyses */}
            <TabsContent value="labs">
              <Card className="mt-4 border-purple-300 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-purple-700 flex items-center gap-2">
                    <Plus size={20} className="text-purple-500" /> Rédiger un
                    bilan ou une analyse
                  </CardTitle>
                  <Button
                    className="bg-purple-500 hover:bg-purple-700"
                    onClick={handlePrintBilan}
                    size="sm"
                  >
                    🖨️ Imprimer
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* Search Exam */}
                    <div className="md:col-span-2 relative">
                      <Label htmlFor="lab-search">Examen / Analyse</Label>
                      <div className="relative">
                        <Input
                          id="lab-search"
                          placeholder="Tapez le nom de l'examen..."
                          value={labQuery}
                          onChange={(e) => setLabQuery(e.target.value)}
                          onKeyDown={handleLabKeyDown}
                          className="focus:ring-2 focus:ring-purple-400"
                          autoComplete="off"
                        />
                        <div className="absolute right-3 top-3 pointer-events-none text-purple-500">
                          <Search size={16} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {labQuery && (
                          <motion.ul
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-56 overflow-auto"
                          >
                            {labSuggestions.length > 0 ? (
                              labSuggestions.map((exam, idx) => (
                                <li
                                  key={exam}
                                  className={`px-3 py-2 flex justify-between items-center cursor-pointer ${
                                    idx === highlightedLabIdx
                                      ? "bg-purple-100"
                                      : "hover:bg-purple-50"
                                  }`}
                                  onMouseEnter={() => setHighlightedLabIdx(idx)}
                                  onClick={() => addLab(exam)}
                                  ref={(el) => {
                                    if (idx === highlightedLabIdx && el)
                                      el.scrollIntoView({ block: "nearest" });
                                  }}
                                >
                                  <span className="font-medium text-purple-700">
                                    {exam}
                                  </span>
                                  <span className="text-xs text-purple-500 font-medium">
                                    ajouter
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="px-3 py-2 text-sm text-gray-500 text-center">
                                Aucun examen trouvé
                              </li>
                            )}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Select Type */}
                    <div>
                      <Label>Type de bilan</Label>
                      <Select
                        onValueChange={(v) => setBilanType(v)}
                        defaultValue={bilanType}
                      >
                        <SelectTrigger className="w-full border-purple-300">
                          <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {BILAN_PRESET_TYPES.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Preview List */}
                  <Card className="mt-6 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-purple-700">
                        Bilans & Analyses — Aperçu ({labItems.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {labItems.length === 0 ? (
                        <div className="text-gray-500 h-88">
                          Aucun examen ajouté.
                        </div>
                      ) : (
                        <ul className="space-y-3 h-88 overflow-auto">
                          {labItems.map((exam) => (
                            <li
                              key={exam}
                              className="flex items-center justify-between border rounded p-3 hover:bg-purple-50"
                            >
                              <div>
                                <div className="font-medium text-purple-700">
                                  {exam}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Type : {bilanType ? bilanType : "Non précisé"}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeLab(exam)}
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                  {/* Print Section (hidden) */}
                  <div className="hidden" ref={bilanPrintRef}>
                    <div className="bilan-print-header">
                      <div className="bilan-print-title">Bilans & Analyses</div>
                      <div className="bilan-print-doc">Dr DIB Amel</div>
                      <div className="bilan-print-date">
                        {new Date().toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="bilan-print-list">
                      {labItems.length === 0 ? (
                        <div className="text-gray-500 px-4 py-8">
                          Aucun examen ajouté.
                        </div>
                      ) : (
                        labItems.map((exam) => (
                          <div key={exam} className="bilan-print-item">
                            <div className="font-medium text-purple-700">
                              {exam}
                            </div>
                            <div className="text-sm text-gray-500">
                              Type : {bilanType ? bilanType : "Non précisé"}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="bilan-print-footer">
                      Signature : ................................
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Justification médicale */}
            <TabsContent value="justif">
              <Card className="mt-4 border-purple-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-purple-700">
                    📄 Justification médicale / Arrêt de travail
                  </CardTitle>
                  <Button
                    className="bg-purple-500 hover:bg-purple-700"
                    onClick={handlePrintJustif}
                    size="sm"
                  >
                    🖨️ Imprimer
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <Label>Type de justification</Label>
                      <Select
                        onValueChange={(v) => setJustifType(v)}
                        defaultValue={justifType}
                      >
                        <SelectTrigger className="w-full border-purple-300">
                          <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {JUSTIF_PRESET_TYPES.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="h-114">
                      <Label htmlFor="justif-text">Texte</Label>
                      <textarea
                        id="justif-text"
                        rows={5}
                        value={justifText}
                        onChange={(e) => setJustifText(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-400"
                        placeholder="Ex : Arrêt de travail de 7 jours..."
                      />
                    </div>
                  </div>
                  {/* Print Section (hidden) */}
                  <div className="hidden" ref={justifPrintRef}>
                    <div className="justif-print-header">
                      <div className="justif-print-title">
                        Justification médicale
                      </div>
                      <div className="justif-print-doc">Dr DIB Amel</div>
                      <div className="justif-print-date">
                        {new Date().toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="justif-print-text">{justifText}</div>
                    <div className="justif-print-footer">
                      Signature : ................................
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer Save */}
          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="ghost"
              className="text-red-500"
              onClick={() => {
                setPrescriptionItems([]);
                setLabItems([]);
                setJustifText("");
              }}
            >
              Tout réinitialiser
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleSave}
            >
              Sauvegarder tout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

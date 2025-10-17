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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- Liste exemple médicaments ---

// --- Liste exemple examens ---

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
  open = true,
  onOpenChange,
  onsave,
  selectedPatient,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [prescriptionItems, setPrescriptionItems] = useState([]);
  const [type, setType] = useState();
  const [openMedDialog, setOpenMedDialog] = useState(false);
  const [medicaments, setMedicaments] = useState([]);
  const [bilans, setBilans] = useState([]);
  const [ordTypes, setOrdTypes] = useState([]);
  const [SelectedbilanType, setSelectedBilanType] = useState();

  const [bilanTypes, setBilanTypes] = useState([]);
  const [tmpfreq, setTmpfreq] = useState("");
  const [tmpDose, setTmpDose] = useState("1 fois/jour");
  const [tmpDuration, setTmpDuration] = useState("5 jours");
  const [tmpQuantite, setTmpQuantite] = useState(1);
  const [loading, setLoading] = useState();
  const [labQuery, setLabQuery] = useState("");
  const [labSuggestions, setLabSuggestions] = useState([]);
  const [labItems, setLabItems] = useState([]);
  const [labType, setLabType] = useState("");
  const [existDialog, setExistDialog] = useState(false);

  const [justifText, setJustifText] = useState("");

  const [highlightedMedIdx, setHighlightedMedIdx] = useState(-1);
  const [highlightedLabIdx, setHighlightedLabIdx] = useState(-1);

  const printRef = useRef();
  const [bilanType, setBilanType] = useState();
  const [justifType, setJustifType] = useState();

  const bilanPrintRef = useRef();
  const justifPrintRef = useRef();

  async function fetchBilanTypes() {
    try {
      const response = await fetch("/api/BilansType", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // ensures fresh data
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(
          err.error || "Erreur lors du chargement des bilans types"
        );
      }

      const data = await response.json();
      setBilanTypes(data);
    } catch (err) {
      console.error("❌ fetchBilanTypes error:", err);
    } finally {
    }
  }
  async function fetchRecettes() {
    try {
      const response = await fetch("/api/OrdanaceType", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        let message = "Erreur lors du chargement des recettes types";
        try {
          const error = await response.json();
          message = error.error || message;
        } catch {
          // fallback if no JSON
        }
        throw new Error(message);
      }

      return await response.json();
    } catch (err) {
      console.error("❌ fetchRecettes error:", err);
      throw err;
    }
  }
  const loadRecettes = async () => {
    try {
      const data = await fetchRecettes();
      console.log("ordertypes" + JSON.stringify(data));
      setOrdTypes(data);
    } catch (err) {
      console.error(err);
      // Optionally: toast.error(err.message);
    }
  };
  useEffect(() => {
    setLoading(true);
    loadRecettes();

    async function fetchMedicaments() {
      try {
        const res = await fetch("/api/medicaments");
        const data = await res.json();
        if (Array.isArray(data)) setMedicaments(data);
      } catch (err) {
        console.error("Erreur de chargement des médicaments", err);
      }
    }
    async function fetchBilans() {
      try {
        const res = await fetch("/api/bilans");
        const data = await res.json();
        if (Array.isArray(data)) setBilans(data);
      } catch (err) {
        console.error("Erreur de chargement des bilans", err);
      }
    }
    fetchBilans();
    fetchMedicaments();
    fetchBilanTypes();
    setLoading(false);
  }, []);

  // --- Search Médicaments ---
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setHighlightedMedIdx(-1);
      return;
    }
    const q = query.trim().toLowerCase();
    const filtered = medicaments.filter((m) => m.nom.toLowerCase().includes(q));
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
    const filtered = bilans.filter(
      (e) => e.nom.toLowerCase().includes(q) && !labItems.includes(e)
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
    const exists = prescriptionItems.some(
      (it) => it.nom.toLowerCase() === selectedMed.nom.toLowerCase()
    );

    if (exists) {
      setExistDialog(true);
      return;
    }
    const item = {
      medicamentId: selectedMed.id,
      nom: selectedMed.nom,
      form: selectedMed.form,
      dosage: tmpDose,
      frequence: tmpfreq,
      duree: tmpDuration,
      quantite: tmpQuantite,
    };
    setPrescriptionItems([...prescriptionItems, item]);
    setSelectedMed(null);
    setQuery("");
    setOpenMedDialog(false);
    setTmpQuantite(1);
  }

  function removeItem(id) {
    console.log(id);
    console.log(JSON.stringify(PrescriptionModal));
    setPrescriptionItems(
      prescriptionItems.filter((i) => i.medicamentId !== id)
    );
  }

  function addLab(exam) {
    console.log("hiiiiiiiiiiii" + JSON.stringify(exam) + labItems);
    if (!labItems.includes(exam)) setLabItems([...labItems, exam]);
    setLabQuery("");
  }

  function removeLab(exam) {
    setLabItems(labItems.filter((i) => i !== exam));
  }

  function handleSave() {
    const ordonnance = {
      items: prescriptionItems,
    };
    const bilanRecip = {
      items: labItems,
    };
    const payload = {
      ordonnance: ordonnance,
      bilanRecip: bilanRecip,
    };
    onsave(payload);
    console.log("✅ Saved:", payload);
    alert("✅ Données sauvegardées");
  }

  const totalMeds = prescriptionItems.length;

  useEffect(() => {
    if (type && type !== "autre") {
      const selectedtyoe = ordTypes.filter((o) => o.id === type);
      console.log(JSON.stringify(selectedtyoe) + type);
      // Avoid duplicates and map medications correctly
      const meds = selectedtyoe[0].items.map((med) => ({
        medicamentId: med.id,
        nom: med.nom, // match your first dataset key naming
        dosage: med.dosage || "—", // use first available strength
        frequence: med.frequence,
        duree: med.duree,
        quantite: med.quantite,
      }));

      setPrescriptionItems(meds);
    } else {
      // Clear items if "autre" or invalid type
      setPrescriptionItems([]);
    }
  }, [type]);

  useEffect(() => {
    if (SelectedbilanType && SelectedbilanType !== "autre") {
      const selectedtyoe = bilanTypes.filter((o) => o.id === SelectedbilanType);
      console.log(JSON.stringify(selectedtyoe) + SelectedbilanType);
      // Avoid duplicates and map medications correctly
      const labs = selectedtyoe[0].items.map((lab) => ({
        id: lab.id,
        nom: lab.nom, // match your first dataset key naming
      }));

      setLabItems(labs);
    } else {
      // Clear items if "autre" or invalid type
      setLabItems([]);
    }
  }, [SelectedbilanType]);

  useEffect(() => {
    if (justifType && JUSTIF_TYPE_TEXTS[justifType] !== undefined) {
      setJustifText(JUSTIF_TYPE_TEXTS[justifType]);
    }
  }, [justifType]);

  // ✅ Print Ordonnance using Electron
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
        handlePrintElectron();
      }
      // Ctrl+S for save
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [handlePrintElectron, handleSave]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Optional: Close button */}

      <DialogContent className="max-w-4xl min-w-4xl p-0">
        <div className="p-6">
          <Tabs defaultValue="ordonnance">
            <TabsList className="grid grid-cols-3 bg-purple-100 text-purple-700 rounded-lg">
              <TabsTrigger value="ordonnance">📝 Ordonnance</TabsTrigger>
              <TabsTrigger value="labs">🧪 Bilans & Analyses</TabsTrigger>
              <TabsTrigger disabled value="justif">
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
                    onClick={handlePrintElectron}
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
                                    setOpenMedDialog(true);
                                  }}
                                  ref={(el) => {
                                    if (idx === highlightedMedIdx && el)
                                      el.scrollIntoView({ block: "nearest" });
                                  }}
                                >
                                  <div>
                                    <div className="font-medium text-purple-700">
                                      {s.nom}
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
                          {ordTypes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.nom}
                            </SelectItem>
                          ))}
                          <SelectItem value="autre">Autre type</SelectItem>
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
                            value={tmpDose}
                            onChange={(e) => setTmpDose(e.target.value)}
                            className="border rounded-md p-2 w-full"
                          >
                            <option value="">-- Sélectionner --</option>
                            <option value="5 mg">5 mg</option>
                            <option value="10 mg">10 mg</option>
                            <option value="20 mg">20 mg</option>
                            <option value="50 mg">50 mg</option>
                            <option value="100 mg">100 mg</option>
                            <option value="250 mg">250 mg</option>
                            <option value="500 mg">500 mg</option>
                            <option value="1 g">1 g</option>
                          </select>

                          {tmpDose === "custom" && (
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
                            value={tmpfreq}
                            onChange={(e) => setTmpfreq(e.target.value)}
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

                          {tmpfreq === "custom" && (
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

              <Card className="mt-2 border-purple-300 h-[465px] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-700">
                    Ordonnance — Aperçu ({totalMeds})
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden">
                  {prescriptionItems.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Aucun médicament ajouté.
                    </div>
                  ) : (
                    <ul className="space-y-3 h-full overflow-y-auto p-2">
                      {prescriptionItems.map((it) => (
                        <li
                          key={it.uid || it.id}
                          className="flex items-center justify-between bg-white border border-purple-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-purple-50/60"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-semibold text-purple-700">
                                {it.nom}
                              </span>
                              <span className="text-sm text-gray-500 font-medium">
                                {it.dosage}
                              </span>
                            </div>

                            <div className="text-sm text-gray-600 mt-1">
                              {it.frequency || "—"} pendant {it.duree || "—"} •
                              <span className="ml-2 text-purple-700 font-semibold">
                                {it.quantite || 1} boîte
                                {it.quantite > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-red-100 transition"
                            onClick={() => removeItem(it.medicamentId)}
                          >
                            <Trash2 size={18} className="text-red-500" />
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
                    onClick={handlePrintBilanElectron}
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
                                  key={exam.id}
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
                                    {exam.nom}
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
                        onValueChange={(v) => setSelectedBilanType(v)}
                        defaultValue={SelectedbilanType || "autre"}
                      >
                        <SelectTrigger className="w-full border-purple-300">
                          <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bilanTypes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.nom}
                            </SelectItem>
                          ))}

                          {/* Add "autre type" manually */}
                          <SelectItem value="autre">Autre type</SelectItem>
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
                              key={exam.id}
                              className="flex items-center justify-between border rounded p-3 hover:bg-purple-50"
                            >
                              <div>
                                <div className="font-medium text-purple-700">
                                  {exam.nom}
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
                          <div key={exam.id} className="bilan-print-item">
                            <div className="font-medium text-purple-700">
                              {exam.nom}
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
        <Dialog open={existDialog} onOpenChange={setExistDialog}>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-purple-700">
                Médicament existant
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Ce médicament est déjà ajouté dans l’ordonnance.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setExistDialog(false)}
                className="text-purple-700 border-purple-300 hover:bg-purple-50"
              >
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

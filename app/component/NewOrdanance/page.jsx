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
import {
  Trash2,
  Plus,
  Search,
  Pill,
  FileText,
  FlaskConical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [customDose, setCustomDose] = useState("");
  const [customFreq, setCustomFreq] = useState("");
  const [customDuration, setCustomDuration] = useState("");

  const [bilanTypes, setBilanTypes] = useState([]);
  const [tmpfreq, setTmpfreq] = useState("");
  const [tmpDose, setTmpDose] = useState("1 fois/jour");
  const [tmpDuration, setTmpDuration] = useState("5 jours");
  const [tmpQuantite, setTmpQuantite] = useState(1);
  const [loading, setLoading] = useState(false);
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

  // Refs for auto-focus
  const medSearchRef = useRef(null);
  const labSearchRef = useRef(null);

  async function fetchBilanTypes() {
    try {
      const response = await fetch("/api/BilansType", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
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
      setOrdTypes(data);
    } catch (err) {
      console.error(err);
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

  // Auto-focus on medication search when dialog opens
  useEffect(() => {
    if (open && medSearchRef.current) {
      setTimeout(() => {
        medSearchRef.current?.focus();
      }, 100);
    }
  }, [open]);

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
  }, [query, medicaments]);

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
  }, [labQuery, labItems, bilans]);

  function handleMedKeyDown(e) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedMedIdx((idx) =>
        idx + 1 < suggestions.length ? idx + 1 : idx
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedMedIdx((idx) => (idx - 1 >= 0 ? idx - 1 : idx));
    } else if (e.key === "Enter" && highlightedMedIdx >= 0) {
      e.preventDefault();
      const s = suggestions[highlightedMedIdx];
      setSelectedMed(s);
      setOpenMedDialog(true);
    }
  }

  function handleLabKeyDown(e) {
    if (!labSuggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedLabIdx((idx) =>
        idx + 1 < labSuggestions.length ? idx + 1 : idx
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedLabIdx((idx) => (idx - 1 >= 0 ? idx - 1 : idx));
    } else if (e.key === "Enter" && highlightedLabIdx >= 0) {
      e.preventDefault();
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
      dosage: tmpDose === "autre" ? customDose + " mg" : tmpDose,
      frequence: tmpfreq === "autre" ? customFreq : tmpfreq,
      duree: tmpDuration === "autre" ? customDuration : tmpDuration,
      quantite: tmpQuantite,
    };
    setPrescriptionItems([...prescriptionItems, item]);

    // Reset all fields
    setSelectedMed(null);
    setQuery("");
    setOpenMedDialog(false);
    setTmpQuantite(1);
    setTmpDose("1 fois/jour");
    setTmpfreq("");
    setTmpDuration("5 jours");

    // Return focus to search field
    setTimeout(() => {
      medSearchRef.current?.focus();
    }, 100);
  }

  function removeItem(id) {
    setPrescriptionItems(
      prescriptionItems.filter((i) => i.medicamentId !== id)
    );
  }

  function addLab(exam) {
    if (!labItems.includes(exam)) setLabItems([...labItems, exam]);
    setLabQuery("");

    // Return focus to lab search
    setTimeout(() => {
      labSearchRef.current?.focus();
    }, 100);
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
    // alert("✅ Données sauvegardées");
  }

  const totalMeds = prescriptionItems.length;

  useEffect(() => {
    if (type && type !== "autre") {
      const selectedtyoe = ordTypes.filter((o) => o.id === type);
      const meds =
        selectedtyoe[0]?.items.map((med) => ({
          medicamentId: med.id,
          nom: med.nom,
          dosage: med.dosage || "—",
          frequence: med.frequence,
          duree: med.duree,
          quantite: med.quantite,
        })) || [];

      setPrescriptionItems(meds);
    } else {
      setPrescriptionItems([]);
    }
  }, [type, ordTypes]);
  const scrollRef2 = useRef(null);

  // ✅ Scroll to bottom whenever a new lab exam is added
  useEffect(() => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollTop = scrollRef2.current.scrollHeight;
    }
  }, [labItems]);
  useEffect(() => {
    if (SelectedbilanType && SelectedbilanType !== "autre") {
      const selectedtyoe = bilanTypes.filter((o) => o.id === SelectedbilanType);
      const labs =
        selectedtyoe[0]?.items.map((lab) => ({
          id: lab.id,
          nom: lab.nom,
        })) || [];

      setLabItems(labs);
    } else {
      setLabItems([]);
    }
  }, [SelectedbilanType, bilanTypes]);

  useEffect(() => {
    if (justifType && JUSTIF_TYPE_TEXTS[justifType] !== undefined) {
      setJustifText(JUSTIF_TYPE_TEXTS[justifType]);
    }
  }, [justifType]);
  function calculateAge(dateString) {
    if (!dateString) return "";

    const birthDate = new Date(dateString);
    const today = new Date();

    const diffMs = today - birthDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30.44); // approx. average month length
    const diffYears = Math.floor(diffMonths / 12);

    if (diffDays < 30) {
      // less than 1 month
      return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
    } else if (diffMonths < 24) {
      // less than 2 years
      return `${diffMonths} mois`;
    } else {
      // 2 years or older
      return `${diffYears} an${diffYears > 1 ? "s" : ""}`;
    }
  }

  const handlePrintElectron = async () => {
    console.log(selectedPatient);
    try {
      if (!prescriptionItems || prescriptionItems.length === 0) {
        alert("Aucune donnée à imprimer");
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
      alert("Erreur lors de l'impression de l'ordonnance.");
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
    function handleShortcut(e) {
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        // e.preventDefault();
        //handlePrintElectron();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        //  e.preventDefault();
        // handleSave();
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [prescriptionItems, labItems]);

  // Enhanced animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 },
    },
  };
  const scrollRef = useRef(null);

  // ✅ Always scroll to bottom when list changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [prescriptionItems]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl min-w-4xl p-0 max-h-[97vh] overflow-hidden">
        <motion.div
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Tabs defaultValue="ordonnance">
            <TabsList className="grid grid-cols-3 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-xl p-1 shadow-sm">
              <TabsTrigger
                value="ordonnance"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Pill className="w-4 h-4 mr-2" />
                Ordonnance
              </TabsTrigger>
              <TabsTrigger
                value="labs"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                Bilans & Analyses
              </TabsTrigger>
              <TabsTrigger
                disabled
                value="justif"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <FileText className="w-4 h-4 mr-2" />
                Justification
              </TabsTrigger>
            </TabsList>

            {/* Ordonnance */}
            <TabsContent value="ordonnance">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="mt-3 border-purple-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white rounded-t-lg">
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Plus size={20} className="text-purple-500" /> Rédiger une
                      ordonnance
                    </CardTitle>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={handlePrintElectron}
                      size="sm"
                    >
                      🖨️ Imprimer
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="md:col-span-2 relative">
                        <Label
                          htmlFor="med-search"
                          className="text-purple-700 font-medium"
                        >
                          Médicament
                        </Label>
                        <div className="relative">
                          <Input
                            ref={medSearchRef}
                            id="med-search"
                            placeholder="Tapez le nom du médicament..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleMedKeyDown}
                            className="focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-200"
                            autoComplete="off"
                          />
                          <motion.div
                            className="absolute right-3 top-3 pointer-events-none text-purple-500"
                            animate={{ scale: query ? 1.1 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Search size={16} />
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {query && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-50 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-2xl max-h-56 overflow-auto"
                            >
                              {suggestions.length > 0 ? (
                                suggestions.map((s, idx) => (
                                  <motion.li
                                    key={s.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className={`px-4 py-3 flex justify-between items-center cursor-pointer transition-all duration-150 ${
                                      idx === highlightedMedIdx
                                        ? "bg-purple-100 border-l-4 border-purple-500"
                                        : "hover:bg-purple-50"
                                    }`}
                                    onMouseEnter={() =>
                                      setHighlightedMedIdx(idx)
                                    }
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
                                      <div className="font-semibold text-purple-700">
                                        {s.nom}
                                      </div>
                                    </div>
                                    <div className="text-xs text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded">
                                      sélectionner
                                    </div>
                                  </motion.li>
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
                        <Label className="text-purple-700 font-medium">
                          Type d'ordonnance
                        </Label>
                        <Select
                          onValueChange={(v) => setType(v)}
                          defaultValue={type}
                        >
                          <SelectTrigger className="w-full border-purple-300 focus:ring-2 focus:ring-purple-400">
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
              </motion.div>

              {/* Modal Médicament */}
              <Dialog open={openMedDialog} onOpenChange={setOpenMedDialog}>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-purple-700 text-xl">
                      {selectedMed?.nom}{" "}
                      {selectedMed && `(${selectedMed.form})`}
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                      Choisissez la concentration, la posologie, la durée et la
                      quantité.
                    </p>
                  </DialogHeader>

                  {selectedMed && (
                    <div className="grid gap-4">
                      {/* === DOSAGE === */}
                      <div>
                        <Label className="text-purple-700 font-medium">
                          Dosage
                        </Label>
                        <select
                          value={tmpDose}
                          onChange={(e) => setTmpDose(e.target.value)}
                          className="border border-purple-200 rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-400 transition-all"
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
                          <option value="1,5 g">1,5 g</option>
                          <option value="2 g">2 g</option>

                          <option value="autre">Autre...</option>
                        </select>

                        {tmpDose === "autre" && (
                          <input
                            type="text"
                            placeholder="Entrer un dosage personnalisé (ex: 12.5 mg)"
                            className="mt-2 w-full rounded-lg border border-purple-200 p-2 focus:ring-2 focus:ring-purple-400 transition-all"
                            value={customDose}
                            onChange={(e) => setCustomDose(e.target.value)}
                          />
                        )}
                      </div>

                      {/* === POSOLOGIE === */}
                      <div>
                        <Label className="text-purple-700 font-medium">
                          Posologie (rythme de prise)
                        </Label>
                        <select
                          className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:ring-2 focus:ring-purple-400 transition-all"
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
                          <option value="autre">Autre...</option>
                        </select>

                        {tmpfreq === "autre" && (
                          <input
                            type="text"
                            placeholder="Entrer une posologie personnalisée"
                            className="mt-2 w-full rounded-lg border border-purple-200 p-2 focus:ring-2 focus:ring-purple-400 transition-all"
                            value={customFreq}
                            onChange={(e) => setCustomFreq(e.target.value)}
                          />
                        )}
                      </div>

                      {/* === DURÉE === */}
                      <div>
                        <Label className="text-purple-700 font-medium">
                          Durée
                        </Label>
                        <select
                          className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:ring-2 focus:ring-purple-400 transition-all"
                          value={tmpDuration}
                          onChange={(e) => setTmpDuration(e.target.value)}
                        >
                          <option value="">-- Sélectionner --</option>
                          <option value="3 jours">3 jours</option>
                          <option value="5 jours">5 jours</option>
                          <option value="7 jours">7 jours</option>
                          <option value="10 jours">10 jours</option>
                          <option value="14 jours">14 jours</option>
                          <option value="20 jours">20 jours</option>

                          <option value="1 mois">1 mois</option>
                          <option value="2 mois">2 mois</option>
                          <option value="3 mois">3 mois</option>

                          <option value="autre">Autre...</option>
                        </select>

                        {tmpDuration === "autre" && (
                          <input
                            type="text"
                            placeholder="Entrer une durée personnalisée (ex: 21 jours)"
                            className="mt-2 w-full rounded-lg border border-purple-200 p-2 focus:ring-2 focus:ring-purple-400 transition-all"
                            value={customDuration}
                            onChange={(e) => setCustomDuration(e.target.value)}
                          />
                        )}
                      </div>

                      <div>
                        <Label className="text-purple-700 font-medium">
                          Quantité (boîtes)
                        </Label>
                        <select
                          className="w-full rounded-lg border border-purple-200 px-3 py-2 focus:ring-2 focus:ring-purple-400 transition-all"
                          value={tmpQuantite}
                          onChange={(e) => setTmpQuantite(e.target.value)}
                        >
                          <option value="">--Sélectionner--</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="5">6</option>
                          <option value="5">7</option>
                          <option value="5">8</option>
                          <option value="5">9</option>
                        </select>

                        {tmpQuantite === "autre" && (
                          <input
                            type="number"
                            min={1}
                            placeholder="Entrer une quantité personnalisée"
                            className="mt-2 w-full rounded-lg border border-purple-200 p-2 focus:ring-2 focus:ring-purple-400 transition-all"
                            value={customQuantite}
                            onChange={(e) => setCustomQuantite(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <DialogFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setOpenMedDialog(false)}
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      Annuler
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-md"
                      onClick={addMedication}
                    >
                      <Plus size={16} className="mr-2" /> Ajouter
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Card className="mt-1 border-purple-200 h-[390px] flex flex-col shadow-md rounded-xl">
                <CardHeader className="py-1 bg-gradient-to-r from-purple-50 to-white">
                  <CardTitle className="text-purple-700 flex items-center justify-between text-sm sm:text-base">
                    <span>Ordonnance — Aperçu</span>
                    <span className="text-xs sm:text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {totalMeds} médicament{totalMeds > 1 ? "s" : ""}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden p-3 sm:p-0">
                  {prescriptionItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-gray-400 text-sm"
                    >
                      <Pill size={36} className="mb-3 opacity-30" />
                      <p className="font-medium">Aucun médicament ajouté</p>
                      <p className="text-xs mt-1">
                        Ajoutez un médicament ci-dessus
                      </p>
                    </motion.div>
                  ) : (
                    <ul
                      ref={scrollRef}
                      className="space-y-3 max-h-[40vh] overflow-y-auto p-1  sm:p-6 scroll-smooth "
                    >
                      <AnimatePresence>
                        {prescriptionItems.map((it, index) => (
                          <motion.li
                            key={it.medicamentId}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className="flex items-center justify-between bg-white border border-purple-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300"
                          >
                            <div className="flex flex-col flex-1">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                  {index + 1}
                                </div>
                                <div>
                                  <span className="text-sm font-semibold text-purple-700">
                                    {it.nom}
                                  </span>
                                  <span className="text-xs text-gray-500 font-medium ml-1">
                                    {it.dosage}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs text-gray-600 mt-1 ml-8 space-x-1">
                                <span className="bg-purple-50 px-1.5 py-0.5 rounded">
                                  {it.frequence || "—"}
                                </span>
                                <span className="bg-blue-50 px-1.5 py-0.5 rounded">
                                  {it.duree ? `pendant ${it.duree}` : "—"}
                                </span>
                                <span className="bg-green-50 px-1.5 py-0.5 rounded text-green-700 font-semibold">
                                  {it.quantite || 1} boîte
                                  {it.quantite > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>

                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-red-100 transition rounded-full"
                                onClick={() => removeItem(it.medicamentId)}
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </motion.div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
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
                          key={it.medicamentId}
                          className="flex flex-col p-3 border rounded-md hover:bg-purple-50 transition-colors ord-print-item"
                        >
                          <div className="font-medium text-purple-700 ord-print-item-title">
                            {it.nom}{" "}
                            <span className="text-gray-600 font-normal">
                              {it.dosage}
                            </span>
                          </div>
                          <div className="text-sm text-gray-700 mt-1 ord-print-item-details">
                            {it.frequence} • {it.duree} •{" "}
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
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="mt-4 border-purple-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white rounded-t-lg">
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Plus size={20} className="text-purple-500" /> Rédiger un
                      bilan ou une analyse
                    </CardTitle>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={handlePrintBilanElectron}
                      size="sm"
                    >
                      🖨️ Imprimer
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="md:col-span-2 relative">
                        <Label
                          htmlFor="lab-search"
                          className="text-purple-700 font-medium"
                        >
                          Examen / Analyse
                        </Label>
                        <div className="relative">
                          <Input
                            ref={labSearchRef}
                            id="lab-search"
                            placeholder="Tapez le nom de l'examen..."
                            value={labQuery}
                            onChange={(e) => setLabQuery(e.target.value)}
                            onKeyDown={handleLabKeyDown}
                            className="focus:ring-2 focus:ring-purple-400 border-purple-200 transition-all duration-200"
                            autoComplete="off"
                          />
                          <motion.div
                            className="absolute right-3 top-3 pointer-events-none text-purple-500"
                            animate={{ scale: labQuery ? 1.1 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Search size={16} />
                          </motion.div>
                        </div>
                        <AnimatePresence>
                          {labQuery && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-50 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-2xl max-h-56 overflow-auto"
                            >
                              {labSuggestions.length > 0 ? (
                                labSuggestions.map((exam, idx) => (
                                  <motion.li
                                    key={exam.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className={`px-4 py-3 flex justify-between items-center cursor-pointer transition-all duration-150 ${
                                      idx === highlightedLabIdx
                                        ? "bg-purple-100 border-l-4 border-purple-500"
                                        : "hover:bg-purple-50"
                                    }`}
                                    onMouseEnter={() =>
                                      setHighlightedLabIdx(idx)
                                    }
                                    onClick={() => addLab(exam)}
                                    ref={(el) => {
                                      if (idx === highlightedLabIdx && el)
                                        el.scrollIntoView({ block: "nearest" });
                                    }}
                                  >
                                    <span className="font-semibold text-purple-700">
                                      {exam.nom}
                                    </span>
                                    <span className="text-xs text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded">
                                      ajouter
                                    </span>
                                  </motion.li>
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
                      <div>
                        <Label className="text-purple-700 font-medium">
                          Type de bilan
                        </Label>
                        <Select
                          onValueChange={(v) => setSelectedBilanType(v)}
                          defaultValue={SelectedbilanType || "autre"}
                        >
                          <SelectTrigger className="w-full border-purple-300 focus:ring-2 focus:ring-purple-400">
                            <SelectValue placeholder="Choisir le type" />
                          </SelectTrigger>
                          <SelectContent>
                            {bilanTypes.map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.nom}
                              </SelectItem>
                            ))}
                            <SelectItem value="autre">Autre type</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Card className="mt-6 border-purple-200 shadow-md">
                      <CardHeader className="bg-gradient-to-r from-purple-50 to-white">
                        <CardTitle className="text-purple-700 flex items-center justify-between">
                          <span>Bilans & Analyses — Aperçu</span>
                          <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                            {labItems.length} examen
                            {labItems.length > 1 ? "s" : ""}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {labItems.length === 0 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-400 h-40 flex flex-col items-center justify-center"
                          >
                            <FlaskConical
                              size={48}
                              className="mb-4 opacity-30"
                            />
                            <p className="text-lg">Aucun examen ajouté</p>
                            <p className="text-sm mt-2">
                              Recherchez et ajoutez des examens ci-dessus
                            </p>
                          </motion.div>
                        ) : (
                          <ul
                            ref={scrollRef2}
                            className="space-y-2 max-h-[40vh] overflow-y-auto p-1 sm:p-2 scroll-smooth"
                          >
                            <AnimatePresence>
                              {labItems.map((exam, index) => (
                                <motion.li
                                  key={exam.id}
                                  variants={itemVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  layout
                                  className="flex items-center justify-between border border-purple-100 rounded-xl p-3 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 bg-white shadow-sm"
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <div className="font-semibold text-purple-700 text-sm">
                                        {exam.nom}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Type : {bilanType || "Non précisé"}
                                      </div>
                                    </div>
                                  </div>

                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="hover:bg-red-100 transition rounded-full"
                                      onClick={() => removeLab(exam)}
                                    >
                                      <Trash2
                                        size={16}
                                        className="text-red-500"
                                      />
                                    </Button>
                                  </motion.div>
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                        )}
                      </CardContent>
                    </Card>

                    {/* Print Section (hidden) */}
                    <div className="hidden" ref={bilanPrintRef}>
                      <div className="bilan-print-header">
                        <div className="bilan-print-title">
                          Bilans & Analyses
                        </div>
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
                                Type : {bilanType || "Non précisé"}
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
              </motion.div>
            </TabsContent>

            {/* Justification médicale */}
            <TabsContent value="justif">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="mt-4 border-purple-300 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white rounded-t-lg">
                    <CardTitle className="text-purple-700">
                      📄 Justification médicale / Arrêt de travail
                    </CardTitle>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={handlePrintJustif}
                      size="sm"
                    >
                      🖨️ Imprimer
                    </Button>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-purple-700 font-medium">
                          Type de justification
                        </Label>
                        <Select
                          onValueChange={(v) => setJustifType(v)}
                          defaultValue={justifType}
                        >
                          <SelectTrigger className="w-full border-purple-300 focus:ring-2 focus:ring-purple-400">
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
                      <div>
                        <Label
                          htmlFor="justif-text"
                          className="text-purple-700 font-medium"
                        >
                          Texte
                        </Label>
                        <textarea
                          id="justif-text"
                          rows={8}
                          value={justifText}
                          onChange={(e) => setJustifText(e.target.value)}
                          className="w-full border-2 border-purple-200 rounded-xl p-4 mt-2 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
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
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Footer Save */}
          <motion.div
            className="mt-6 flex justify-end gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              className="text-red-500 hover:bg-red-50 transition-all duration-200"
              onClick={() => {
                setPrescriptionItems([]);
                setLabItems([]);
                setJustifText("");
              }}
            >
              Tout réinitialiser
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleSave}
            >
              Sauvegarder tout
            </Button>
          </motion.div>
        </motion.div>

        <Dialog open={existDialog} onOpenChange={setExistDialog}>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-purple-700">
                Médicament existant
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Ce médicament est déjà ajouté dans l'ordonnance.
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
